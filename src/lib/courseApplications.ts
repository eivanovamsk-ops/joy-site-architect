import { supabase } from "@/integrations/supabase/client";

export interface CourseApplicationPayload {
  userId?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  courseName: string;
  courseDate?: string | null;
  lastName?: string | null;
  telegram?: string | null;
  city?: string | null;
  specialization?: string | null;
  organization?: string | null;
  message?: string | null;
  paymentType?: "private" | "company" | string | null;
}

interface SubmitCourseApplicationResult {
  applicationId: string;
  inserted: boolean;
}

const STAFF_RECIPIENTS = ["edu@articon.pro", "event@articon.pro"];

const withTimeout = async <T,>(promise: Promise<T>, timeoutMs: number): Promise<T> => {
  let timeoutId: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("request_timeout")), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timeoutId!);
  }
};

export const submitCourseApplication = async (
  payload: CourseApplicationPayload,
): Promise<SubmitCourseApplicationResult> => {
  const { data, error } = await withTimeout(
    (supabase as any).rpc("submit_course_application", {
      p_name: payload.name,
      p_email: payload.email,
      p_phone: payload.phone || null,
      p_course_name: payload.courseName,
      p_course_date: payload.courseDate || null,
      p_user_id: payload.userId || null,
      p_last_name: payload.lastName || null,
      p_telegram: payload.telegram || null,
      p_city: payload.city || null,
      p_specialization: payload.specialization || null,
      p_organization: payload.organization || null,
      p_message: payload.message || null,
      p_payment_type: payload.paymentType || "private",
    }),
    12000,
  );

  if (error) throw error;

  const result = Array.isArray(data) ? data[0] : data;
  if (!result?.application_id) throw new Error("application_id_missing");

  return {
    applicationId: result.application_id,
    inserted: Boolean(result.inserted),
  };
};

export const sendCourseApplicationEmails = (payload: CourseApplicationPayload & { applicationId: string }) => {
  const staffNotifications = STAFF_RECIPIENTS.map((recipient) =>
    supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "course-application",
        recipientEmail: recipient,
        idempotencyKey: `course-app-${payload.applicationId}-${recipient}`,
        templateData: {
          courseName: payload.courseName,
          courseDate: payload.courseDate,
          name: payload.name,
          lastName: payload.lastName,
          phone: payload.phone,
          telegram: payload.telegram,
          city: payload.city,
          specialization: payload.specialization,
          email: payload.email,
          paymentType: payload.paymentType,
        },
      },
    }),
  );

  const clientNotification = payload.email
    ? [
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "course-application-client",
            recipientEmail: payload.email,
            idempotencyKey: `course-app-client-${payload.applicationId}`,
            templateData: { courseName: payload.courseName, name: payload.name },
          },
        }),
      ]
    : [];

  Promise.allSettled([...staffNotifications, ...clientNotification]).then((results) => {
    const failed = results.filter((result) => result.status === "rejected");
    if (failed.length) console.error("Course email notification failed", failed);
  });
};
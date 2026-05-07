/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as orderNotification } from './order-notification.tsx'
import { template as callbackNotification } from './callback-notification.tsx'
import { template as feedbackNotification } from './feedback-notification.tsx'
import { template as bundleRequest } from './bundle-request.tsx'
import { template as courseApplication } from './course-application.tsx'
import { template as courseRecommendation } from './course-recommendation.tsx'
import { template as testEmail } from './test-email.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'order-notification': orderNotification,
  'callback-notification': callbackNotification,
  'feedback-notification': feedbackNotification,
  'bundle-request': bundleRequest,
  'course-application': courseApplication,
  'course-recommendation': courseRecommendation,
  'test-email': testEmail,
}

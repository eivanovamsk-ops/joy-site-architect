import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Clock, Users, Award, ChevronRight, Share2, CheckCircle2, Target, GraduationCap, UserCheck, Lightbulb, HelpCircle, ExternalLink, BookOpen, Wrench, Beaker, Monitor, Cpu, Layers } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseApplicationForm } from "@/components/forms/CourseApplicationForm";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

// Scroll reveal hook
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("scroll-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    el.classList.add("scroll-hidden");
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const skillIcons = [BookOpen, Wrench, Beaker, Monitor, Cpu, Layers, GraduationCap, Lightbulb, Target, CheckCircle2];

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));
  const [stickyNavVisible, setStickyNavVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Refs for sections
  const goalRef = useReveal();
  const audienceRef = useReveal();
  const lecturersRef = useReveal();
  const programRef = useReveal();
  const faqRef = useReveal();
  const ctaRef = useReveal();

  // Sticky nav logic
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setStickyNavVisible(heroBottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <Link to="/education/calendar">
            <Button>Вернуться к курсам</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    if (price === 0) return "Бесплатно";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const generateCourseMetaDescription = () => {
    const parts: string[] = [];
    parts.push(course.title);
    if (course.shortDescription) parts.push("— " + course.shortDescription.slice(0, 60));
    if (!course.isComingSoon) parts.push(course.date + ", Москва.");
    if (course.price > 0) parts.push(`Стоимость: ${formatPrice(course.price)}.`);
    parts.push("Записаться в Учебном центре Артикон.");
    return parts.join(" ").slice(0, 160);
  };

  const generateCourseOgDescription = () => {
    const parts: string[] = [];
    if (!course.isComingSoon) parts.push(course.date + ".");
    parts.push(course.shortDescription);
    if (course.lecturers.length > 0) parts.push(`Преподаватель: ${course.lecturers[0].name}.`);
    if (course.price > 0) parts.push(`Стоимость: ${formatPrice(course.price)}.`);
    return parts.join(" ").slice(0, 200);
  };

  const courseOgImage = course.coverImage || course.lecturers[0]?.photo || "https://articon.pro/og-education.jpg";
  const relatedCourses = courses.filter((c) => c.category === course.category && c.id !== course.id).slice(0, 3);
  
  const getDuration = () => {
    if (course.dateEnd) {
      const days = Math.ceil((course.dateEnd.getTime() - course.dateStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
    }
    return "1 день";
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const stickyNavItems = [
    { id: "course-program", label: "Программа" },
    { id: "course-lecturers", label: "Преподаватели" },
    { id: "course-pricing", label: "Стоимость" },
    { id: "course-faq", label: "FAQ" },
  ];

  return (
    <Layout>
      <Helmet>
        <title>{course.metaTitle} | Учебный центр Артикон</title>
        <meta name="description" content={generateCourseMetaDescription()} />
        <link rel="canonical" href={`https://articon.pro/education/course/${course.id}`} />
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={`${course.title} — Учебный центр Артикон`} />
        <meta property="og:description" content={generateCourseOgDescription()} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://articon.pro/education/course/${course.id}`} />
        <meta property="og:image" content={courseOgImage} />
        <meta property="og:site_name" content="Артикон" />
        <meta property="og:locale" content="ru_RU" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${course.title} — Учебный центр Артикон`} />
        <meta name="twitter:description" content={generateCourseOgDescription()} />
        <meta name="twitter:image" content={courseOgImage} />
        
        {/* Course JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": course.title,
            "description": course.metaDescription,
            "provider": {
              "@type": "Organization",
              "name": "Учебный центр Артикон",
              "url": "https://articon.pro/education"
            },
            "url": `https://articon.pro/education/course/${course.id}`,
            ...(course.coverImage ? { "image": course.coverImage } : {}),
            "coursePrerequisites": course.targetAudience.join(", "),
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": course.format === "Онлайн" ? "Online" : "Onsite",
              "startDate": course.dateStart.toISOString().split("T")[0],
              ...(course.dateEnd ? { "endDate": course.dateEnd.toISOString().split("T")[0] } : {}),
              "location": {
                "@type": "Place",
                "name": course.location,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Москва",
                  "addressCountry": "RU"
                }
              },
              ...(course.price > 0 ? {
                "offers": {
                  "@type": "Offer",
                  "price": course.price,
                  "priceCurrency": "RUB",
                  "availability": "https://schema.org/InStock",
                  "url": `https://articon.pro/education/course/${course.id}`
                }
              } : {})
            },
            ...(course.lecturers.length > 0 ? {
              "instructor": course.lecturers.map((l) => ({
                "@type": "Person",
                "name": l.name,
                "jobTitle": l.position
              }))
            } : {})
          })}
        </script>

        {/* FAQPage JSON-LD */}
        {course.faq && course.faq.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": course.faq.map((item) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })}
          </script>
        )}
      </Helmet>

      {/* Sticky Anchor Nav */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border transition-all duration-300",
        stickyNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1 overflow-x-auto">
              {stickyNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:block flex-shrink-0">
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                buttonVariant="card"
                buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="relative" id="course-pricing">
        {course.coverImage && (
          <div className="absolute inset-0 h-[400px]">
            <img src={course.coverImage} alt={course.title} loading="eager" decoding="async" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>
        )}
        <div className={`relative ${course.coverImage ? 'pt-8 pb-12' : 'gradient-education py-12'}`}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={course.coverImage ? "bg-primary text-primary-foreground" : "bg-education-foreground/20 text-education-foreground"}>
                    {course.category}
                  </Badge>
                  {course.isAccredited && (
                    <Badge className="bg-green-600 text-white">
                      <Award className="h-3 w-3 mr-1" /> Аккредитация НМО
                    </Badge>
                  )}
                  {course.placesLeft && course.placesLeft < 10 && (
                    <Badge className="bg-orange-500 text-white">Осталось {course.placesLeft} мест</Badge>
                  )}
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${course.coverImage ? 'text-white' : 'text-education-foreground'}`}>
                  {course.title}
                </h1>
                {course.subtitle && (
                  <p className={`text-xl mb-4 ${course.coverImage ? 'text-white/80' : 'text-education-foreground/80'}`}>
                    {course.subtitle}
                  </p>
                )}
                <p className={`text-lg mb-6 ${course.coverImage ? 'text-white/70' : 'text-education-foreground/80'}`}>
                  {course.shortDescription}
                </p>
                
                <div className={`flex flex-wrap gap-4 mb-6 ${course.coverImage ? 'text-white/90' : 'text-education-foreground/90'}`}>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {course.isComingSoon ? (
                      <Badge variant="secondary" className="text-sm font-medium">{course.comingSoonLabel || "Дата уточняется"}</Badge>
                    ) : (
                      <span>{course.date}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /><span>{course.location}</span></div>
                  {!course.isComingSoon && <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>{getDuration()}</span></div>}
                </div>

                {/* Hero CTA button with pulse */}
                <div className="hidden lg:block">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                    buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"}
                  />
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <div className="mb-2">
                  {course.originalPrice && course.originalPrice > course.price && (
                    <span className="text-lg text-muted-foreground line-through mr-2">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-primary">{formatPrice(course.price)}</span>
                </div>
                <div className="text-muted-foreground mb-6">{course.format}</div>
                
                {course.isComingSoon ? (
                  <>
                    <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonVariant="card" buttonLabel="Добавьте меня в лист ожидания" />
                    <p className="text-sm text-muted-foreground text-center mb-3 mt-3">
                      Как только новая дата курса будет согласована, мы сразу с вами свяжемся
                    </p>
                  </>
                ) : (
                  <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonVariant="card" />
                )}

                <div className="border-t border-border pt-4">
                  <div className="text-sm font-medium mb-3">Включено в стоимость:</div>
                  <ul className="space-y-2">
                    {course.includes.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Course Goal */}
        <div ref={goalRef} className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">
                {course.format === 'Open Day' ? 'Цель встречи' : course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Цель мероприятия' : 'Цель курса'}
              </h2>
              <p className="text-muted-foreground text-lg">{course.goal}</p>
            </div>
          </div>
        </div>

        {/* Target Audience & Skills */}
        <div ref={audienceRef} className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h2 className="text-xl font-bold">
                {course.format === 'Open Day' || course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Кому будет интересно' : 'Для кого этот курс'}
              </h2>
            </div>
            <ul className="space-y-4">
              {course.targetAudience.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills as Grid Cards */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold">
                {course.format === 'Open Day' ? 'Что вам даст встреча' : course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Что вы получите' : 'Чему вы научитесь'}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.skills.map((skill, index) => {
                const Icon = skillIcons[index % skillIcons.length];
                return (
                  <div key={index} className="flex items-start gap-3 bg-muted/50 rounded-xl p-3 border border-border/50">
                    <div className="w-8 h-8 bg-accent/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <span className="text-sm leading-snug">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lecturers Section */}
        {course.lecturers.length > 0 && (
          <div ref={lecturersRef} className="mb-12" id="course-lecturers">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">
                {course.format === 'Open Day' || course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча'
                  ? course.lecturers.length === 1 ? 'Спикер' : 'Спикеры'
                  : course.lecturers.length === 1 ? 'Преподаватель' : 'Преподаватели'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.lecturers.map((lecturer, index) => (
                <div key={index} className="bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group/lecturer">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-20 h-20 border-2 border-primary/20 transition-transform duration-300 group-hover/lecturer:scale-105">
                      <AvatarImage src={lecturer.photo} alt={lecturer.name} />
                      <AvatarFallback className="text-lg">{lecturer.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{lecturer.name}</h3>
                      <p className="text-sm text-primary mb-2">{lecturer.position}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">{lecturer.bio}</p>
                  {lecturer.achievements && lecturer.achievements.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {lecturer.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Award className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
            {course.guestSpeakerNote && (
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">{course.guestSpeakerNote}</p>
              </div>
            )}

            <div className="mt-8 text-center">
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"}
              />
            </div>
          </div>
        )}

        {/* Program Section */}
        <div ref={programRef} className="mb-12" id="course-program">
          <h2 className="text-2xl font-bold mb-6">Программа курса</h2>
          {course.program.length > 1 ? (
            <Tabs defaultValue="day-1" className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2 mb-6">
                {course.program.map((day) => (
                  <TabsTrigger
                    key={day.day}
                    value={`day-${day.day}`}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    День {day.day}
                  </TabsTrigger>
                ))}
              </TabsList>
              {course.program.map((day) => (
                <TabsContent key={day.day} value={`day-${day.day}`} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">{day.title}</h3>
                  {day.speaker}
                  <ul className="space-y-3">
                    {day.topics.map((topic, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className={topic.startsWith('---') ? 'font-bold text-foreground' : 'text-foreground'}>{topic}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Practice ticker for practical days */}
                  {day.title.toLowerCase().includes('практик') && (
                    <div className="mt-6 overflow-hidden rounded-lg bg-primary/5 py-2">
                      <div className="animate-ticker whitespace-nowrap">
                        <span className="text-primary/40 font-bold text-sm tracking-widest uppercase">
                          {Array(10).fill("Практика • ").join("")}
                        </span>
                      </div>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6">
              {course.programDescription && (
                <div className="mb-6 text-muted-foreground whitespace-pre-line leading-relaxed">
                  {course.programDescription}
                </div>
              )}
              
              <ul className="space-y-3">
                {course.program[0]?.topics.map((topic, idx) => {
                  const isHeader = topic.startsWith('---');
                  if (isHeader) {
                    const headerText = topic.replace(/^---\s*/, '').replace(/\s*---$/, '');
                    return (
                      <li key={idx} className="mt-6 first:mt-0">
                        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2.5 font-bold text-sm">
                          {headerText}
                        </div>
                      </li>
                    );
                  }

                  const isResult = topic.startsWith('✅');
                  return (
                    <li key={idx} className={cn(
                      "flex items-start gap-3 pl-2",
                      isResult && "bg-green-50 dark:bg-green-950/20 rounded-lg px-3 py-2 border border-green-200 dark:border-green-900/30"
                    )}>
                      {!isResult && (
                        <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-primary">
                          {idx + 1}
                        </span>
                      )}
                      <span className={cn(
                        "text-foreground whitespace-pre-line",
                        isResult && "text-green-800 dark:text-green-300 text-sm"
                      )}>
                        {topic}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-8 text-center">
            <CourseApplicationForm
              courseName={course.title}
              courseDate={course.date}
              buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"}
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div ref={faqRef} className="mb-12" id="course-faq">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Часто задаваемые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
            {course.faq.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">
            {course.isComingSoon ? "Хотите попасть на этот курс?" : "Готовы начать обучение?"}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {course.isComingSoon
              ? "Оставьте заявку, и мы свяжемся с вами, как только дата будет согласована."
              : "Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {course.isComingSoon ? (
              <CourseApplicationForm courseName={course.title} courseDate={course.date} buttonLabel="Добавьте меня в лист ожидания" />
            ) : (
              <CourseApplicationForm courseName={course.title} courseDate={course.date} />
            )}
            <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline">Задать вопрос</Button>
            </a>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Похожие курсы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map((relCourse) => (
                <Link key={relCourse.id} to={`/education/course/${relCourse.id}`} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  {relCourse.coverImage && (
                    <div className="h-32 overflow-hidden">
                      <img src={relCourse.coverImage} alt={relCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                  )}
                  <div className="p-4">
                    <Badge className="text-xs mb-2">{relCourse.category}</Badge>
                    <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">{relCourse.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4" /><span>{relCourse.date}</span>
                    </div>
                    <div className="font-bold text-primary mt-2">{formatPrice(relCourse.price)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 safe-area-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-bold text-primary text-lg">{formatPrice(course.price)}</div>
            <div className="text-xs text-muted-foreground truncate">{course.title}</div>
          </div>
          <CourseApplicationForm
            courseName={course.title}
            courseDate={course.date}
            buttonVariant="card"
            buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться"}
          />
        </div>
      </div>

      {/* Bottom padding for mobile sticky */}
      <div className="h-20 lg:hidden" />
    </Layout>
  );
};

export default CourseDetail;

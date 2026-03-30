import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight as ChevronRightIcon, X, ZoomIn, Camera } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Clock, Users, Award, ChevronRight, Share2, CheckCircle2, Target, GraduationCap, UserCheck, Lightbulb, HelpCircle, ExternalLink, BookOpen, Wrench, Beaker, Monitor, Cpu, Layers, ArrowDown } from "lucide-react";
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

function CourseVideoSlider({ videos }: {videos: string[];}) {
  const [current, setCurrent] = useState(0);
  const total = videos.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Видео с курса</h3>
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
        <video
          key={videos[current]}
          src={videos[current]}
          controls
          playsInline
          className="w-full h-full object-contain" />
        
        {total > 1 &&
        <>
            <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg">
            
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg">
            
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {videos.map((_, i) =>
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all",
                i === current ? "bg-primary w-6" : "bg-background/60"
              )} />

            )}
            </div>
          </>
        }
      </div>
    </div>);

}

function CourseGalleryCard({ images }: {images: string[];}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
      <div className="relative flex-1 min-h-[280px]">
        <img
          src={images[current]}
          alt={`Работа ${current + 1}`}
          className="w-full h-full object-cover absolute inset-0" />
        
        {total > 1 &&
        <>
            <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-md">
            
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-md">
            
              <ChevronRightIcon className="h-4 w-4" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) =>
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                i === current ? "bg-primary-foreground w-5" : "bg-primary-foreground/50"
              )} />

            )}
            </div>
          </>
        }
      </div>
    </div>);

}

function CoursePhotoGallery({ images }: {images: string[];}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const galleryRef = useReveal();

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);else
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);else
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, activeIndex, goTo]);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div ref={galleryRef} className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Camera className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold">Фото с курса</h2>
          </div>

          {/* Main Image */}
          <div
            className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted cursor-zoom-in group mb-4 shadow-lg border border-border"
            onClick={() => setLightboxOpen(true)}>
            
            <img
              src={images[activeIndex]}
              alt={`Фото с курса ${activeIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
              <ZoomIn className="h-5 w-5 text-foreground" />
            </div>
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              {activeIndex + 1} / {images.length}
            </div>

            {images.length > 1 &&
            <>
                <button
                onClick={(e) => {e.stopPropagation();goTo(activeIndex - 1);}}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all shadow-lg opacity-0 group-hover:opacity-100">
                
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                onClick={(e) => {e.stopPropagation();goTo(activeIndex + 1);}}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-all shadow-lg opacity-0 group-hover:opacity-100">
                
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </>
            }
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, i) =>
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300",
                i === activeIndex ?
                "border-primary ring-2 ring-primary/30 scale-105" :
                "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
              )}>
              
                <img src={img} alt={`Миниатюра ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen &&
      <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <img
          src={images[activeIndex]}
          alt={`Фото ${activeIndex + 1}`}
          className="max-w-[90vw] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()} />
        
          <button
          onClick={() => setLightboxOpen(false)}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2.5 transition-colors">
          
            <X className="h-6 w-6 text-white" />
          </button>
          {images.length > 1 &&
        <>
              <button
            onClick={(e) => {e.stopPropagation();goTo(activeIndex - 1);}}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
            
                <ChevronLeft className="h-7 w-7 text-white" />
              </button>
              <button
            onClick={(e) => {e.stopPropagation();goTo(activeIndex + 1);}}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
            
                <ChevronRightIcon className="h-7 w-7 text-white" />
              </button>
            </>
        }
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) =>
          <button
            key={i}
            onClick={(e) => {e.stopPropagation();setActiveIndex(i);}}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all",
              i === activeIndex ? "bg-white w-7" : "bg-white/40 hover:bg-white/60"
            )} />

          )}
          </div>
        </div>
      }
    </section>);

}

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

  if (course?.externalUrl) {
    return <Navigate to={course.externalUrl} replace />;
  }

  if (!course) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <Link to="/education/calendar">
            <Button>Вернуться к курсам</Button>
          </Link>
        </div>
      </Layout>);

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
  { id: "course-faq", label: "FAQ" }];


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
        {course.faq && course.faq.length > 0 &&
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
        }
      </Helmet>

      {/* Sticky Anchor Nav */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10 transition-all duration-500 shadow-lg",
        stickyNavVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-1 overflow-x-auto">
              {stickyNavItems.map((item) =>
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-primary-foreground/70 hover:text-primary-foreground transition-colors whitespace-nowrap rounded-lg hover:bg-primary-foreground/10">
                
                  {item.label}
                </button>
              )}
            </div>
            <div className="hidden sm:block flex-shrink-0">
              <CourseApplicationForm
                courseName={course.title}
                courseDate={course.date}
                showTelegramField={course.id !== 18}
                buttonVariant="card"
                buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться"} />
              
            </div>
          </div>
        </div>
      </div>

      {/* ===== HERO — Full-screen immersive ===== */}
      <div ref={heroRef} className="relative min-h-[70vh] lg:min-h-[80vh] flex items-end" id="course-pricing">
        {/* Background */}
        {course.coverImage ?
        <div className="absolute inset-0">
            <img src={course.coverImage} alt={course.title} loading="eager" decoding="async" className="w-full h-full object-cover" />
            {!course.lightBanner &&
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />
          }
            {course.lightBanner &&
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/30" />
          }
          </div> :

        <div className="absolute inset-0 gradient-primary" />
        }

        <div className="relative w-full pb-12 pt-32">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-5 gap-8 items-end">
              {/* Left: Course info */}
              <div className="lg:col-span-3">
                <div className="flex flex-wrap gap-2 mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <Badge className="bg-accent text-accent-foreground text-sm px-3 py-1 font-semibold">
                    {course.category}
                  </Badge>
                  {course.isAccredited &&
                  <Badge className="bg-green-500 text-white text-sm px-3 py-1">
                      <Award className="h-3.5 w-3.5 mr-1" /> НМО
                    </Badge>
                  }
                  {course.placesLeft && course.placesLeft < 10 &&
                  <Badge className="bg-orange-500 text-white text-sm px-3 py-1">Осталось {course.placesLeft} мест</Badge>
                  }
                </div>

                <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight animate-fade-in-up", course.lightBanner ? "text-foreground" : "text-white")} style={{ animationDelay: '0.2s' }}>
                  {course.title}
                </h1>
                {course.subtitle &&
                <p className={cn("text-xl md:text-2xl mb-4 animate-fade-in-up", course.lightBanner ? "text-muted-foreground" : "text-white/80")} style={{ animationDelay: '0.3s' }}>
                    {course.subtitle}
                  </p>
                }
                <p className={cn("text-lg mb-8 max-w-2xl animate-fade-in-up", course.lightBanner ? "text-muted-foreground" : "text-white/60")} style={{ animationDelay: '0.4s' }}>
                  {course.shortDescription}
                </p>
                
                <div className={cn("flex flex-wrap gap-6 mb-4 animate-fade-in-up", course.lightBanner ? "text-foreground" : "text-white/90")} style={{ animationDelay: '0.5s' }}>
                  <div className={cn("flex items-center gap-2.5 backdrop-blur-sm rounded-full px-4 py-2", course.lightBanner ? "bg-foreground/10" : "bg-white/10")}>
                    <Calendar className="h-5 w-5 text-accent" />
                    {course.isComingSoon ?
                    <span className="text-sm font-medium">{course.comingSoonLabel || "Дата уточняется"}</span> :

                    <span className="text-sm font-medium">{course.date}</span>
                    }
                  </div>
                  <div className={cn("flex items-center gap-2.5 backdrop-blur-sm rounded-full px-4 py-2", course.lightBanner ? "bg-foreground/10" : "bg-white/10")}>
                    <MapPin className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{course.location}</span>
                  </div>
                  {!course.isComingSoon &&
                  <div className={cn("flex items-center gap-2.5 backdrop-blur-sm rounded-full px-4 py-2", course.lightBanner ? "bg-foreground/10" : "bg-white/10")}>
                      <Clock className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium">{getDuration()}</span>
                    </div>
                  }
                </div>

                {course.upcomingDates && course.upcomingDates.length > 0 && (
                  <div className={cn("flex flex-wrap items-center gap-2 mb-8 animate-fade-in-up", course.lightBanner ? "text-foreground" : "text-white/80")} style={{ animationDelay: '0.55s' }}>
                    <span className="text-sm text-muted-foreground">Также:</span>
                    {course.upcomingDates.map((ud, i) => (
                      <span key={i} className={cn("text-sm backdrop-blur-sm rounded-full px-3 py-1", course.lightBanner ? "bg-foreground/5 text-foreground/80" : "bg-white/10 text-white/70")}>
                        {ud.date}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hero CTA with pulse */}
                <div className="hidden lg:flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <div className="animate-pulse-soft">
                    <CourseApplicationForm
                      courseName={course.title}
                      courseDate={course.date}
                showTelegramField={course.id !== 18}
                      buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"} />
                    
                  </div>
                  <button
                    onClick={() => scrollToSection('course-program')}
                    className={cn("flex items-center gap-2 transition-colors text-sm", course.lightBanner ? "text-muted-foreground hover:text-foreground" : "text-white/60 hover:text-white")}>
                    
                    Подробнее <ArrowDown className="h-4 w-4 animate-bounce" />
                  </button>
                </div>
              </div>

              {/* Right: Pricing Card */}
              <div className="lg:col-span-2 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-border/50">
                  <div className="mb-4">
                    {course.originalPrice && course.originalPrice > course.price &&
                    <span className="text-lg text-muted-foreground line-through mr-2">
                        {formatPrice(course.originalPrice)}
                      </span>
                    }
                    <div className="text-4xl font-extrabold text-primary">{formatPrice(course.price)}</div>
                  </div>
                  <div className="text-muted-foreground mb-6 text-sm uppercase tracking-wider">{course.format}</div>
                  
                  {course.isComingSoon ?
                  <>
                      <CourseApplicationForm courseName={course.title} courseDate={course.date}
                showTelegramField={course.id !== 18} buttonVariant="card" buttonLabel="Добавьте меня в лист ожидания" />
                      <p className="text-sm text-muted-foreground text-center mb-3 mt-3">
                        Как только новая дата курса будет согласована, мы сразу с вами свяжемся
                      </p>
                    </> :

                  <CourseApplicationForm courseName={course.title} courseDate={course.date}
                showTelegramField={course.id !== 18} buttonVariant="card" />
                  }

                  <div className="border-t border-border mt-6 pt-6">
                    <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Включено в стоимость</div>
                    <ul className="space-y-3">
                      {course.includes.map((item, index) =>
                      <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="relative">
        {/* Course Goal — Contrasting section */}
        <section className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <div ref={goalRef} className="max-w-4xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Target className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      {course.format === 'Open Day' ? 'Цель встречи' : course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Цель мероприятия' : 'Цель курса'}
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">{course.goal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience & Skills */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div ref={audienceRef} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <UserCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {course.format === 'Open Day' || course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Кому будет интересно' : 'Для кого этот курс'}
                  </h2>
                </div>
                <ul className="space-y-4">
                  {course.targetAudience.map((item, index) =>
                  <li key={index} className="flex items-start gap-3">
                      <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-base">{item}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Skills as Grid Cards */}
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h2 className="text-2xl font-bold">
                    {course.format === 'Open Day' ? 'Что вам даст встреча' : course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ? 'Что вы получите' : 'Чему вы научитесь'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.skills.map((skill, index) => {
                    const Icon = skillIcons[index % skillIcons.length];
                    return (
                      <div key={index} className="flex items-start gap-3 bg-muted/50 rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
                        <div className="w-9 h-9 bg-accent/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="h-4.5 w-4.5 text-accent-foreground" />
                        </div>
                        <span className="text-sm leading-snug">{skill}</span>
                      </div>);

                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lecturers Section — Contrasting background */}
        {course.lecturers.length > 0 &&
        <section className="bg-muted/50 py-16" id="course-lecturers">
            <div className="container mx-auto px-4">
              <div ref={lecturersRef} className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl font-bold">
                    {course.format === 'Open Day' || course.format === 'Воркшоп' || course.format === 'Конференция' || course.format === 'Бизнес-встреча' ?
                  course.lecturers.length === 1 ? 'Спикер' : 'Спикеры' :
                  course.lecturers.length === 1 ? 'Преподаватель' : 'Преподаватели'}
                  </h2>
                </div>
                <div className={cn(
                "grid gap-6",
                course.galleryImages && course.galleryImages.length > 0 ?
                "md:grid-cols-2 lg:grid-cols-3" :
                "md:grid-cols-2 lg:grid-cols-3"
              )}>
                  {course.lecturers.map((lecturer, index) =>
                <div key={index} className="bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group/lecturer">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="w-28 h-28 border-4 border-primary/20 transition-transform duration-300 group-hover/lecturer:scale-110 mb-5 shadow-lg">
                          <AvatarImage src={lecturer.photo} alt={lecturer.name} className="object-cover" />
                          <AvatarFallback className="text-2xl">{lecturer.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-bold text-xl mb-1">{lecturer.name}</h3>
                        
                      </div>
                      <p className="text-muted-foreground text-sm text-center mt-2">{lecturer.bio}</p>
                      {lecturer.achievements && lecturer.achievements.length > 0 &&
                  <ul className="mt-4 space-y-2">
                          {lecturer.achievements.map((a, i) =>
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Award className="h-3.5 w-3.5 text-accent mt-0.5 flex-shrink-0" />
                              {a}
                            </li>
                    )}
                        </ul>
                  }
                    </div>
                )}

                </div>
                {course.guestSpeakerNote &&
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground">{course.guestSpeakerNote}</p>
                  </div>
              }

                {/* CTA after lecturers */}
                <div className="mt-10 text-center">
                  <CourseApplicationForm
                  courseName={course.title}
                  courseDate={course.date}
                showTelegramField={course.id !== 18}
                  buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"} />
                
                </div>
              </div>
            </div>
          </section>
        }

        {/* ===== Photo Gallery Section ===== */}
        {course.galleryImages && course.galleryImages.length > 0 &&
        <CoursePhotoGallery images={course.galleryImages} />
        }

        {/* Partners / При поддержке */}
        {course.partners && course.partners.length > 0 &&
        <section className="py-16 bg-background border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-10">При поддержке</p>
                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                  {course.partners.map((partner, idx) =>
                <a
                  key={idx}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 group max-w-[200px]">
                  
                      <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-20 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  
                      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed text-center">
                        {partner.name}
                      </span>
                    </a>
                )}
                </div>
              </div>
            </div>
          </section>
        }

        {/* Program Section — White background */}
        <section className="py-16" id="course-program">
          <div className="container mx-auto px-4">
            <div ref={programRef} className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">Программа курса</h2>
              </div>

              {course.program.length > 1 ?
              <Tabs defaultValue="day-1" className="w-full">
                  <TabsList className="w-full flex-wrap h-auto gap-2 bg-primary/5 p-2 mb-8 rounded-xl border border-primary/10">
                    {course.program.map((day) =>
                  <TabsTrigger
                    key={day.day}
                    value={`day-${day.day}`}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-lg px-6 py-2.5 font-semibold transition-all">
                    
                        День {day.day}
                      </TabsTrigger>
                  )}
                  </TabsList>
                  {course.program.map((day) =>
                <TabsContent key={day.day} value={`day-${day.day}`}>
                      {/* Dark contrast header */}
                      <div className="bg-primary text-primary-foreground rounded-t-2xl px-8 py-5">
                        <h3 className="text-xl font-bold">{day.title}</h3>
                        {day.speaker && <p className="text-primary-foreground/70 text-sm mt-1">{day.speaker}</p>}
                      </div>
                      <div className="bg-card border border-t-0 border-border rounded-b-2xl p-8">
                        <ul className="space-y-3">
                          {day.topics.map((topic, idx) =>
                      <li key={idx} className="flex items-start gap-3">
                              {!topic.startsWith('---') &&
                        <span className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-primary">
                                  {idx + 1}
                                </span>
                        }
                              <span className={cn(
                          "text-foreground",
                          topic.startsWith('---') && 'font-bold text-primary text-lg mt-4'
                        )}>
                                {topic.startsWith('---') ? topic.replace(/^---\s*/, '').replace(/\s*---$/, '') : topic}
                              </span>
                            </li>
                      )}
                        </ul>

                        {/* Practice ticker */}
                        {day.title.toLowerCase().includes('практик') &&
                    <div className="mt-8 overflow-hidden rounded-xl bg-primary/5 py-3 border border-primary/10">
                            <div className="animate-ticker whitespace-nowrap">
                              <span className="text-primary/30 font-extrabold text-lg tracking-[0.3em] uppercase">
                                {Array(10).fill("Практика • ").join("")}
                              </span>
                            </div>
                          </div>
                    }
                      </div>
                    </TabsContent>
                )}
                </Tabs> :

              <div>
                  {/* Dark contrast header for single-day */}
                  <div className="bg-primary text-primary-foreground rounded-t-2xl px-8 py-5">
                    <h3 className="text-xl font-bold">{course.program[0]?.title || 'Программа'}</h3>
                  </div>
                  <div className="bg-card border border-t-0 border-border rounded-b-2xl p-8">
                    {course.programDescription &&
                  <div className="mb-8 text-muted-foreground whitespace-pre-line leading-relaxed border-b border-border pb-8">
                        {course.programDescription}
                      </div>
                  }
                    
                    <ul className="space-y-3">
                      {course.program[0]?.topics.map((topic, idx) => {
                      const isHeader = topic.startsWith('---');
                      if (isHeader) {
                        const headerText = topic.replace(/^---\s*/, '').replace(/\s*---$/, '');
                        return (
                          <li key={idx} className="mt-8 first:mt-0">
                              <div className="bg-primary text-primary-foreground rounded-xl px-6 py-3 font-bold text-base shadow-md">
                                {headerText}
                              </div>
                            </li>);

                      }

                      const isResult = topic.startsWith('✅');
                      return (
                        <li key={idx} className={cn(
                          "flex items-start gap-3 pl-2",
                          isResult && "bg-green-50 dark:bg-green-950/20 rounded-xl px-4 py-3 border border-green-200 dark:border-green-900/30"
                        )}>
                            {!isResult &&
                          <span className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-primary">
                                {idx + 1}
                              </span>
                          }
                            <span className={cn(
                            "text-foreground whitespace-pre-line",
                            isResult && "text-green-800 dark:text-green-300 text-sm font-medium"
                          )}>
                              {topic}
                            </span>
                          </li>);

                    })}
                    </ul>
                  </div>
                </div>
              }

              {/* CTA after program */}
              <div className="mt-10 text-center">
                <div className="animate-pulse-soft inline-block">
                  <CourseApplicationForm
                    courseName={course.title}
                    courseDate={course.date}
                showTelegramField={course.id !== 18}
                    buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться на курс"} />
                  
                </div>
                </div>
              </div>

              {/* Video Slider */}
              {course.videos && course.videos.length > 0 &&
            <CourseVideoSlider videos={course.videos} />
            }
          </div>
        </section>

        {/* FAQ Section — Contrasting background */}
        <section className="bg-muted/50 py-16" id="course-faq">
          <div className="container mx-auto px-4">
            <div ref={faqRef} className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <HelpCircle className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold">Часто задаваемые вопросы</h2>
              </div>
              <Accordion type="single" collapsible className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                {course.faq.map((item, index) =>
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="px-8 py-5 hover:no-underline hover:bg-muted/30 text-base">
                      <span className="text-left font-semibold">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-5 text-muted-foreground text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Final CTA — Dark dramatic block */}
        <section className="py-20 gradient-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-foreground rounded-full blur-[120px]" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div ref={ctaRef} className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4">
                {course.isComingSoon ? "Хотите попасть на этот курс?" : "Готовы начать обучение?"}
              </h2>
              <p className="text-primary-foreground/70 mb-8 text-lg max-w-md mx-auto">
                {course.isComingSoon ?
                "Оставьте заявку, и мы свяжемся с вами, как только дата будет согласована." :
                "Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {course.isComingSoon ?
                <CourseApplicationForm courseName={course.title} courseDate={course.date}
                showTelegramField={course.id !== 18} buttonLabel="Добавьте меня в лист ожидания" /> :

                <div className="animate-pulse-soft">
                    <CourseApplicationForm courseName={course.title} courseDate={course.date}
                showTelegramField={course.id !== 18} />
                  </div>
                }
                <a href="https://t.me/articon_education" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">Задать вопрос</Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Related Courses */}
        {relatedCourses.length > 0 &&
        <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Похожие курсы</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCourses.map((relCourse) =>
              <Link key={relCourse.id} to={`/education/course/${relCourse.id}`} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    {relCourse.coverImage &&
                <div className="h-40 overflow-hidden">
                        <img src={relCourse.coverImage} alt={relCourse.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                }
                    <div className="p-5">
                      <Badge className="text-xs mb-2">{relCourse.category}</Badge>
                      <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">{relCourse.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-3">
                        <Calendar className="h-4 w-4" /><span>{relCourse.date}</span>
                      </div>
                      <div className="font-bold text-primary text-lg mt-2">{formatPrice(relCourse.price)}</div>
                    </div>
                  </Link>
              )}
              </div>
            </div>
          </section>
        }
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-background/95 backdrop-blur-md border-t border-border p-3 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-primary text-xl">{formatPrice(course.price)}</div>
            <div className="text-xs text-muted-foreground truncate">{course.title}</div>
          </div>
          <CourseApplicationForm
            courseName={course.title}
            courseDate={course.date}
                showTelegramField={course.id !== 18}
            buttonVariant="card"
            buttonLabel={course.isComingSoon ? "В лист ожидания" : "Записаться"} />
          
        </div>
      </div>

      {/* Bottom padding for mobile sticky */}
      <div className="h-20 lg:hidden" />
    </Layout>);

};

export default CourseDetail;
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, MapPin, Clock, Users, Award, ChevronRight, Share2, CheckCircle2, Target, GraduationCap, UserCheck, Lightbulb, HelpCircle, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CourseEnrollmentForm } from "@/components/education/CourseEnrollmentForm";
import { courses } from "@/data/courses";
const CourseDetail = () => {
  const {
    id
  } = useParams();
  const course = courses.find(c => c.id === Number(id));
  if (!course) {
    return <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Курс не найден</h1>
          <Link to="/education/calendar">
            <Button>Вернуться к курсам</Button>
          </Link>
        </div>
      </Layout>;
  }
  const formatPrice = (price: number) => {
    if (price === 0) return "Бесплатно";
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };
  const relatedCourses = courses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);
  const getDuration = () => {
    if (course.dateEnd) {
      const days = Math.ceil((course.dateEnd.getTime() - course.dateStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
    }
    return "1 день";
  };
  return <Layout>
      <Helmet>
        <title>{course.metaTitle} | Учебный центр Артикон</title>
        <meta name="description" content={course.metaDescription} />
        <meta property="og:title" content={course.metaTitle} />
        <meta property="og:description" content={course.metaDescription} />
        {course.coverImage && <meta property="og:image" content={course.coverImage} />}
      </Helmet>

      {/* Hero */}
      <div className="relative">
        {course.coverImage && <div className="absolute inset-0 h-[400px]">
            <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>}
        <div className={`relative ${course.coverImage ? 'pt-8 pb-12' : 'gradient-education py-12'}`}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={course.coverImage ? "bg-primary text-primary-foreground" : "bg-education-foreground/20 text-education-foreground"}>
                    {course.category}
                  </Badge>
                  {course.isAccredited && <Badge className="bg-green-600 text-white">
                      <Award className="h-3 w-3 mr-1" /> Аккредитация НМО
                    </Badge>}
                  {course.placesLeft && course.placesLeft < 10 && <Badge className="bg-orange-500 text-white">Осталось {course.placesLeft} мест</Badge>}
                </div>
                <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${course.coverImage ? 'text-white' : 'text-education-foreground'}`}>
                  {course.title}
                </h1>
                {course.subtitle && <p className={`text-xl mb-4 ${course.coverImage ? 'text-white/80' : 'text-education-foreground/80'}`}>
                    {course.subtitle}
                  </p>}
                <p className={`text-lg mb-6 ${course.coverImage ? 'text-white/70' : 'text-education-foreground/80'}`}>
                  {course.shortDescription}
                </p>
                
                <div className={`flex flex-wrap gap-4 ${course.coverImage ? 'text-white/90' : 'text-education-foreground/90'}`}>
                  <div className="flex items-center gap-2"><Calendar className="h-5 w-5" /><span>{course.date}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="h-5 w-5" /><span>{course.location}</span></div>
                  <div className="flex items-center gap-2"><Clock className="h-5 w-5" /><span>{getDuration()}</span></div>
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                <div className="mb-2">
                  {course.originalPrice && course.originalPrice > course.price && <span className="text-lg text-muted-foreground line-through mr-2">
                      {formatPrice(course.originalPrice)}
                    </span>}
                  <span className="text-3xl font-bold text-primary">{formatPrice(course.price)}</span>
                </div>
                <div className="text-muted-foreground mb-6">{course.format}</div>
                
                {course.externalUrl ? <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full bg-primary hover:bg-primary/90 mb-3">
                      Записаться на курс <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a> : <CourseEnrollmentForm courseName={course.title} courseDate={course.date} coursePrice={course.price} />}
                <Button size="lg" variant="outline" className="w-full mb-6">
                  <Share2 className="h-4 w-4 mr-2" /> Поделиться
                </Button>

                <div className="border-t border-border pt-4">
                  <div className="text-sm font-medium mb-3">Включено в стоимость:</div>
                  <ul className="space-y-2">
                    {course.includes.map((item, index) => <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        {item}
                      </li>)}
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
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{course.format === 'Open Day' ? 'Цель встречи' : 'Цель курса'}</h2>
              <p className="text-muted-foreground text-lg">{course.goal}</p>
            </div>
          </div>
        </div>

        {/* Target Audience & Skills */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary rounded-xl flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-secondary-foreground" />
              </div>
              <h2 className="text-xl font-bold">{course.format === 'Open Day' ? 'Кому будет интересно' : 'Для кого этот курс'}</h2>
            </div>
            <ul className="space-y-4">
              {course.targetAudience.map((item, index) => <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>)}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-accent-foreground" />
              </div>
              <h2 className="text-xl font-bold">Чему вы научитесь</h2>
            </div>
            <ul className="space-y-4">
              {course.skills.map((skill, index) => <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Lightbulb className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <span>{skill}</span>
                </li>)}
            </ul>
          </div>
        </div>

        {/* Lecturers Section */}
        {course.lecturers.length > 0 && <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">
                {course.lecturers.length === 1 ? 'Преподаватель' : 'Преподаватели'}
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {course.lecturers.map((lecturer, index) => <div key={index} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={lecturer.photo} alt={lecturer.name} />
                      <AvatarFallback>{lecturer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{lecturer.name}</h3>
                      <p className="text-sm text-primary mb-2">{lecturer.position}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">{lecturer.bio}</p>
                  {lecturer.achievements && lecturer.achievements.length > 0 && <div className="flex flex-wrap gap-2 mt-3">
                      {lecturer.achievements.map((achievement, idx) => <Badge key={idx} variant="secondary" className="text-xs">
                          <Award className="h-3 w-3 mr-1" /> {achievement}
                        </Badge>)}
                    </div>}
                </div>)}
            </div>
            {course.guestSpeakerNote && <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">{course.guestSpeakerNote}</p>
              </div>}
          </div>}

        {/* Program Tabs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Программа курса</h2>
          {course.program.length > 1 ? <Tabs defaultValue="day-1" className="w-full">
              <TabsList className="w-full flex-wrap h-auto gap-2 bg-muted/50 p-2 mb-6">
                {course.program.map(day => <TabsTrigger key={day.day} value={`day-${day.day}`} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    День {day.day}
                  </TabsTrigger>)}
              </TabsList>
              {course.program.map(day => <TabsContent key={day.day} value={`day-${day.day}`} className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-4">{day.title}</h3>
                  {day.speaker}
                  <ul className="space-y-3">
                    {day.topics.map((topic, idx) => <li key={idx} className="flex items-start gap-3">
                        
                        <span className={topic.startsWith('---') ? 'font-bold' : ''}>{topic}</span>
                      </li>)}
                  </ul>
                </TabsContent>)}
            </Tabs> : <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{course.program[0]?.title}</h3>
              <ul className="space-y-3">
                {course.program[0]?.topics.map((topic, idx) => <li key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className={topic.startsWith('---') ? 'font-bold' : ''}>{topic}</span>
                  </li>)}
              </ul>
            </div>}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Часто задаваемые вопросы</h2>
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-xl">
            {course.faq.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-b-0">
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/30">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="bg-primary/10 rounded-2xl p-8 text-center mb-12">
          <h2 className="text-2xl font-bold mb-2">Готовы начать обучение?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Запишитесь на курс сейчас или свяжитесь с нами для получения дополнительной информации.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {course.externalUrl ? <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Записаться на курс <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </a> : <CourseEnrollmentForm courseName={course.title} courseDate={course.date} coursePrice={course.price} />}
            <Button size="lg" variant="outline">Задать вопрос</Button>
          </div>
        </div>

        {/* Related Courses */}
        {relatedCourses.length > 0 && <div>
            <h2 className="text-2xl font-bold mb-6">Похожие курсы</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedCourses.map(relCourse => <Link key={relCourse.id} to={`/education/course/${relCourse.id}`} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all">
                  {relCourse.coverImage && <div className="h-32 overflow-hidden">
                      <img src={relCourse.coverImage} alt={relCourse.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>}
                  <div className="p-4">
                    <Badge className="text-xs mb-2">{relCourse.category}</Badge>
                    <h3 className="font-bold line-clamp-2 group-hover:text-primary transition-colors">{relCourse.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                      <Calendar className="h-4 w-4" /><span>{relCourse.date}</span>
                    </div>
                    <div className="font-bold text-primary mt-2">{formatPrice(relCourse.price)}</div>
                  </div>
                </Link>)}
            </div>
          </div>}
      </div>
    </Layout>;
};
export default CourseDetail;
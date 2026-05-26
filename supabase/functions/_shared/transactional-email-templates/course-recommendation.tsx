import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface CourseRecommendationProps {
  name?: string
  phone?: string
  city?: string
  specializations?: string[]
  direction?: string
  directionOther?: string | null
}

const CourseRecommendationEmail = (props: CourseRecommendationProps) => {
  const specs = Array.isArray(props.specializations) && props.specializations.length
    ? props.specializations.join(', ')
    : '—'
  const direction = props.direction === 'Другое' && props.directionOther
    ? `Другое — ${props.directionOther}`
    : props.direction || '—'

  return (
    <Html lang="ru" dir="ltr">
      <Head />
      <Preview>Заявка на подбор курса от {props.name || 'посетителя'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>💡 Заявка на подбор курса</Heading>
          </Section>
          <Section style={content}>
            <Text style={text}><strong>Имя:</strong> {props.name || '—'}</Text>
            <Text style={text}><strong>Телефон:</strong> {props.phone || '—'}</Text>
            <Text style={text}><strong>Город:</strong> {props.city || '—'}</Text>
            <Text style={text}><strong>Специализация:</strong> {specs}</Text>
            <Text style={text}><strong>Направление:</strong> {direction}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CourseRecommendationEmail,
  subject: 'Заявка на подбор курса с сайта',
  displayName: 'Подбор курса',
  previewData: {
    name: 'Иван',
    phone: '+7 999 123-45-67',
    city: 'Москва',
    specializations: ['Зубной техник', 'Управляющий'],
    direction: 'Другое',
    directionOther: 'Интересует пресс-керамика',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#1a365d', padding: '20px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const content = { padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }

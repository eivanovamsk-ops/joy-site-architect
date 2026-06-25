import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Link,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface CourseApplicationProps {
  courseName?: string
  courseDate?: string
  name?: string
  lastName?: string
  phone?: string
  telegram?: string
  city?: string
  specialization?: string
  email?: string
  organization?: string
  message?: string
  paymentType?: string
  companyDetails?: string
  companyFileUrl?: string
  companyFileName?: string
}

const CourseApplicationEmail = (props: CourseApplicationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Заявка на курс: {props.courseName || '—'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🎓 Заявка на курс</Heading>
          <Text style={headerSub}>{props.courseName || '—'}</Text>
        </Section>
        <Section style={content}>
          {props.courseDate && <Text style={text}><strong>Дата:</strong> {props.courseDate}</Text>}
          <Text style={text}><strong>Имя:</strong> {props.name || '—'} {props.lastName || ''}</Text>
          <Text style={text}><strong>Телефон:</strong> {props.phone || '—'}</Text>
          {props.telegram && <Text style={text}><strong>Telegram:</strong> {props.telegram}</Text>}
          {props.city && <Text style={text}><strong>Город:</strong> {props.city}</Text>}
          {props.specialization && <Text style={text}><strong>Специализация:</strong> {props.specialization}</Text>}
          {props.email && <Text style={text}><strong>Email:</strong> {props.email}</Text>}
          {props.organization && <Text style={text}><strong>Организация:</strong> {props.organization}</Text>}
          {props.message && <Text style={text}><strong>Комментарий:</strong> {props.message}</Text>}
          {props.paymentType && (
            <Text style={text}>
              <strong>Оплата:</strong> {props.paymentType === 'company' ? 'От компании' : 'От частного лица'}
            </Text>
          )}
          {props.companyDetails && (
            <Text style={text}><strong>Реквизиты:</strong> {props.companyDetails}</Text>
          )}
          {props.companyFileUrl && (
            <Text style={text}>
              <strong>Файл реквизитов:</strong>{' '}
              <Link href={props.companyFileUrl} style={link}>
                {props.companyFileName || 'Скачать файл'}
              </Link>
              <br />
              <span style={hint}>Ссылка действует 7 дней.</span>
            </Text>
          )}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CourseApplicationEmail,
  subject: (data: Record<string, any>) => `Заявка на курс: ${data.courseName || 'Курс'}`,
  displayName: 'Заявка на курс (менеджер)',
  previewData: { courseName: 'Тестовый курс', name: 'Иван', lastName: 'Иванов', phone: '+7 999 123-45-67', city: 'Москва', specialization: 'Ортопед' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#1a365d', padding: '20px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const headerSub = { fontSize: '14px', color: '#ffffffcc', margin: '5px 0 0' }
const content = { padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const link = { color: '#1a365d', textDecoration: 'underline' }
const hint = { fontSize: '12px', color: '#666666' }

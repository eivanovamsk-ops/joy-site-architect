import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface CourseApplicationClientProps {
  courseName?: string
  name?: string
}

const CourseApplicationClientEmail = (props: CourseApplicationClientProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Спасибо за заявку на курс {props.courseName || ''}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Спасибо за заявку!</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}>
            {props.name ? `${props.name}, мы` : 'Мы'} получили вашу заявку
            {props.courseName ? ` на курс «${props.courseName}»` : ''}.
          </Text>
          <Text style={text}>
            Менеджер Учебного центра ARTICON свяжется с вами в ближайшее рабочее время,
            чтобы подтвердить запись и ответить на вопросы.
          </Text>
          <Hr style={hr} />
          <Text style={textSmall}>
            <strong>Контакты Учебного центра:</strong><br />
            Email: edu@articon.pro<br />
            Telegram: @articon_education
          </Text>
          <Text style={footer}>С уважением, команда ARTICON</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CourseApplicationClientEmail,
  subject: (data: Record<string, any>) =>
    data.courseName ? `Заявка на курс «${data.courseName}» принята` : 'Ваша заявка на курс принята',
  displayName: 'Подтверждение заявки на курс (клиенту)',
  previewData: { courseName: 'Тестовый курс', name: 'Иван' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#1a365d', padding: '24px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const content = { padding: '24px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 8px 8px' }
const text = { fontSize: '15px', color: '#1f2937', lineHeight: '1.6', margin: '0 0 14px' }
const textSmall = { fontSize: '13px', color: '#374151', lineHeight: '1.6', margin: '0 0 14px' }
const hr = { borderColor: '#e5e7eb', margin: '20px 0' }
const footer = { fontSize: '13px', color: '#6b7280', margin: '20px 0 0' }

import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Articon"

interface FeedbackNotificationProps {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const FeedbackNotificationEmail = (props: FeedbackNotificationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новое сообщение от {props.name || 'посетителя'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>💬 Новое сообщение с сайта</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}><strong>Имя:</strong> {props.name || '—'}</Text>
          <Text style={text}><strong>Email:</strong> {props.email || '—'}</Text>
          {props.phone && <Text style={text}><strong>Телефон:</strong> {props.phone}</Text>}
          <Text style={text}><strong>Сообщение:</strong></Text>
          <Text style={messageStyle}>{props.message || '—'}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: FeedbackNotificationEmail,
  subject: 'Новое сообщение с сайта articon.pro',
  displayName: 'Уведомление о сообщении',
  previewData: { name: 'Иван', email: 'ivan@test.ru', phone: '+7 999 123-45-67', message: 'Тестовое сообщение' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#1a365d', padding: '20px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const content = { padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }
const messageStyle = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px', backgroundColor: '#ffffff', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb' }

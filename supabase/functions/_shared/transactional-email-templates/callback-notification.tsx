import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Articon"

interface CallbackNotificationProps {
  name?: string
  phone?: string
  source?: string
}

const CallbackNotificationEmail = (props: CallbackNotificationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Запрос обратного звонка от {props.name || 'клиента'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>📞 Запрос обратного звонка</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}><strong>Имя:</strong> {props.name || '—'}</Text>
          <Text style={text}><strong>Телефон:</strong> {props.phone || '—'}</Text>
          {props.source && <Text style={text}><strong>Источник:</strong> {props.source}</Text>}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: CallbackNotificationEmail,
  subject: 'Запрос обратного звонка с сайта',
  displayName: 'Запрос обратного звонка',
  to: 'moscow@articon.pro',
  previewData: { name: 'Иван Иванов', phone: '+7 999 123-45-67', source: 'popup' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#1a365d', padding: '20px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const content = { padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }

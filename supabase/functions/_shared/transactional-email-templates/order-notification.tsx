import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Articon"

interface OrderNotificationProps {
  orderId?: string
  customerName?: string
  customerPhone?: string
  customerEmail?: string
  total?: string
  deliveryMethod?: string
  items?: string
}

const OrderNotificationEmail = (props: OrderNotificationProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Новый заказ #{props.orderId?.slice(0, 8).toUpperCase() || '—'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🛒 Новый заказ #{props.orderId?.slice(0, 8).toUpperCase() || '—'}</Heading>
        </Section>
        <Section style={content}>
          <Text style={text}><strong>Клиент:</strong> {props.customerName || '—'}</Text>
          <Text style={text}><strong>Телефон:</strong> {props.customerPhone || '—'}</Text>
          <Text style={text}><strong>Email:</strong> {props.customerEmail || '—'}</Text>
          <Text style={text}><strong>Доставка:</strong> {props.deliveryMethod || '—'}</Text>
          <Text style={text}><strong>Сумма:</strong> {props.total || '—'}</Text>
          {props.items && <Text style={text}><strong>Товары:</strong> {props.items}</Text>}
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: OrderNotificationEmail,
  subject: (data: Record<string, any>) => `Новый заказ #${(data.orderId || '').slice(0, 8).toUpperCase()}`,
  displayName: 'Уведомление о заказе (менеджер)',
  to: 'moscow@articon.pro',
  previewData: { orderId: '12345678-test', customerName: 'Иван Иванов', customerPhone: '+7 999 123-45-67', customerEmail: 'test@test.ru', total: '15 000 ₽', deliveryMethod: 'Доставка по Москве' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#dc2626', padding: '20px', borderRadius: '8px 8px 0 0' }
const h1 = { fontSize: '20px', fontWeight: 'bold' as const, color: '#ffffff', margin: '0' }
const content = { padding: '20px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }
const text = { fontSize: '14px', color: '#333333', lineHeight: '1.6', margin: '0 0 8px' }

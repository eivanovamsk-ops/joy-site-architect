import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Articon"

const TestEmail = () => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Тестовое письмо от {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>✅ Тестовое письмо</Heading>
        <Text style={text}>
          Это тестовое письмо от {SITE_NAME}. Если вы его получили — email-система работает корректно.
        </Text>
        <Text style={footer}>С уважением, команда {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: TestEmail,
  subject: `Тестовое письмо — ${SITE_NAME}`,
  displayName: 'Тестовое письмо',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '20px 25px', maxWidth: '600px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: '#1a365d', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 25px' }
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }

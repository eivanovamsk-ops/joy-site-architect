/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

const LOGO_URL = 'https://minlrvrnprwcrgqfgsws.supabase.co/storage/v1/object/public/email-assets/articon-logo.png'

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Код подтверждения — Articon</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Articon" width="140" height="auto" style={logo} />
        <Heading style={h1}>Код подтверждения</Heading>
        <Text style={text}>Используйте код ниже для подтверждения вашей личности:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          Код действителен ограниченное время. Если вы не запрашивали код, просто проигнорируйте это письмо.
        </Text>
        <Text style={footerBrand}>
          С уважением, команда Articon · articon.pro
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '30px 25px' }
const logo = { margin: '0 0 24px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 'bold' as const,
  color: '#141c2b',
  margin: '0 0 20px',
}
const text = {
  fontSize: '14px',
  color: '#6b7280',
  lineHeight: '1.6',
  margin: '0 0 20px',
}
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  color: '#1a365d',
  margin: '0 0 30px',
  letterSpacing: '4px',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
const footerBrand = { fontSize: '12px', color: '#999999', margin: '8px 0 0' }

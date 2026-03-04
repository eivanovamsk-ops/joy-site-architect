/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

const LOGO_URL = 'https://minlrvrnprwcrgqfgsws.supabase.co/storage/v1/object/public/email-assets/articon-logo.png'

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="ru" dir="ltr">
    <Head />
    <Preview>Подтвердите email для Articon</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img src={LOGO_URL} alt="Articon" width="140" height="auto" style={logo} />
        <Heading style={h1}>Подтвердите ваш email</Heading>
        <Text style={text}>
          Спасибо за регистрацию в{' '}
          <Link href={siteUrl} style={link}>
            <strong>Articon</strong>
          </Link>
          !
        </Text>
        <Text style={text}>
          Пожалуйста, подтвердите ваш email (
          <Link href={`mailto:${recipient}`} style={link}>
            {recipient}
          </Link>
          ), нажав на кнопку ниже:
        </Text>
        <Button style={button} href={confirmationUrl}>
          Подтвердить email
        </Button>
        <Text style={footer}>
          Если вы не создавали аккаунт, просто проигнорируйте это письмо.
        </Text>
        <Text style={footerBrand}>
          С уважением, команда Articon · articon.pro
        </Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

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
const link = { color: '#1a365d', textDecoration: 'underline' }
const button = {
  backgroundColor: '#1a365d',
  color: '#f8f6f1',
  fontSize: '14px',
  fontWeight: '600' as const,
  borderRadius: '8px',
  padding: '12px 24px',
  textDecoration: 'none',
}
const footer = { fontSize: '12px', color: '#999999', margin: '30px 0 0' }
const footerBrand = { fontSize: '12px', color: '#999999', margin: '8px 0 0' }

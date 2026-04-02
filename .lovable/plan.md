

## Fix: Update webinar date in email template

The confirmation email still shows "26 марта 2026" because the edge function `send-email-unisender` has the old date hardcoded in two places.

### Problem

The registration form sends `course_name: "Вебинар: Лайфхаки в работе с цирконом — 8 апреля 2026"`, but the edge function's `WEBINAR_CONFIGS` dictionary uses the old key `"Вебинар: Лайфхаки в работе с цирконом — 26 марта 2026"`. This means the key never matches, so the webinar-specific email template (with Telegram chat link and Bizon365 room) is not used.

### Changes

**File: `supabase/functions/send-email-unisender/index.ts`**

1. Update `WEBINAR_CONFIGS` key and `courseDate` (lines 108-112):
   - Key: `"Вебинар: Лайфхаки в работе с цирконом — 8 апреля 2026"`
   - `courseDate`: `"8 апреля 2026, 16:00 МСК"`

2. Update `ZIRCON_WEBINAR_CONFIG` (lines 115-119):
   - `courseDate`: `"8 апреля 2026, 16:00 МСК"`

Both places keep the existing `telegramChatUrl` and `courseName` unchanged.


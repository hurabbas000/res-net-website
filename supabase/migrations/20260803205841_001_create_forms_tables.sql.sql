/*
# Create newsletter_subscribers, contact_submissions, and program_interest tables

1. New Tables
- `newsletter_subscribers` — stores email signups from the homepage newsletter form.
  - `id` (uuid, primary key)
  - `email` (text, unique, not null)
  - `created_at` (timestamptz)
- `contact_submissions` — stores messages submitted via the Contact page form.
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `message` (text, not null)
  - `created_at` (timestamptz)
- `program_interest` — stores "Register Interest" submissions from the Academy page.
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `email` (text, not null)
  - `program` (text, not null)
  - `notes` (text, nullable)
  - `created_at` (timestamptz)

2. Security
- Enable RLS on all three tables.
- This is a no-auth (no sign-in) app, so all policies use `TO anon, authenticated`
  to allow the anon-key frontend to insert data.
- INSERT-only policies on all three tables (the public only submits; the admin
  reads from the dashboard separately).
- No SELECT/UPDATE/DELETE policies for anon — submissions are write-only from
  the public frontend.
*/

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_newsletter" ON newsletter_subscribers;
CREATE POLICY "anon_insert_newsletter"
ON newsletter_subscribers FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact" ON contact_submissions;
CREATE POLICY "anon_insert_contact"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS program_interest (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  program text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE program_interest ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_interest" ON program_interest;
CREATE POLICY "anon_insert_interest"
ON program_interest FOR INSERT
TO anon, authenticated WITH CHECK (true);

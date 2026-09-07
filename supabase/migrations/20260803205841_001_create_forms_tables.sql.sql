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

-- =========================================================
-- Res.Net Workshop Registration — Supabase Schema
-- Run this whole file once in: Supabase Dashboard → SQL Editor
-- =========================================================

-- ---------------------------------------------------------
-- 1. WORKSHOPS (pricing table)
-- One row per workshop/program. Controls the dropdown price
-- shown on the registration form. Edit prices any time here —
-- no code changes needed.
-- ---------------------------------------------------------
create table if not exists public.workshops (
  id                 uuid primary key default gen_random_uuid(),
  slug               text unique not null,      -- must match Program.slug in content.ts
  title              text not null,
  early_bird_price   integer not null,          -- in PKR, whole numbers
  regular_price      integer not null,
  early_bird_active  boolean not null default true, -- toggle off manually once early bird ends
  currency           text not null default 'PKR',
  created_at         timestamptz not null default now()
);

alter table public.workshops enable row level security;

-- Anyone (anon key, i.e. the public website) can read prices
drop policy if exists "Public can read workshops" on public.workshops;
create policy "Public can read workshops"
  on public.workshops for select
  using (true);

-- Seed with placeholder prices — CHANGE THESE to real numbers.
insert into public.workshops (slug, title, early_bird_price, regular_price, early_bird_active)
values
  ('foundations',         'Research Foundations Workshop',                    1500, 2000, true),
  ('ai-research',         'AI in Medical Research',                           2000, 2500, true),
  ('bootcamp',            'Original Research Bootcamp',                       4000, 5000, true),
  ('systematic-review',   'Systematic Review & Meta-analysis Masterclass',    3000, 3500, true)
on conflict (slug) do nothing;


-- ---------------------------------------------------------
-- 2. WORKSHOP_REGISTRATIONS (the actual form submissions)
-- ---------------------------------------------------------
create table if not exists public.workshop_registrations (
  id                        uuid primary key default gen_random_uuid(),
  created_at                timestamptz not null default now(),

  -- Which workshop
  workshop_slug             text not null references public.workshops(slug),
  workshop_title            text not null,

  -- 1. Basic Information
  full_name                 text not null,
  email                     text not null,
  whatsapp                  text not null,
  city                      text not null,
  country                   text,

  -- 2. Academic Background
  institution                text not null,
  program_degree             text not null,
  year_semester               text not null,

  -- 3. Research Background
  prior_basic_workshop        boolean not null,      -- Yes/No
  research_experience         text[] not null default '{}',
  research_experience_other   text,
  published_before            boolean,               -- nullable, optional question
  research_knowledge_level    text,                  -- optional

  -- 4. Expectations & Engagement
  interested_mentorship       boolean,                -- optional
  interested_future_workshops text,                   -- 'Yes' | 'Maybe' | 'No'
  heard_about                 text,
  heard_about_other           text,

  -- Consent
  consent_accurate            boolean not null,

  -- Payment
  fee_type                    text not null,          -- 'early_bird' | 'regular'
  fee_amount                  integer not null,
  currency                    text not null default 'PKR',
  payment_method               text not null,          -- 'Bank Transfer' | 'Easypaisa' | 'Nayapay'
  receipt_path                 text not null,          -- path inside the 'receipts' storage bucket
  payment_confirmed             boolean not null,

  -- Admin workflow (not user-editable)
  status                       text not null default 'pending_verification'
);

alter table public.workshop_registrations enable row level security;

-- Public site can INSERT new registrations, but cannot read
-- anyone's data back (keeps receipts/personal info private).
-- Verification happens from the Supabase dashboard or with the
-- service role key on a backend/admin tool.
drop policy if exists "Public can submit registrations" on public.workshop_registrations;
create policy "Public can submit registrations"
  on public.workshop_registrations for insert
  with check (true);


-- ---------------------------------------------------------
-- 3. STORAGE — receipts bucket
-- Private bucket: uploads are allowed from the public site,
-- but files are not publicly listable/readable. View/download
-- receipts from the Supabase Dashboard → Storage, or generate
-- signed URLs from an admin tool using the service role key.
-- ---------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('receipts', 'receipts', false)
on conflict (id) do nothing;

drop policy if exists "Public can upload receipts" on storage.objects;
create policy "Public can upload receipts"
  on storage.objects for insert
  with check (bucket_id = 'receipts');

-- =========================================================
-- Done. After running this:
-- 1. Check the `workshops` table and update the prices to real values.
-- 2. Toggle `early_bird_active` to false per workshop once early bird ends.
-- 3. View submissions in Table Editor → workshop_registrations.
-- 4. View uploaded receipts in Storage → receipts.
-- =========================================================

-- =========================================================
-- Res.Net Pre-Workshop & Post-Workshop Forms — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor
-- (Assumes the `workshops` table from supabase_schema.sql already exists)
-- =========================================================

-- ---------------------------------------------------------
-- 1. PRE_WORKSHOP_RESPONSES
-- ---------------------------------------------------------
create table if not exists public.pre_workshop_responses (
  id                          uuid primary key default gen_random_uuid(),
  created_at                  timestamptz not null default now(),

  -- Which workshop this is for
  workshop_slug               text not null references public.workshops(slug),
  workshop_title              text not null,

  -- 1. Basic Information
  full_name                   text not null,
  email                       text not null,
  whatsapp                    text not null,
  city                        text not null,
  country                     text,

  -- 2. Academic Background
  institution                 text not null,
  program_degree              text not null,
  year_semester                text not null,

  -- 3. Interest and Expectations
  join_reasons                 text[] not null default '{}',
  join_reasons_other           text,
  topics_interested             text[] not null default '{}',
  mentorship_interest           text not null,   -- 'Yes' | 'No' | 'Maybe'

  -- Knowledge self-assessment (1-5)
  rating_study_designs          smallint not null check (rating_study_designs between 1 and 5),
  rating_literature_search      smallint not null check (rating_literature_search between 1 and 5),
  rating_journal_selection      smallint not null check (rating_journal_selection between 1 and 5),
  rating_reference_management   smallint not null check (rating_reference_management between 1 and 5),
  rating_ai_tools                smallint not null check (rating_ai_tools between 1 and 5),

  -- Previous research experience
  prior_workshop_attended        boolean not null,
  has_publication                 boolean not null,
  research_types_worked           text[] not null default '{}',

  -- Optional
  expectations                    text
);

alter table public.pre_workshop_responses enable row level security;

drop policy if exists "Public can submit pre-workshop responses" on public.pre_workshop_responses;
create policy "Public can submit pre-workshop responses"
  on public.pre_workshop_responses for insert
  with check (true);


-- ---------------------------------------------------------
-- 2. POST_WORKSHOP_RESPONSES
-- ---------------------------------------------------------
create table if not exists public.post_workshop_responses (
  id                            uuid primary key default gen_random_uuid(),
  created_at                    timestamptz not null default now(),

  -- Which workshop this is for
  workshop_slug                 text not null references public.workshops(slug),
  workshop_title                text not null,

  -- 1. Basic Information
  full_name                     text not null,
  email                         text not null,
  whatsapp                      text not null,
  city                          text not null,
  country                       text,

  -- 2. Academic Background
  institution                   text not null,
  program_degree                text not null,
  year_semester                  text not null,

  -- Workshop experience (1-5)
  rating_overall                  smallint not null check (rating_overall between 1 and 5),
  rating_relevance                 smallint not null check (rating_relevance between 1 and 5),
  rating_speakers                  smallint not null check (rating_speakers between 1 and 5),
  rating_hands_on                   smallint not null check (rating_hands_on between 1 and 5),
  rating_organization                smallint not null check (rating_organization between 1 and 5),

  -- Knowledge self-assessment (1-5)
  rating_study_designs                smallint not null check (rating_study_designs between 1 and 5),
  rating_literature_search             smallint not null check (rating_literature_search between 1 and 5),
  rating_indexing_impact                smallint not null check (rating_indexing_impact between 1 and 5),
  rating_journal_selection               smallint not null check (rating_journal_selection between 1 and 5),
  rating_writing_basics                   smallint not null check (rating_writing_basics between 1 and 5),
  rating_reference_management              smallint not null check (rating_reference_management between 1 and 5),
  rating_ai_tools                           smallint not null check (rating_ai_tools between 1 and 5),
  rating_ethics_plagiarism                   smallint not null check (rating_ethics_plagiarism between 1 and 5),

  -- Learning & impact
  useful_sessions                             text[] not null default '{}',
  most_important_learning                     text not null,
  confidence_level                            text not null,
  next_action                                 text not null,

  -- Res.Net community & future interest
  mentorship_interest                          boolean not null,
  future_programs_interest                     text[] not null default '{}',
  recommend_likelihood                          text not null,

  -- Open feedback (all optional)
  liked_most                                    text,
  improve_suggestions                           text,
  next_topic_suggestion                         text,
  additional_feedback                           text
);

alter table public.post_workshop_responses enable row level security;

drop policy if exists "Public can submit post-workshop responses" on public.post_workshop_responses;
create policy "Public can submit post-workshop responses"
  on public.post_workshop_responses for insert
  with check (true);

-- =========================================================
-- Done. View submissions in Table Editor →
-- pre_workshop_responses / post_workshop_responses.
-- As with workshop_registrations, there's no public SELECT
-- policy — only you (via the dashboard or a service-role key)
-- can read the responses back.
-- =========================================================

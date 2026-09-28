import { Calendar, Clock, MapPin, ArrowRight, Compass, BrainCircuit, BookOpen, Users } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { events, type EventItem } from '@/data/content';

const eventIcons: Record<string, typeof Compass> = {
  Compass,
  BrainCircuit,
  BookOpen,
  Users,
};

function EventCard({ event }: { event: EventItem }) {
  const Icon = eventIcons[event.icon] || Calendar;

  return (
    <Card className="p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 rounded-xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center shrink-0">
          <Icon className="h-6 w-6 text-brand-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {event.recurring && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 uppercase tracking-wider">
                Recurring
              </span>
            )}
            {event.status && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 uppercase tracking-wider">
                {event.status}
              </span>
            )}
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-navy-100 dark:bg-navy-700 text-navy-600 dark:text-gray-200 uppercase tracking-wider">
              {event.format}
            </span>
          </div>
          <h3 className="font-heading font-semibold text-xl text-navy-700 dark:text-white">
            {event.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
            {event.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" /> {event.time}
            </span>
            {event.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {event.location}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function EventsPage() {
  return (
    <>
      <SEO
        title="Events — Research Network (Res.Net)"
        description="Upcoming Res.Net events: workshop kickoffs, info sessions, journal club, and community meetups."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            Events
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            What&apos;s Coming Up
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Workshop kickoffs, info sessions, and community gatherings — all in one place.
          </p>
        </div>
      </section>

      {/* Event list */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {events.map((event, i) => (
            <EventCard key={i} event={event} />
          ))}
        </div>
      </section>

      {/* Reminder CTA */}
      <section className="py-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-700 dark:text-white">
            Never miss an event
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            Join our WhatsApp community group for reminders before every session.
          </p>
          <a
            href="https://chat.whatsapp.com/HJIzKVk4CkY2Q2XcXAoAYN"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl font-heading font-semibold bg-brand-600 text-white hover:bg-brand-700 px-6 py-3 transition-all"
          >
            Join WhatsApp Group <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  );
}

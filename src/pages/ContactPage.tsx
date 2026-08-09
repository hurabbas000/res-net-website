import { Mail, MessageCircle, Linkedin, Instagram, Facebook, MapPin, Clock } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/forms/ContactForm';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@resnet.org',
    href: 'mailto:hello@resnet.org',
    color: 'bg-navy-700',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+92 300 0000000',
    href: 'https://wa.me/923000000000',
    color: 'bg-brand-600',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/company/resnet',
    href: 'https://linkedin.com',
    color: 'bg-navy-600',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@resnet.org',
    href: 'https://instagram.com',
    color: 'bg-accent-500',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    value: 'facebook.com/resnet',
    href: 'https://facebook.com',
    color: 'bg-navy-700',
  },
];

export function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — Research Network (Res.Net)"
        description="Get in touch with Res.Net. Email us, message us on WhatsApp, or connect on social media. We respond within 48 hours."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-navy-50/50 dark:bg-navy-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-heading font-semibold tracking-wider uppercase text-brand-500 mb-3">
            Contact
          </span>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl text-navy-700 dark:text-white leading-tight text-balance">
            Let's Talk
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Have a question about our programs, want to collaborate, or interested in becoming a
            mentor? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Form */}
            <Card className="p-8">
              <h2 className="font-heading font-bold text-2xl text-navy-700 dark:text-white mb-2">
                Send Us a Message
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                Fill out the form below and we will get back to you within 48 hours.
              </p>
              <ContactForm />
            </Card>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <Card hover className="p-5 h-full">
                      <div className={`h-10 w-10 rounded-xl ${method.color} flex items-center justify-center mb-3`}>
                        <method.icon className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {method.label}
                      </p>
                      <p className="font-medium text-navy-700 dark:text-white text-sm mt-0.5 break-words">
                        {method.value}
                      </p>
                    </Card>
                  </a>
                ))}
              </div>

              {/* Hours */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-brand-500" />
                  <h3 className="font-heading font-semibold text-navy-700 dark:text-white">
                    Response Time
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  We respond to all inquiries within 48 hours during business days. For urgent
                  matters, WhatsApp is the fastest way to reach us.
                </p>
              </Card>

              {/* Map placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-navy-100 to-brand-100 dark:from-navy-800 dark:to-navy-700 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="relative text-center">
                    <MapPin className="h-10 w-10 text-navy-400 mx-auto mb-2" />
                    <p className="text-sm text-navy-500 dark:text-gray-400 font-medium">
                      Map placeholder
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Disclaimer', description: 'Important disclaimer about pest-control information, referrals, provider independence, health and safety, and service decisions.', alternates: { canonical: '/disclaimer' } };

export default function DisclaimerPage() {
  return <PolicyPage eyebrow="Important Information" title="Disclaimer" description="This page explains the limits of the information and referral features provided by Batys Pest Control." lastUpdated="July 22, 2026" sections={[
    { heading: 'General information only', paragraphs: ['Website content is provided for general educational and service-navigation purposes. It is not a substitute for an inspection of the actual property, a product label, a written provider recommendation, legal advice, medical advice, veterinary advice, structural advice, or emergency guidance.'] },
    { heading: 'Independent providers', paragraphs: ['Batys may help users check availability with independent pest-control providers. Providers are not employees or agents of Batys solely because a request is referred or routed through the website. The provider is responsible for confirming service area, credentials, inspection findings, methods, products, price, agreement, warranty, and work.'] },
    { heading: 'No diagnosis or outcome guarantee', paragraphs: ['Photographs, bites, droppings, sounds, odors, damaged materials, and user descriptions may be incomplete or misleading. Pest identification and treatment decisions should be based on a qualified property-specific assessment. No particular response time, price, treatment, number of visits, or outcome is guaranteed.'] },
    { heading: 'Health, poisoning, bites, and stings', paragraphs: ['For suspected poisoning, severe allergic reaction, breathing difficulty, serious bites or stings, illness, or exposure involving a child, pet, or medically vulnerable person, contact the appropriate emergency, medical, veterinary, or poison-control service. Do not rely on website content for urgent health decisions.'] },
    { heading: 'Wildlife, protected species, and local rules', paragraphs: ['Wildlife handling, trapping, relocation, pesticide use, notice, recordkeeping, and protected-species rules vary by jurisdiction. Verify applicable requirements and provider credentials before work begins.'] },
    { heading: 'External links and third-party statements', paragraphs: ['Links and references may lead to third-party websites or providers. Batys does not control all third-party content and does not endorse every claim, product, method, or business merely by linking to it.'] },
    { heading: 'Accuracy and updates', paragraphs: ['Reasonable efforts may be made to keep content useful, but pest-control practices, regulations, products, service areas, prices, and provider availability can change. Confirm material details directly before acting.'] },
  ]} />;
}

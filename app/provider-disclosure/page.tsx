import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Independent Provider Disclosure', description: 'Disclosure explaining Batys Pest Control referrals, independent providers, verification responsibilities, and possible compensation.', alternates: { canonical: '/provider-disclosure' } };

export default function ProviderDisclosurePage() {
  return <PolicyPage eyebrow="Referral Transparency" title="Independent Provider Disclosure" description="Batys Pest Control organizes information and may route service inquiries to independent pest-control providers." lastUpdated="July 22, 2026" sections={[
    { heading: 'How the platform works', paragraphs: ['Visitors can browse pest-control services, states, cities, and guides, then call or submit basic request information to check whether an independent provider may be available. A referral or transfer does not create an employment, franchise, partnership, or agency relationship between Batys and the provider.'] },
    { heading: 'Provider responsibilities', bullets: ['Confirm service-area coverage and appointment availability','Maintain licensing, certification, insurance, permits, and records required for the work','Inspect the actual property and identify the target pest','Recommend and explain products, devices, methods, preparation, safety, and follow-up','Provide written pricing, contracts, cancellation terms, warranties, and receipts','Perform and stand behind the work under the provider’s own business terms'] },
    { heading: 'User verification', paragraphs: ['Users should independently verify the provider’s legal business name, contact information, licensing, insurance, complaint or disciplinary information where available, written scope, price, products, re-entry instructions, warranty, and payment terms before authorizing service.'] },
    { heading: 'Compensation and lead routing', paragraphs: ['Batys may receive compensation for advertising, calls, leads, referrals, or completed transactions. Compensation can affect which available provider receives an inquiry, but it does not replace the user’s responsibility to evaluate the provider and proposed work.'] },
    { heading: 'No guaranteed match or endorsement', paragraphs: ['A listing, link, call transfer, or referral does not guarantee that a provider will accept the request, arrive within a particular time, quote a specific price, use a particular method, or achieve a particular result. It is not an endorsement of every provider statement or service decision.'] },
    { heading: 'Issues involving a provider', paragraphs: ['Questions about inspection findings, products, billing, contracts, damage, warranties, callbacks, or work quality should first be directed to the provider that performed or proposed the service. Website-routing concerns can be reported through the Batys contact page.'] },
  ]} />;
}

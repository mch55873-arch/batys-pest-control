import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for Batys Pest Control, including information collection, referral handling, cookies, and user choices.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return <PolicyPage eyebrow="Legal & Privacy" title="Privacy Policy" description="This policy explains what information may be collected when you use Batys Pest Control, how it may be used, and the choices available to you." lastUpdated="July 22, 2026" sections={[
    { heading: 'Information we may collect', paragraphs: ['We may collect information you voluntarily provide, such as your name, phone number, email address, property location, pest concern, and service-request details. We may also receive basic technical information including browser type, device type, approximate location, referring page, pages viewed, and interaction data.'], bullets: ['Contact and service-request information','Property location and pest-problem details','Technical, analytics, and security information','Communications and customer-support records'] },
    { heading: 'How information may be used', paragraphs: ['Information may be used to operate the website, respond to inquiries, organize service requests, connect users with independent pest-control providers where coverage is available, improve content, detect abuse, maintain security, and comply with legal obligations.'], bullets: ['Respond to requests and questions','Route qualified service inquiries','Improve website performance and content','Prevent fraud, spam, and misuse','Comply with applicable law'] },
    { heading: 'Independent providers and third parties', paragraphs: ['Batys is an information and referral platform. When a user requests provider availability, relevant information may be shared with an independent provider or service partner so that the request can be evaluated. Providers operate independently and may have their own privacy practices. Review their policies before authorizing service.'] },
    { heading: 'Cookies and analytics', paragraphs: ['The website may use essential cookies, analytics technologies, call-tracking tools, advertising measurement, or similar technologies. These tools may help maintain sessions, understand traffic, measure conversions, and improve usability. Browser controls can be used to limit or delete cookies, although some website functions may be affected.'] },
    { heading: 'Data retention and security', paragraphs: ['Information is retained only as long as reasonably necessary for the purpose collected, operational records, dispute resolution, security, and legal compliance. Reasonable administrative and technical safeguards may be used, but no internet transmission or storage system is completely secure.'] },
    { heading: 'Your choices and rights', paragraphs: ['Depending on your location, you may have rights to request access, correction, deletion, or restriction of certain personal information. You may also opt out of nonessential communications. Requests can be submitted through the contact page. Identity verification may be required.'] },
    { heading: 'Children’s privacy', paragraphs: ['This website is intended for adults seeking property-service information and is not directed to children under 13. We do not knowingly collect personal information from children under 13.'] },
    { heading: 'Policy changes', paragraphs: ['This policy may be updated when practices, legal requirements, or website features change. The updated date at the top of the page indicates the latest revision.'] },
  ]} />;
}

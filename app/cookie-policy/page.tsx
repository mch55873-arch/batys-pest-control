import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Cookie Policy', description: 'Cookie policy explaining essential storage, analytics, measurement, user controls, and possible third-party technologies.', alternates: { canonical: '/cookie-policy' } };

export default function CookiePolicyPage() {
  return <PolicyPage eyebrow="Privacy & Technology" title="Cookie Policy" description="This policy describes cookies and similar technologies that may be used when you visit Batys Pest Control." lastUpdated="July 22, 2026" sections={[
    { heading: 'What cookies are', paragraphs: ['Cookies are small data files stored by a browser. Similar technologies can include local storage, pixels, tags, and identifiers used to maintain functions, understand website use, protect security, or measure calls and service requests.'] },
    { heading: 'Types of technology that may be used', bullets: ['Essential storage needed for security, sessions, preferences, or core website functions','Analytics used to understand traffic, navigation, errors, devices, and page performance','Conversion or call measurement used to understand whether visitors contact the service line','Third-party tools embedded for hosting, security, forms, maps, media, or measurement'] },
    { heading: 'How information may be used', paragraphs: ['Cookie and device information may be used to keep the website functioning, prevent abuse, understand which pages are useful, diagnose technical problems, improve navigation, and measure service-request activity.'] },
    { heading: 'Your controls', paragraphs: ['Most browsers allow users to block, limit, or delete cookies and site storage. Privacy extensions and device settings may provide additional controls. Blocking essential storage can affect functionality, saved preferences, forms, security features, and session-based popup controls.'] },
    { heading: 'Do Not Track and consent tools', paragraphs: ['Browser signals and consent requirements are handled according to the tools configured on the website and applicable law. Because standards and technologies change, available controls may be updated over time.'] },
    { heading: 'Third-party practices', paragraphs: ['Third-party services may set or read their own cookies under their policies. Batys does not control every third-party setting. Review the relevant third-party privacy information when a service is presented.'] },
    { heading: 'Updates', paragraphs: ['This policy may be updated when website technology, analytics, advertising, call measurement, forms, or legal requirements change.'] },
  ]} />;
}

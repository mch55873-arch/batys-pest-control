import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Accessibility Statement', description: 'Accessibility statement for Batys Pest Control website content, navigation, forms, and feedback.', alternates: { canonical: '/accessibility' } };

export default function AccessibilityPage() {
  return <PolicyPage eyebrow="Website Access" title="Accessibility Statement" description="Batys Pest Control aims to make its service information, location directories, forms, and navigation usable by a broad range of visitors." lastUpdated="July 22, 2026" sections={[
    { heading: 'Our approach', paragraphs: ['We work to support keyboard navigation, readable contrast, meaningful headings, descriptive links, alternative text, responsive layouts, form labels, visible focus behavior, and content that remains understandable when zoomed or viewed on smaller screens.'] },
    { heading: 'Ongoing work', paragraphs: ['The website contains main-domain pages, dynamic state and city routes, service templates, articles, and third-party or hosting components. Accessibility checks and corrections are part of ongoing design, content, and technical audits.'] },
    { heading: 'Known limitations', paragraphs: ['Some older pages, third-party tools, browser behaviors, embedded content, generated location routes, or temporary technical states may not provide an identical experience in every assistive technology. We aim to correct material barriers when identified.'] },
    { heading: 'Alternative access', paragraphs: ['If a page, form, link, or feature is difficult to use, call the published service number or use the contact page. Describe the affected URL, device, browser, assistive technology, and task so the issue can be reviewed.'] },
    { heading: 'Feedback', paragraphs: ['Accessibility feedback is welcome. Reports should identify the specific barrier rather than only stating that a page is inaccessible. This helps prioritize and test an effective correction.'] },
  ]} />;
}

import type { Metadata } from 'next';
import { PolicyPage } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Editorial Policy', description: 'Editorial standards for Batys Pest Control pest guides, service pages, location content, corrections, and commercial independence.', alternates: { canonical: '/editorial-policy' } };

export default function EditorialPolicyPage() {
  return <PolicyPage eyebrow="Content Standards" title="Editorial Policy" description="This policy explains how Batys Pest Control plans, writes, reviews, updates, and corrects pest-control information." lastUpdated="July 22, 2026" sections={[
    { heading: 'Purpose and audience', paragraphs: ['Content is designed to help property owners, tenants, managers, and businesses understand pest evidence, service options, preparation, prevention, provider questions, and location-based navigation. It does not replace a property-specific inspection.'] },
    { heading: 'Content principles', bullets: ['Identify the user’s question and answer it directly','Separate observations, possibilities, and confirmed conclusions','Avoid invented offices, technicians, licenses, reviews, prices, response times, or guarantees','Describe provider independence and the need to verify credentials','Include safety limitations and direct urgent health concerns to qualified services','Use clear internal links between pests, services, states, cities, and related guides'] },
    { heading: 'Research and review', paragraphs: ['Content may be informed by recognized pest-management concepts, product-label principles, public agencies, extension resources, professional standards, and common service practices. Material claims should be written conservatively and reviewed for internal consistency, usefulness, and misleading implications.'] },
    { heading: 'Local and programmatic pages', paragraphs: ['State, city, and city-service pages use structured templates to organize geographic navigation. Template-generated content must preserve accurate place names, correct canonicals, meaningful service context, provider disclosures, and links that help users continue their research. A page should not claim a physical office or local technician unless that fact is verified.'] },
    { heading: 'Commercial independence', paragraphs: ['Referral or commercial relationships do not permit providers to dictate educational conclusions. Providers determine their own inspections, recommendations, contracts, and work; the website should not present those provider-specific claims as independently verified unless evidence supports them.'] },
    { heading: 'Corrections and updates', paragraphs: ['Material factual, routing, metadata, accessibility, or disclosure errors should be corrected when identified. Content may be updated when pest guidance, website architecture, service categories, local routes, or user needs change.'] },
    { heading: 'Feedback', paragraphs: ['Readers may report a suspected error, broken link, misleading statement, or accessibility problem through the contact page. Reports should identify the affected URL and the specific concern.'] },
  ]} />;
}

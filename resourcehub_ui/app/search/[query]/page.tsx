import { Metadata } from 'next';
import SearchResults from './search-results';

export const metadata: Metadata = {
  title: 'Search Resources',
  description: 'Search for free resources and tools for students and developers',
};

// Pre-generate common search paths
export function generateStaticParams() {
  return [
    { query: 'all' },
    { query: 'github' },
    { query: 'aws' },
    { query: 'cloud' },
    { query: 'hosting' },
    { query: 'development' },
    { query: 'design' },
    { query: 'student' },
    { query: 'd' }, // Add this to handle the specific error case
  ];
}

export default function SearchPage({ params }: { params: { query: string } }) {
  return <SearchResults query={params.query} />;
}
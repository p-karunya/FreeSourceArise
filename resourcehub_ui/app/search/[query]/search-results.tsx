"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Search } from "lucide-react";
import { Mainclient } from '@/components/appWrite';
import { Storage } from 'appwrite';

interface Offer {
  name: string;
  description: string;
  url: string;
  forUseBy: keyof typeof forUseByParse;
}

interface Response {
  [category: string]: Offer[];
}

const forUseByParse = {
  GHstudents : 'GitHub Students',
  hackclubbers : 'Hack Clubbers',
  everyone: 'Everyone',
  leaders: 'Leaders',
  students: 'GHstudents',
  clubbers: 'Hack Clubbers',
}

// Helper function to filter offers based on query
function filterOffers(offers: Response, query: string): Response {
  if (query === 'all') return offers;
  
  const filtered: Response = {};
  Object.entries(offers).forEach(([category, categoryOffers]) => {
    const matches = categoryOffers.filter(offer => 
      offer.name.toLowerCase().includes(query.toLowerCase()) ||
      offer.description.toLowerCase().includes(query.toLowerCase()) ||
      category.toLowerCase().includes(query.toLowerCase()) ||
      offer.forUseBy.toLowerCase().includes(query.toLowerCase())
    );
    if (matches.length > 0) {
      filtered[category] = matches;
    }
  });
  return filtered;
}

export default function SearchResults({ query }: { query: string }) {
// Correct state declaration with updater function
const [offers, setOffers] = useState<Response>({});
const [results, setResults] = useState<Response>({});
const [loading, setLoading] = useState(true);

useEffect(() => {
    const fetchOffers = async () => {
        try {
            const storage = new Storage(Mainclient);

            const fileURL = storage.getFileDownload(
                '67b9e22b0016f693c112', // bucketId
                '67b9e243000ef39a9d64' // fileId
            );

            const response = await fetch(fileURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setOffers(data); // Use the updater function to set state
        } catch (error) {
            console.error('Error fetching offers:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchOffers();
}, []);

useEffect(() => {
    setLoading(true);
    const filtered = filterOffers(offers, query);
    setResults(filtered);
    setLoading(false);
    console.log(offers);
}, [offers, query]); // Add 'offers' to the dependency array

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
        <div className="container mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-primary/10 rounded w-1/4"></div>
            <div className="h-32 bg-primary/10 rounded"></div>
            <div className="h-32 bg-primary/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary p-8">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Search className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold">
            Results for "{decodeURIComponent(query)}"
          </h1>
        </div>

        {Object.keys(results).length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">No results found for your search.</p>
            </CardContent>
          </Card>
        ) : (
          Object.entries(results).map(([category, offers]) => (
            <div key={category} className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{offer.name}</CardTitle>
                      <CardDescription>For {forUseByParse[offer.forUseBy]}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{offer.description}</p>
                      <Button asChild variant="outline" className="w-full">
                        <a
                          href={offer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          Visit Resource
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
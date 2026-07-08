import Papa from 'papaparse';

// We will use a placeholder URL until the user provides the real one.
// You can override this via environment variables or hardcode it later.
export const DEFAULT_SERVICES_CSV_URL = process.env.SERVICES_CSV_URL || "";

export interface ServiceData {
  slug: string;           // e.g. "leaking-faucet-fix"
  serviceName: string;    // e.g. "Leaking Faucet Fix"
  heroImage: string;      // e.g. "https://images.unsplash.com/..."
  heroSubtitle: string;   // e.g. "Stop that annoying pest problem fast..."
  contentPara1: string;   // HTML or plain text
  contentPara2: string;
  contentList: string;    // HTML <ul>
  contentPara3: string;
  faq1Question: string;
  faq1Answer: string;
  faq2Question: string;
  faq2Answer: string;
  faq3Question: string;
  faq3Answer: string;
}

export async function getServicesData(url: string = DEFAULT_SERVICES_CSV_URL): Promise<ServiceData[]> {
  if (!url) {
    // console.warn("No CSV URL provided. Returning empty data.");
    return [];
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    
    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          // You might need to map exactly to your column names here depending on what the user types
          const data = results.data as ServiceData[];
          resolve(data);
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching or parsing Google Sheets CSV:", error);
    return [];
  }
}

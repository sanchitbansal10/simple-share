import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

// Disable caching for this page
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Add cache control headers
  const headers = {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  };

  const noteId = randomUUID();
  redirect(`/${noteId}`);
}

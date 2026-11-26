import type { Metadata } from "next";
import { WorkList } from "../components/home/WorkList";
import { SOCIAL_LINKS } from "../content/social";
import { pageMetadata, SITE_DESCRIPTION, SITE_TITLE } from "../lib/metadata";
import { SITE_URL } from "../lib/site";

const base = pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" });

export const metadata: Metadata = {
  ...base,
  // The homepage shows the full title, not "… — Praveenkumar" twice.
  title: { absolute: SITE_TITLE },
  openGraph: { ...base.openGraph, title: SITE_TITLE },
  twitter: { ...base.twitter, title: SITE_TITLE },
};

// Tells search engines who the site belongs to, so a search for the name
// can show the person with their profiles.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Praveenkumar",
  jobTitle: "Product designer and design engineer",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/photo.png`,
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  sameAs: SOCIAL_LINKS.map((link) => link.href),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <WorkList />
    </>
  );
}

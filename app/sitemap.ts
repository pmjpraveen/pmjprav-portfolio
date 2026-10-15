import type { MetadataRoute } from "next";
import { getRealProjects } from "./content/projects";
import { SITE_URL } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/work", "/about", "/contact"].map((path) => ({ url: `${SITE_URL}${path}` }));
  const projects = getRealProjects().map((project) => ({ url: `${SITE_URL}/work/${project.slug}` }));
  return [...pages, ...projects];
}

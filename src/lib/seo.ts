const BASE_URL = "https://context-craft-text.lovable.app";

export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const DEFAULT_OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/82fe8591-5845-4b33-9d36-b55de680fd1d/id-preview-75db1dc9--7b91fd79-afaa-4c15-90f9-9e8dc57b7890.lovable.app-1774794166908.png";

export function buildSEO({ title, description, path = "/", ogImage, noIndex }: SEOProps) {
  const url = `${BASE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  return { title, description, url, image, noIndex };
}

export { BASE_URL, DEFAULT_OG_IMAGE };

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { getSeoForPath } from "@/lib/seo";

export function RouteSeo() {
  const location = useLocation();
  const seo = getSeoForPath(location.pathname);

  if (!seo) return null;

  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;
  const ogImage = seo.ogImage;

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.canonical} />

      <meta property="og:type" content={seo.ogType ?? "website"} />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={seo.canonical} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      <meta property="og:site_name" content="Артикон" />
      <meta property="og:locale" content="ru_RU" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  );
}

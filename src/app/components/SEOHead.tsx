import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

const BASE_URL = 'https://www.atc-taxi-vtc.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = DEFAULT_IMAGE,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes('ATC') ? title : `${title} | ATC TAXI VTC Narbonne`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="ATC TAXI VTC Narbonne" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Geo */}
      <meta name="geo.region" content="FR-11" />
      <meta name="geo.placename" content="Narbonne" />
      <meta name="geo.position" content="43.1837;3.0029" />
      <meta name="ICBM" content="43.1837, 3.0029" />

      {/* Schema */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(schema) ? schema : schema)}
        </script>
      )}
    </Helmet>
  );
}

import { Helmet } from 'react-helmet-async';
import logoImg from '../../imports/ACT_TAXI5.png';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

const BASE_URL = 'https://www.atc-taxi-vtc.com';

// ✅ OG image stable (SEO safe)
const LOGO_OG_IMAGE = `${BASE_URL}/atc-taxi-narbonne-og-image.jpg`;

export function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage,
  schema,
}: SEOHeadProps) {
  const fullTitle = title.includes('ATC')
    ? title
    : `${title} | ATC TAXI VTC Narbonne`;

  const canonicalUrl = canonical
    ? `${BASE_URL}${canonical}`
    : BASE_URL;

  const imageUrl = ogImage ?? LOGO_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {keywords && <meta name="keywords" content={keywords} />}

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ATC TAXI VTC Narbonne – Logo" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="ATC TAXI VTC Narbonne" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content="ATC TAXI VTC Narbonne" />

      {/* Robots */}
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />

      {/* Geo SEO local */}
      <meta name="geo.region" content="FR-11" />
      <meta name="geo.placename" content="Narbonne" />
      <meta name="geo.position" content="43.1837;3.0029" />
      <meta name="ICBM" content="43.1837, 3.0029" />

      {/* Mobile */}
      <meta name="theme-color" content="#3AB4B1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="ATC TAXI Narbonne" />

      {/* Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />

      {/* Schema JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

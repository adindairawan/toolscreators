import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
}

export const SEOHead: React.FC<SEOProps> = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    document.title = `${title} | Creator & Social Tools`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Scroll smoothly to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, keywords, canonical]);

  return null;
};

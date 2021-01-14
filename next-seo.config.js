const title = 'Linkfolders – Bookmark, Store, Organize, and Share links';
const description = 'All your links in one place';

const SEO = {
  title,
  description,
  canonical: 'https://linkfolders.com',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://linkfolders.com',
    title,
    description,
    images: [
      {
        url: 'https://linkfolders.com/og.png',
        alt: title,
        width: 1200,
        height: 627
      }
    ]
  }
};

export default SEO;

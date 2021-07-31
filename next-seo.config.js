const title = 'Linkfolders – Put multiple links in your Instagram bio';
const description = 'Put multiple links in your Instagram bio';

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

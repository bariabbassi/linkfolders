import { NextSeo } from 'next-seo';

const Page = ({ name, path, children }) => {
  const title = `Linkfolders – ${name}`;
  const url = `https://linkfolders.com${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title
        }}
      />
      {children}
    </>
  );
};

export default Page;

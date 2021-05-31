import { getLinkPreview } from 'link-preview-js';

// import { createLink } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { link } = req.query;
    const preview = await getLinkPreview(link.url).then((data) =>
      console.log(data)
    );
    // link.name = preview.title;
    // createLink(link);

    res.status(200).json({ link });
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { getFolder } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { folderId } = req.query;
    const { folder } = await getFolder(folderId);

    res.status(200).json({ folder });
  } catch (error) {
    res.status(500).json({ error });
  }
};

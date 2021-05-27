import { getFolderChildren } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { folderId } = req.query;
    const { children } = await getFolderChildren(folderId);

    res.status(200).json({ children });
  } catch (error) {
    res.status(500).json({ error });
  }
};

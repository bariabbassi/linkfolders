import { getProfile } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { profile } = await getProfile(id);

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};

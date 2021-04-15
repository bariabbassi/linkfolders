import { getUserUsername } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { username } = await getUserUsername(id);

    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error });
  }
};

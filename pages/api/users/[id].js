import { getUser } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { id } = req.query;
    const { user } = await getUser(id);

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

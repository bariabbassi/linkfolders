import { getProfileUsername } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { username } = req.query;
    const { profile } = await getProfileUsername(username);

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};

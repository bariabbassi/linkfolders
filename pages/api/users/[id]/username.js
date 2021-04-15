import { getUserUsername } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const { username } = await getUserUsername(id);
    console.log(username);

    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { getUsernameAvailability } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { username } = req.query;
    const available = await getUsernameAvailability(username);

    console.log('api', available);
    return res.status(200).json({ available });
  } catch (error) {
    res.status(500).json({ error });
  }
};

import { getUsername, getProfile } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const { username } = req.query;
    const { profile } = await getUsername(username).then((res) =>
      getProfile(res.uid)
    );

    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ error });
  }
};

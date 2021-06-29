// import { auth } from '@/lib/firebase-admin';
import { getUserLinks } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    // const { id } = await auth.verifyIdToken(req.headers.token);
    const { links } = await getUserLinks();

    res.status(200).json({ links });
  } catch (error) {
    res.status(500).json({ error });
  }
};

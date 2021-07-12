// import { auth } from '@/lib/firebase-admin';
import { getUserLinks } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
  try {
    // const { id } = await auth.verifyIdToken(req.headers.token);
    const { links } = await getUserLinks();

    res.status(200).json({ links });
  } catch (error) {
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method
        },
        response: {
          statusCode: res.statusCode
        }
      },
      error.message
    );

    res.status(500).json({ error });
  }
};

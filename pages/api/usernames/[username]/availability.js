import { getUsernameAvailability } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
  try {
    const { username } = req.query;
    const available = await getUsernameAvailability(username);

    return res.status(200).json({ available });
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

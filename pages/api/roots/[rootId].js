import { getRoot } from '@/lib/db-admin';
import { logger, formatObjectKeys } from '@/utils/logger';

export default async (req, res) => {
  try {
    const { rootId } = req.query;
    const { root } = await getRoot(rootId);

    res.status(200).json({ root });
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

import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { stream, send } = logflarePinoVercel({
  apiKey: process.env.NEXT_PUBLIC_LOGFLARE_API_KEY, //'zyw0No_2Zhwv', //process.env.NEXT_PUBLIC_LOGFLARE_KEY,
  sourceToken: process.env.NEXT_PUBLIC_LOGFLARE_SOURCE_TOKEN //'c4f1c0d8-4260-4b6d-ba4f-e6834fbaeeef' // process.env.NEXT_PUBLIC_LOGFLARE_STREAM
});

const logger = pino(
  {
    browser: {
      transmit: {
        send: send
      }
    },
    level: 'debug',
    base: {
      env: process.env.NODE_ENV || 'ENV not set',
      revision: process.env.VERCEL_GITHUB_COMMIT_SHA
    }
  },
  stream
);

const formatObjectKeys = (headers) => {
  const keyValues = {};

  Object.keys(headers).map((key) => {
    const newKey = key.replace(/-/g, '_');
    keyValues[newKey] = headers[key];
  });

  return keyValues;
};

export { logger, formatObjectKeys };

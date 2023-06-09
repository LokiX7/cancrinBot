import * as winston from 'winston';

export const winstonOptions = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),

    new winston.transports.File({
      filename: 'error.log',
      dirname: 'logs',
      level: 'error',
      format: winston.format.json(),
    }),

    new winston.transports.File({
      filename: 'info.log',
      dirname: 'logs',
      level: 'info',
      format: winston.format.json(),
    }),

    new winston.transports.File({
      filename: 'combined.log',
      dirname: 'logs',
      level: 'debug',
      format: winston.format.json(),
    }),
  ],
};

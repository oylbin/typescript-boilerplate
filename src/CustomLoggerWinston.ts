import winston from 'winston';
import fs from 'fs';
import path from 'path';
import { AbstractMyLoggerFactory, IMyLogger, MyLoggerConfig } from './loggerinterface';

export class MyLoggerImpl implements IMyLogger {
  private _logger: winston.Logger;
  constructor(config: MyLoggerConfig) {
    const transports = [];
    if (config.enableConsole) {
      transports.push(new winston.transports.Console());
    }
    if (config.enableFile) {
      if (!fs.existsSync(config.logDirectory)) {
        fs.mkdirSync(config.logDirectory, { recursive: true });
      }
      const filename = path.join(config.logDirectory, config.rootLogFile);
      transports.push(
        new winston.transports.File({
          filename: filename,
        }),
      );
    }
    this._logger = winston.createLogger({
      level: config.level,
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
        winston.format.json(),
        // myFormat,
      ),
      transports: transports,
    });
  }
  debug(message: any): void {
    this._logger.debug(message);
  }
  info(message: any): void {
    this._logger.info(message);
  }
  warn(message: any): void {
    this._logger.warn(message);
  }
  error(message: any): void {
    this._logger.error(message);
  }
  setLevel(level: string): void {
    this._logger.level = level;
  }
}

export class MyLoggerFactoryImpl implements AbstractMyLoggerFactory {
  private static _logger: IMyLogger | undefined;
  private static _config: MyLoggerConfig;
  static init(config: MyLoggerConfig): void {
    // eslint-disable-next-line no-console
    // console.log(config);
    this._config = config;
    this._logger = new MyLoggerImpl(config);
  }
  static getLogger(name: string | undefined = undefined): IMyLogger {
    // name is useless in this implementation
    if (name === undefined) {
      name = 'root';
    }
    return MyLoggerFactoryImpl._logger as IMyLogger;
  }
}

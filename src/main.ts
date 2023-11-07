import { MyLoggerFactoryImpl } from './CustomLoggerWinston';
import { MyLoggerConfig } from './loggerinterface';

const loggerConfig = {
  level: 'debug',
  logDirectory: './logs',
  rootLogFile: 'root.log',
  enableConsole: true,
  enableFile: true,
} as MyLoggerConfig;

MyLoggerFactoryImpl.init(loggerConfig);
const logger = MyLoggerFactoryImpl.getLogger();
logger.debug('debug message');

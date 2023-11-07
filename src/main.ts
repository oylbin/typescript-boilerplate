import { MyLoggerFactoryImpl } from './CustomLoggerWinston';
import { MyLoggerConfig } from './loggerinterface';
import MyConfig from './config';

const config = new MyConfig('./config.json');

const loggerConfig = {
  level: 'debug',
  logDirectory: config.getProp('log_directory'),
  rootLogFile: 'root.log',
  enableConsole: config.getProp('enable_console_log'),
  enableFile: config.getProp('enable_file_log'),
} as MyLoggerConfig;

MyLoggerFactoryImpl.init(loggerConfig);
const logger = MyLoggerFactoryImpl.getLogger();
logger.debug('debug message');

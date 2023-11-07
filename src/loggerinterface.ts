export interface MyLoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  logDirectory: string;
  rootLogFile: string;
  enableConsole: boolean;
  enableFile: boolean;
}
export interface MyLogger {
  debug(message: any): void;
  info(message: any): void;
  warn(message: any): void;
  error(message: any): void;
  setLevel(level: string): void;
}

export abstract class MyLoggerFactory {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static init(_config: MyLoggerConfig): void {
    throw new Error('Method not implemented.');
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static getLogger(name: string | undefined = undefined): MyLogger {
    throw new Error('Method not implemented.');
  }
}

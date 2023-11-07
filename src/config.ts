import * as fs from 'fs';

export interface ConfigProps {
  debug: boolean;
  log_directory: string;
  enable_file_log: boolean;
  enable_console_log: boolean;
}

class MyConfig {
  private configFilePath: string;

  private defaultConfig: ConfigProps = {
    debug: true,
    log_directory: './logs',
    enable_console_log: true,
    enable_file_log: true,
  };

  private config: ConfigProps;

  constructor(configFilePath: string) {
    this.configFilePath = configFilePath;
    this.config = { ...this.defaultConfig };
  }

  public load(): void {
    if (fs.existsSync(this.configFilePath)) {
      const data = fs.readFileSync(this.configFilePath, 'utf8');
      const loadedConfig = JSON.parse(data);
      this.config = { ...this.defaultConfig, ...loadedConfig };
    }
  }

  public save(): void {
    const data = JSON.stringify(this.config, null, 2);
    fs.writeFileSync(this.configFilePath, data);
  }

  // Step 2: Implement generic getProp and setProp methods
  public getProp<K extends keyof ConfigProps>(key: K): ConfigProps[K] {
    return this.config[key];
  }

  public setProp<K extends keyof ConfigProps>(key: K, value: ConfigProps[K]): void {
    this.config[key] = value;
  }

  public getAllConfigs(): ConfigProps {
    return this.config;
  }
}

export default MyConfig;

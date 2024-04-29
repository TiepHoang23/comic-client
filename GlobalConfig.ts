class GlobalConfig {
  public API_HOST: string | undefined;
  public USE_API: boolean;
  constructor() {
    this.USE_API = true;
    this.API_HOST = 'http://localhost:5080';
  }
}
let globalConfig = new GlobalConfig();
export default globalConfig;

class GlobalConfig {
  public API_HOST: string | undefined;
  public USE_API: boolean;
  public ADMIN_HOST: string;
  constructor() {
    this.USE_API = true;
    this.API_HOST = 'http://localhost:5080';
    this.ADMIN_HOST = 'http://localhost:5000';
  }
}
let globalConfig = new GlobalConfig();
export default globalConfig;

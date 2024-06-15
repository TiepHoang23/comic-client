class GlobalConfig {
  public API_HOST: string | undefined;
  public USE_API: boolean;
  public ADMIN_HOST: string;

  constructor() {
    this.USE_API = true;
    this.API_HOST = 'http://localhost:5080';
    this.ADMIN_HOST = 'http://localhost:5000';
  }

  public screens: any = {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '940px',
    xl: '1100px',
    '2xl': '1200px',
  }
  public GetScreenSize(type: string) {
    return Number(this.screens[type].replace('px', ''));
  }
}
let globalConfig = new GlobalConfig();
export default globalConfig;

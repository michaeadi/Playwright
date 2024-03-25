import { Page } from 'playwright';

export class LoginPage {
    private page: Page;
    private username: string;
    private password: string;
    private loginbutton: string;

    constructor(page: Page) {
        this.page = page;
        this.username = 'input[name="email"]';
        this.password = 'input[name="password"]';
        this.loginbutton = '//button[@name="Log In" and @type="submit"]';
    }

    async loginToApplication() 
    {
        await this.page.fill(this.username, "ExtAdmin1@te.com");
        await this.page.fill(this.password, "123456789");
        await this.page.click(this.loginbutton);
    }
}

export default LoginPage;

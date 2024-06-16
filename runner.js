import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

puppeteer.use(StealthPlugin());

export class Runner {
    /**
     * @param {import('puppeteer/lib/types').BrowserLaunchArgumentOptions} options
     */
    constructor(options = {}) {
        this.options = {
            headless: false,
            args: ['--window-size=1366,768'],
            ...options,
        };
    }

    async initialize() {
        this.browser = await puppeteer.launch(this.options);
    }

    /**
     * @param {function(import('puppeteer/lib/types').Browser): Promise<void>} callback
     */
    async execute(callback) {
        if (!this.browser) {
            await this.initialize();
        }

        try {
            await callback(this.browser);
        } catch (error) {
            console.error('Error during execution:', error);
            throw error;
        } finally {
            await this.close();
        }
    }

    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

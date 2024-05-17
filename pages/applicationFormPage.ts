import { Page, expect } from '@playwright/test';
import { User } from '../types/user.types';

export class ApplicationFormPage {
    private page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async fillForm(userData: User) {
        for (const [field, value] of Object.entries(userData)) {
            await this.page.fill(`input[name="${field}"]`, value);
        }
    }
    async uploadAvatar(filePath: string) {
        await this.page.setInputFiles('input[name="avatar"]', filePath);
    }
    async slideToMax() {
        const slider = this.page.locator('#slider-thumb');
        await slider.click();
        const boundingBox = await slider.boundingBox();

        if (boundingBox) {
            const sliderX = boundingBox.x + boundingBox.width / 2;
            const sliderY = boundingBox.y + boundingBox.height / 2;

            const sliderWidth = boundingBox.width;
            const dragDistance = sliderWidth * 5; // Adjust this value based on the slider's range

            // Perform the drag action
            await this.page.mouse.move(sliderX, sliderY);
            await this.page.mouse.down();
            await this.page.mouse.move(sliderX + dragDistance, sliderY, { steps: 10 });
            await this.page.mouse.up();
        } else {
            throw new Error('Slider bounding box is not found');
        }
    }
    async submit() {
        await this.page.click('input[type="submit"]');
    }
    async verifySubmission(url: string, headerText: string, firstName: string,
        lastName: string, email: string, ) {
        const userFullName = `${firstName} ${lastName}`;

        await expect(this.page.url()).toContain(url);
        await expect(this.page.locator('h1')).toContainText(headerText);
        await expect(this.page.locator(`text=${userFullName}`)).toBeVisible();
        await expect(this.page.locator(`text=${email}`)).toBeVisible();
    }

    async getUploadedAvatarFormat(pageForm: Page): Promise<string> {
        return await pageForm.getAttribute('ul > li > img', 'src');
    }
}

import {test, expect} from '@playwright/test';
import {
    firstUser,
    UserWithInvalidEmail,
    UserWithInvalidFields,
    UserWithMismatchedPasswords
} from "../data/user-details";
import playwrightConfig from "../playwright.config";
import {ApplicationFormPage} from "../pages/applicationFormPage";
import {invalidCaptcha, mismatchedPassword} from "../data/form-warning-notifications";

test.beforeEach(async ({ page }) => {
    await page.goto(playwrightConfig.use.baseURL);
});

test.describe('Validation of application form', () => {
    test('should verify the validation for the mismatched password', async ({page}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(UserWithMismatchedPasswords);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        await expect(page.getByText(mismatchedPassword)).toBeVisible();
    });

    test('should verify the form validity for the empty required fields', async ({page, context}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(UserWithInvalidFields);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        const isFormValid = await page.evaluate(() => {
            const form = document.querySelector('form');
            return form.checkValidity();
        });

        expect(isFormValid).toBe(false);
    });

    test('should verify the form validity for the invalid email format', async ({page, context}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(UserWithInvalidEmail);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        const isFormValid = await page.evaluate(() => {
            const form = document.querySelector('form');
            return form.checkValidity();
        });

        expect(isFormValid).toBe(false);
    });

    test('should verify the validation of the captcha', async ({page, context}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(firstUser);
        await applicationFormPage.submit();

        await expect(page.getByText(invalidCaptcha)).toBeVisible();
    });
});

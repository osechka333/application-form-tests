import {expect, test} from '@playwright/test';
import {firstUser, firstUserAvatar, secondUserAvatar, thirdUserAvatar} from "../data/user-details";
import playwrightConfig from "../playwright.config";
import {successSubmissionTitle, successSubmissionUrl} from "../data/form-details";
import {ApplicationFormPage} from "../pages/applicationFormPage";
import {fileFormats, invalidCaptcha, noAvatar} from "../data/form-warning-notifications";

test.beforeEach(async ({ page }) => {
    await page.goto(playwrightConfig.use.baseURL);
});

test.describe('Submit application form', () => {
    test('should verify the form inputs and submit', async ({page}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(firstUser);
        await applicationFormPage.uploadAvatar(firstUserAvatar);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        // Verify successful submission
        await applicationFormPage.verifySubmission(
            successSubmissionUrl,
            successSubmissionTitle,
            firstUser.first_name,
            firstUser.last_name,
            firstUser.email
        );
        expect(await applicationFormPage.getUploadedAvatarFormat(page)).toContain(fileFormats.Jpeg);
    });
    test('should verify the PNG file upload', async ({page}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(firstUser);
        await applicationFormPage.uploadAvatar(secondUserAvatar);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        expect(await applicationFormPage.getUploadedAvatarFormat(page)).toContain(fileFormats.Png);
    });

    test('should verify the invalid file format (GIF) upload', async ({page}) => {
        const applicationFormPage = new ApplicationFormPage(page);

        await applicationFormPage.fillForm(firstUser);
        await applicationFormPage.uploadAvatar(thirdUserAvatar);
        await applicationFormPage.slideToMax();
        await applicationFormPage.submit();

        await expect(page.getByText(noAvatar)).toBeVisible();
    });
});

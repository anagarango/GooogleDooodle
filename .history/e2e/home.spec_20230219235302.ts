import { test, expect, devices } from '@playwright/test'

let urlHome = "http://localhost:3000"

test.beforeAll(async () => {
    console.log('Before tests');
});

test.afterAll(async () => {
    console.log('After tests');
});


test.describe('iPad Air Testing', () => {
    test.use({viewport: { width: 820, height: 1180 }});

    test('The title tag', async({ page }) => {

        await page.goto(urlHome)

        await expect(page).toHaveTitle('Google Doodles');
    }),
    test('The input tag', async({ page }) => {

        await page.goto(urlHome)

        const inputTag = page.locator('input');
        await expect(inputTag).toHaveValue("1999")
    })
})

test.describe('iPhone XR Testing', () => {
    test.use({viewport: { width: 414, height: 896 }});

    test('Checking logo image width', async({page}) => {
        await page.goto(urlHome)

        const imageLogoTag = page.locator('#google');

        const grabbedWidth = await imageLogoTag.evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("width")
        })
        expect(grabbedWidth).toBe("250px");
    })

    test('Checking logo image src', async({page}) => {
        await page.goto(urlHome)

        const image = await page.waitForSelector('#google');

        expect(await image.getAttribute('src')).toContain('/google.svg');
    })
})

test.describe('Desktop Testing', () => {
    test.use({viewport: { width: 1280, height: 800 }});

    test('Number of p tags', async({ page }) => {
        await page.goto(urlHome)

        await expect(page.locator('div > div > p')).toHaveCount(2);
    })
})
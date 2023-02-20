import { test, expect } from '@playwright/test'

let urlSearch = "http://localhost:3000/search"

test.beforeAll(async () => {
    console.log('Before tests');
});

test.afterAll(async () => {
    console.log('After tests');
});



test.describe('iPad Air Testing', () => {
    test.use({viewport: { width: 820, height: 1180 }});

    test('Number of Italic tags', async({ page }) => {
        await page.goto(urlSearch)

        await expect(page.locator('h1 i')).toHaveCount(1);
    })

    test('Checking logo image src', async({page}) => {
        await page.goto(urlSearch)

        const image = await page.locator('.cursor-pointer');
        expect(await image.getAttribute('src')).toContain('/google.svg');
    })
})



test.describe('iPhone XR Testing', () => {
    test.use({viewport: { width: 414, height: 896 }});

    test('The input tag styling', async({ page }) => {

        await page.goto(urlSearch)

        // const inputTag = page.locator('input');
        const inputTag = page.locator('input[type="number"]')
        const grabbedWidth = await inputTag.evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("display")
        })
        expect(grabbedWidth).toBe("flex");
    })

    test('Check if input is visible', async({ page }) => {
        await page.goto(urlSearch)
    
        const input = page.locator('input');
        await expect(input).toBeVisible();
    })
})



test.describe('Desktop Testing', () => {
    test.use({viewport: { width: 1280, height: 800 }});

    test('Checking logo image styling', async({page}) => {
        await page.goto(urlSearch)

        const imageLogoTag = page.locator('.flex.flex-col.justify-center.items-center.h-screen.max-h-screen');

        const grabbedWidth = await imageLogoTag.evaluate((ele) => {
            return window.getComputedStyle(ele).getPropertyValue("display")
        })
        expect(grabbedWidth).toBe("flex");
    })


    test('The title tag', async({ page }) => {

        await page.goto(urlSearch)

        await expect(page).toHaveTitle('Google Doodles - Results');
    })
})
import { test, expect, chromium, firefox, webkit } from '@playwright/test';


test.describe('Sandbox Advanced Tests', () => {


    test('Dynamic Dropdown, Hidden Dropdown and Bootstrap Dropdown', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        //     await page.getByTestId('dynamic-group-select').selectOption('Locators')

        //     const isEnabled = await page.getByTestId('dynamic-option-select').isEnabled()

        //    if(isEnabled) {

        //     await page.getByTestId('dynamic-option-select').selectOption('getByRole + name')

        //     await expect(page.getByText('getByRole + name.')).toBeVisible()

        //    }

        //await page.getByTestId('hidden-dropdown-toggle-btn').click() // default visible

        // const isVisible = await page.getByTestId('hidden-dropdown-select').isVisible()
        // console.log(isVisible)

        // if (isVisible == false) {
        //     await page.getByTestId('hidden-dropdown-toggle-btn').click()
        // }

        // await page.getByTestId('hidden-dropdown-select').selectOption('Hidden - Core')

        await page.getByTestId('bootstrap-dropdown-trigger').click()

        await page.getByTestId('bootstrap-dropdown-menu').getByText('Weekday Batch').click()

        await expect(page.getByText('Bootstrap dropdown selected: Weekday Batch.')).toBeVisible()


    })



    test('Handling Alert popup', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // page.on('dialog', async dialog => {
        //     console.log(dialog.message())
        //     await dialog.accept()
        // })

        // await page.getByTestId('alert-btn').click()

        // await expect(page.getByText('Alert handled.')).toBeVisible()


        // page.on('dialog', async dialog => {
        //     console.log(dialog.message())
        //     await dialog.dismiss()
        // })

        // await page.getByTestId('confirm-btn').click()

        // await expect(page.getByText('Confirm dismissed.')).toBeVisible()


        page.on('dialog', async dialog => {
            console.log(dialog.message())
            await dialog.accept("playwright")
        })

        await page.getByTestId('prompt-btn').click()

        await expect(page.getByText('Prompt value: playwright')).toBeVisible()
    })



    test('Handling new page', async ({ }) => {

        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

       const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            page.getByTestId('popup-link').click()
        ])

        await expect(newPage.getByText('Popup Opened Successfully')).toBeVisible()

        const newPagetitle = await newPage.title()

        const pageTitle = await page.title()

        console.log('New Page Title:', newPagetitle)
        console.log('Original Page Title:', pageTitle)

        await newPage.waitForTimeout(5000)

        await page.bringToFront()

        await page.waitForTimeout(5000)

    })



    test.only('Open new page (direct click blocked', async()=> {

        const browser = await chromium.launch()
        const context = await browser.newContext()
        const page = await context.newPage()

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('popup-right-click-link').click()

        await expect(page.getByText('Direct click blocked. Use right click -> Open link in new tab.')).toBeVisible()

        const url = await page.getByTestId('popup-right-click-link').getAttribute('href')
        console.log('Popup URL:', url)

        const pageTwo = await context.newPage()

        await pageTwo.goto(`https://playwright-mastery-academy-app.vercel.app/${url}`)

        await expect(pageTwo.getByText('Popup Opened Successfully')).toBeVisible()

        await pageTwo.waitForTimeout(5000)

// href="/practice/popup?source=right-click"

    })


    test('File uploads', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('file-upload-input').setInputFiles('uploads/practice-data.csv')

        // await expect(page.getByText('practice-data.csv uploaded successfully.')).toBeVisible()


        await page.getByTestId('multi-file-upload-input').setInputFiles([
            'uploads/practice-data.csv',
            'uploads/practice-data.xml',
            'uploads/practice-notes.txt',
            'uploads/practice-report.pdf'
        ])

        await expect(page.getByText('4 files uploaded')).toBeVisible()
    })


    test('download file', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-csv-btn').click()
        ])

        const fileName =download.suggestedFilename()

        download.saveAs(`downloads/${fileName}`)



        async function downloadFile(locator: string) {
             const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId(locator).click()
        ])

        const fileName =download.suggestedFilename()

        download.saveAs(`downloads/${fileName}`)
        }

        downloadFile('download-csv-btn')
        downloadFile('pdf locator')
        downloadFile('text locator')

    })


    test('Handling Iframe', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const iframe = await page.frameLocator('[id="practice-iframe"]')

        await iframe.locator('[id="frame-input"]').fill('Playwright')

        await iframe.locator('[id="frame-save"]').click()

        await expect(iframe.locator('[id="frame-result"]')).toContainText('Playwright saved')

        //const childFrame = await iframe.frameLocator('[id=childFrame]')


    })


    test('shadow dom', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const shadow = await page.getByTestId('shadow-host')

        await shadow.locator('[id="shadow-input"]').fill('Playwright')

        await shadow.locator('[id="shadow-save"]').click()

        await expect(shadow.locator('[id="shadow-result"]')).toContainText('Playwright saved')

    })



    test('Practice date', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('practice-date-picker').type('01-11-1997')

        // await expect(page.getByText('Practice Date Selected: 1997-11-01')).toBeVisible()


         await page.getByTestId('practice-date-picker').fill('1997-11-01')

        await expect(page.getByText('Practice Date Selected: 1997-11-01')).toBeVisible()

    })


    test('interview date', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const interviewDate = await page.getByTestId('interview-date-picker')

        interviewDate.evaluate((dom, val) => {
            const html = dom as HTMLInputElement
            html.value = val as string

            html.dispatchEvent(new Event('input'))
            html.dispatchEvent(new Event('change'))

        }, '1997-11-01')

        await expect(page.getByText('nterview Date Selected: 1997-11-01')).toBeVisible()

    })



    test('Advanced wait commands', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        // await page.getByTestId('wait-navigation-link').click()

        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()

        await page.getByTestId('wait-response-btn').click()

        await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

        await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


    })


})
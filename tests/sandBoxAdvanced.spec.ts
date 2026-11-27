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

        const url = page.url()

        console.log('New Page Title:', newPagetitle)
        console.log('Original Page Title:', pageTitle)

        await newPage.waitForTimeout(5000)

        await page.bringToFront()

        await page.waitForTimeout(5000)

    })



    test.only('Open new page (direct click blocked', async () => {

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


    test('File uploads', async ({ page }) => {

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


    test('download file', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.getByTestId('download-csv-btn').click()
        ])

        const fileName = download.suggestedFilename()

        download.saveAs(`downloads/${fileName}`)



        async function downloadFile(locator: string) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.getByTestId(locator).click()
            ])

            const fileName = download.suggestedFilename()

            download.saveAs(`downloads/${fileName}`)
        }

        downloadFile('download-csv-btn')
        downloadFile('pdf locator')
        downloadFile('text locator')

    })


    test('Handling Iframe', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const iframe = await page.frameLocator('[id="practice-iframe"]')

        await iframe.locator('[id="frame-input"]').fill('Playwright')

        await iframe.locator('[id="frame-save"]').click()

        await expect(iframe.locator('[id="frame-result"]')).toContainText('Playwright saved')

        //const childFrame = await iframe.frameLocator('[id=childFrame]')


    })


    test('shadow dom', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        const shadow = await page.getByTestId('shadow-host')

        await shadow.locator('[id="shadow-input"]').fill('Playwright')

        await shadow.locator('[id="shadow-save"]').click()

        await expect(shadow.locator('[id="shadow-result"]')).toContainText('Playwright saved')

    })



    test('Practice date', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('practice-date-picker').type('01-11-1997')

        // await expect(page.getByText('Practice Date Selected: 1997-11-01')).toBeVisible()


        await page.getByTestId('practice-date-picker').fill('1997-11-01')

        await expect(page.getByText('Practice Date Selected: 1997-11-01')).toBeVisible()

    })


    test('interview date', async ({ page }) => {

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



    test('Advanced wait commands', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')


        // await page.getByTestId('wait-navigation-link').click()

        // await page.waitForURL('https://playwright-mastery-academy-app.vercel.app/practice/popup?source=waitfornavigation')

        // await expect(page.getByText('Popup Opened Successfully')).toBeVisible()

        // await page.getByTestId('wait-response-btn').click()

        // await page.waitForResponse('https://playwright-mastery-academy-app.vercel.app/api/practice/waits-status')

        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()


        // await page.getByTestId('wait-response-btn').click()

        // await page.getByText('Trigger API Response Completed').waitFor({state: 'visible'})

        // await expect(page.getByText('Trigger API Response Completed')).toBeVisible()

        // visible = element should be visible in UI, exists in DOM
        // hidden = locator should not be visible in UI, exists in DOM
        // attached = locator exists in DOM, may or may not be visible
        // detached = locator does not exist in DOM, should not be visible in UI

        // load - DOM load, images load - medium

        // await page.getByTestId('wait-loadstate-practice-load-btn').click()

        // await page.waitForLoadState('load')

        // await expect(page.getByText('Test load State: Completed')).toBeVisible()


        // domcontentloaded - DOM load - fast

        //  await page.getByTestId('wait-loadstate-practice-dom-btn').click()

        // await page.waitForLoadState('domcontentloaded')

        // await expect(page.getByText('Test DOMContentLoaded State: Completed')).toBeVisible()


        //networkidle = DOM load, images load, api call completed - slow

        await page.getByTestId('wait-loadstate-practice-networkidle-btn').click()

        await page.waitForLoadState('networkidle')

        await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()



    })


    test('mouse actions', async ({ page }) => {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // await page.getByTestId('mouse-downup-target').hover()

        // await page.mouse.down()

        // await expect(page.getByText('Mouse down detected.')).toBeVisible()

        // await page.mouse.up()

        // await expect(page.getByText('Mouse down + up detected.')).toBeVisible()


        // await page.getByTestId('mouse-rightclick-target').click({button: 'right'})

        // await expect(page.getByText('Right click detected on target.')).toBeVisible()


        // await page.getByTestId('mouse-wheel-target').hover()

        // await page.mouse.wheel(0, 300)

        // await expect(page.getByText('Mouse wheel scrolled down.')).toBeVisible()

        await page.getByTestId('mouse-wheel-target').scrollIntoViewIfNeeded()
    })



    test('force actions', async ({ page }) => {
        // avoid to use force actions unless absolutely necessary

        // attached DOM
        // visible
        // enabled
        // stable
        // not covered by another element

        // clicking wring element unintentionally

        await page.getByTestId('mouse-wheel-target').click({ force: true })

        // dblclick, hover, check, uncheck, fill, type, select, drag and drop
    })


    test('screenshots', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        await page.getByTestId('wait-response-btn').screenshot({ path: 'screenshots/button.png' })

        await page.screenshot({ path: 'screenshots/page.png', fullPage: true })

    })


    test('Advanced assertions - retry, non retry, negating', async ({ page }) => {


        // retry assestions - 5 secs

        // visiblity & state

        await expect(page.getByText('Test Network Idle State: Completed')).toBeVisible()
        await expect(page.getByText('Test Network Idle State: Completed')).toBeHidden()
        await expect(page.getByText('Test Network Idle State: Completed')).toBeEnabled()
        await expect(page.getByText('Test Network Idle State: Completed')).toBeDisabled()
        await expect(page.getByText('Test Network Idle State: Completed')).toBeEditable()
        await expect(page.getByText('Test Network Idle State: Completed')).toBeChecked()

        // text

        await expect(page.getByText('Test Network Idle State: Completed')).toHaveText('Test Network Idle State: Completed')
        await expect(page.getByText('Test Network Idle State: Completed')).toContainText('Test Network Idle State: Completed')
        await expect(page.getByText('Test Network Idle State: Completed')).toHaveValue('Test Network Idle State: Completed')
        await expect(page.getByText('Test Network Idle State: Completed')).toHaveAttribute('data-testid', 'mouse-wheel-target')
        await expect(page.getByText('Test Network Idle State: Completed')).toHaveClass('active')


        // page

        await expect(page).toHaveURL('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')
        await expect(page).toHaveTitle('Playwright Mastery Academy - Sandbox Advanced')



        // non retry assertions

        const num = 10

        expect(num).toBe(10)
        expect(num).toEqual(10)
        expect(num).toStrictEqual(10)

        expect(num).toBeGreaterThan(10)
        expect(num).toBeGreaterThanOrEqual(10)
        expect(num).toBeLessThan(10)
        expect(num).toBeLessThanOrEqual(10)


        const value = true

        expect(value).toBe(true)
        expect(value).toBeTruthy()
        expect(value).toBeFalsy()

        expect(value).toBeNull()
        expect(value).toBeUndefined()
        expect('a').toBeDefined()
        expect([10, 20, 30]).toContain(20)


        // negating assertions

        await expect(page.getByText('Test Network Idle State: Completed')).not.toHaveText('Test Network Idle State: Completed')

        expect(value).not.toBe(true)


    })



    test('Hard vs Soft assertions', async ({ page }) => {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect.soft(page.getByText('Single click completed playwright.')).toBeVisible()

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByTestId('double-click-status')).toContainText('Double click completed.')

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.locator('[role="tooltip"]')).toContainText('Tooltip verified')


    })


    test('drag and drop', async ({ page }) => {

        await page.goto('https://testpages.eviltester.com/pages/interaction/drag-drop/')


        await page.locator('[id="draggable1"]').dragTo(page.locator('[id="droppable1"]'))

         await page.locator('[id="draggable2"]').dragTo(page.locator('[id="droppable2"]'))

         await page.waitForTimeout(3000)

    })

})
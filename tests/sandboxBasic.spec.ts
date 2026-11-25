import { test, expect } from '@playwright/test'

test.describe('sandbox basic tests', async() => {


    test('Basic Element Handling', async({ page }) => {
        // browser launch -> context window -> page
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        await page.getByTestId('single-click-btn').click()

        await expect(page.getByText('Single click completed.')).toBeVisible()

        await page.getByTestId('double-click-btn').dblclick()

        await expect(page.getByTestId('double-click-status')).toContainText('Double click completed.')

        await page.getByTestId('hover-btn').hover()

        await expect(page.getByText('Hover triggered successfully.')).toBeVisible()

        await page.getByTestId('tooltip-trigger-btn').hover()

        await expect(page.locator('[role="tooltip"]')).toContainText('Tooltip verified')
    })


    test('Inputs, Checkbox, Radio, Dropdown', async({page})=> {
        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        const name = "playwright"

        const email = "playwright@example.com"

        const dropdownOption = "Playwright Core"

        await page.getByTestId('name-input').fill(name)

        await page.getByTestId('email-input').type(email)

        await page.getByTestId('track-select').selectOption(dropdownOption)

        await page.getByTestId('remember-checkbox').check() // uncheck

        await page.getByTestId('mode-api-radio').check()

        await page.getByTestId('submit-form-btn').click()

        await expect(page.getByText(`${name} submitted (${email}) for ${dropdownOption}.`)).toBeVisible()

    })


    test('Static wait, keyboard', async({page})=> {


        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        // await page.getByTestId('async-load-btn').click()

        // await page.waitForTimeout(20000) // 20 secs

        // await expect(page.getByText('Async result loaded successfully.')).toBeVisible()


        await page.getByTestId('keyboard-input').fill('playwright')

        await page.getByTestId('keyboard-input').press('Enter')

        // Tab, Escape, Backspace, Delete, ArrowUp, ArrowDown, ArrowLeft, ArrowRight,
        // A to Z, 1 to 0
        // Control+C, Control+V, Control+X, Control+A
        // Shift+A

        await expect(page.getByText('Command submitted: playwright')).toBeVisible()

    })


    test('Text and Attribute Extraction', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        // const innerText =  await page.getByTestId('extract-textcontent-target').innerText()

        // console.log("innerText==>"+ innerText)


        // const textContent =  await page.getByTestId('extract-textcontent-target').textContent()

        // console.log("textContent==>"+ textContent)


        // const value = await page.getByTestId('extract-inputvalue-target').inputValue()

        // console.log("value==>"+ value)

        // const attr = await page.getByTestId('extract-attribute-target').getAttribute('class')
        // console.log("attr==>"+ attr)

        // const allInnerTexts = await page.getByTestId('extract-list').allInnerTexts()
        // console.log("allInnerTexts==>"+ allInnerTexts)


        // const allTextContents = await page.getByTestId('extract-list').allTextContents()
        // console.log(allTextContents)

        const html =  await page.getByTestId('extract-list').innerHTML()
        console.log("html==>"+ html)

    })



    test('Conditional Handling isChecked, isEditable', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-basic')

        // await page.getByTestId('remember-checkbox').check()

        // const isChecked = await page.getByTestId('remember-checkbox').isChecked()
        // console.log("isChecked==>"+ isChecked)

        // if(isChecked == false) {
        //     console.log("inside if block")
        //     await page.getByTestId('remember-checkbox').check()
        // }


        const isEditable = await page.getByTestId('name-input').isEditable()
        console.log("isEditable==>"+ isEditable)


    })



    test('Conditional Handling isVisible, isHidden, isDisabled', async({page})=> {

        await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced')

        // const isVisible = await page.getByTestId('dynamic-group-select').isVisible()
        // console.log("isVisible==>"+ isVisible)

        // const isDisabled = await page.getByTestId('dynamic-option-select').isDisabled()
        // console.log("isDisabled==>"+ isDisabled)

        // const isEnabled = await page.getByTestId('dynamic-option-select').isEnabled()
        // console.log("isEnabled==>"+ isEnabled)

        const isHidden = await page.getByTestId('hidden-dropdown-select').isHidden()
        console.log("isHidden==>"+ isHidden)



    })




    
})
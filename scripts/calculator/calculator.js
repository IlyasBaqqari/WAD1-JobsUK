import {
    calculateFromHourlyPay,
    calculateFromMonthlyPay,
    calculateFromWeeklyPay,
    calculateFromYearlyPay,
    formatCurrency
} from './helper.js';
import { ResultCardContent } from '../../components/calculatorResultCard.js';

// Define global variables
let lastResultId = 0;
let resultCount = 0;

// Get pages form and add event listener
const form = document.forms['calculator'];
form.addEventListener('submit', calculator);

/**
 * Calculates and displays pay values based on form input.
 * @param event
 */
function calculator(event) {
    event.preventDefault();
    const { jobTitle, enteredPay, timeFrame, hoursPerWeek } = getFormData();
    const wage = calculatePay(enteredPay, timeFrame, hoursPerWeek);

    // Format entered pay value to be displayed
    let formattedEnteredPay = formatCurrency(enteredPay);

    const resultData = {
        jobTitle,
        hoursPerWeek,
        enteredPay: formattedEnteredPay,
        timeFrame,
        wage
    }

    displayResult(resultData);
}

/**
 * Calculates and returns wage values for each time frame.
 * @param pay
 * @param timeFrame
 * @param hoursPerWeek
 * @returns {{monthly: number, hourly, yearly: number, weekly: number}}
 */
function calculatePay(pay, timeFrame, hoursPerWeek) {
    let wage;
    switch (timeFrame) {
        case 'hour':
            wage = calculateFromHourlyPay(pay, hoursPerWeek);
            break;
        case 'week':
            wage = calculateFromWeeklyPay(pay, hoursPerWeek);
            break;
        case 'month':
            wage = calculateFromMonthlyPay(pay, hoursPerWeek);
            break;
        case 'year':
            wage = calculateFromYearlyPay(pay, hoursPerWeek);
            break;
    }
    return wage;
}

/**
 * Displays calculation results on the page.
 * @param data
 */
function displayResult(data) {
    // Create result card
    const id = lastResultId;
    const result = document.createElement('div');
    result.setAttribute('id', `result-${id}`);
    result.setAttribute('class', 'result card');
    result.innerHTML = ResultCardContent(id);

    // Fill in results data
    result.querySelector(`#job-title-result-${id}`).textContent = data.jobTitle;
    result.querySelector(`#hours-per-week-result-${id}`).textContent = data.hoursPerWeek
    result.querySelector(`#pay-result-${id}`).textContent = '£' + data.enteredPay;
    result.querySelector(`#time-frame-result-${id}`).textContent = data.timeFrame
    result.querySelector(`#hourly-result-${id}`).textContent = '£' + data.wage.hourly;
    result.querySelector(`#weekly-result-${id}`).textContent = '£' + data.wage.weekly;
    result.querySelector(`#monthly-result-${id}`).textContent = '£' + data.wage.monthly;
    result.querySelector(`#yearly-result-${id}`).textContent = '£' + data.wage.yearly;

    result.querySelector(`#delete-button-${id}`).addEventListener('click', deleteResult);
    result.querySelector(`#vacancy-search-button-${id}`).addEventListener('click', vacancySearch);


    // Add result to page
    document.getElementById('calculator-results-area').appendChild(result);
    document.getElementById('calculator-results-area').style.display = 'inherit';
    lastResultId += 1;
    resultCount += 1;
}

/**
 * Function triggered by event listener that deletes an associated calculator result.
 * @param e
 */
function deleteResult(e) {
    const id = e.target.parentElement.parentElement.id;
    document.getElementById(id).remove();
    resultCount -= 1;

    if (resultCount === 0) {
        document.getElementById('calculator-results-area').style.display = 'none';
    }
}

/**
 * Function triggered by an event listener that searches for vacancies using the job title of its associated calculator
 * result.
 * @param e
 */
function vacancySearch(e) {
    // Get job title
    const id = e.target.parentElement.id;
    const jobTitle = document.getElementById(id).children[0].children[0].children[0].textContent;

    // Search vacancies
    window.open(`./vacancies.html?search=${jobTitle}`, '_blank');
}

/**
 * Reads pages form data and returns object of its values
 * @returns {{hoursPerWeek: *, jobTitle: *, pay: *, timeFrame: *}}
 */
const getFormData = () => ({
    jobTitle: form['job-title']?.value,
    enteredPay: parseFloat(form['pay']?.value),
    timeFrame: form['time-frame']?.value,
    hoursPerWeek: parseFloat(form['hours-per-week']?.value)
});
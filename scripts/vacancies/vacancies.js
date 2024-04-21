import { ResultCardContent } from '../../components/searchResultCard.js';

// Get form and add event listener
const form = document.forms['vacancy-search'];
form.addEventListener('submit', searchVacancies);

// Define API URLs
const VACANCIES_API_URL = 'https:///api.lmiforall.org.uk/api/v1/vacancies/search?limit=10&keywords=';
const ROLE_INFORMATION_API_URL = 'https://api.lmiforall.org.uk/api/v1/soc/search?q=';

// Define global variable
let searchTermUsed = false;

// Set search bar placeholder text
const exampleJobs = [
    'Teacher...',
    'Administrator...',
    'Graphic Designer...',
    'Manager...',
    'Data Analyst...',
    'Accountant...',
    'Project Manager...',
    'Software Engineer...',
    'Consultant...',
];
form['job-title'].setAttribute('placeholder', exampleJobs[Math.floor(Math.random() * 8)]);

// Display loading text
const searchResultsArea = document.getElementById('search-results-area');
searchResultsArea.innerHTML = '<p>Getting vacancies...</p>';

// Perform initial search on page load
initialSearch();

/**
 * Performs an initial request against the API, using a search term if one is provided as a query parameter.
 */
function initialSearch() {
    // Get query parameter 'search'
    const urlParams = new URLSearchParams(window.location.search);
    const jobTitle = urlParams.get('search');

    // If parameter exists, search using term, else get recent results
    if (jobTitle) {
        form['job-title'].setAttribute('value', jobTitle);
        getVacancies(VACANCIES_API_URL + encodeURIComponent(jobTitle));
        searchTermUsed = true;
    } else getVacancies(VACANCIES_API_URL);
}

/**
 * Performs a request against the API, using a search term if one was entered.
 * @param event
 */
function searchVacancies(event) {
    event.preventDefault();

    // Create requestUrl
    const jobTitle = form['job-title'].value;
    const requestUrl = VACANCIES_API_URL + encodeURIComponent(jobTitle);

    // Determine if a search term was used
    searchTermUsed = !!jobTitle.length;

    // Call API
    getVacancies(requestUrl);
}

/**
 * Performs an API call to the vacancies endpoint using a provided URL.
 * @param url
 */
function getVacancies(url) {
    // Call API
    fetch(url)
        .then(response => {
            if (response.status !== 200) {
                alert('An error occurred trying to find vacancies. Please try again later.');
                throw new Error('Get vacancies failed');
            }
            response.json().then(vacancies => {
                getRoleInformation(vacancies.slice(0, 10));
            });
        });
}

/**
 * Performs a second API call to the SOC endpoint to get details on job listings, then passes data to be displayed.
 * @param vacancies
 */
function getRoleInformation(vacancies) {
    // Display search description
    searchResultsArea.innerHTML = '';
    const searchDescription = document.createElement('p');
    searchDescription.textContent = (searchTermUsed)
        ? `Showing results for "${form['job-title'].value}"`
        : 'Showing most recent vacancies';
    searchResultsArea.appendChild(searchDescription);

    vacancies.forEach(vacancy => {
        // Create requestUrl
        const requestUrl = ROLE_INFORMATION_API_URL + encodeURIComponent(vacancy.title)

        // Get role information
        fetch(requestUrl)
            .then(response => {
                if (response.status !== 200) {
                    alert('An error occurred trying to find get vacancy information. Please try again later.');
                    throw new Error('Get role information failed');
                }
                response.json().then(roleInformation => {
                    vacancy.roleDescription = roleInformation[0].description;
                    vacancy.tasks = roleInformation[0].tasks;

                    displayResults(vacancy);
                });
            });
    });
}

/**
 * Displays a provided vacancy result on the page.
 * @param vacancy
 */
function displayResults(vacancy) {
    const result = document.createElement('div');
    result.setAttribute('id', `${vacancy.id}`);
    result.setAttribute('class', 'result card');

    result.innerHTML = ResultCardContent(vacancy);
    result.querySelector('.button-link-dark').addEventListener('click', toggleDetails);

    searchResultsArea.appendChild(result);
}

/**
 * Function triggered by event listener that toggles whether details for a vacancy are displayed or not.
 * @param e
 */
function toggleDetails(e) {
    const id = e.target.parentElement.parentElement.id;
    const details = document.getElementById(`result-details-${id}`);

    switch (getComputedStyle(details).display) {
        case 'none':
            details.style.display = 'block';
            e.target.textContent = 'Hide';
            break;
        case 'block':
            details.style.display = 'none';
            e.target.textContent = 'Details';
            break;
    }
}




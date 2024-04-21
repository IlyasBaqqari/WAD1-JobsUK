export const ResultCardContent = id => (`
    <div class="heading-area">
        <h2>Job: <b id="job-title-result-${id}">Example Job</b></h2>
        <button id="delete-button-${id}" class="button-link-dark">Delete</button>
    </div>
    <p>Working <b id="hours-per-week-result-${id}">20</b> hours a week for <b id="pay-result-${id}">£299</b> per
    <b id="time-frame-result-${id}">year</b> breaks down into: </p>
    
    <table class="summary-list">
        <tbody>
        <tr>
            <td id="hourly-result-${id}" class="value">£20</td>
            <td>per hour</td>
        </tr>
        <tr>
            <td id="weekly-result-${id}" class="value">£140</td>
            <td>per week</td>
        </tr>
        <tr>
            <td id="monthly-result-${id}" class="value">£4340</td>
            <td>per month</td>
        </tr>
        <tr>
            <td id="yearly-result-${id}" class="value">£49230</td>
            <td>per year</td>
        </tr>
        </tbody>
    </table>
   
    <button id="vacancy-search-button-${id}" class="button-link-dark">Search vacancies for this job</button>
`);
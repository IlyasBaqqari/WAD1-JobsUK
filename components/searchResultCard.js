export const ResultCardContent = job => (`
    <div class="heading-area">
        <h2><b>${job.title || 'Untitled Job Listing'}</b></h2>
        <button class="button-link-dark">Details</button>
    </div>
    <div id="result-details-${job.id}" class="details-area">
        <div class="key-value">
            <p>Company</p>
            <p><b>${job.company || 'Company not specified.'}</b></p>
        </div>
        <div class="key-value">
            <p>Location</p>
            <p><b>${job.location?.location || 'Location not specified.'}</b></p>
        </div>
        <div class="key-value">
            <h3>Job summary</h3>
            <p class="value-long-text">${job.summary || 'No summary provided.'}</p>
        </div>
        <div class="key-value">
            <h3>General role description</h3>
            <p class="value-long-text">${job.roleDescription || 'No description is available for this role.'}</p>
        </div>
        <div class="key-value">
            <h3>Tasks involved</h3>
            <p class="value-long-text">${job.tasks || 'No description of tasks is available for this role.'}</p>
        </div>
        <a href=${job.link} class="button-link-dark">View original listing</a>
    </div>
`);
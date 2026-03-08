console.log("Job Portal Loaded");

const API_URL = "http://localhost:9090/jobs";

window.onload = function () {
    loadJobs();
};

function loadJobs() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            const container = document.getElementById("jobsContainer");

            container.innerHTML = "";

            data.forEach(job => {

                const jobCard = `
                <div class="job-card">

                    <h3>${job.title}</h3>

                    <p>Company: ${job.company}</p>
                    <p>Location: ${job.location}</p>
                    <p>Salary: ${job.salary}</p>

                    <button class="btn" onclick="applyJob(${job.id})">
                        Apply
                    </button>

                    <button class="save-btn" onclick="saveJob('${job.title}')">
                        Save
                    </button>

                </div>
                `;

                container.innerHTML += jobCard;

            });

        })
        .catch(error => {
            console.error("Error loading jobs:", error);
        });

}

function saveJob(jobName) {
    alert(jobName + " saved!");
}

function applyJob(jobId) {
    window.location.href = "apply.html?jobId=" + jobId;
}
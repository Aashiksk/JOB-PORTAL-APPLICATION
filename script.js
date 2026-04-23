const API_URL = "http://localhost:9090/jobs";

async function loadJobs() {
    try {
        const response = await fetch(API_URL);
        const jobs = await response.json();

        const container = document.getElementById("jobsContainer");
        container.innerHTML = "";

        jobs.forEach(job => {
            const jobCard = `
                <div class="job-card">
                    <h3>${job.title}</h3>
                    <p>Company: ${job.company}</p>
                    <p>Location: ${job.location}</p>

                    <button class="btn" onclick="applyJob(${job.id})">Apply</button>
                    <button class="save-btn" onclick="saveJob('${job.title}')">Save</button>
                    <button class="btn" onclick="deleteJob(${job.id})">Delete</button>
                    <button class="btn" onclick="editJob(${job.id}, '${job.title}', '${job.company}', '${job.location}')">Edit</button>
                </div>
            `;

            container.innerHTML += jobCard;
        });

    } catch (error) {
        console.error("Error loading jobs:", error);
    }
}

// Call function when page loads
loadJobs();

function applyJob(id) {
    alert("Apply for Job ID: " + id);
}

async function addJob(event) {
    event.preventDefault();

    const job = {
        title: document.getElementById("title").value,
        company: document.getElementById("company").value,
        location: document.getElementById("location").value
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(job)
        });

        if (response.ok) {
            alert("Job Added Successfully ✅");
        } else {
            alert("Error adding job ❌");
        }

    } catch (error) {
        console.error(error);
    }
}

// delete jobs
async function deleteJob(id) {
    try {
        const response = await fetch(`http://localhost:9090/jobs/${id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("Job Deleted ✅");
            loadJobs(); // refresh list
        } else {
            alert("Error deleting job ❌");
        }

    } catch (error) {
        console.error(error);
    }
}

// edit jobs
function editJob(id, title, company, location) {
    const newTitle = prompt("Enter new title:", title);
    const newCompany = prompt("Enter new company:", company);
    const newLocation = prompt("Enter new location:", location);

    if (newTitle && newCompany && newLocation) {
        updateJob(id, newTitle, newCompany, newLocation);
    }
}

// update jobs
async function updateJob(id, title, company, location) {
    try {
        const response = await fetch(`http://localhost:9090/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                company: company,
                location: location
            })
        });

        if (response.ok) {
            alert("Job Updated ✅");
            loadJobs(); // refresh list
        } else {
            alert("Error updating job ❌");
        }

    } catch (error) {
        console.error(error);
    }
}

// REGISTER
async function registerUser(event) {
    event.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("http://localhost:9090/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    alert(await res.text());
    if (msg === "User Registered Successfully") {
        window.location.href = "login.html";
    }
}

// LOGIN
async function loginUser(event) {
    event.preventDefault();

    const data = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    const res = await fetch("http://localhost:9090/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const msg = await res.text();
    alert(msg);

    if (msg === "Login Successful") {
        window.location.href = "dashboard.html";
    }
}
// Footer
const footer = document.querySelector("footer");

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.textContent = `© Jennifer Hoang ${thisYear}`;

footer.appendChild(copyright);

// Skills Section
const skills = [
    "SQL",
    "Python",
    "JavaScript",
    "HTML",
    "CSS",
    "Google Sheets",
    "Microsoft Excel",
    "Data Analytics",
    "Business Intelligence",
    "Data Visualization",
    "Process Optimization",
    "Dashboard Reporting",
    "Cross-Team Communication",
    "Documentation & Reporting"
];

const skillsSection = document.querySelector("#skills");

if (skillsSection) {
    const skillsList = skillsSection.querySelector("ul");

    for (let i = 0; i < skills.length; i++) {
        const skill = document.createElement("li");

        skill.textContent = skills[i];

        skillsList.appendChild(skill);
    }
}

// Leave a Message Form
const messageForm = document.querySelector('form[name="leave_message"]');

if (messageForm) {
    messageForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const usersName = event.target.usersName.value;
        const usersEmail = event.target.usersEmail.value;
        const usersMessage = event.target.usersMessage.value;

        const messageSection = document.querySelector("#messages");
        const messageList = messageSection.querySelector("ul");

        const newMessage = document.createElement("li");

        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">
                ${usersName}
            </a>

            <span>
                ${usersMessage}
            </span>
        `;

        const removeButton = document.createElement("button");

        removeButton.textContent = "Remove";
        removeButton.type = "button";

        removeButton.addEventListener("click", function () {
            const entry = removeButton.parentNode;
            entry.remove();
        });

        newMessage.appendChild(removeButton);
        messageList.appendChild(newMessage);

        messageForm.reset();
    });
}

// GitHub Repositories / Projects
fetch("https://api.github.com/users/jenferno/repos")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("GitHub request failed.");
        }

        return response.json();
    })
    .then(function (repositories) {
        console.log(repositories);

        const projectSection = document.querySelector("#Projects");
        const projectList = projectSection.querySelector("ul");

        for (let i = 0; i < repositories.length; i++) {

            if (repositories[i].name === "jennifer-hoang-spring26") {
                continue;
            }

            const project = document.createElement("li");

            project.innerHTML = `
                <a href="${repositories[i].html_url}"
                   target="_blank"
                   rel="noopener noreferrer">
                    ${repositories[i].name}
                </a>
            `;

            projectList.appendChild(project);
        }
    })
    .catch(function (error) {
        console.error("Error fetching repositories:", error);

        const projectSection = document.querySelector("#Projects");

        if (projectSection) {
            projectSection.innerHTML +=
                "<p>Unable to load GitHub repositories at this time.</p>";
        }
    });
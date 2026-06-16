const body = document.querySelector("body");

const footer = document.querySelector("footer");

const today = new Date();

const thisYear = today.getFullYear();

const copyright = document.createElement("p");

copyright.innerText = `© Jennifer Hoang ${thisYear}`;

footer.appendChild(copyright);

body.appendChild(footer);

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

const skillsList = skillsSection.querySelector("ul");

for (let i = 0; i < skills.length; i++) {

    const skill = document.createElement("li");

    skill.innerText = skills[i];

    skillsList.appendChild(skill);
}

const messageForm =
    document.querySelector(
        'form[name="leave_message"]'
    );

messageForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const usersName =
            event.target.usersName.value;

        const usersEmail =
            event.target.usersEmail.value;

        const usersMessage =
            event.target.usersMessage.value;

        console.log(usersName);
        console.log(usersEmail);
        console.log(usersMessage);

        const messageSection =
        document.querySelector("#messages");

        const messageList =
        messageSection.querySelector("ul");

        const newMessage =
        document.createElement("li");

        newMessage.innerHTML = `
            <a href="mailto:${usersEmail}">
                ${usersName}
            </a>
            <span>
                ${usersMessage}
            </span>
        `;

        const removeButton =
         document.createElement("button");

        removeButton.innerText = "Remove";

        removeButton.type = "button";

        removeButton.addEventListener(
            "click",
            function () {

             const entry =
                    removeButton.parentNode;

             entry.remove();
         }
        );

        newMessage.appendChild(removeButton);

        messageList.appendChild(newMessage);

        messageForm.reset();
    }
);

fetch("https://api.github.com/users/jenferno/repos")
    .then(function (response) {
        return response.json();
    })
    .then(function (repositories) {
        console.log(repositories);

        const projectSection = document.querySelector("#Projects");
        const projectList = projectSection.querySelector("ul");

        for (let i = 0; i < repositories.length; i++) {
            const project = document.createElement("li");

            project.innerText = repositories[i].name;

            projectList.appendChild(project);
        }
    })
    .catch(function (error) {
        console.error("Error fetching repositories:", error);
    });
const body = document.querySelector("body");

const footer = document.createElement("footer");

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
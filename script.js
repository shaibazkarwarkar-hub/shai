/* =========================================================
   PORTFOLIO WEBSITE
   Data source: database.json
   ========================================================= */


// ---------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------

function getElement(id) {
    return document.getElementById(id);
}


function createElement(tag, className, text = "") {
    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}


// ---------------------------------------------------------
// Load JSON Database
// ---------------------------------------------------------

async function loadPortfolio() {

    try {

        const response = await fetch("database.json");

        if (!response.ok) {
            throw new Error("Could not load database.json");
        }

        const data = await response.json();

        renderPortfolio(data);

    } catch (error) {

        console.error(error);

        document.querySelector("main").innerHTML = `
            <section class="section">
                <div class="container">
                    <div class="error-message">
                        <strong>Unable to load portfolio data.</strong>
                        <p>
                            Make sure database.json exists and that you are
                            running the website through a local server.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }
}


// ---------------------------------------------------------
// Main Render Function
// ---------------------------------------------------------

function renderPortfolio(data) {

    renderPersonal(data.personal);

    renderAbout(data.about);

    renderEducation(data.education);

    renderSkills(data.skills);

    renderProjects(data.projects);

    renderExperience(data.experience);

    renderCertifications(data.certifications);

    renderAchievements(data.achievements);

    renderInterests(data.interests);

    setupNavigation();

    getElement("current-year").textContent =
        new Date().getFullYear();
}


// ---------------------------------------------------------
// Personal Information
// ---------------------------------------------------------

function renderPersonal(personal) {

    const name = personal.name || "Your Name";

    getElement("nav-name").textContent = name;

    getElement("hero-name").textContent = name;

    getElement("hero-title").textContent =
        personal.title || "Student";

    getElement("hero-tagline").textContent =
        personal.tagline || "";

    getElement("hero-location").textContent =
        personal.location || "";

    getElement("footer-name").textContent = name;

    document.title = `${name} | Portfolio`;


    // -----------------------------------------------------
    // Generate initials
    // -----------------------------------------------------

    const initials = name
        .split(" ")
        .filter(word => word.length > 0)
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    getElement("profile-initials").textContent =
        initials || "YN";


    // -----------------------------------------------------
    // Profile Image
    // -----------------------------------------------------

    const profileImage = personal.profileImage;

    if (profileImage && profileImage.trim() !== "") {

        const profileElement = getElement("profile-image");

        profileElement.style.backgroundImage =
            `url("${profileImage}")`;

        profileElement.classList.add("has-image");
    }


    // -----------------------------------------------------
    // Contact Links
    // -----------------------------------------------------

    const emailLink = getElement("email-link");

    if (personal.email) {

        emailLink.href = `mailto:${personal.email}`;

        emailLink.textContent =
            `✉ ${personal.email}`;
    }


    const linkedinLink = getElement("linkedin-link");

    if (personal.linkedin && personal.linkedin !== "#") {

        linkedinLink.href = personal.linkedin;

    } else {

        linkedinLink.style.display = "none";
    }


    const githubLink = getElement("github-link");

    if (personal.github && personal.github !== "#") {

        githubLink.href = personal.github;

    } else {

        githubLink.style.display = "none";
    }
}


// ---------------------------------------------------------
// About
// ---------------------------------------------------------

function renderAbout(about) {

    if (!about) return;

    getElement("about-heading").textContent =
        about.heading || "About Me";

    getElement("about-description").textContent =
        about.description || "";
}


// ---------------------------------------------------------
// Education
// ---------------------------------------------------------

function renderEducation(education) {

    const container = getElement("education-list");

    container.innerHTML = "";

    if (!education || education.length === 0) {

        container.innerHTML =
            "<p>No education information available.</p>";

        return;
    }


    education.forEach(item => {

        const article = createElement(
            "article",
            "timeline-item"
        );

        const dot = createElement(
            "div",
            "timeline-dot"
        );

        const duration = createElement(
            "div",
            "timeline-duration",
            item.duration || ""
        );

        const title = createElement(
            "h3",
            "",
            item.degree || ""
        );

        const institution = createElement(
            "p",
            "timeline-institution",
            `${item.institution || ""} ${
                item.location ? "• " + item.location : ""
            }`
        );

        const description = createElement(
            "p",
            "",
            item.description || ""
        );

        article.appendChild(dot);
        article.appendChild(duration);
        article.appendChild(title);
        article.appendChild(institution);
        article.appendChild(description);

        container.appendChild(article);
    });
}


// ---------------------------------------------------------
// Skills
// ---------------------------------------------------------

function renderSkills(skills) {

    if (!skills) return;

    renderSkillCategory(
        skills.business,
        "business-skills"
    );

    renderSkillCategory(
        skills.technical,
        "technical-skills"
    );

    renderSkillCategory(
        skills.soft,
        "soft-skills"
    );
}


function renderSkillCategory(skills, containerId) {

    const container = getElement(containerId);

    container.innerHTML = "";

    if (!skills) return;

    skills.forEach(skill => {

        const tag = createElement(
            "span",
            "skill-tag",
            skill
        );

        container.appendChild(tag);
    });
}


// ---------------------------------------------------------
// Projects
// ---------------------------------------------------------

function renderProjects(projects) {

    const container = getElement("projects-list");

    container.innerHTML = "";

    if (!projects || projects.length === 0) {

        container.innerHTML =
            "<p>No projects added yet.</p>";

        return;
    }


    projects.forEach(project => {

        const card = createElement(
            "article",
            "project-card"
        );


        // Date

        const date = createElement(
            "div",
            "project-date",
            project.date || ""
        );


        // Title

        const title = createElement(
            "h3",
            "",
            project.title || ""
        );


        // Description

        const description = createElement(
            "p",
            "",
            project.description || ""
        );


        // Technologies

        const technologies = createElement(
            "div",
            "project-technologies"
        );


        if (project.technologies) {

            project.technologies.forEach(technology => {

                const tech = createElement(
                    "span",
                    "project-tech",
                    technology
                );

                technologies.appendChild(tech);
            });
        }


        // Link

        const link = createElement(
            "a",
            "project-link",
            "View Project →"
        );

        link.href = project.link || "#";

        if (
            project.link &&
            project.link !== "#"
        ) {
            link.target = "_blank";
            link.rel = "noopener";
        }


        card.appendChild(date);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(technologies);
        card.appendChild(link);

        container.appendChild(card);
    });
}


// ---------------------------------------------------------
// Experience
// ---------------------------------------------------------

function renderExperience(experience) {

    const container = getElement("experience-list");

    container.innerHTML = "";

    if (!experience || experience.length === 0) {

        container.innerHTML =
            "<p>No experience information available.</p>";

        return;
    }


    experience.forEach(item => {

        const card = createElement(
            "article",
            "experience-card"
        );

        const duration = createElement(
            "div",
            "duration",
            item.duration || ""
        );

        const role = createElement(
            "h3",
            "",
            item.role || ""
        );

        const organization = createElement(
            "div",
            "organization",
            item.organization || ""
        );

        const description = createElement(
            "p",
            "",
            item.description || ""
        );

        card.appendChild(duration);
        card.appendChild(role);
        card.appendChild(organization);
        card.appendChild(description);

        container.appendChild(card);
    });
}


// ---------------------------------------------------------
// Certifications
// ---------------------------------------------------------

function renderCertifications(certifications) {

    const container = getElement(
        "certifications-list"
    );

    container.innerHTML = "";

    if (
        !certifications ||
        certifications.length === 0
    ) {
        container.innerHTML =
            "<p>No certifications added yet.</p>";

        return;
    }


    certifications.forEach(item => {

        const card = createElement(
            "article",
            "certification-card"
        );

        const title = createElement(
            "h3",
            "",
            item.name || ""
        );

        const details = createElement(
            "p",
            "",
            `${item.issuer || ""} ${
                item.date ? "• " + item.date : ""
            }`
        );

        card.appendChild(title);
        card.appendChild(details);


        if (
            item.link &&
            item.link !== "#"
        ) {

            const link = createElement(
                "a",
                "",
                "View Certificate →"
            );

            link.href = item.link;
            link.target = "_blank";
            link.rel = "noopener";

            card.appendChild(link);
        }


        container.appendChild(card);
    });
}


// ---------------------------------------------------------
// Achievements
// ---------------------------------------------------------

function renderAchievements(achievements) {

    const container = getElement(
        "achievements-list"
    );

    container.innerHTML = "";

    if (
        !achievements ||
        achievements.length === 0
    ) {
        container.innerHTML =
            "<p>No achievements added yet.</p>";

        return;
    }


    achievements.forEach(item => {

        const card = createElement(
            "article",
            "achievement-card"
        );

        const title = createElement(
            "h3",
            "",
            item.title || ""
        );

        const description = createElement(
            "p",
            "",
            item.description || ""
        );

        card.appendChild(title);
        card.appendChild(description);

        container.appendChild(card);
    });
}


// ---------------------------------------------------------
// Interests
// ---------------------------------------------------------

function renderInterests(interests) {

    const container = getElement(
        "interests-list"
    );

    container.innerHTML = "";

    if (!interests) return;


    interests.forEach(interest => {

        const item = createElement(
            "span",
            "interest",
            interest
        );

        container.appendChild(item);
    });
}


// ---------------------------------------------------------
// Mobile Navigation
// ---------------------------------------------------------

function setupNavigation() {

    const toggle = getElement("menu-toggle");

    const menu = getElement("nav-menu");

    toggle.addEventListener("click", () => {

        menu.classList.toggle("active");
    });


    // Close menu after clicking a link

    const links = menu.querySelectorAll("a");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");
        });
    });
}


// ---------------------------------------------------------
// Start Application
// ---------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    loadPortfolio
);
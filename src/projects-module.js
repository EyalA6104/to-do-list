let projects = [
    { name: "default", todos: [] }
];

function addProject(projectName) {
    const alreadyExists = projects.some(project => project.name === projectName);
    if (alreadyExists) {
        console.log(`Project "${projectName}" already exists.`);
        return;
    }
    projects.push({ name: projectName, todos: [] });

    console.log(`Project "${projectName}" added.`);
    console.log("All projects:", projects);
}

function deleteProject(projectName) {
    if (projectName === "default") {
        return;
    }
    const index = projects.findIndex(project => project.name === projectName);
    if (index !== -1) {
         projects.splice(index, 1);
         console.log(`Project "${projectName}" deleted`);
        } else {
            console.log(`Project "${projectName}" not found`);
        }
}

function displayProjects() {
    return projects;
}

function getProjectByName(projectName) {
    return projects.find(project => project.name === projectName) || null;
}




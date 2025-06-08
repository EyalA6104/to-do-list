import { loadFromStorage, saveToStorage } from "./storage";

let projects = loadFromStorage();
if (!projects) {
  projects = [{ name: "default", todos: [] }];
  saveToStorage(projects);
}

function addProject(projectName) {
    const alreadyExists = projects.some(project => project.name === projectName);
    if (alreadyExists) {
        console.log(`Project "${projectName}" already exists.`);
        return;
    }

    if (projectName === "") {
        console.log("Cannot add project without a name");
        return;
    }

    projects.push({ name: projectName, todos: [] });

    saveToStorage(projects);

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
         saveToStorage(projects);
        } else {
            console.log(`Project "${projectName}" not found`);
        }
}

function getProjectByName(projectName) {
    return projects.find(project => project.name === projectName) || null;
}

function getProjects() {
    return projects;
}

export {
    getProjects,
    addProject,
    deleteProject,
    getProjectByName
};
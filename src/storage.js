function saveToStorage(projects) {
    const todoAppProjects = JSON.stringify(projects);
    localStorage.setItem("userProjects", todoAppProjects);
}

function loadFromStorage() {
    const todoAppProjects = localStorage.getItem("userProjects");
    if (!todoAppProjects) return null;

    try {
        return JSON.parse(todoAppProjects);
    } catch (error) {
        console.error("Error parsing data from localStorage:", error);
        return null;
    }
}

export { saveToStorage, loadFromStorage }
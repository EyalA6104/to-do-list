import { renderProjects, renderTodos, setupEventListeners } from "./ui-module";
import { getProjects } from "./projects-module";
import './styles.css';

let currentProject = "default";

document.querySelector(".current-project-title").textContent = currentProject;

renderProjects();
renderTodos(currentProject);
setupEventListeners();
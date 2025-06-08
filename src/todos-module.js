import { saveToStorage, loadFromStorage } from "./storage";
import { getProjects } from "./projects-module";

let projects = getProjects()

let todoData = { title: "", description: "", dueDate: "", status: "", priority: "", notes: ""}

function createTodo({ title = "", description = "", dueDate = "", status = "Not started yet", priority = "Medium", notes = "" } = {}) {
  return { title, description, dueDate, status, priority, notes };
}

function addTodo(projectName, todoData) {
    let project = projects.find(project => project.name === projectName);
    if (project) {
        project.todos.push(todoData);
        saveToStorage(projects);
    } else {
        return "Could not find the project";
    }
}

function deleteTodo(projectName, title) {
    let project = projects.find(project => project.name === projectName);

    if (!project) {
        return "Project not found";
    }

    let todoIndex = project.todos.findIndex(todo => todo.title === title);

    if (todoIndex !== -1) {
        project.todos.splice(todoIndex, 1);
        console.log(`Todo "${title}" deleted from project "${projectName}"`);
        saveToStorage(projects);
    } else {
        return "Could not find Todo";
    }
}

function editTodo(projectName, title, todoData) {
    let project = projects.find(project => project.name === projectName);

    if (!project) {
        return "Project not found";
    }

    let todo = project.todos.find(todo => todo.title === title);

    if (!todo) {
        return "Todo not found";
    }

    if (todo) {
        Object.keys(todoData).forEach(key => {
            if (todoData[key] !== undefined && todoData[key] !== "") {
                todo[key] = todoData[key];
            }
        });
        saveToStorage(projects);
    }
}

function getTodos(projectName) {
    let project = projects.find(project => project.name === projectName);

    if (!project) {
        return "Project not found";
    }

    return project.todos;
}

function updateTodoStatus(projectName, title, newStatus) {
    let project = projects.find(project => project.name === projectName);

    if (!project) {
        return "Project not found";
    }

    let todo = project.todos.find(todo => todo.title === title);

    if (!todo) {
        return "Todo not found";
    }

    const statusOptions = ["Not started yet", "In progress", "Done"]

    if (statusOptions.includes(newStatus)) {
        todo.status = newStatus;
        saveToStorage(projects);
    } else {
        return "Your status value is invalid";
    }
}

export {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
  updateTodoStatus,
  createTodo
};
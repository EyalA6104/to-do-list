import { addTodo, deleteTodo, editTodo, getTodos, updateTodoStatus, createTodo } from "./todos-module";
import { getProjects, addProject, deleteProject } from "./projects-module";
import { format } from 'date-fns';

let currentProject = "default";
let isEditing = false;
let editingTodoTitle = null;

function renderProjects() {
  const projects = getProjects();
  const projectList = document.querySelector("nav.projects-list");
  projectList.innerHTML = "";

  projects.forEach(project => {
    const projectRow = document.createElement("div");
    projectRow.classList.add("project-row");

    const projectName = document.createElement("div");
    projectName.classList.add("project-name");
    projectName.textContent = `${project.name}`;
    projectRow.appendChild(projectName);

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.classList.add("delete-project-btn");
    deleteProjectBtn.textContent = "Delete";
    projectRow.appendChild(deleteProjectBtn);

    projectName.addEventListener("click", () => {
      currentProject = project.name;
      renderTodos(currentProject);
    });

    deleteProjectBtn.addEventListener("click", () => {
      deleteProject(project.name);
      if (project.name === currentProject) {
        currentProject = "default";
        renderTodos(currentProject);
      }
      renderProjects();
    });

    projectList.appendChild(projectRow);
  });
}

function renderTodos(projectName) {
  document.querySelector(".current-project-title").textContent = currentProject;
  const todos = getTodos(projectName);
  const todosList = document.querySelector(".todo-list");
  todosList.innerHTML = "";

  todos.forEach(todo => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-card");

    const title = document.createElement("h3");
    title.textContent = todo.title;
    todoItem.appendChild(title);

    const description = document.createElement("div");
    description.textContent = todo.description;
    description.classList.add("todo-description");
    todoItem.appendChild(description);

    const dueDate = document.createElement("div");
    if (todo.dueDate) {
      const formattedDate = format(new Date(todo.dueDate), "dd/MM/yyyy");
      dueDate.textContent = `Due: ${formattedDate}`;
    } else {
      dueDate.textContent = "Due: No date set";
    }    dueDate.classList.add("todo-due-date");
    todoItem.appendChild(dueDate);

    const priority = document.createElement("div");
    priority.textContent = `Priority: ${todo.priority}`;
    priority.classList.add("todo-priority");
    todoItem.appendChild(priority);

    const status = document.createElement("div");
    status.classList.add("todo-status");
    status.textContent = `Status: ${todo.status}`;
    status.style.cursor = "pointer";
    todoItem.appendChild(status);

    status.addEventListener("click", () => {
      status.remove();

      const select = document.createElement("select");
      const options = ["Not started yet", "In progress", "Done"];

      options.forEach(option => {
        const opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        if (option === todo.status) {
          opt.selected = true;
        }
        select.appendChild(opt);
      });

      select.classList.add("status-dropdown");
      todoItem.appendChild(select);
      select.focus();

      select.addEventListener("change", () => {
        const newStatus = select.value;
        updateTodoStatus(projectName, todo.title, newStatus);
        renderTodos(projectName);
      });

      select.addEventListener("blur", () => {
        renderTodos(projectName);
      });
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-todo-btn");
    todoItem.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-todo-btn");
    todoItem.appendChild(deleteBtn);

    editBtn.addEventListener("click", () => {
      isEditing = true;
      editingTodoTitle = todo.title;

      document.getElementById("todo_title").value = todo.title;
      document.getElementById("todo_description").value = todo.description;
      document.getElementById("todo_due_date").value = todo.dueDate;
      document.getElementById("todo_status").value = todo.status;
      document.getElementById("todo_priority").value = todo.priority;
      document.getElementById("todo_notes").value = todo.notes;

      const todoDialog = document.querySelector("dialog.add-todo-dialog");
      todoDialog.showModal();
    });

    deleteBtn.addEventListener("click", () => {
      deleteTodo(currentProject, todo.title);
      renderTodos(currentProject);
    });

    todosList.appendChild(todoItem);
  });

  if (todos.length === 0) {
    const emptyListMessage = document.createElement("div");
    emptyListMessage.classList.add("empty-list-message");
    emptyListMessage.textContent = "There are no Todos in this project";
    todosList.appendChild(emptyListMessage);
  }
}

function setupEventListeners() {
  const addProjectBtn = document.querySelector("button.add-project-btn");
  addProjectBtn.addEventListener("click", handleAddProject);

  const addTodoBtn = document.querySelector("button.add-todo-btn");
  addTodoBtn.addEventListener("click", handleAddTodo);

  const projectForm = document.querySelector("form.add-project-form");
  const projectSubmitBtn = document.querySelector("button#submit-project-btn");
  const projectDialog = document.querySelector("dialog.add-project-dialog");

  projectSubmitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const projectName = document.getElementById("project_name").value;
    addProject(projectName);
    projectForm.reset();
    projectDialog.close();
    renderProjects();
  });

  const todoDialog = document.querySelector("dialog.add-todo-dialog");
  const todoForm = document.querySelector("form.add-todo-form");
  const todoSubmitBtn = document.querySelector("button#submit-todo-btn");

  todoSubmitBtn.addEventListener("click", function(event) {
    event.preventDefault();

    const title = document.getElementById("todo_title").value;
    const description = document.getElementById("todo_description").value;
    const dueDate = document.getElementById("todo_due_date").value;
    const status = document.getElementById("todo_status").value;
    const priority = document.getElementById("todo_priority").value;
    const notes = document.getElementById("todo_notes").value;

    const todoData = { title, description, dueDate, status, priority, notes };

    if (isEditing) {
      editTodo(currentProject, editingTodoTitle, todoData);
      isEditing = false;
      editingTodoTitle = null;
    } else {
      const newTodo = createTodo(todoData);
      addTodo(currentProject, newTodo);
    }

    todoForm.reset();
    todoDialog.close();
    renderTodos(currentProject);
  });
}

function handleAddProject() {
  const projectDialog = document.querySelector("dialog.add-project-dialog");
  projectDialog.showModal();
}

function handleAddTodo() {
  const todoDialog = document.querySelector("dialog.add-todo-dialog");
  todoDialog.showModal();
}

export { renderProjects, renderTodos, setupEventListeners }

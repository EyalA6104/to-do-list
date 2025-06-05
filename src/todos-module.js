let todoData = { title: "", description: "", dueDate: "", status: "", priority: "", notes: ""}

function addTodo(projectName, todoData) {
    let project = projects.find(project => project.name === projectName);
    if (project) {
        project.todos.push(todoData);
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
    }
}

function displayTodos(projectName) {
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
    } else {
        return "Your status value is invalid";
    }
}
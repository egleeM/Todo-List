import { loadProjects, saveProjects, deleteProject, deleteTodo } from './storage';

export const renderProjects = () => {
    const projects = loadProjects();
    const projectContainer = document.getElementById('project-container');
    projectContainer.innerHTML = '';

    projects.forEach((project) => {
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = project.title;
        projectTitle.classList.add('project-title');
        projectDiv.appendChild(projectTitle);

        const deleteProjectButton = document.createElement('button');
        deleteProjectButton.textContent = 'Delete Project';
        deleteProjectButton.classList.add('delete-project');
        deleteProjectButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProject(project.title);
            renderProjects();
        });
        projectDiv.appendChild(deleteProjectButton);

        project.todos.forEach((todo, todoIndex) => {
            const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo-item');
            todoDiv.style.color = getPriorityColor(todo.priority);

            todoDiv.addEventListener('dblclick', () => {
                todo.toggleComplete();
                if (todo.completed) {
                    todoDiv.style.textDecoration = 'line-through';
                } else {
                    todoDiv.style.textDecoration = 'none';
                }
                saveProjects(loadProjects());
                renderProjects(); 
            });

            if (todo.completed) {
                todoDiv.style.textDecoration = 'line-through';
            }

            todoDiv.textContent = todo.title;

            const todoDetails = document.createElement('div');
            todoDetails.classList.add('todo-details');
            todoDetails.style.display = 'none';

            const descriptionInput = createInput('text', todo.description || '', 'Description');
            const dueDateInput = createInput('date', todo.dueDate);
            const prioritySelect = createPrioritySelect(todo.priority);

            descriptionInput.addEventListener('change', () => {
                todo.description = descriptionInput.value;
                saveProjects(loadProjects());
            });

            dueDateInput.addEventListener('change', () => {
                todo.dueDate = dueDateInput.value;
                saveProjects(loadProjects());
            });

            prioritySelect.addEventListener('change', () => {
                todo.priority = prioritySelect.value;
                todoDiv.style.color = getPriorityColor(todo.priority);
                saveProjects(loadProjects());
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete Todo';
            deleteButton.classList.add('delete-todo');
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteTodo(project.title, todoIndex);
                renderProjects();
            });

            todoDetails.appendChild(descriptionInput);
            todoDetails.appendChild(dueDateInput);
            todoDetails.appendChild(prioritySelect);
            todoDetails.appendChild(deleteButton);

            todoDiv.appendChild(todoDetails);

            todoDiv.addEventListener('click', (e) => {
                if (e.target !== descriptionInput && e.target !== dueDateInput && e.target !== prioritySelect) {
                    todoDetails.style.display = (todoDetails.style.display === 'block') ? 'none' : 'block';
                }
            });

            projectDiv.appendChild(todoDiv);
        });

        projectContainer.appendChild(projectDiv);
    });
};

const createInput = (type, value, placeholder = '') => {
    const input = document.createElement('input');
    input.type = type;
    input.value = value;
    input.placeholder = placeholder;
    return input;
};

const createPrioritySelect = (currentPriority) => {
    const select = document.createElement('select');
    const priorities = ['high', 'medium', 'low'];
    priorities.forEach(priority => {
        const option = document.createElement('option');
        option.value = priority;
        option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
        if (priority === currentPriority) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    return select;
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'high':
            return 'red';
        case 'medium':
            return 'orange';
        case 'low':
            return 'green';
        default:
            return 'black';
    }
};

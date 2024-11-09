import Project from './Project';
import Todo from './Todo';
import { saveProjects, loadProjects } from './storage';
import { renderProjects } from './dom';
import './styles.css';

let projects = loadProjects();

const loadLatestProjects = () => {
    projects = loadProjects();
};

if (projects.length === 0) {
    const defaultProject = Project('Default');
    projects.push(defaultProject);
    saveProjects(projects);
}

const addProject = (title) => {
    loadLatestProjects();
    const newProject = Project(title);
    projects.push(newProject);
    saveProjects(projects);
    renderProjects();
};

const addTodo = (projectTitle, todoData) => {
    loadLatestProjects();
    const project = projects.find(p => p.title === projectTitle);
    if (project) {
        const newTodo = Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
        project.addTodo(newTodo);
        saveProjects(projects);
        renderProjects();
    }
};

const deleteProject = (projectTitle) => {
    loadLatestProjects();
    projects = projects.filter(project => project.title !== projectTitle);
    saveProjects(projects);
    renderProjects();
};

renderProjects();

document.getElementById('addProjectButton').addEventListener('click', () => {
    const projectInput = document.getElementById('projectInput');
    const projectTitle = projectInput.value.trim();

    if (projectTitle.length > 0) {
        addProject(projectTitle);
        projectInput.value = '';
    }
});

document.getElementById('addTodoButton').addEventListener('click', () => {
    const todoTitleInput = document.getElementById('todoTitleInput');
    const todoDescInput = document.getElementById('todoDescInput');
    const todoDueDateInput = document.getElementById('todoDueDateInput');
    const todoPriorityInput = document.getElementById('todoPriorityInput');
    const todoProjectInput = document.getElementById('todoProjectInput');

    const todoTitle = todoTitleInput.value.trim();
    const todoDesc = todoDescInput.value.trim();
    const dueDate = todoDueDateInput.value.trim();
    const priority = todoPriorityInput.value.trim().toLowerCase();
    const projectTitle = todoProjectInput.value.trim();

    if (todoTitle && projectTitle) {
        addTodo(projectTitle, { title: todoTitle, description: todoDesc, dueDate, priority });
        todoTitleInput.value = '';
        todoDescInput.value = '';
        todoDueDateInput.value = '';
        todoPriorityInput.value = '';
        todoProjectInput.value = '';
    }
});

document.getElementById('project-container').addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('delete-project')) {
        const projectTitle = e.target.closest('.project').querySelector('.project-title').textContent;
        deleteProject(projectTitle);
    }
});

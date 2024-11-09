import Project from './Project';
import Todo from './Todo';


export const saveProjects = (projects) => {
    const projectsData = projects.map(project => ({
        title: project.title,
        todos: project.todos.map(todo => ({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            completed: todo.completed
        }))
    }));
    console.log('Saving Projects:', projectsData); 
    localStorage.setItem('projects', JSON.stringify(projectsData));
};

// Load projects from localStorage
export const loadProjects = () => {
    const projectsData = localStorage.getItem('projects');
    if (!projectsData) {
        console.log('No projects found in localStorage');
        return [];
    }

    const projects = JSON.parse(projectsData);
    console.log('Loaded Projects:', projects); 
    return projects.map(projectData => {
        const project = Project(projectData.title);
        projectData.todos.forEach(todoData => {
            const todo = Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
            todo.completed = todoData.completed || false; 
            project.addTodo(todo);
        });
        return project;
    });
};


export const deleteProject = (title) => {
    let projects = loadProjects();
    projects = projects.filter(project => project.title !== title);
    saveProjects(projects); 
    console.log(`Project "${title}" deleted.`);
};

export const deleteTodo = (projectTitle, todoIndex) => {
    let projects = loadProjects();
    const project = projects.find(p => p.title === projectTitle);
    if (project && project.todos[todoIndex]) {
        project.todos.splice(todoIndex, 1);
        saveProjects(projects); 
        console.log(`Todo at index ${todoIndex} deleted from project "${projectTitle}".`);
    } else {
        console.error('Todo not found');
    }
};

export const clearLocalStorage = () => {
    localStorage.clear();
    console.log('LocalStorage cleared.');
};



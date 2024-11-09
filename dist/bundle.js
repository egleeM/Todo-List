/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Project)
/* harmony export */ });
function Project(title) {
  return {
    title: title,
    todos: [],
    addTodo: function addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo: function removeTodo(index) {
      this.todos.splice(index, 1);
    }
  };
}

/***/ }),

/***/ "./src/Todo.js":
/*!*********************!*\
  !*** ./src/Todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
function Todo(title, description, dueDate, priority) {
  return {
    title: title,
    description: description,
    dueDate: dueDate,
    priority: priority,
    completed: false
  };
}

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderProjects: () => (/* binding */ _renderProjects)
/* harmony export */ });
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");

var _renderProjects = function renderProjects() {
  var projects = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.loadProjects)();
  var projectContainer = document.getElementById('project-container');
  projectContainer.innerHTML = '';
  projects.forEach(function (project) {
    var projectDiv = document.createElement('div');
    projectDiv.classList.add('project');
    var projectTitle = document.createElement('h3');
    projectTitle.textContent = project.title;
    projectTitle.classList.add('project-title');
    projectDiv.appendChild(projectTitle);
    var deleteProjectButton = document.createElement('button');
    deleteProjectButton.textContent = 'Delete Project';
    deleteProjectButton.classList.add('delete-project');
    deleteProjectButton.addEventListener('click', function (e) {
      e.stopPropagation();
      (0,_storage__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(project.title);
      _renderProjects();
    });
    projectDiv.appendChild(deleteProjectButton);
    project.todos.forEach(function (todo, todoIndex) {
      var todoDiv = document.createElement('div');
      todoDiv.classList.add('todo-item');
      todoDiv.style.color = getPriorityColor(todo.priority);
      todoDiv.addEventListener('dblclick', function () {
        todo.toggleComplete();
        if (todo.completed) {
          todoDiv.style.textDecoration = 'line-through';
        } else {
          todoDiv.style.textDecoration = 'none';
        }
        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveProjects)((0,_storage__WEBPACK_IMPORTED_MODULE_0__.loadProjects)());
        _renderProjects();
      });
      if (todo.completed) {
        todoDiv.style.textDecoration = 'line-through';
      }
      todoDiv.textContent = todo.title;
      var todoDetails = document.createElement('div');
      todoDetails.classList.add('todo-details');
      todoDetails.style.display = 'none';
      var descriptionInput = createInput('text', todo.description || '', 'Description');
      var dueDateInput = createInput('date', todo.dueDate);
      var prioritySelect = createPrioritySelect(todo.priority);
      descriptionInput.addEventListener('change', function () {
        todo.description = descriptionInput.value;
        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveProjects)((0,_storage__WEBPACK_IMPORTED_MODULE_0__.loadProjects)());
      });
      dueDateInput.addEventListener('change', function () {
        todo.dueDate = dueDateInput.value;
        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveProjects)((0,_storage__WEBPACK_IMPORTED_MODULE_0__.loadProjects)());
      });
      prioritySelect.addEventListener('change', function () {
        todo.priority = prioritySelect.value;
        todoDiv.style.color = getPriorityColor(todo.priority);
        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.saveProjects)((0,_storage__WEBPACK_IMPORTED_MODULE_0__.loadProjects)());
      });
      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Todo';
      deleteButton.classList.add('delete-todo');
      deleteButton.addEventListener('click', function (e) {
        e.stopPropagation();
        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.deleteTodo)(project.title, todoIndex);
        _renderProjects();
      });
      todoDetails.appendChild(descriptionInput);
      todoDetails.appendChild(dueDateInput);
      todoDetails.appendChild(prioritySelect);
      todoDetails.appendChild(deleteButton);
      todoDiv.appendChild(todoDetails);
      todoDiv.addEventListener('click', function (e) {
        if (e.target !== descriptionInput && e.target !== dueDateInput && e.target !== prioritySelect) {
          todoDetails.style.display = todoDetails.style.display === 'block' ? 'none' : 'block';
        }
      });
      projectDiv.appendChild(todoDiv);
    });
    projectContainer.appendChild(projectDiv);
  });
};

var createInput = function createInput(type, value) {
  var placeholder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var input = document.createElement('input');
  input.type = type;
  input.value = value;
  input.placeholder = placeholder;
  return input;
};
var createPrioritySelect = function createPrioritySelect(currentPriority) {
  var select = document.createElement('select');
  var priorities = ['high', 'medium', 'low'];
  priorities.forEach(function (priority) {
    var option = document.createElement('option');
    option.value = priority;
    option.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
    if (priority === currentPriority) {
      option.selected = true;
    }
    select.appendChild(option);
  });
  return select;
};
var getPriorityColor = function getPriorityColor(priority) {
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

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearLocalStorage: () => (/* binding */ clearLocalStorage),
/* harmony export */   deleteProject: () => (/* binding */ deleteProject),
/* harmony export */   deleteTodo: () => (/* binding */ deleteTodo),
/* harmony export */   loadProjects: () => (/* binding */ loadProjects),
/* harmony export */   saveProjects: () => (/* binding */ saveProjects)
/* harmony export */ });
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo */ "./src/Todo.js");


var saveProjects = function saveProjects(projects) {
  var projectsData = projects.map(function (project) {
    return {
      title: project.title,
      todos: project.todos.map(function (todo) {
        return {
          title: todo.title,
          description: todo.description,
          dueDate: todo.dueDate,
          priority: todo.priority,
          completed: todo.completed
        };
      })
    };
  });
  console.log('Saving Projects:', projectsData);
  localStorage.setItem('projects', JSON.stringify(projectsData));
};

// Load projects from localStorage
var loadProjects = function loadProjects() {
  var projectsData = localStorage.getItem('projects');
  if (!projectsData) {
    console.log('No projects found in localStorage');
    return [];
  }
  var projects = JSON.parse(projectsData);
  console.log('Loaded Projects:', projects);
  return projects.map(function (projectData) {
    var project = (0,_Project__WEBPACK_IMPORTED_MODULE_0__["default"])(projectData.title);
    projectData.todos.forEach(function (todoData) {
      var todo = (0,_Todo__WEBPACK_IMPORTED_MODULE_1__["default"])(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
      todo.completed = todoData.completed || false;
      project.addTodo(todo);
    });
    return project;
  });
};
var deleteProject = function deleteProject(title) {
  var projects = loadProjects();
  projects = projects.filter(function (project) {
    return project.title !== title;
  });
  saveProjects(projects);
  console.log("Project \"".concat(title, "\" deleted."));
};
var deleteTodo = function deleteTodo(projectTitle, todoIndex) {
  var projects = loadProjects();
  var project = projects.find(function (p) {
    return p.title === projectTitle;
  });
  if (project && project.todos[todoIndex]) {
    project.todos.splice(todoIndex, 1);
    saveProjects(projects);
    console.log("Todo at index ".concat(todoIndex, " deleted from project \"").concat(projectTitle, "\"."));
  } else {
    console.error('Todo not found');
  }
};
var clearLocalStorage = function clearLocalStorage() {
  localStorage.clear();
  console.log('LocalStorage cleared.');
};

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ "./src/Project.js");
/* harmony import */ var _Todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Todo */ "./src/Todo.js");
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");





var projects = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.loadProjects)();
var loadLatestProjects = function loadLatestProjects() {
  projects = (0,_storage__WEBPACK_IMPORTED_MODULE_2__.loadProjects)();
};
if (projects.length === 0) {
  var defaultProject = (0,_Project__WEBPACK_IMPORTED_MODULE_0__["default"])('Default');
  projects.push(defaultProject);
  (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProjects)(projects);
}
var addProject = function addProject(title) {
  loadLatestProjects();
  var newProject = (0,_Project__WEBPACK_IMPORTED_MODULE_0__["default"])(title);
  projects.push(newProject);
  (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProjects)(projects);
  (0,_dom__WEBPACK_IMPORTED_MODULE_3__.renderProjects)();
};
var addTodo = function addTodo(projectTitle, todoData) {
  loadLatestProjects();
  var project = projects.find(function (p) {
    return p.title === projectTitle;
  });
  if (project) {
    var newTodo = (0,_Todo__WEBPACK_IMPORTED_MODULE_1__["default"])(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
    project.addTodo(newTodo);
    (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProjects)(projects);
    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.renderProjects)();
  }
};
var deleteProject = function deleteProject(projectTitle) {
  loadLatestProjects();
  projects = projects.filter(function (project) {
    return project.title !== projectTitle;
  });
  (0,_storage__WEBPACK_IMPORTED_MODULE_2__.saveProjects)(projects);
  (0,_dom__WEBPACK_IMPORTED_MODULE_3__.renderProjects)();
};
(0,_dom__WEBPACK_IMPORTED_MODULE_3__.renderProjects)();
document.getElementById('addProjectButton').addEventListener('click', function () {
  var projectInput = document.getElementById('projectInput');
  var projectTitle = projectInput.value.trim();
  if (projectTitle.length > 0) {
    addProject(projectTitle);
    projectInput.value = '';
  }
});
document.getElementById('addTodoButton').addEventListener('click', function () {
  var todoTitleInput = document.getElementById('todoTitleInput');
  var todoDescInput = document.getElementById('todoDescInput');
  var todoDueDateInput = document.getElementById('todoDueDateInput');
  var todoPriorityInput = document.getElementById('todoPriorityInput');
  var todoProjectInput = document.getElementById('todoProjectInput');
  var todoTitle = todoTitleInput.value.trim();
  var todoDesc = todoDescInput.value.trim();
  var dueDate = todoDueDateInput.value.trim();
  var priority = todoPriorityInput.value.trim().toLowerCase();
  var projectTitle = todoProjectInput.value.trim();
  if (todoTitle && projectTitle) {
    addTodo(projectTitle, {
      title: todoTitle,
      description: todoDesc,
      dueDate: dueDate,
      priority: priority
    });
    todoTitleInput.value = '';
    todoDescInput.value = '';
    todoDueDateInput.value = '';
    todoPriorityInput.value = '';
    todoProjectInput.value = '';
  }
});
document.getElementById('project-container').addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('delete-project')) {
    var projectTitle = e.target.closest('.project').querySelector('.project-title').textContent;
    deleteProject(projectTitle);
  }
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map
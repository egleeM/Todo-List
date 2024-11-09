export default function Project(title) {
    return {
        title,
        todos: [],
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(index) {
            this.todos.splice(index, 1);
        }
    };
}




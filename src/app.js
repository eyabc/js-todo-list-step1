import NewTodoTitle from './components/NewTodoTitle.js';
import TodoList from './components/TodoList.js';
import TodoCount from './components/TodoCount.js';
import Filters from './components/Filters.js';

class TodoApp {
    state;
    components;

    constructor () {
        this.state = {
            todoItems: [],
        };
        this.initComponents();
    }

    initComponents() {
        const { addTodoItem, toggleComplete, deleteItem, toggleEditingItem, setItem } = this;

        const newTodoTitle = document.getElementById('new-todo-title');
        const todoList = document.getElementById('todo-list');
        const todoCount = document.getElementsByClassName('todo-count');
        const filters = document.getElementsByClassName('filters');

        this.components = {
            TodoInput: new NewTodoTitle(newTodoTitle, { addTodoItem }),
            TodoList: new TodoList(todoList, { toggleComplete, deleteItem, toggleEditingItem, setItem }),
            TodoCount: new TodoCount(todoCount, {}),
            Filters: new Filters(filters, {}),
        };
    }

    addTodoItem = (contents) => {
        const { todoItems } = this.state;

        const newTodoItems = [
            ...todoItems,
            { contents, complete: false, editing: false }
        ];
        this.setState({ todoItems: newTodoItems})
    };

    toggleComplete = (index) => {
        const { todoItems } = this.state;
        const newTodoItems = [...todoItems];
        newTodoItems[index].complete = !newTodoItems[index].complete;

        this.setState({ todoItems: newTodoItems });
    };

    deleteItem = (index) => {
        const { todoItems } = this.state;
        const newTodoItems = [...todoItems];
        newTodoItems.splice(index, 1);

        this.setState({ todoItems: newTodoItems });
    };

    toggleEditingItem = (index) => {
        const { todoItems } = this.state;
        const newTodoItems = [...todoItems];
        newTodoItems[index].editing = !newTodoItems[index].editing;
        this.setState({ todoItems: newTodoItems });
    };

    setItem = (index, payload) => {
        console.log(index, payload)
        const { todoItems } = this.state;
        const newTodoItems = [...todoItems];
        newTodoItems[index] = {
            ...newTodoItems[index],
            ...payload
        };
        this.setState({ todoItems: newTodoItems });
    };

    setState (payload) {
        for (const key in payload)
            this.state[key] = payload[key];

        this.render();
    };

    render() {
        const { todoItems } = this.state;
        const {components} = this;
        for (const key in components)
            components[key].render?.(todoItems);
    }
}

new TodoApp();




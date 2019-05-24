import { registerStore, dispatch } from "@wordpress/data";

const DEFAULT_STATE = [];

const actions = {
    populateTodos(todos) {
        return {
            type: "POPULATE_TODOS",
            todos
        };
    },
    addToDo(item) {
        return {
            type: "ADD_TODO",
            item: item
        };
    }
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.item];
        case "POPULATE_TODOS":
            return [...action.todos];
        default:
            return state;
    }
};

const selectors = {
    getTodos(state) {
        return state;
    }
};

registerStore("mytheme-blocks/todo", {
    reducer,
    selectors,
    actions,
    resolvers: {
        getTodos() {
            fetch("https://jsonplaceholder.typicode.com/todos?_limit=10")
                .then(response => response.json())
                .then(response => {
                    dispatch("mytheme-blocks/todo").populateTodos(response);
                });
        }
    }
});

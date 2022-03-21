import React, { Fragment, useEffect, useReducer } from 'react';
import { todoReducer } from '../hooks/todo-reducer';
import "../styles/todo.css";
import 'react-toastify/dist/ReactToastify.css';
import Todolist from './Todolist';
import TodoAdd from './TodoAdd';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
    // return [{
    //     id: new Date().getTime(),
    //     desc: 'Aprender React',
    //     done: false,
    // }];
}

const TodoApp = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = (newTodo) => {
        dispatch({
            type: 'add',
            payload: newTodo
        });
    }

    const handleDelete = (todoId) => {
        const actionDelete = {
            type: 'delete',
            payload: todoId,
        };
        dispatch(actionDelete);
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        });
    }

    return (
        <Fragment>
            <h1>TodoApp({todos.length})</h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <Todolist
                        todos={todos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
                <div className="col-5">
                    <h4>Agregar TODO</h4>
                    <hr />
                    <TodoAdd
                        handleAddTodo={handleAddTodo}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default TodoApp
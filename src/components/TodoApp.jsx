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
        dispatch({
            type: 'delete',
            payload: todoId,
        });
    }

    const handleToggle = (todoId) => {
        dispatch({
            type: 'toggle',
            payload: todoId
        });
    }

    return (
        <Fragment>
            <h1 className="text-center">TodoApp</h1>
            <hr />
            <div className="col  d-md-flex">
                <div className="col-7">
                    <h3>Tareas({todos.length})</h3>
                    <Todolist
                        todos={todos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
                <div className="col-5">
                    <h4 className="text-center">Agregar tarea</h4>
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
import React, { Fragment, useEffect, useReducer } from 'react';
import { todoReducer } from '../hooks/todo-reducer';
import { useForm } from '../hooks/useForm';
import "../styles/todo.css";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todolist from './Todolist';

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

    const [{ descripcion }, handleInputChange, reset] = useForm({
        descripcion: ''
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        if (descripcion.trim() <= 1) {
            return notify();
        }
        const newTodo = {
            id: new Date().getTime(),
            desc: descripcion,
            done: false,
        };

        const actionAdd = {
            type: 'add',
            payload: newTodo
        };

        dispatch(actionAdd);
        reset();
    }

    const notify = () => toast.info("Porfavor ingresar una tarea!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        toastId: "custom-id-yes",
    });

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
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control"
                            type="text"
                            name="descripcion"
                            placeholder="Aprender..."
                            autoComplete="off"
                            value={descripcion}
                            onChange={handleInputChange}
                        />
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-2"
                            >Agregar</button>
                            <ToastContainer
                                transition={Zoom}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default TodoApp
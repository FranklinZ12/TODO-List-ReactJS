import React, { Fragment, useEffect, useReducer } from 'react';
import { todoReducer } from '../hooks/todo-reducer';
import { useForm } from '../hooks/useForm';
import "../styles/todo.css";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
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
    }, [todos])


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
                    <ul className='list-group list-group-flush'>
                        {todos.map((todo, i) => (
                            <li
                                key={todo.id}
                                className="list-group-item"
                            >
                                <p className="text-center">{i + 1}. {todo.desc}</p>
                                <button className="btn btn-danger">Borrar</button>
                            </li>
                        ))}
                    </ul>
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
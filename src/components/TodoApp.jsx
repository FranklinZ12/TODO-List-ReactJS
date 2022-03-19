import React, { Fragment, useReducer } from 'react';
import { todoReducer } from '../hooks/todo-reducer';
import "../styles/todo.css"

const initialState = [{
    id: new Date().getTime(),
    desc: 'Aprender React',
    done: false,
}];
const TodoApp = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState);
    console.log(todos)

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTodo = {
            id: new Date().getTime(),
            desc: 'Nueva tarea',
            done: false,
        };

        const actionAdd = {
            type: 'add',
            payload: newTodo
        };

        dispatch(actionAdd);
    }

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
                        />
                        <div className="d-grid gap-2">
                            <button
                                type="submit"
                                className="btn btn-outline-primary mt-2"
                            >Agregar</button>
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default TodoApp
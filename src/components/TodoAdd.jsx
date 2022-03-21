import React from 'react'
import { useForm } from '../hooks/useForm';
import { ToastContainer, toast, Zoom } from 'react-toastify';
const TodoAdd = ({ handleAddTodo }) => {
    const [{ descripcion }, handleInputChange, reset] = useForm({
        descripcion: ''
    });

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
        handleAddTodo(newTodo);
        reset();
    };

    return (
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
    )
}

export default TodoAdd
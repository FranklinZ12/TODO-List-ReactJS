
const TodoListItem = ({ todo, index, handleDelete, handleToggle }) => {
    return (
        <li
            key={todo.id}
            className="list-group-item d-flex"
        >
            <p className={`${todo.done && 'complete'}`}
                onClick={() => handleToggle(todo.id)}
            >{index + 1}. {todo.desc}</p>
            <div className="d-flex flex-column d-md-row flex-md-row">
                <button
                    className="btn btn-success"
                    onClick={() => handleToggle(todo.id)}
                >Hecha</button>
                <button
                    className="btn btn-danger mt-1 mt-md-0 mx-md-1"
                    onClick={(() => handleDelete(todo.id))}
                >Borrar</button>
            </div>
        </li>
    )
}

export default TodoListItem
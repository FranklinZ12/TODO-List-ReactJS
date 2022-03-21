import TodoListItem from "./TodoListItem"

const Todolist = ({ todos, handleDelete, handleToggle }) => {
    return (
        <ul className='list-group list-group-flush'>
            {todos.map((todo, index) => (
                <TodoListItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    handleDelete={handleDelete}
                    handleToggle={handleToggle}
                />
            ))}
        </ul>
    )
}

export default Todolist
import React,{useState} from 'react'

const BankDetails = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoText, setEditTodoText] = useState("");

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: newTodo,
      };
      setTodos([...todos, newTask]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (id, text) => {
    setEditTodoId(id);
    setEditTodoText(text);
  };

  const handleEditInputChange = (event) => {
    setEditTodoText(event.target.value);
  };

  const handleSaveTodo = (id) => {
    if (editTodoText.trim() === "") {
      return;
  }
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText("");
  };

  return (
    
       <div  style={{ background:" rgb(63,94,251)",
    background: "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,194,1) 100%)", minHeight: "100vh"}} >
      <div className="container" >
        <center>
        <h1 className="text-center mb-4" class="btn btn-danger" style={{fontSize: 50, fontFamily: "cursive", textAlign: "center"}}>BANK NAMES</h1>
        </center>
        <div className="card" style={{ backgroundColor: " linear-gradient(to top, #6b4260, #784d6b, #855977, #926583, #9f718f, #ac7599, #b978a4, #c67cae, #d576bb, #e26fc8, #ef68d7, #fb5fe7" }}>
          <div className="card-body" >
            <h1 style={{ textAlign: "center", fontFamily: "monospace", fontSize: 25, fontWeight: "bolder" }}>
              ENTER BANK NAME...
            </h1>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <input
              style={{ fontFamily: "fantasy", fontSize: 25, fontWeight: "bolder", textTransform: "uppercase", padding: 20 }}
              className="card-body"
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Add names here..."
            />

            <button className="btn btn-primary  text-md-start " style={{ padding: 20, marginLeft: 10 }} onClick={handleAddTodo}>Add</button>


          </div>
        </div>
        {todos.map((todo) => (
          <div className="card-body" style={{ fontFamily: "fantasy", fontSize: 20, fontWeight: "bolder", textTransform: "uppercase" }} key={todo.id}>
            {editTodoId === todo.id ? (
              <>
                <div className="card">
                  <div className="card-body">
                    <input className="card-body
                      text-md-start"
                      style={{ fontFamily: "fantasy", fontSize: 20, fontWeight: "bolder", textTransform: "uppercase" }}
                      type="text"
                      value={editTodoText}
                      onChange={handleEditInputChange}
                    />
                    <button  className="btn btn-warning  card-body"  style={{ padding: 20, marginLeft: 10, textTransform: "uppercase"   }} onClick={() => handleSaveTodo(todo.id)}>Save</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="card">
                  <div className="card-body">
                    <span className="card-body">{todo.text}</span>
                    <div>
                      <button className="card-body btn btn-success" style={{ padding: 20, marginLeft: 10 }} onClick={() => handleEditTodo(todo.id, todo.text)}>
                        Edit
                      </button>
                      <button className="card-body btn btn-danger" style={{ padding: 20, marginLeft: 10 }} onClick={() => handleDeleteTodo(todo.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default BankDetails

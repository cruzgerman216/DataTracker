import React, { useState } from "react";
import axios from "axios";
function Todolist({ todolist, setTodoList }) {
  const [newtodo, setTodo] = useState("");
  console.log("this is what you have", todolist);

  const addtodo = e => {
    e.preventDefault();
    var todoObject = {
      Content: newtodo.trim(),
      id: newtodo.trim()
    };

    axios.post("http://localhost:3001/TodoList", todoObject).then(response => {
      console.log(todolist);
      setTodoList([...todolist, todoObject]);
      setTodo("");
    });
  };
  const onDelete = todo => {
    console.log(todo);
    axios.delete("http://localhost:3001/TodoList/" + todo).then(response => {
      console.log("deleted " + todo);
      var getlist = todolist.filter(keeptodo => keeptodo.Content != todo);
      setTodoList(getlist);
    });
  };
  const gettodolist =
    todolist === []
      ? ""
      : todolist.map(item => {
          return (
            <div key={item.id}>
              {item.Content}{" "}
              <button onClick={() => onDelete(item.Content)}>Delete</button>
            </div>
          );
        });
  // const saveincrement = e => {
  //   e.preventDefault();
  //   const addObject = {
  //     addnumber: 0
  //   };

  //   axios.post("http://localhost:3001/add", addObject).then(response => {
  //     console.log("test");
  //   });
  // };
  const handleChange = e => {
    console.log(e.target.value);
    setTodo(e.target.value);
  };
  return (
    <div>
      <h3>To-do List</h3>
      {gettodolist}
      <h5>add to-do</h5>
      <form onSubmit={addtodo}>
        <input value={newtodo} onChange={handleChange} />
        <button type="submit">Add To-Do</button>
      </form>
    </div>
  );
}

export default Todolist;

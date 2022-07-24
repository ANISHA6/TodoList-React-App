import "./App.css";
import React, { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  // Function for fetching the data from API
  function getUsers() {
    fetch("https://jsonplaceholder.typicode.com/todos").then((result) => {
      result.json().then((resp) => {
        // console.warn(resp)
        setTodos(resp);
        setUserId(resp[0].userId);
        setId(resp[0].id);
        setTitle(resp[0].title);
        setCompleted(resp[0].completed);
      });
    });
  }

  //function for deleting the todo-item from todos list
  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("deleted todo-list ", resp);
        getUsers();
      });
    });
  }

  //function for selecting the list that we want to update
  function selectUser(id) {
    let item = todos[id - 1];
    setUserId(item.userId);
    setId(item.id);
    setTitle(item.title);
    setCompleted(item.completed);
  }

  //function for updating the todo list
  function updateUser() {
    let item = { userId, id, title, completed };
    // console.warn("item", item);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn("Updated todo-list", resp);
        getUsers();
      });
    });
  }

  return (
    <div className="App">
      <h1 className="Heading">React TodoList App </h1>
      <table className="Table" border="1" style={{ float: "left" }}>
        <tbody>
          <tr>
            <td>USER_ID</td>
            <td>ID</td>
            <td>TITLE</td>
            <td>COMPLETED</td>
            <td colSpan={2}>OPERATIONS</td>
          </tr>
          {todos.map((item, i) => (
            <tr key={i}>
              <td>{item.userId}</td>
              <td>{item.id}</td>
              <td>{item.title}</td>
              {/* Converting boolean value to string */}
              <td>{String(item.completed)}</td>
              <td>
                <button className="button" onClick={() => deleteUser(item.id)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="button" onClick={() => selectUser(item.id)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* input element for updating nad adding todo list */}
      <div className="form">
        <h1>Add a todo item</h1>
        <input
          type="number"
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <input
          type="text"
          value={completed}
          onChange={(e) => {
            setCompleted(e.target.value);
          }}
        />{" "}
        <br />
        <br />
        <button className="update-button" onClick={updateUser}>
          Update User
        </button>
      </div>
    </div>
  );
}
export default App;

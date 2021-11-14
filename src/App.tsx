import React, { FC, FormEvent, useState } from "react";
import bannerDark from "./assets/bg-desktop-dark.jpg";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import Todo from "./component/Todo";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { BsCircle } from "react-icons/bs";

interface ITodo {
  name: string;
  id: string;
  status: string;
}

const App: FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [todoName, setTodoName] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const filters: string[] = ["all", "active", "completed"];
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (todoName !== "") {
      setTodos([
        {
          name: todoName,
          id: todoName + Math.random().toString(),
          status: "todo",
        },
        ...todos,
      ]);
    }
    setTodoName("");
  };

  const clearCompleted = (): void => {
    setTodos(todos.filter(({ status }) => status !== "completed"));
  };

  const handleDelete = (index: string): void => {
    const i = todos.findIndex(({ id }) => id === index);
    todos.splice(i, 1);
    setTodos([...todos]);
  };

  const handleCompleted = (index: string): void => {
    todos.filter((task) => {
      if (task.id === index) {
        task.status === "completed"
          ? (task.status = "todo")
          : (task.status = "completed");
      }
    });
    setTodos([...todos]);
  };
  return (
    <div className={`App ${darkMode && "dark-mode"}`}>
      <div className="banner">
        <img src={bannerDark} alt="" />
      </div>
      <div className="main-wrapper">
        <header>
          <h2>TODO</h2>
          <div onClick={() => setDarkMode(!darkMode)} className="mode">
            <img src={darkMode ? sun : moon} alt="" />
          </div>
        </header>
        <div className="add">
          <form onSubmit={handleSubmit}>
            <label>
              <input
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                type="text"
              />
              <div className="task-icon">
                <BsCircle />
              </div>
            </label>
          </form>
        </div>

        <div className="todos-wrapper">
          <div className="inner-todos">
            {filter === "all" ? (
              <>
                {todos.map((todo) => (
                  <Todo
                    handleStatus={() => handleCompleted(todo.id)}
                    handleDlt={() => handleDelete(todo.id)}
                    status={todo.status}
                    name={todo.name}
                    key={todo.id}
                  />
                ))}
              </>
            ) : (
              <>
                {filter === "active" ? (
                  <>
                    {todos
                      .filter(({ status }) => status === "todo")
                      .map((todo) => (
                        <Todo
                          handleStatus={() => handleCompleted(todo.id)}
                          handleDlt={() => handleDelete(todo.id)}
                          status={todo.status}
                          name={todo.name}
                          key={todo.id}
                        />
                      ))}
                  </>
                ) : (
                  <>
                    {todos
                      .filter(({ status }) => status === "completed")
                      .map((todo) => (
                        <Todo
                          handleStatus={() => handleCompleted(todo.id)}
                          handleDlt={() => handleDelete(todo.id)}
                          status={todo.status}
                          name={todo.name}
                          key={todo.id}
                        />
                      ))}
                  </>
                )}
              </>
            )}
          </div>
          <div className="footer">
            <p>
              {todos.filter(({ status }) => status !== "completed").length}{" "}
              Items left
            </p>
            <div className="filters">
              {filters.map((f) => (
                <p
                  onClick={() => setFilter(f)}
                  className={`pointer ${filter === f && "active-filter"}`}
                  key={f}
                >
                  {f}
                </p>
              ))}
            </div>
            <p className="pointer" onClick={clearCompleted}>
              Clear Completed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

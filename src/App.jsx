import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState([
    {
      id: new Date().getTime(),
      text: "리엑트 공부하기",
      content: "리엑트 기초를 공부해봅시다.",
      isDone: false,
    },
  ]);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");

  const addTodo = () => {
    if (text === "" || content === "") {
      return alert("제목과 내용을 추가해주세요");
    }
    const newTodo = {
      id: new Date().getTime(),
      text: text,
      content: content,
      isDone: false,
    };
    setTodo([...todo, newTodo]);
    setText("");
    setContent("");
    
  };
  const deletTodo = (id) => {
    const filteredTodo = todo.filter(function (todo) {
      return todo.id !== id;
    });
    setTodo(filteredTodo);
  };
  const updateTodo = (id) => {
    // 아이디가 일치하는 할 일은 isDone을 반대로 바꾸고 나머지는 그대로 둔다
    const newTodo = todo.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodo(newTodo);
  };

  return (
    <div className="container">
      <header>
        <span>My Todo List</span>
        <span>React</span>
      </header>
      <div className="add">
        <div>
          <span>제목</span>
          <input
            className="title"
            value={text}
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
          <span>내용</span>
          <input
            className="content"
            value={content}
            type="text"
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button className="addBtn" onClick={addTodo}>
          추가하기{" "}
        </button>
      </div>
      <Todo
        todo={todo.filter((todo) => todo.isDone === false)}
        deletTodo={deletTodo}
        updateTodo={updateTodo}
        isDone={false}
      />
      <Todo
        todo={todo.filter((todo) => todo.isDone === true)}
        deletTodo={deletTodo}
        updateTodo={updateTodo}
        isDone={true}
      />
    </div>
  );
};

export default App;

const Todo = (props) => {
  return (
    <>
      <h3>{!props.isDone ? "Working...🔥" : "Done...!🎉"}</h3>
      <div className="todos">
        {props.todo.map((todo) => {
          return (
            <div className="todo" key={todo.id}>
              <div>{todo.text}</div>
              <div>{todo.content}</div>
              <span>
                <div>
                  <button
                    className="working"
                    onClick={() => props.deletTodo(todo.id)}
                  >
                    삭제하기
                  </button>
                </div>
                <div>
                  <button
                    className="done"
                    onClick={() => props.updateTodo(todo.id)}
                  >
                    {!props.isDone ? "완료하기" : "취소"}
                  </button>
                </div>
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

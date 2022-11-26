/* eslint-disable react/button-has-type */
import { ToDataURLOptions } from 'electron';
import { useEffect, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const HomeScreen = () => {
  // stateを定義
  const [text, setText] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<Todo>>([]);

  useEffect(() => {
    // 初回レンダー時にデフォルトのデータをセット
    const defaultTodoList = [
      {
        id: 1,
        text: '宿題をやる',
        completed: false,
      },
      {
        id: 2,
        text: '部屋を片付ける',
        completed: true,
      },
      {
        id: 3,
        text: 'メールを送る',
        completed: false,
      },
    ];

    setTodoList(defaultTodoList);
  }, []);

  const onSubmit = () => {
    // ボタンクリック時にtodoListに新しいToDoを追加
    if (text !== '') {
      const newTodoList: Array<Todo> = [
        {
          id: new Date().getTime(),
          text,
          completed: false,
        },
        ...todoList,
      ];
      setTodoList(newTodoList);

      // テキストフィールドを空にする
      setText('');
    }
  };

  const onCheck = (newTodo: Todo) => {
    // チェック時にcompletedの値を書き換える
    const newTodoList = todoList.map((todo) => {
      return todo.id === newTodo.id
        ? { ...newTodo, completed: !newTodo.completed }
        : todo;
    });
    setTodoList(newTodoList);
  };

  return (
    <div>
      <div className="container">
        <div className="input-field">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={onSubmit} className="add-todo-button">
            追加
          </button>
        </div>

        <ul className="todo-list">
          {todoList?.map((todo) => {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            return <Todos key={todo.id} todo={todo} onCheck={onCheck} />;
          })}
        </ul>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/ban-types
const Todos = (props: { todo: Todo; onCheck: Function }) => {
  const { todo, onCheck } = props;
  const onCheckHandler = () => {
    onCheck(todo);
  };
  return (
    <li className={todo.completed ? 'checked' : ''}>
      <label htmlFor="lastName">
        <input
          id="lastName"
          type="checkbox"
          checked={todo.completed}
          onChange={onCheckHandler}
        />
        <span>{todo.text}</span>
      </label>
    </li>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

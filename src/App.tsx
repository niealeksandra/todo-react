import * as React from 'react';
import { useState } from 'react';

function App() {

  const [counterForId, setCounterForId] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<Todo[]>([]);

  interface Todo {
    id: number;
    text: string;
    done: boolean; 
  }

  const addTodo = () => {
    setCounterForId(counterForId + 1);
    if (inputValue.length > 0) {
      const newItem: Todo = {
        id: counterForId,
        text: inputValue,
        done: false,
      };
      const newItems: Todo[] = [...items];
      newItems.push(newItem);
      setItems(newItems)
      setInputValue('')
    }
  }

  const handleCheck = (e:React.ChangeEvent<HTMLInputElement>, index: number) => {
    if(!items.length) return
    let newItems: Todo[] = [...items]; 
    newItems[index].done = e.target.checked;
    setItems(newItems)
  };

  const deleteItem = (index: number) => {
    let newItems: Todo[] = [...items]; 
    newItems = newItems.filter((item: Todo) => item.id !== items[index].id)
    setItems(newItems)
  }

  return (
    <div style={{margin: '20px'}}>
      <h2>Todos:</h2>
      <ol>
        {items.map((item: Todo, index) => (
          <li key={item.id}>
            <label>
              <input
              type="checkbox"
              checked={item.done}
              onChange={(e) => handleCheck(e, index)}
              />
              <span>{item.text}</span>
            </label>
            <button
            style={{
              padding: '2px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '10px',
            }}
            onClick={() => deleteItem(index)}
            >
              x
            </button>
          </li>
        ))}
      </ol>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Type your todo'
          value={inputValue}
        />
        <button onClick={addTodo}>Add</button>
      </div>
    </div>
  );
}

export default App
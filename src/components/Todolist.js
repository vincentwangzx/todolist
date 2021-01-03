import React, {useState} from 'react';
import Todoform from './Todoform';
import TodoItem from './TodoItem';

function Todolist() {
    const [items, setItem] = useState([]);

    const addTodo = item => {
        if (!item.text || /^\s*$/.test(item.text)) {
            return;
        }

        const newItem = [item, ...items];

        setItem(newItem);
    };



    const updateItem = (itemId, newInput) => {
        if(!newInput.text || /^\s*$/.test(newInput.text)) {
            return;
        }

        setItem(prev => prev.map(todo => (todo.id === itemId ? newInput : todo)))
    }

    const removeItem = id => {
        const removeArr = [...items].filter(item => item.id !== id);

        setItem(removeArr);
    };


    const completeItem = id => {
        let updatedItem = items.map(item => {
            if (item.id === id) {
                item.isComplete = !item.isComplete
            } 
            return item;
        });
        setItem(updatedItem);
    }

    
    const colorItem = id => {
        let updatedItem = items.map(item => {
            if (item.id === id) {
                item.isColored = !item.isColored
            } 
            return item;
        });
        setItem(updatedItem);
    }

    const drop = e => {
        e.preventDefault();
        const item_id = e.dataTransfer.getData('item_id')

        const item = document.getElementById(item_id);
        item.style.display = 'block';

        e.target.appendChild(item);
    }

    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div
            onDrop={drop}
            onDragover={dragOver}
        >
            <h1>Take charge of your today</h1>
            <Todoform onSubmit={addTodo} />
            <TodoItem items={items} completeItem={completeItem} updateItem={updateItem} removeItem={removeItem} colorItem={colorItem}/>
        </div>
    )
}

export default Todolist;

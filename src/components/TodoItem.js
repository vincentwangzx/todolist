import React, {useState} from 'react'; 
import Todoform from './Todoform';
import { VscClose } from 'react-icons/vsc';
import { AiOutlineCheck, AiOutlineEdit, AiOutlineExclamation } from 'react-icons/ai';

function TodoItem({ items, completeItem, removeItem, updateItem, colorItem }) {
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });


    const submitUpdate = value => {

        updateItem(edit.id, value);
        setEdit({
            id: null,
            value:''
        });
    };
    const dragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('item_id', target.id);

    };

    const dragOver = e => {
        e.stopPropagation();
    }; 

    if (edit.id) {
        return <Todoform edit={edit} onSubmit={submitUpdate} />;
    }

    return items.map((item, index) => (
        <div className={item.isComplete ? 'item-row complete' : 'item-row'} id={item.isColored ? 'item-row-colored' : 'item-row'}
         key={index} draggable="true" onDragStart={dragStart} onDragover={dragOver}> 
             <div key={item.id} onClick={() => completeItem(item.id)}>
                 {item.text} 
             </div>
             <div className="icons">
                 <AiOutlineCheck
                 onClick={() => completeItem(item.id)}
                 />
                 <VscClose 
                 onClick={() => removeItem(item.id)}
                 />
                 <AiOutlineEdit onClick={() => setEdit({ id: item.id, value: item.text})}
                 />
                 <AiOutlineExclamation onClick={() => colorItem(item.id) } />
             </div>
         </div>
    ));
}

export default TodoItem

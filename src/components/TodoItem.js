import React, {useState} from 'react'; 
import Todoform from './Todoform';
import { VscClose } from 'react-icons/vsc';
import { AiOutlineEdit } from 'react-icons/ai';

function TodoItem({ items, completeItem, removeItem, updateItem }) {
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

    if (edit.id) {
        return <Todoform edit={edit} onSubmit={submitUpdate} />;
    }

    return items.map((item, index) => (
        <div className={item.isComplete ? 'item-row complete' : 'item-row'}
         key={index}>
             <div key={item.id} onClick={() => completeItem(item.id)}>
                 {item.text}
             </div>
             <div className="icons">
                 <VscClose 
                 onClick={() => removeItem(item.id)}
                 className='delete-icon'
                 />
                 <AiOutlineEdit onClick={() => setEdit({ id: item.id, value: item.text})}
                 className='edit-icon'/>
             </div>
         </div>
    ));
}

export default TodoItem

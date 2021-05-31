import {useState} from 'react'
import plus from '../../assets/img/add.svg'
import close from '../../assets/img/close.svg'

import './addlist.scss'


function AddList({colors, onAdd}){
    const [visible, setVisible] = useState(false)
    const [selectColor, setSelectColor] = useState(colors[0].id)

    const [inputValue, setInputValue] = useState('')

    const createObj = () =>{
        const color = colors.filter(c => c.id === selectColor)
        
        if(!inputValue){
            alert('input smth')
            return
        }
        onAdd({
            id: Math.random(), 
            name: inputValue,
            color
        })
        setInputValue('')
        setVisible(!visible)
    }
    
    const getValue = (event) =>{
        setInputValue(event.target.value)
    }

    const onClickAdd = () =>{
        setVisible(!visible)
    }
    
    const sel = (id) => {
        setSelectColor(id)

    }

    return(
        <div className="">
            <li onClick={onClickAdd} className="add__button">
                <i>
                    <img  src={plus} alt="" />
                </i>
                <span>add list</span>
            </li>
            {visible && 
            <div className="model__add">
                <i onClick={onClickAdd} className="close">
                    <img src={close} alt="close" />
                </i>
                <input onChange={getValue} value={inputValue} className="input" type="text" placeholder="input note"/>
                <div className="add-list__colors">
                    <ul>
                    {colors.map((item, index) =>
                    <li 
                        key={`${item.id}__${index}`} 
                        style={{background: item.hex}}
                        className={selectColor === item.id ? `pickcolor  active` : `pickcolor ` }
                        onClick={() => sel(item.id)}
                        >
                    </li>
                )}
                    </ul>
                </div>
                <button onClick={createObj} className="btn btn--addlist">Add</button>
            </div> }
        </div>
    
    )
}

export default AddList
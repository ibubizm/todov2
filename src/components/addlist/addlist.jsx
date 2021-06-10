import {useState, useEffect} from 'react'
import axios from 'axios'


import plus from '../../assets/img/add.svg'
import close from '../../assets/img/close.svg'

import './addlist.scss'


function AddList({colors, onAdd}){
    const [visible, setVisible] = useState(false)
    const [selectColor, setSelectColor] = useState(null)
    const [inputValue, setInputValue] = useState('')

    useEffect(() =>{
        if(Array.isArray(colors)){
            setSelectColor(colors[0].id)
        }
    }, [colors])


    const createObj = () =>{
        console.log(selectColor, colors)
        // if(){

        // }
        // const color = 
        // axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks")
        // .then(({data}) => console.log(data))

        if(!inputValue){
            alert('input smth')
            return
        }


        axios.post('http://localhost:3001/lists', {name: inputValue, colorId: selectColor}) 
        .then(() => {
            onAdd()
        })
        setInputValue('')
        setVisible(!visible)
    }
    
    const getValue = (event) =>{
        setInputValue(event.target.value)
    }

    const hideAndShow = () =>{
        setVisible(!visible)
    }
    
    const sel = (id) => {
        setSelectColor(id)
    }

    return(
        <div className="">
            <li onClick={hideAndShow} className="add__button">
                <i>
                    <img  src={plus} alt="" />
                </i>
                <span>add list</span>
            </li>
            {visible && 
            <div className="model__add">
                <i onClick={hideAndShow} className="close">
                    <img src={close} alt="close" />
                </i>
                <input onChange={getValue} value={inputValue} className="input" type="text" placeholder="input note"/>
                <div className="add-list__colors">
                    <ul>
                    {colors.map((item, index) =>
                    <li 
                        key={`${item.id}__${index}`} 
                        style={{background: item.hex}}
                        className={selectColor === item.id ? `pickcolor  active` : `pickcolor `}
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
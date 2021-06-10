import listicon from '../assets/img/list.svg'
import remove from '../assets/img/remove.svg'

import {useState} from 'react'
import AddList from './addlist/addlist'

function SideBar({items, colors, onAdd, onRemove, onClickItem}){
    const [id, setId] = useState(0)
    const toggleState = (index) =>{
        setId(index)
    }
    
    return(
        <div className="sidebar__content">
            <div className="list__title">
                <i>
                    <img src={listicon} alt="" />
                </i>
                <span>all lists</span>
            </div>
            <ul className="list">
                {items && items.map((item, index) =>
                    <li 
                        onClick={() => {toggleState(index);
                        onClickItem(item)}} 
                        key={`${item.name}__${index}`} 
                        className={id === index ? 'list__element active' : 'list__element'}>
                        {id === index ? 
                            <>
                                <i style={{background: item.color.hex}} className={`badge`}>
                                {item.tasks && <div>{item.tasks.length}</div> }
                                </i>
                                <span>{item.name}</span>
                                <img onClick={() => onRemove(item.id)} className="remove__list" src={remove} alt="remove" />
                                
                            </> 
                            : 
                            <>
                                <i style={{background: item.color.hex}} className={`badge`}>
                                {item.tasks && <div>{item.tasks.length}</div> }
                                </i>
                                <span>{item.name}</span>
                                
                            </>}                    
                    </li>
                )}
            </ul>
            <AddList onAdd={onAdd} colors={colors}/>
        </div>
    )
}

export default SideBar
import './tasks.scss'
import edit from '../../assets/img/edit.svg'
import add from '../../assets/img/add.svg'

import {useState, useEffect} from 'react'
import axios from 'axios'

function Tasks({tasks, onEditListTitle, createNewTask, onEditTasks}){
    const [newTask, setNewTask] = useState(false)
    const [input, setInput] = useState('')

    // console.log(tasks)
    
    const editTitle = () => {
        const title = window.prompt('input new title', tasks.name)
        onEditListTitle(tasks.id, title)
        axios.patch(`http://localhost:3001/lists/${tasks.id}`, {name: title})
    } 

    const onEditTask = (item) =>{
        const id = item.id
        const taskId = tasks.id
        const newText = window.prompt('input new task')
        if(newText){
            onEditTasks( newText, id, taskId)
            axios.patch(`http://localhost:3001/tasks/${id}`, {text: newText})

        }

    }


    const createTask = () =>{
        createNewTask(input, tasks.id)
        toggleInput()
        setInput('')
    }


    const getValue = (e) =>{ 
        setInput(e.target.value)
    }


    const toggleInput = () =>{
        setNewTask(!newTask)
    }


    return(
        <div className="tasks">
            
            <h2 className="tasks__title" style={{color: tasks.color.hex}}>
                {tasks.name}
                
                <img onClick={editTitle} src={edit} alt="edit" />
            </h2>
            <div className="cheackbox">
                
                {tasks && tasks.tasks.map((item, index) => 
                <div className="task__item" key={index}>
                    <input id={`check_${item.id}`} className="check" type="checkbox" />
                    <label htmlFor={`check_${item.id}`}>
                        <svg
                            width="11"
                            height="8"
                            viewBox="0 0 11 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            
                            <path
                                d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                stroke="#000"
                                strokeWidth="1.5"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </label>
                    <p className="task__name">
                        {item.text} 
                        <img onClick={() => onEditTask(item, index)} src={edit} alt="edit" />
                    </p>
                </div>
                ) }
                {newTask && <div className="new__task">
                    <input className="task__input" value={input} onChange={getValue} type="text" />
                    <button className="btn btn__task" style={{background: tasks.color.hex}} onClick={createTask}>add</button>
                </div>}
                <div onClick={toggleInput} className="add_task">
                    <img src={add} alt="add" />
                    <p>add task</p>
                </div>
            </div>
        </div>
    )
}

export default Tasks
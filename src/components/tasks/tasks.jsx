import './tasks.scss'
import edit from '../../assets/img/edit.svg'
import add from '../../assets/img/add.svg'

import {useState} from 'react'
import axios from 'axios'

function Tasks({tasks, onEditListTitle, createNewTask, onEditTasks, onChecked}){
    const [newTask, setNewTask] = useState(false)
    const [input, setInput] = useState('')
    const [check, setCheck] = useState(false)

    const editTitle = () => {
        const title = window.prompt('input new title', tasks.name)
        onEditListTitle(tasks.id, title)
        axios.patch(`http://localhost:3001/lists/${tasks.id}`, {name: title})
    } 

    const onEditTask = (item, index) =>{
        const id = item.id
        const newText = window.prompt('input new task')
        if(newText){
            axios.patch(`http://localhost:3001/tasks/${id}`, {text: newText})
            .then(({data}) => onEditTasks(newText, tasks.id, index))
        }
    }

    const createTask = () =>{
        if(input){
            axios.post('http://localhost:3001/tasks', {text: input, listId: tasks.id, complited: false})
            .then(({data}) => {
                createNewTask(data, tasks.id)
                toggleInput()
                setInput('')
            })
        }
    }

    const getValue = (e) =>{ 
        setInput(e.target.value)
    }

    const toggleInput = () =>{
        setNewTask(!newTask)
    }

    const toggleCheck = (item, index) =>{
        const comp = item.complited
        axios.patch(`http://localhost:3001/tasks/${item.id}`, {complited: !comp})
        .then(() => {
            onChecked(!comp, tasks.id, index)
        })

    }


    return(
        <div className="tasks">
            
            <h2 className="tasks__title" style={{color: tasks.color.hex}}>
                {tasks.name}
                
                <img onClick={editTitle} src={edit} alt="edit" />
            </h2>
            <div className="cheackbox">
                
                {tasks && tasks.tasks.map((item, index) => 
                <div className="task__item" key={`${index}__${Math.random() }`}>
                    {/* <input 
                        id={`check_${item.id}`}
                        htmlFor={`check_${item.id}`}
                        type="checkbox" 
                    /> */}
                    <label className={item.complited ? `check active` : `check`}  onClick={() => toggleCheck(item, index)} >
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
                {newTask ? <div className="new__task">
                    <input className="task__input" value={input} onChange={getValue} type="text" />
                    <button className="btn btn__task" style={{background: tasks.color.hex}} onClick={createTask}>add</button>
                    <button className="btn btn__task cancel" onClick={createTask} onClick={toggleInput} >cancel</button>
                </div>: 
                <div onClick={toggleInput} className="add_task">
                    <img src={add} alt="add" />
                    <p>add task</p>
                </div>
                }
                
            </div>
        </div>
    )
}

export default Tasks
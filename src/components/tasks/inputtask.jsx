

function InputTask(){
    return(
        <div className="new__task">
            <input className="task__input" value={input} onChange={getValue} type="text" />
            <button className="btn btn__task" style={{background: tasks.color.hex}} onClick={createTask}>add</button>
        </div>
    )
}

export default InputTask
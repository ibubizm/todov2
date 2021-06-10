import {useState, useEffect} from 'react'
import SideBar from './components/sidebar'
import Tasks from './components/tasks/tasks'
import axios from 'axios'

import './App.scss';
import './styles/sidebar.scss'

function App() {
  const [colors, setColors] = useState(null)
  const [lists, setLists] = useState(null)
  const [activeList, setActiveList] = useState(null)


  useEffect(() =>{
    axios.get("http://localhost:3001/colors")
    .then(({data}) => setColors(data));

    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks")
    .then(({data}) => {
      setLists(data)
      if(activeList == null){
        setActiveList(data[0])
      }
    })
  }, [])

  const onRemove = (id) =>{
    if(window.confirm('are you really?')){
      let newArray = lists.filter(item => item.id !== id)
      setLists(newArray)
      axios.delete(`http://localhost:3001/lists/${id}`)
    }
}

  const onAddList = () =>{
    axios.get("http://localhost:3001/lists?_expand=color&_embed=tasks")
    .then(({data}) => setLists(data))
  }

  const newTasks = (data, taskid)  =>{
    const newList = lists.map(item => {
      if(item.id === taskid){
        item.tasks = [...item.tasks, data]
      }
      return item
    })
    setLists(newList)
  }

  const onEditListTitle = (id, title) =>{
    const newList = lists.map(item => {
      if(item.id === id){
        item.name = title
      }
      return item
    })
    setLists(newList)
  }

  const onEditTasks = (newtext, id, index) =>{
    const newList = lists.map(item => {
      if(item.id === id){
        item.tasks[index].text = newtext
      }
      return item
    })
    setLists(newList)
  }

  const checkBox = (check, id, index) =>{
    const newList = lists.map(item => {
      if(item.id === id){
        item.tasks[index].complited = check
      }
      return item
    })
    setLists(newList)
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <SideBar 
          onClickItem={(item) => setActiveList(item)} 
          onAdd={onAddList} 
          onRemove={onRemove} 
          colors={colors} 
          items={lists} 
        />
      </div>
      { activeList && <Tasks
       createNewTask={newTasks} 
       onEditListTitle={onEditListTitle} 
       tasks={activeList}
       onEditTasks={onEditTasks}
       onChecked={checkBox}
       />}
    </div>
  )
}

export default App;
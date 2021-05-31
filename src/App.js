import {useState, useEffect} from 'react'
import SideBar from './components/sidebar'
import Tasks from './components/tasks/tasks'
import db from './assets/db.json'
import axios from 'axios'

import './App.scss';
import './styles/sidebar.scss'

function App() {

  const [lists, setLists] = useState(
    db.lists.map(item =>{
      item.color = db.colors.filter(color => color.id === item.colorId)

      return item
    })
  )

  useEffect(() =>{
    axios.get("http://localhost:3001/lists?_expand=color")
    .then(({data}) => console.log("response", data))

  }, [lists])
    
  const onRemove = (index) =>{
    if(window.confirm('are you really?')){
      let newArray = [...lists]
      newArray.splice(index, 1)
      setLists(newArray)
    }
    
    console.log(lists)
}


  const onAddList = (obj) =>{
    const newList = [...lists, obj]
    setLists(newList)
  }


  return (
    <div className="todo">
      <div className="todo__sidebar">
        <SideBar onAdd={onAddList} onRemove={onRemove} colors={db.colors} items={lists} />
      </div>
      <Tasks />
    </div>
  )
}

export default App;
import {useEffect, useState } from 'react'
import './style.css'

export default function App() {
  const [newItem, setnewItem] = useState("")
  
  const [lists, setlists] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(lists))
  }, [lists])

  function handleSubmit(e) {
    e.preventDefault()
    
    /* add items function */
    setlists(currenttodos => {
      return[
        ...currenttodos,
        { id: crypto.randomUUID(), title:newItem, completed: false }
      ]
    })

    setnewItem("")
  }

  /* check or uncheck the box function */
function togglelist(id, completed){
  setlists(currenttodos => {
    return currenttodos.map(list => {
      if (list.id === id) {
        return {...list, completed}
      }

      return list
    })
  })
}

/* delete function */
function deletelist(id) {
  setlists(currentlists => {
    return currentlists.filter(list => list.id !== id)
  })
}

  return (
    <>
    <form onSubmit={handleSubmit} className='new-item-form'>

    <div className='title'>
    <h1>Shopping List</h1>
    </div>
    <div className="form-row">
    <label htmlFor='item'><b>Items To Buy</b></label>
    </div>
    <input 
    value={newItem} 
    onChange={e => setnewItem(e.target.value)} 
    type="text" 
    id="item">
    </input>
    <div>
    <button className="button">
    Add
    </button>
    </div>
    </form>

    <ul className="list">

      {lists.length === 0 && "Your shopping cart is empty!"}


      {lists.map(list => {
  return (
    <li key={list.id}>
      <span>{list.title}</span>
      <button onClick={() => deletelist(list.id)} className="buttondel">✘</button>
    </li>
  );
})}

    </ul>
    </>
  )
}


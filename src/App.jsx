import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid';

import Navbar from "./components/Navbar"


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)


    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }


  const toggleFinished = (params) => {
    setshowFinished(!showFinished)


  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id == id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()


  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS()


  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, iscolmpleted: false }])
    setTodo(" ")
    console.log(todos)
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()


  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;

    })
    let newTodos = [...todos]

    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()


  }





  return (
    <>
      <Navbar />

      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-50 min-h-[80vh] md:w-1/2">
        <h1 className=" font-bold  text-center text-xl "> iTask - Manage your todos at one place</h1>

        <div className="addTodo my-5 flex flex-col  gap-4">
          <h2 className="text-lg font-bold "> Add a Todo</h2>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className=" w-full py-1 px-5" />
            <button onClick={handleAdd} disabled={todo.length <= 3} className=" bg-violet-800 disabled:bg-violet-700 hover:bg-violet-950 p-3  mx-2 py-1 text-sm  font-bold text-white rounded-md cursor-pointer"> save </button>
          </div>

        </div>

        <input className=" my-4" onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished



        <h2 className=" text-xl font-bold">Your Todos </h2>
        <div className="todos">
          {todos.length === 0 && <div className=" m-5"> No Todos to display</div>}

          {todos.map(item => {

            return (showFinished || item.isCompleted) && <div key={item.id} className="todo flex md:w-full my-3 justify-between">
              <div className=" flex gap-10 ">
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.iscompleted} id="" />
                <div className={item.iscompleted ? " line-through" : ""}>{item.todo}</div>

              </div>

              <div className="buttons flex h-full ">
                <button onClick={(e) => handleEdit(e, item.id)} className=" bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-3"><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className=" bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-3"> <RiDeleteBin5Fill /></button>

              </div>
            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App

import React, { useState } from 'react'
import { useTodo } from '../contexts';

function Form() {
    const [todo, setTodo] = useState({ title: '', description: '', dueDate: '', priority: 'low' })
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault()

        if(!todo.title) return
        addTodo({...todo, completed: false})
        setTodo({ title: '', description: '', dueDate: '', priority: 'low' });
    }
 
    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
      };


    return (
        <form onSubmit={add} className="grid gap-2 rounded-md">
            <label>Title</label>
            <input
                type="text"
                name='title'
                placeholder="Write Todo..."
                className="text-lg h-12 w-full border border-black/60 rounded-lg px-3 outline-none duration-150 bg-white/10 py-1.5"
                value={todo.title}
                onChange={handleChange}
            />
            <br />
            <label>Description</label>
            <input
                type="desc"
                name='description'
                placeholder="Write Description..."
                className="text-lg h-20 w-full border border-black/60 rounded-lg px-3 outline-none duration-150 bg-white/10 py-1.5"
                value={todo.description}
                onChange={handleChange}
            />
            <br />
            <div className="flex gap-2 justify-between">
                <div className="grid w-full">
                <label className='mb-2'>Due Date</label>
                <input type="date" name="dueDate"  className="text-lg h-12 w-full border  border-black/60 rounded-lg px-3 outline-none duration-150 bg-white/10 py-1.5" value={todo.dueDate} onChange={handleChange} required />
                </div>

                <div className="grid w-full">
                <label className='mb-2 pl-2'>Priority</label>
                <select name="priority" value={todo.priority} onChange={handleChange} className="text-lg h-12 w-full border border-black/60 rounded-lg px-3 outline-none duration-150 bg-white/10 py-1.5">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>
            </div>

            <button type="submit" className="rounded-lg px-6 py-3 mt-8 bg-teal-900/60 text-black shrink-0">
                Add
            </button>
        </form>
    );
}


export default Form

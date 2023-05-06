import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const CreateTask = ({ tasks, setTasks }) => {

    const formData = (e) => {
        e.preventDefault()
        const name = e.target.text.value

        if (name.length <= 0) {
            return alert('Write your task first')
        }

        const newTask = { id: uuidv4(), name: name, status: "todo" }
        setTasks((prev) => [...prev, newTask])
        localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))

        const countTag = document.querySelectorAll('.count');
        countTag[0].classList.remove('display')
        countTag[0].classList.add('hide')
        setTimeout(() => {
            countTag[0].classList.remove('hide')
            countTag[0].classList.add('show')
        }, 400)
        setTimeout(() => {
            countTag[0].classList.remove('show')
            countTag[0].classList.add('display')
        }, 500)
        e.target.reset()
    }

    return (
        <div className='mt-20'>
            <form action="" className='text-center' onSubmit={formData}>
                <input type="text" className='border border-r-0 border-slate-400 py-[6px] px-[10px] rounded-md rounded-r-none w-2/4' name='text' placeholder='Create a new task.....' />
                <input type="submit" value="submit" className='bg-yellow-600 py-[6px] px-[16px] border border-slate-400 border-l-0 text-white btn-default cursor-pointer rounded-md rounded-l-none uppercase' />
            </form>
        </div>
    );
};

export default CreateTask;
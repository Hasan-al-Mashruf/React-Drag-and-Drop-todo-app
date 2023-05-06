import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProgressList = ({ tasks, setTasks }) => {

    const [tasklist, setTaskList] = useState([])
    const [taskCount, setTaskCount] = useState(0)
    useEffect(() => {
        const updatedTaskList = tasks.filter(task => task.status == 'inProgress')

        setTaskList(updatedTaskList)
        setTaskCount(updatedTaskList.length < 10 ? `0${updatedTaskList.length}` : updatedTaskList.length)
    }, [tasks])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => {
            addItemToSection(item.id)
            const countTag = document.querySelectorAll('.count');
            countTag[1].classList.remove('display')
            countTag[1].classList.add('hide')
            setTimeout(() => {
                countTag[1].classList.remove('hide')
                countTag[1].classList.add('show')
            }, 400)
            setTimeout(() => {
                countTag[1].classList.remove('show')
                countTag[1].classList.add('display')
            }, 500)

            console.log(countTag[1])
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection = (id) => {

        setTasks((prev) => {
            const newTask = prev.map(task => {
                if (task.id === id) {
                    return { ...task, status: 'inProgress' }
                }
                return task
            })
            localStorage.setItem('tasks', JSON.stringify(newTask))
            return newTask
        })

    }

    const deleteTask = (id) => {
        const updatedTask = tasklist.filter(task => {
            return task.id !== id
        })
        setTaskList(updatedTask)



        const deletedTask = tasklist.find(task => task.id == id)
        toast(`${deletedTask.name} is deleted successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

        setTasks(prev => {
            const newTasks = prev.filter(task => task.id !== id)
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            return newTasks;
        });

        setTaskCount(updatedTask.length < 10 ? `0${updatedTask.length}` : updatedTask.length)
    }




    return (
        <div ref={drop}>
            <div className='flex justify-between items-center bg-red-700 rounded-sm text-white mb-3 relative h-12' >
                <h2 className='uppercase bg-gray-700 h-full flex items-center w-[85%] pl-2'>In progress </h2><span className='absolute right-[10px] count display'>{taskCount}</span>
            </div>
            {tasklist.map(task => <Section task={task} key={task.id} deleteTask={deleteTask}></Section>)}
        </div>
    );
};

const Section = ({ task, deleteTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            ref={drag}
            className={`flex justify-between items-center shadow-sm flip-on-hover ${isActive ? 'active' : ''}`}
            onMouseOver={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
        >
            <h2 className='capitalize shadow-sm p-2 my-2'>{task?.name} </h2>
            <AiOutlineMinusCircle onClick={() => deleteTask(task.id)} />
        </div>
    )
}
export default ProgressList;
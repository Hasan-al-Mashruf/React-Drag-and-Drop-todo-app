import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskList = ({ tasks, setTasks }) => {

    const [tasklist, setTaskList] = useState([])
    const [taskCount, setTaskCount] = useState(0);


    useEffect(() => {
        const updatedTaskList = tasks.filter(task => task.status == 'todo')
        setTaskList(updatedTaskList)
        setTaskCount(updatedTaskList.length < 10 ? `0${updatedTaskList.length}` : updatedTaskList.length)
    }, [tasks])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => {
            addItemToSection(item.id)
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

            console.log(countTag[0])
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addItemToSection = (id) => {

        setTasks((prev) => {
            const newTask = prev.map(task => {
                if (task.id === id) {
                    return { ...task, status: 'todo' }
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

        setTaskList(updatedTask)

        setTasks((prev) => {
            const newTask = prev.filter(task => task.id !== id);
            localStorage.setItem('tasks', JSON.stringify(newTask));
            return newTask;
        });

        setTaskCount(updatedTask.length < 10 ? `0${updatedTask.length}` : updatedTask.length)
    }

    return (
        <div ref={drop}>
            <div className='flex justify-between items-center bg-red-700 rounded-sm text-white mb-3 overflow-hidden relative h-12' >
                <h2 className='uppercase bg-gray-700 h-full flex items-center w-[85%] pl-2'>Todo </h2><div>
                    <div>
                        <span className='absolute right-[10px] count display'>{taskCount}</span>
                    </div>
                </div>
            </div>
            {tasklist.map(task => <Section task={task} key={task.id} deleteTask={deleteTask}></Section>)}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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
            <h2 className='capitalize p-2 my-2'>{task?.name} </h2>
            <AiOutlineMinusCircle onClick={() => deleteTask(task.id)} />
        </div>
    )
}
export default TaskList;
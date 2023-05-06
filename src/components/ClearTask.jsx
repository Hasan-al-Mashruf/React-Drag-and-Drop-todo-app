import React, { useEffect, useState } from 'react';

const ClearTask = ({ setTasks, tasks, setInsideLoader }) => {


    const clearData = () => {
        setTasks(() => {
            const emptyTask = []
            localStorage.setItem('tasks', JSON.stringify(emptyTask));
            return emptyTask;
        });
    }
    const clearFinishData = () => {
        setInsideLoader(true)
        setTimeout(() => {
            setTasks((prev) => {
                const filteredTasks = prev.filter(task => task.status !== 'finish')
                localStorage.setItem('tasks', JSON.stringify(filteredTasks))
                return filteredTasks
            })
            setInsideLoader(false)
        }, 2000)
    }
    
    return (
        <div className='text-end'>
            <button className='btn btn-primary bg-yellow-600 w-32 h-9 text-white uppercase' onClick={clearData}>Reset</button>
            <br />
            <button className='btn btn-primary bg-transparent border border-yellow-600 w-32 h-9 text-yellow-600 uppercase mt-5' onClick={clearFinishData}>Clear</button>
        </div>
    );
};

export default ClearTask;
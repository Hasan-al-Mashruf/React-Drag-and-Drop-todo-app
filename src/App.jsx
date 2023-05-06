import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import TaskList from './components/TaskList'
import ProgressList from './components/ProgressList'

import Finish from './components/Finish';
import ClearTask from './components/ClearTask';
import Loader from './components/Loader';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';



function App() {
  const [tasks, setTasks] = useState([])
  const [loader, setLoader] = useState(true)
  const [insideLoader, setInsideLoader] = useState(false)


  const [mybackend, setMyBackend] = useState(true);

  useEffect(() => {
    const prevData = JSON.parse(localStorage.getItem('tasks'))
    setTasks(prevData || [])
    setTimeout(() => setLoader(false), 5000)

    // Add event listener for window resize event
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize()
    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [])




  // Handle window resize event
  const handleWindowResize = () => {
    if (window.innerWidth < 980) {
      setMyBackend(false);
    } else {
      setMyBackend(true);
    }
  };

  console.log(mybackend)

  return (
    <div>
      {loader ? <Loader /> : <div className='relative'>
        <div className='md:w-[900px] mx-auto px-4 w-full'>
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <div className='mt-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6'>
            <DndProvider backend={mybackend ? HTML5Backend : TouchBackend}>
              <TaskList tasks={tasks} setTasks={setTasks} />
              <ProgressList tasks={tasks} setTasks={setTasks} />
              <Finish tasks={tasks} setTasks={setTasks} insideLoader={insideLoader} setInsideLoader={setInsideLoader} />
            </DndProvider>
          </div>
        </div>
        <div className='fixed md:top-10 lg:top-1/2 lg:-translate-y-1/2 right-[10px]'>
          <ClearTask tasks={tasks} setTasks={setTasks} setInsideLoader={setInsideLoader} />
        </div>
      </div>}
    </div>

  )
}

export default App

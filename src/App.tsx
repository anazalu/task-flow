import { useState } from "react";
import Header from "./components/Header";
import Tasks, { TaskType } from "./components/Tasks";
import AddTask from "./components/AddTask";

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>(
    [
      {
        id: 1,
        text: "Doctors Appointment",
        day: "Feb 5th at 2:30pm",
        reminder: true
      },
      {
        id: 2,
        text: "Meeting at Work",
        day: "Feb 6th at 1:30pm",
        reminder: true
      },
      {
        id: 3,
        text: "Meeting at Home",
        day: "Feb 6th at 3:30pm",
        reminder: false
      },
    ]
  )

  //Delete Task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  //Toggle Reminder
  const toggleReminder = (id: number) => {
    setTasks(tasks.map((task) => task.id == id ? {...task, reminder: !task.reminder} : task))
  }
 
  return (
    <div className="container">
      <Header title='Task Tracker' />
      <AddTask />
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No tasks'}
    </div>
  );
}

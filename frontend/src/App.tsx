import { useState } from "react";
import Header from "./components/Header";
import Tasks, { TaskType } from "./components/Tasks";
import AddTask from "./components/AddTask";

export default function App() {
  const [showAddTask, setShowAddTask] = useState<boolean>(false)

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

  // Add Task
  const addTask = (task: TaskType) => {
    const id: number = Math.floor(Math.random() * 10000) + 1
    const NewTask: TaskType = { 'id': id, 'text': task.text, 'day': task.day, 'reminder': task.reminder }
    setTasks([...tasks, NewTask])
  }

  // Delete Task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id != id))
  }

  // Toggle Reminder
  const toggleReminder = (id: number) => {
    setTasks(tasks.map((task) => task.id == id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} title='Task Tracker' />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks'}
    </div>
  );
}

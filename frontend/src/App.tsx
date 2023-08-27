import { useState } from "react";
import Header from "./components/Header";
import Tasks, { TaskType } from "./components/Tasks";
import AddTask from "./components/AddTask";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function App() {
  const queryClient = useQueryClient();
  const [showAddTask, setShowAddTask] = useState<boolean>(false)

  const { isLoading: isLoadingTasks, data: tasks, error: errorTasks } = useQuery<TaskType[]>(['tasks'], (): Promise<TaskType[]> =>
    axios
      .get('http://localhost:9090/api/todo',
      )
      .then((res) => res.data),
  );

  const addTaskMutation = useMutation((task: TaskType) => {
    return axios.post('http://localhost:9090/api/todo', { ...task })
      .then((_) => queryClient.invalidateQueries(['tasks']))
  });

  const toggleReminderMutation = useMutation((task: TaskType) => {
    return axios.put(`http://localhost:9090/api/todo`, { ...task })
      .then((_) => queryClient.invalidateQueries(['tasks']))
  });

  const deleteTaskMutation = useMutation((taskId: number) => {
    return axios.delete(`http://localhost:9090/api/todo/${taskId}`)
      .then((_) => queryClient.invalidateQueries(['tasks']));
  });

  // Add Task
  const addTask = (task: TaskType) => {
    addTaskMutation.mutate(task)
  }

  // Delete Task
  const deleteTask = (id: number | undefined) => {
    if (id) {
      deleteTaskMutation.mutate(id)
    }
  }

  // Toggle Reminder
  const toggleReminder = (id: number | undefined) => {
    const task: TaskType | undefined = tasks?.find(t => t.id == id)
    if (task) {
      toggleReminderMutation.mutate({ id: id, text: task.text, dayAndTime: task.dayAndTime, reminder: !task.reminder });
    }
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} title='Task Tracker' />
      {showAddTask && <AddTask onAdd={addTask} />}
      {(tasks && tasks.length > 0) ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks'}
    </div>
  );
}

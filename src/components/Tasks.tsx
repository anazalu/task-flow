import Task from "./Task";
export interface TaskType {
    id: number;
    text: string;
    day: string;
    reminder: boolean;
}

interface TasksProps {
    tasks: TaskType[];
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

export default function Tasks({ tasks, onDelete, onToggle }: TasksProps) {

    return (
        <>
            {tasks.map((task: TaskType) => (
                <Task key={task.id} task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>

    )
}

import { FaTimes } from 'react-icons/fa'
import { TaskType } from "./Tasks";

interface TaskProps {
    task: TaskType;
    onDelete: (id: number) => void;
    onToggle: (id: number) => void;
}

export default function Task({ task, onDelete, onToggle }: TaskProps) {

    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>{task.text} <FaTimes style={{ color: 'red', cursor: 'pointer' }} onClick={() => onDelete(task.id)} /></h3>
            <p>{task.day}</p>
        </div>

    )
}

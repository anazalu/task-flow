import { FormEventHandler, useState } from "react";
import { TaskType } from "./Tasks";

export interface AddTaskProps {
    onAdd: (task: TaskType) => void;
}

export default function AddTask({ onAdd }: AddTaskProps) {
    const [text, setText] = useState<string>('')
    const [day, setDay] = useState<string>('')
    const [reminder, setReminder] = useState<boolean>(false)

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (!text) {
            alert('Please add a task')
            return
        }

        onAdd({ 'id': 999, 'text': text, 'day': day, 'reminder': reminder })
        setText('')
        setDay('')
        setReminder(false)
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className='form-control'>
                <label>Day and Time</label>
                <input type='text' placeholder='Day and Time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className='form-control form-control-check'>
                <label>Set Reminder</label>
                <input type='checkbox' checked={reminder} value={~~reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
            </div>
            <input type='submit' value='Save Task' className='btn btn-block' />
        </form>
    )
}

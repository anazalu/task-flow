import Button from "./Button"
import { TaskType } from "./Tasks";
// import onAdd from

interface HeaderProps {
    title: string
    onAdd: () => void;
    showAdd: boolean;
}

export default function Header({ title, onAdd, showAdd }: HeaderProps) {
    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />
        </header>
    )
}

// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }

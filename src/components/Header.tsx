import Button from "./Button"

interface HeaderProps {
    title: string
}

export default function Header({ title }: HeaderProps) {
    const onClick = () => {
        console.log('Hello')
    }

    return (
        <header className='header'>
            <h1>{title}</h1>
            <Button text='Add' onClick={onClick}/>
        </header>
    )
}

// const headingStyle = {
//     color: 'red', 
//     backgroundColor: 'black'
// }

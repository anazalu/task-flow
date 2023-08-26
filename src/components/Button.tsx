interface ButtonProps {
    color?: string;
    text: string;
    onClick?: () => void; 
}

export default function Button({ color = 'steelblue', text, onClick }: ButtonProps) {

    return <button onClick={onClick} className='btn' style={{ backgroundColor: color }} >{text}</button>
}

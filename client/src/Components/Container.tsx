import { ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

export function Container(props: ContainerProps) {
    return (
        <div className="ui container">
            {props.children}
        </div>
    )
}

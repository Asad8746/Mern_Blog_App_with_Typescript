import { MessageTypes } from "../../Enums";
interface MessageProps {
    type: MessageTypes,
    message: string
}
export const Message = ({ message, type }: MessageProps) => {
    return (
        <div className={type}>
            <p>{message}</p>
        </div>
    )
}

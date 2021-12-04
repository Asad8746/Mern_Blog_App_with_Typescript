import { Loader, Message } from './'
import { MessageTypes } from '../Enums'

interface ListProps<D> {
    data: D[],
    loading: boolean,
    error: string,
    render: (blog: D) => JSX.Element
}

export const List = <T,>({ data, error, loading, render }: ListProps<T>): JSX.Element => {
    if (loading) {
        return (
            <div style={{ height: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Loader isInline />
            </div>
        )
    }
    if (error) {
        return <Message type={MessageTypes.error} message={"Got some error"} />
    }
    return (
        <div>
            {
                data.map((item: T): JSX.Element => {
                    return render(item)
                })
            }
        </div>
    )
}

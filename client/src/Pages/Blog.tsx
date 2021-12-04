import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getBlog } from "../actions";
import { Container, Loader, Message } from "../Components";
import { MessageTypes, RoutesEnum } from "../Enums";
import { RootState } from "../reducers/Types";


export function Blog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams<"id">()
    const { id } = params
    const { blog, error, loading } = useSelector((state: RootState) => state.blog);
    useEffect(() => {
        if (id) {
            dispatch(getBlog(id))
        } else {
            navigate(RoutesEnum.blogsRoute)
        }
    }, []);
    return (
        <Container>
            {
                loading ?
                    <div
                        style={{ height: "20rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Loader isInline />
                    </div> :
                    error ?
                        <Message type={MessageTypes.error} message={error} /> :
                        (
                            <div className="ui segment">
                                <h2 className="ui header">{blog.title}</h2>
                                <p className="ui date">{blog.createdAt.toDateString()}</p>
                                <p >{blog.description}</p>
                            </div>
                        )
            }
        </Container>
    )
}


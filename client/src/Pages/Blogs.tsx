import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { getBlogs } from "../actions"
import { Blog } from "../actions/Types"
import { Container, List } from "../Components"
import { RootState } from "../reducers/Types"

export const Blogs = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { blogs, error, loading } = useSelector((state: RootState) => state.blogs);
    useEffect(() => {
        dispatch(getBlogs())
    }, [dispatch])
    const renderBlog = useCallback((blog: Blog) => {
        return (
            <div className="ui segment" key={blog._id} onClick={() => navigate(`/${blog._id}`)}>
                <div className="ui header">{blog.title}</div>
                <p className="ui date">{blog.createdAt.toDateString()}</p>
                <p>{blog.description}</p>
            </div>
        )
    }, [])
    return (
        <Container>
            <List<Blog>
                data={blogs}
                loading={loading}
                error={error}
                render={renderBlog}
            />
        </Container>
    )
}

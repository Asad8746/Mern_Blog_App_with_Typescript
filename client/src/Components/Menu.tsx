
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../reducers/Types";
import { logout } from "../actions";
import { Container } from "./Container"
import { RoutesEnum } from "../Enums";
export const Menu = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state: RootState) => state.auth);
    const onLogoutClick = () => {
        dispatch(logout())
    }
    return (
        <Container>
            <div className="ui green  menu">
                {
                    isAuth ? <Link to={RoutesEnum.blogsRoute} className="active item" style={{ cursor: "pointer" }}>
                        Home
                    </Link> : <Link to={RoutesEnum.signupRoute} className="ui item" style={{ cursor: "pointer" }}>
                        Register
                    </Link>
                }

                <div className="right menu">
                    {
                        !isAuth ? (
                            <Link to={RoutesEnum.loginRoute} className="ui item" style={{ cursor: "pointer" }}>
                                Login
                            </Link>
                        )
                            :
                            (
                                <>
                                    <Link to={RoutesEnum.createBlogRoute} className="ui green item" style={{ cursor: "pointer" }}>
                                        Create New Blog
                                    </Link>
                                    <div className="ui item" style={{ cursor: "pointer" }} onClick={onLogoutClick}>
                                        Logout
                                    </div>
                                </>
                            )
                    }
                </div>
            </div>
        </Container>
    );

}
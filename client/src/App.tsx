import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login, Register, Blogs, CreateBlog } from "./Pages";

import { RootState } from "./reducers/Types";

import { getUser } from "./actions";
import { LoaderSizes, RoutesEnum } from "./Enums";
import { Loader, Menu } from "./Components";
import { Blog } from "./Pages/Blog";


function App() {
  const { isAuth, loading } = useSelector((state: RootState) => state.auth);
  const dispatcher = useDispatch();
  useEffect(() => {
    dispatcher(getUser());
  }, [dispatcher]);
  if (loading) {
    return <Loader size={LoaderSizes.large} />
  }
  return (
    <BrowserRouter >
      <Menu />
      <Routes >
        {
          isAuth ?
            <>
              <Route path={RoutesEnum.blogsRoute} element={<Blogs />} />
              <Route path={RoutesEnum.createBlogRoute} element={<CreateBlog />} />
              <Route path={RoutesEnum.blogRoute} element={<Blog />} />
            </>
            : (
              <>
                <Route path={RoutesEnum.loginRoute} element={<Login />} />
                <Route path={RoutesEnum.signupRoute} element={<Register />} />
              </>
            )
        }

      </Routes>
    </BrowserRouter>
  );
}

export default App;

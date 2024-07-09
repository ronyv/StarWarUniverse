import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        &nbsp;&nbsp;&nbsp;
        <Link to="/123/detail">Detail</Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
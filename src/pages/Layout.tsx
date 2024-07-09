import { Outlet, Link } from "react-router-dom";
import './style.css'

const Layout = () => {
  return (
    <>
      <nav className="mainNav">
        <Link to="/">Home</Link>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
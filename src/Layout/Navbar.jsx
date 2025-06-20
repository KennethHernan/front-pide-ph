import logo_sesion from "../assets/sesion-close-blue.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <>
      {isAuthenticated ? (
        <div className="">
          <p className="">
            {user.username}
          </p>
          <Link
            to="/login"
            onClick={logout}
            className=""
          >
            Salir
            <img className="" src={logo_sesion} draggable="false" />
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;

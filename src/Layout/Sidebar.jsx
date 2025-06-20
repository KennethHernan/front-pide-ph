import { Link, useLocation, useNavigate } from "react-router-dom";
import Option1 from "../assets/dni-blue.svg";
import Option1_1 from "../assets/dni-white.svg";
import Option2 from "../assets/car-blue.svg";
import Option2_2 from "../assets/car-white.svg";
import Option3 from "../assets/predio-blue.svg";
import Option3_3 from "../assets/predio-white.svg";
import { useAuth } from "../context/AuthContext";
import ImagenLogo from "../assets/logoMDPH-Horizontal.png";
import { useState, useEffect } from "react";

function CustomLink({ to, label, defaultImage, hoverImage }) {
  const location = useLocation();
  const isHovered = location.pathname === to;
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={` ${
        isActive ? "shadow-md bg-[#197BBD]" : isHovered ? "" : ""
      }`}
    >
      <img
        src={isHovered ? hoverImage : defaultImage}
        alt="Imagen"
        draggable="false"
      />
      <p
        className={` ${
          isActive ? "text-white" : isHovered ? "" : ""
        }`}
      >
        {label}
      </p>
    </Link>
  );
}

function Sidebar() {
  const { isAuthenticated, userOriginal } = useAuth();
  const [access, setAccess] = useState([]);
  const navigate = useNavigate();

  const Home = () => {
    navigate("/");
  };


  return (
    <>
      {isAuthenticated ? (
        <div >
          <div>
            <button onClick={Home} >
              <img src={ImagenLogo} />
            </button>
          </div>
          <div>
            {access.includes("oDni") && (
              <CustomLink
                to="/consultaDni"
                label="Consulta de DNI"
                defaultImage={Option1}
                hoverImage={Option1_1}
                key={"onDni"}
              />
            )}

            {access.includes("oPlaca") && (
              <CustomLink
                to="/placaVehicular"
                label="Placa Vehicular"
                defaultImage={Option2}
                hoverImage={Option2_2}
                key={"onPlaca"}
              />
            )}

            {access.includes("oPredio") && (
              <CustomLink
                to="/titularDominio"
                label="Consulta de Predios Inscritos"
                defaultImage={Option3}
                hoverImage={Option3_3}
                key={"oPredio"}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;

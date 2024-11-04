import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header>
      <nav>
        <h1>
          Esto es un header
        </h1>
        <Link
                to ="/AddClient"
                className="hover-button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                Agregar Cliente
        </Link>
      </nav>
    </header>
  );
};

export default Header;

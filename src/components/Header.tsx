import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="bg-blue-900 p-4">
      <nav className="flex justify-between">
      <h1 className="text-white text-lg">
        Header
      </h1>
        <Link
                to ="/AddClient"
                className="hover-button text-white text-lg"
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

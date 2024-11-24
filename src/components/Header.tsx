import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-900 p-4">
      <nav className="flex justify-between">
        <h1 className="text-white text-lg font-bold">◩ CRM</h1>
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="hover-button text-white text-lg flex content-center font-bold h-100"
          >
            Dashboard
          </Link>
          <Link
            to="/"
            className="hover-button text-white text-lg flex content-center font-bold h-100"
          >
            Lista Clientes
          </Link>
          <Link
            to="/opport"
            className="hover-button text-white text-lg flex content-center font-bold h-100"
          >
            Lista Oportunidades
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

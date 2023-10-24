import logo from "../../assets/logo.jpg";

const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="header logo" />
        <h1>REACTFOOD</h1>
      </div>
      <nav>
        <button className="button">Cart (0)</button>
      </nav>
    </header>
  );
};

export default Header;

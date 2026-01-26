import logo from "../assets/logo.jpg";

export default function Header({ itemAdded }) {
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logo} alt="Food logo" />
          <h1>React food</h1>
        </div>
        <button>Cart ({itemAdded})</button>
      </header>
    </>
  );
}

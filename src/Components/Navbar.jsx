import { Link } from "react-router-dom";
import "../Style/Navbar.css";
import {linkButtonStyle, linkStyle} from "../Style/buttonStyle";
const Navbar = ({cartItems}) => {
  return (
    <nav id="sticky">
      <ul>
        <li className="">
          <Link style={linkStyle} className="link" to="/">
            <button className="button" style={linkButtonStyle}>Product Listing Page</button></Link>
        </li>
        <li className="list">
          <Link style={linkStyle} className="link" to="/cart"><button className="button" style={linkButtonStyle}>Cart </button></Link>
          <span >{cartItems.length}</span>
        </li>
      </ul>

    </nav>
  );
};
export default Navbar;

import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <>
      <div>
        <div className="four-zero-four">404</div>
        <h1>Not found</h1>
        <Link to={"/"}>Click here to go back to home</Link>
      </div>
    </>
  );
}

export default NotFound;

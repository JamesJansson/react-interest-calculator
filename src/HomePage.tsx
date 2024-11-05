import MainNavbar from "./MainNavbar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";

function HomePage() {
  return (
    <>
      <MainNavbar />
      <Container className="main-section">Content</Container>
      <Footer></Footer>
    </>
  );
}

export default HomePage;

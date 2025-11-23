import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaLink } from 'react-icons/fa';

const Header = () => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mb-4 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '0 0 15px 15px'
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <FaLink className="me-2" size={24} />
          TinyLink
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="fw-semibold">
              Dashboard
            </Nav.Link>
            <Nav.Link href="#about" className="fw-semibold">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
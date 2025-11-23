import { Container, Row, Col } from "react-bootstrap";
import config from '../config/config.js';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light mt-5 py-4 border-top">
      <Container>
        <Row className="text-center">
          <Col>
            <p className="text-muted mb-0">
              © {currentYear} {config.APP_NAME}. {config.APP_TAGLINE}
            </p>
            <p className="text-muted mt-1" style={{ fontSize: "0.9rem" }}>
              Developed by <strong>{config.APP_AUTHOR}</strong>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

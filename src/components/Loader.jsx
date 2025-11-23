import { Spinner, Placeholder, Card, Row, Col } from 'react-bootstrap';

const Loader = ({ type = 'spinner' }) => {
  if (type === 'shimmer') {
    return (
      <Row className="g-3">
        {[1, 2, 3].map((i) => (
          <Col md={6} lg={4} key={i}>
            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-50">
      <div className="text-center">
        <Spinner
          animation="border"
          variant="primary"
          style={{
            width: '3rem',
            height: '3rem',
            borderWidth: '0.3em'
          }}
        />
        <p className="mt-3 text-muted fw-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
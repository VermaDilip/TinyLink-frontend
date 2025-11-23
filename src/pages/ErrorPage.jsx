import { Container, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <h4>Oops! Something went wrong.</h4>
          <p>The page you're looking for doesn't exist or an error occurred.</p>
          <Link to="/">
            <Button variant="primary">Go to Dashboard</Button>
          </Link>
        </Alert>
      </Container>
    </>
  );
};

export default ErrorPage;
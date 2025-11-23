import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Alert variant="warning" className="text-center">
        <h4>404 - Page Not Found</h4>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
      </Alert>
    </div>
  );
};

export default NotFound;
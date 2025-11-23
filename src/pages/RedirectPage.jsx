import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import { CONFIG } from '../constants/config';

const RedirectPage = () => {
  const { code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (CONFIG.SHORT_CODE_PATTERN.test(code)) {
      // Use Vite env base URL
      window.location.href = `${CONFIG.API_BASE}/${code}`;
    } else {
      navigate('/');
    }
  }, [code, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <Spinner animation="border" />
        <p className="mt-3">Redirecting...</p>
      </div>
    </Container>
  );
};

export default RedirectPage;

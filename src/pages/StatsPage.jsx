import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col, Badge } from 'react-bootstrap';
import { FaEye, FaClock, FaLink, FaCode, FaArrowLeft, FaCopy } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { linkApi } from '../services/linkApi';
import { API_BASE } from '../constants/apiEndpoints';
import { toast } from 'react-toastify';

const StatsPage = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await linkApi.getLinkStats(code);
        setStats(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [code]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard!');
  };

  if (loading) {
    return (
      <>
        <Header />
        <Container className="mt-5">
          <Loader />
        </Container>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <Container className="mt-5">
          <Alert variant="danger" className="text-center">
            <h4>Oops!</h4>
            <p>{error}</p>
            <Link to="/">
              <Button variant="primary" className="mt-3">
                <FaArrowLeft className="me-2" />
                Back to Dashboard
              </Button>
            </Link>
          </Alert>
        </Container>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-5">
        <div className="d-flex align-items-center mb-4">
          <Link to="/" className="btn btn-outline-primary me-3 rounded-pill">
            <FaArrowLeft />
          </Link>
          <h1 className="fw-bold text-primary mb-0">Link Statistics</h1>
        </div>

        <Row className="g-4">
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <FaCode className="text-primary me-3" size={24} />
                  <h3 className="fw-bold text-primary mb-0">Short Code: {stats.shortCode}</h3>
                  <Badge bg="primary" className="ms-3 fs-6">Active</Badge>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold mb-3">
                    <FaLink className="me-2 text-success" />
                    Original URL
                  </h5>
                  <Card className="bg-light border-0">
                    <Card.Body>
                      <a
                        href={stats.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        {stats.originalUrl}
                      </a>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-4">
                  <h5 className="fw-semibold mb-3">
                    <FaLink className="me-2 text-info" />
                    Short URL
                  </h5>
                  <Card className="bg-light border-0">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <span className="text-primary fw-semibold">
                        {API_BASE}/{stats.shortCode}
                      </span>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => copyToClipboard(`${API_BASE}/${stats.shortCode}`)}
                        className="rounded-pill"
                      >
                        <FaCopy className="me-1" />
                        Copy
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="text-center p-4">
                <FaEye className="text-success mb-3" size={48} />
                <h2 className="fw-bold text-success mb-0">{stats.clicks}</h2>
                <p className="text-muted mb-0">Total Clicks</p>
              </Card.Body>
            </Card>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <FaClock className="text-warning me-3" size={20} />
                  <h5 className="fw-semibold mb-0">Last Activity</h5>
                </div>
                <p className="text-muted mb-0">
                  {stats.lastClicked ? new Date(stats.lastClicked).toLocaleString() : 'Never clicked'}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default StatsPage;
import { useState } from 'react';
import { Form, Button, Card, Row, Col, InputGroup, Alert } from 'react-bootstrap';
import { FaLink, FaCode, FaMagic, FaRobot } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { useLinks } from '../context/LinkContext';
import { CONFIG } from '../constants/config';
import { API_BASE } from '../constants/apiEndpoints';
import { generateSmartAlias } from '../services/ai';
import { toast } from 'react-toastify';

const CreateLinkForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [urlError, setUrlError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const { createLink, creating } = useLinks();

  const validateUrl = (url) => {
    if (!url) return 'URL is required';
    try {
      new URL(url);
      return '';
    } catch {
      return 'Please enter a valid URL (e.g., https://example.com)';
    }
  };

  const validateCode = (code) => {
    if (!code) return '';
    if (!CONFIG.SHORT_CODE_PATTERN.test(code)) {
      return 'Code must be 6-8 alphanumeric characters';
    }
    return '';
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setOriginalUrl(value);
    setUrlError(validateUrl(value));
  };

  const handleCodeChange = (e) => {
    const value = e.target.value;
    setShortCode(value);
    setCodeError(validateCode(value));
  };

  const generateAICode = async () => {
    if (!originalUrl) {
      toast.warning('Please enter a URL first');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const aiCode = await generateSmartAlias(originalUrl);
      setShortCode(aiCode);
      setCodeError('');
      toast.success('AI-generated code: ' + aiCode);
    } catch (error) {
      toast.error('Failed to generate AI code. Using random code instead.');
      // Fallback to random code
      const randomCode = Math.random().toString(36).substring(2, 8);
      setShortCode(randomCode);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const urlErr = validateUrl(originalUrl);
    setUrlError(urlErr);

    if (urlErr) return;

    let finalCode = shortCode;

    // Auto-generate AI code if field is empty
    if (!shortCode.trim()) {
      setIsGeneratingAI(true);
      try {
        finalCode = await generateSmartAlias(originalUrl);
        toast.info('AI-generated code: ' + finalCode);
      } catch (error) {
        finalCode = Math.random().toString(36).substring(2, 8);
        toast.warning('Using random code instead');
      } finally {
        setIsGeneratingAI(false);
      }
    }

    const codeErr = validateCode(finalCode);
    setCodeError(codeErr);

    if (codeErr) return;

    setIsSubmitting(true);
    const result = await createLink(originalUrl, finalCode);
    setIsSubmitting(false);

    if (result) {
      const shortUrl = `${API_BASE}/${result.shortCode}`;
      toast.success(
        <div>
          <strong>Link created successfully!</strong>
          <br />
          <small className="text-muted">{shortUrl}</small>
          <Button
            variant="outline-light"
            size="sm"
            className="ms-2"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl);
              toast.info('Copied to clipboard!');
            }}
          >
            Copy
          </Button>
        </div>,
        { autoClose: 5000 }
      );
      setOriginalUrl('');
      setShortCode('');
      setUrlError('');
      setCodeError('');
    }
  };

  const isFormValid = originalUrl && !urlError && !codeError && !creating && !isSubmitting;

  return (
    <Card className="shadow-sm border-0 mb-4">
      <Card.Body className="p-4">
        <div className="text-center mb-4">
          <FaMagic className="text-primary mb-2" size={30} />
          <h2 className="fw-bold text-primary">Create Short Link</h2>
          <p className="text-muted">Transform your long URLs into short, shareable links</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={8}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaLink className="me-2 text-primary" />
                  Original URL *
                </Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text className="bg-light">
                    <FaLink />
                  </InputGroup.Text>
                  <Form.Control
                    type="url"
                    value={originalUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com"
                    isInvalid={!!urlError}
                    className="border-start-0"
                    style={{ borderTopLeftRadius: '0', borderBottomLeftRadius: '0' }}
                    data-tooltip-id="url-tooltip"
                    data-tooltip-content="Enter the full URL you want to shorten (must include http:// or https://)"
                  />
                  <Form.Control.Feedback type="invalid">
                    {urlError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  <FaCode className="me-2 text-primary" />
                  Custom Code
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    value={shortCode}
                    onChange={handleCodeChange}
                    placeholder="Auto-generate"
                    isInvalid={!!codeError}
                    className="text-center"
                    data-tooltip-id="code-tooltip"
                    data-tooltip-content="Optional: Create your own custom short code (6-8 letters/numbers). Leave empty for AI auto-generation."
                  />
                  <Button
                    variant="outline-primary"
                    onClick={generateAICode}
                    disabled={isGeneratingAI || !originalUrl}
                    data-tooltip-id="ai-tooltip"
                    data-tooltip-content="Generate a smart short code using AI based on your URL content"
                  >
                    {isGeneratingAI ? (
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                      <FaRobot />
                    )}
                  </Button>
                </InputGroup>
                <Form.Control.Feedback type="invalid">
                  {codeError}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Optional: 6-8 alphanumeric characters (AI generates if empty)
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button
              type="submit"
              disabled={!isFormValid}
              size="lg"
              className="px-5 py-2 fw-bold"
              variant={isFormValid ? "primary" : "secondary"}
              data-tooltip-id="submit-tooltip"
              data-tooltip-content={isFormValid ? "Click to create your short link" : "Please fill in the required fields correctly"}
            >
              {creating || isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating...
                </>
              ) : (
                <>
                  <FaMagic className="me-2" />
                  Create Short Link
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>

      {/* Tooltips */}
      <Tooltip id="url-tooltip" place="top" />
      <Tooltip id="code-tooltip" place="top" />
      <Tooltip id="ai-tooltip" place="top" />
      <Tooltip id="submit-tooltip" place="top" />
    </Card>
  );
};

export default CreateLinkForm;
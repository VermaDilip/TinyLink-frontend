import { useState } from 'react';
import { Table, Button, Badge, Card, Form, InputGroup } from 'react-bootstrap';
import { FaCopy, FaChartBar, FaTrash, FaLink, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import Swal from 'sweetalert2';
import { useLinks } from '../context/LinkContext';
import { API_BASE } from '../constants/apiEndpoints';
import { toast } from 'react-toastify';

const LinksTable = () => {
  const { links, deleteLink } = useLinks();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard!');
  };

  const handleDelete = async (code) => {
    const result = await Swal.fire({
      title: 'Delete Link',
      text: `Are you sure you want to delete the link with code "${code}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      deleteLink(code);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ms-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="ms-1" /> : <FaSortDown className="ms-1" />;
  };

  const filteredAndSortedLinks = links
    .filter(link =>
      link.shortCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary mb-0">
            <FaLink className="me-2" />
            Your Links
          </h2>
          <div style={{ minWidth: '250px' }}>
            <InputGroup>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by code or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </div>
        </div>

        {links.length === 0 ? (
          <div className="text-center py-5">
            <FaLink size={48} className="text-muted mb-3" />
            <h5 className="text-muted">No links created yet</h5>
            <p className="text-muted">Create your first short link above!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th
                    className="fw-semibold cursor-pointer"
                    onClick={() => handleSort('shortCode')}
                    style={{ cursor: 'pointer' }}
                    data-tooltip-id="sort-tooltip"
                    data-tooltip-content="Click to sort by short code"
                  >
                    Short Code {getSortIcon('shortCode')}
                  </th>
                  <th
                    className="fw-semibold cursor-pointer"
                    onClick={() => handleSort('originalUrl')}
                    style={{ cursor: 'pointer' }}
                    data-tooltip-id="sort-tooltip"
                    data-tooltip-content="Click to sort by original URL"
                  >
                   Target URL {getSortIcon('originalUrl')}
                  </th>
                  <th
                    className="fw-semibold cursor-pointer text-center"
                    onClick={() => handleSort('clicks')}
                    style={{ cursor: 'pointer' }}
                    data-tooltip-id="sort-tooltip"
                    data-tooltip-content="Click to sort by click count"
                  >
                    Clicks {getSortIcon('clicks')}
                  </th>
                  <th
                    className="fw-semibold cursor-pointer"
                    onClick={() => handleSort('lastClicked')}
                    style={{ cursor: 'pointer' }}
                    data-tooltip-id="sort-tooltip"
                    data-tooltip-content="Click to sort by last clicked date"
                  >
                    Last Clicked {getSortIcon('lastClicked')}
                  </th>
                  <th className="fw-semibold text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedLinks.map((link) => (
                  <tr key={link.shortCode}>
                    <td>
                      <Badge bg="primary" className="fw-semibold">
                        {link.shortCode}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-truncate d-inline-block text-decoration-none"
                          style={{ maxWidth: '300px' }}
                          data-tooltip-id="url-tooltip"
                          data-tooltip-content={link.originalUrl}
                        >
                          {link.originalUrl}
                        </a>
                      </div>
                    </td>
                    <td className="text-center">
                      <Badge bg="success" className="fs-6">
                        {link.clicks}
                      </Badge>
                    </td>
                    <td>
                      {link.lastClicked ? (
                        <small className="text-muted">
                          {new Date(link.lastClicked).toLocaleString()}
                        </small>
                      ) : (
                        <small className="text-muted">Never</small>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => copyToClipboard(`${API_BASE}/${link.shortCode}`)}
                        className="me-1"
                        data-tooltip-id="copy-tooltip"
                        data-tooltip-content="Copy short URL to clipboard"
                      >
                        <FaCopy />
                      </Button>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => window.open(`/code/${link.shortCode}`, '_blank')}
                        className="me-1"
                        data-tooltip-id="stats-tooltip"
                        data-tooltip-content="View detailed statistics"
                      >
                        <FaChartBar />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(link.shortCode)}
                        data-tooltip-id="delete-tooltip"
                        data-tooltip-content="Permanently delete this link"
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

        {filteredAndSortedLinks.length === 0 && links.length > 0 && (
          <div className="text-center py-4">
            <p className="text-muted mb-0">No links match your search criteria.</p>
          </div>
        )}
      </Card.Body>

      {/* Tooltips */}
      <Tooltip id="copy-tooltip" place="top" />
      <Tooltip id="stats-tooltip" place="top" />
      <Tooltip id="delete-tooltip" place="top" />
      <Tooltip id="url-tooltip" place="top" />
      <Tooltip id="sort-tooltip" place="top" />
    </Card>
  );
};

export default LinksTable;
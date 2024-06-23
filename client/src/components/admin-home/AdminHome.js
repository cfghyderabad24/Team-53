import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form, Button } from 'react-bootstrap';
import companiesData from './companies-filtered.json'; // Import JSON file

const AdminHome = () => {
  const [companies, setCompanies] = useState({});
  const [filteredCompanies, setFilteredCompanies] = useState({}); // Initialize with all companies
  const [filters, setFilters] = useState({
    companyNameFilter: '',
    tagFilter: 'all' // Default to show all tags initially
  });

  useEffect(() => {
    setCompanies(companiesData); // Set companies data
    setFilteredCompanies(companiesData); // Initialize filtered companies with all data
  }, []);

  useEffect(() => {
    // Apply filters when filters or companiesData changes
    applyFilters();
  }, [filters, companiesData]);

  const applyFilters = () => {
    let filtered = { ...companies };

    // Filter by company name
    if (filters.companyNameFilter.trim() !== '') {
      filtered = Object.keys(filtered).reduce((acc, companyName) => {
        if (companyName.toLowerCase().includes(filters.companyNameFilter.trim().toLowerCase())) {
          acc[companyName] = filtered[companyName];
        }
        return acc;
      }, {});
    }

    // Filter by tags
    if (filters.tagFilter !== 'all') {
      filtered = Object.keys(filtered).reduce((acc, companyName) => {
        const companyServices = filtered[companyName];
        const tags = Object.keys(companyServices);
        if (tags.includes(filters.tagFilter) && companyServices[filters.tagFilter]) {
          acc[companyName] = companyServices;
        }
        return acc;
      }, {});
    }

    // If companyNameFilter is empty and tagFilter is 'all', return all companies
    if (filters.companyNameFilter.trim() === '' && filters.tagFilter === 'all') {
      setFilteredCompanies(companies);
    } else {
      setFilteredCompanies(filtered);
    }
  };

  const handleCompanyNameFilterChange = (event) => {
    setFilters({ ...filters, companyNameFilter: event.target.value });
  };

  const handleTagFilterChange = (event) => {
    setFilters({ ...filters, tagFilter: event.target.value });
  };

  const executeScripts = () => {
    fetch(' http://localhost:4000/admin-api/execute-scripts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Assuming you have a token stored in localStorage after successful login
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      // You can include a body if necessary, e.g., JSON.stringify({ data: 'value' })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to execute scripts');
      }
      return response.json();
    })
    .then(data => {
      console.log(data); // Log response from backend if needed
      alert('Scripts executed successfully');
    })
    .catch(error => {
      // console.error('Error executing scripts:', error);
      // alert('Error executing scripts');
    });
  };

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={6}>
          <h1 className="text-center mb-4">Potential Donor Companies</h1>
        </Col>
        <Col md={6} className="text-end">
          <Button onClick={executeScripts}>Execute Scripts</Button>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Form className="mb-3">
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column md="auto">Filter by Company Name:</Form.Label>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={filters.companyNameFilter}
                  onChange={handleCompanyNameFilterChange}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column md="auto">Filter by Tags:</Form.Label>
              <Col>
                <Form.Select
                  value={filters.tagFilter}
                  onChange={handleTagFilterChange}
                >
                  <option value="all">All</option>
                  <option value="water">Water</option>
                  <option value="sanitation">Sanitation</option>
                  <option value="health">Health</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        {Object.entries(filteredCompanies).map(([companyName, services], index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{companyName}</Card.Title>
                <Card.Text>
                  {Object.entries(services).map(([service, available]) => (
                    <Badge
                      key={service}
                      bg={available ? "success" : "danger"}
                      className="me-2"
                    >
                      {service.charAt(0).toUpperCase() + service.slice(1)}
                    </Badge>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminHome;

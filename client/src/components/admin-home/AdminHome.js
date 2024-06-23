import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Form } from 'react-bootstrap';
import companiesData from './companies-filtered.json'; // Import JSON file

const AdminHome = () => {
  const [companies, setCompanies] = useState({});
  const [filteredCompanies, setFilteredCompanies] = useState({companiesData}); // Initialize with all companies
  const [filters, setFilters] = useState({
    companyNameFilter: '',
    tagFilter: 'all' // Default to show all tags initially
  });

  useEffect(() => {
    setCompanies(companiesData); // Set companies data
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

  // If companyNameFilter is empty, return all companies
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

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={12}>
          <h1 className="text-center mb-4">Potential Donor Companies</h1>
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

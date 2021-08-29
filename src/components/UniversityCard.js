import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Row, Col } from 'react-bootstrap';

const UniversityCard = ({ university }) => {
  const degree = {
    1: '本科',
    2: '专科',
  };
  const tiers = {
    1: '一本',
    2: '二本',
    3: '专科',
  };
  const future = {
    1: '985',
    2: '211',
    3: '双一流',
    4: '其他',
  };
  return (
    <Card className="universityCard">
      <Row>
        <Col md={2}>
          <Card.Img variant="top" src={university.logoUrl} />
        </Col>
        <Col md={8}>
          <div className="d-flex">
            <Card.Title>{university.name}</Card.Title>
            <Badge pill bg="light" text="dark">
              <span>{university.province}</span>
              <span>{university.city}</span>
            </Badge>
          </div>
          <Card.Subtitle className="mb-2 text-muted">简介: </Card.Subtitle>
          <Card.Text>{university.desc}</Card.Text>
          <Badge bg="info me-2">{degree[university.degree]}</Badge>
          <Badge bg="primary me-2">{tiers[university.tier]}</Badge>
          <Badge bg="success me-2">{future[university.future]}</Badge>
        </Col>
        <Col md={2}>
          <Button variant="light">
            <Link to={`/university/${university.code}`}> 查招生</Link>
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default UniversityCard;

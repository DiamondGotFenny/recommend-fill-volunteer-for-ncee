import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Table } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { provincesList } from '../mockData/provincesList';
import { historyScores } from '../mockData/historyScores';
import queryString from 'query-string';
const University = ({ match }) => {
  const { id } = match.params;
  const url = 'https://myDomain.com';
  const initialFilters = {
    province: '',
    year: '',
  };
  const [university, setuniversity] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const history = useHistory();
  const queryParams = queryString.parse(useLocation().search);
  console.log(useLocation().search, 'search');
  const searchQuery = useLocation().search;
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
  const subjectType = {
    1: '文科',
    2: '理科',
  };
  console.log(id, 'id');
  const handleFiltersChanges = async (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    const newQueries = {
      ...queryParams,
      [e.target.name]: e.target.value,
    };
    history.push({ search: queryString.stringify(newQueries) });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${url}/v1/api/schools?code=${id}`);
        setuniversity(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [id]);
  return (
    <Container className="university">
      <h2>中山大学</h2>
      <header>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto" className="my-1">
              <h3>各省分数线</h3>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Label className="me-sm-2" htmlFor="provicesSelect">
                省份
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="provicesSelect"
                value={filters.province}
                name="province"
                onChange={handleFiltersChanges}
              >
                {provincesList.map((province) => {
                  return (
                    <option
                      key={province.code}
                      defaultValue={province.name === ''}
                    >
                      {province.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Label className="me-sm-2" htmlFor="futureSelect">
                年份
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="futureSelect"
                name="future"
                value={filters.future}
                onChange={handleFiltersChanges}
              >
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="my-1">
              <Form.Label className="me-sm-2" htmlFor="subjectTypeSelect">
                专业类型
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="subjectTypeSelect"
                name="subjectType"
                defaultValue={1}
                onChange={handleFiltersChanges}
              >
                <option value="1">文科</option>
                <option value="2">理科</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
      </header>
      <Table hover className="mt-4">
        <thead className="table-head align-middle">
          <tr>
            <th>年份</th>
            <th>专业类型</th>
            <th>办学类型</th>
            <th>最高分</th>
            <th>最低分</th>
            <th>目标省份分数</th>
          </tr>
        </thead>
        <tbody>
          {historyScores.map((item, index) => (
            <tr key={index} className="align-middle">
              <td>{item.year}</td>
              <td>{subjectType[item.subjectType]}</td>
              <td>{tiers[item.tier]}</td>
              <td>{item.maxScore}</td>
              <td>{item.minScore}</td>
              <td>{item.targetProvinceTierScore}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default University;

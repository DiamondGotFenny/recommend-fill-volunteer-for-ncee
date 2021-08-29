import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { provincesList } from '../mockData/provincesList';
import queryString from 'query-string';
import RecommondationFiltersContext from '../context/recommondationsContext';
const Header = () => {
  const school_api = `${process.env.REACT_APP_BACKEND_URL}/v1/api/schools?`;
  const initialFilters = {
    province: '',
    future: '',
    tier: '',
  };
  const [nameSearch, setNameSearch] = useState('');
  const [universitiesList, setuniversitiesList] = useState(null);
  const [recommondationFilters, setRecommondationFilters] = useState(null);
  const [filters, setFilters] = useState(initialFilters);
  const history = useHistory();
  const { setRecommondationFilter_context } = useContext(
    RecommondationFiltersContext
  );
  const queryParams = queryString.parse(useLocation().search);
  console.log(useLocation().search, 'search');
  const searchQuery = useLocation().search;
  const handleNameSearch = async (e) => {
    e.preventDefault();
    history.push(`?name=${nameSearch}`);
    setNameSearch('');
  };
  const handleFiltersChanges = async (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value === '全部' ? '' : e.target.value,
    });
    const newQueries = {
      ...queryParams,
      [e.target.name]: e.target.value === '全部' ? '' : e.target.value,
    };
    history.push({ search: queryString.stringify(newQueries) });
  };

  const handleRecommondationFiltersChange = async (e) => {
    setRecommondationFilters({
      ...recommondationFilters,
      [e.target.name]: e.target.value === '全部' ? '' : e.target.value,
    });
  };
  const handleRecommondationSubmit = async (e) => {
    e.preventDefault();
    if (recommondationFilters.studentProvince) {
      setRecommondationFilter_context(recommondationFilters);
    }
    try {
      const { data } = await axios.get(
        `${school_api}${queryString.stringify(recommondationFilters)}`
      );
      setuniversitiesList(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${school_api}${searchQuery}`);
        setuniversitiesList(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [searchQuery, school_api]);
  return (
    <header className="header-container">
      <h1>高考志愿填报辅助系统</h1>
      <h2>查学校</h2>
      <main className="mt-3 filter-content">
        <Form onSubmit={handleNameSearch}>
          <Form.Group
            className="d-flex me-2 scool-search selecter-col"
            controlId="scool-search"
          >
            <Form.Control
              type="text"
              placeholder="请输入院校名称"
              value={nameSearch}
              onChange={(e) => setNameSearch(e.target.value)}
            />
            <Button type="submit" variant="info" id="search-button">
              搜索
            </Button>
          </Form.Group>
        </Form>

        <Form>
          <Row className="align-items-center">
            <Col xs="auto" className="my-1 selecter-col">
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
            <Col xs="auto" className="my-1 selecter-col">
              <Form.Label className="me-sm-2" htmlFor="futureSelect">
                院校特色
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="futureSelect"
                name="future"
                value={filters.future}
                onChange={handleFiltersChanges}
              >
                <option value="">全部</option>
                <option value="1">985</option>
                <option value="2">211</option>
                <option value="3">一流大学建设高校A类</option>
                <option value="4">一流大学建设高校B类</option>
                <option value="5">强基计划</option>
                <option value="6">双高计划</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="my-1 selecter-col">
              <Form.Label className="me-sm-2" htmlFor="tierSelect">
                办学类型
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="tierSelect"
                name="tier"
                value={filters.tier}
                onChange={handleFiltersChanges}
              >
                <option value="">全部</option>
                <option value="1">一本</option>
                <option value="2">二本</option>
                <option value="3">专科</option>
                <option value="4">民办</option>
                <option value="5">独立学院</option>
                <option value="6">中外合资办学</option>
                <option value="7">普通本科</option>
              </Form.Select>
            </Col>
          </Row>
        </Form>
        <Form className="mt-2" onSubmit={handleRecommondationSubmit}>
          <Row className="align-items-center">
            <Col md="2" className="my-1 selecter-col">
              <Form.Label className="me-sm-2" htmlFor="studentProvicesSelect">
                考生省份
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                id="studentProvicesSelect"
                name="studentProvince"
                onChange={handleRecommondationFiltersChange}
              >
                {provincesList.map((province) => {
                  return (
                    <option
                      key={province.code}
                      defaultValue={province.code === '000000'}
                    >
                      {province.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col md={2} className="my-1">
              <Form.Group
                className="me-2 selecter-col"
                controlId="studentScore"
              >
                <Form.Label className="align-middle">分数:</Form.Label>
                <Form.Control
                  name="studentScore"
                  type="number"
                  placeholder="请输入高考分数"
                  min={0}
                  onChange={handleRecommondationFiltersChange}
                />
              </Form.Group>
            </Col>

            <Col md={2} className="my-1 selecter-col">
              <Form.Label className="me-sm-2" htmlFor="targetProviceSelect">
                目标省份
              </Form.Label>
              <Form.Select
                name="targetProvince"
                className="me-sm-2"
                id="targetProviceSelect"
                onChange={handleRecommondationFiltersChange}
              >
                {provincesList.map((province) => {
                  return (
                    <option
                      key={province.code}
                      defaultValue={province.code === '000000'}
                    >
                      {province.name}
                    </option>
                  );
                })}
              </Form.Select>
            </Col>
            <Col xs="auto" className="my-1 selecter-col">
              <Form.Label className="me-sm-2" htmlFor="subjectTypeSelect">
                专业类型
              </Form.Label>
              <Form.Select
                className="me-sm-2"
                name="subjectType"
                id="subjectTypeSelect"
                defaultValue={1}
                onChange={handleRecommondationFiltersChange}
              >
                <option value="1">文科</option>
                <option value="2">理科</option>
              </Form.Select>
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit">推荐学校</Button>
            </Col>
          </Row>
        </Form>
      </main>
    </header>
  );
};

export default Header;

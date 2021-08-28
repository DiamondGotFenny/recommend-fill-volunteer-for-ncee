import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Table } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import { provincesList } from '../mockData/provincesList';
import { historyScores } from '../mockData/historyScores';
import { majorHistoryScores } from './../mockData/majorHistoryScores';
import queryString from 'query-string';

const University = ({ match }) => {
  const { id } = match.params;
  const url = 'https://myDomain.com';
  const initialHistoryScoresfilters = {
    targetProvince: '',
    year: '',
    subjectType: '',
  };
  const initialMajorHistoryScoresFilters = {
    targetProvince: '',
    year: '',
    subjectType: '',
  };
  const [university, setuniversity] = useState(null);
  const [_historyScores, _setHistoryScores] = useState(null);
  const [_majorHistoryScores, _setMajorHistoryScores] = useState(null);
  const [historyScoresfilters, setHistoryScoresfilters] = useState(
    initialHistoryScoresfilters
  );
  const [majorHistoryScoresFilters, setMajorHistoryScoresFilters] = useState(
    initialMajorHistoryScoresFilters
  );
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
  const handleHistoryScoresFiltersChanges = async (e) => {
    setHistoryScoresfilters({
      ...historyScoresfilters,
      [e.target.name]: e.target.value,
    });

    try {
      const { data } = await axios.get(
        `${url}/v1/api/scores/school${queryString.stringify(
          historyScoresfilters
        )}`
      );
      _setHistoryScores(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleMajorHistoryScoresFiltersChanges = async (e) => {
    setHistoryScoresfilters({
      ...majorHistoryScoresFilters,
      [e.target.name]: e.target.value,
    });

    try {
      const { data } = await axios.get(
        `${url}/v1/api/scores/school${queryString.stringify(
          majorHistoryScoresFilters
        )}`
      );
      _setMajorHistoryScores(data);
    } catch (error) {
      console.log(error.message);
    }
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
    <Container className='university'>
      <h2>中山大学</h2>
      <div className='historyScores'>
        <header>
          <Form>
            <Row className='align-items-center'>
              <Col xs='auto' className='my-1'>
                <h4>各省分数线</h4>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label className='me-sm-2' htmlFor='provicesSelect'>
                  目标省份
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='provicesSelect'
                  value={historyScoresfilters.province}
                  name='province'
                  onChange={handleHistoryScoresFiltersChanges}>
                  {provincesList.map((province) => {
                    return (
                      <option
                        key={province.code}
                        defaultValue={province.name === ''}>
                        {province.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label className='me-sm-2' htmlFor='yearSelect'>
                  年份
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='yearSelect'
                  name='year'
                  value={historyScoresfilters.year}
                  onChange={handleHistoryScoresFiltersChanges}>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                </Form.Select>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label
                  className='me-sm-2 selecter-col-lable'
                  htmlFor='subjectTypeSelect'>
                  专业类型
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='subjectTypeSelect'
                  name='subjectType'
                  defaultValue={1}
                  onChange={handleHistoryScoresFiltersChanges}>
                  <option value='1'>文科</option>
                  <option value='2'>理科</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </header>
        <Table hover className='mt-4 score-table'>
          <thead className='table-head align-middle'>
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
              <tr key={index} className='align-middle'>
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
      </div>
      <hr className='break-line' />
      <div className='majorHistoryScores'>
        <header>
          <Form>
            <Row className='align-items-center'>
              <Col xs='auto' className='my-1'>
                <h4>专业分数线</h4>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label className='me-sm-2' htmlFor='provicesSelect'>
                  目标省份
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='provicesSelect'
                  value={historyScoresfilters.province}
                  name='province'
                  onChange={handleMajorHistoryScoresFiltersChanges}>
                  {provincesList.map((province) => {
                    return (
                      <option
                        key={province.code}
                        defaultValue={province.name === ''}>
                        {province.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label className='me-sm-2 ' htmlFor='yearSelect'>
                  年份
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='yearSelect'
                  name='year'
                  value={historyScoresfilters.future}
                  onChange={handleMajorHistoryScoresFiltersChanges}>
                  <option value='2020'>2020</option>
                  <option value='2019'>2019</option>
                  <option value='2018'>2018</option>
                  <option value='2017'>2017</option>
                </Form.Select>
              </Col>
              <Col xs='auto' className='my-1 selecter-col'>
                <Form.Label
                  className='me-sm-2 selecter-col-lable'
                  htmlFor='subjectTypeSelect'>
                  专业类型
                </Form.Label>
                <Form.Select
                  className='me-sm-2 selecter-col-input'
                  id='subjectTypeSelect'
                  name='subjectType'
                  defaultValue={1}
                  onChange={handleMajorHistoryScoresFiltersChanges}>
                  <option value='1'>文科</option>
                  <option value='2'>理科</option>
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </header>
        <Table hover className='mt-4 score-table'>
          <thead className='table-head align-middle'>
            <tr>
              <th>年份</th>
              <th>专业名称</th>
              <th>专业类型</th>
              <th>办学类型</th>
              <th>最高分</th>
              <th>最低分</th>
              <th>报名人数</th>
              <th>录取人数</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryScores.map((item, index) => (
              <tr key={index} className='align-middle'>
                <td>{item.year}</td>
                <td>{item.majorName}</td>
                <td>{subjectType[item.subjectType]}</td>
                <td>{tiers[item.tier]}</td>
                <td>{item.maxScore}</td>
                <td>{item.minScore}</td>
                <td>{item.signedUpCount}</td>
                <td>{item.admittedCount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default University;

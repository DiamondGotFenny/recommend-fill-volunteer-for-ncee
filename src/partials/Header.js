import React from 'react';
import {
  Form,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
const Header = () => {
  return (
    <header>
      <h1>高考志愿填报辅助系统</h1>
      <InputGroup>
        <Button variant='outline-secondary' id='search-button'>
          搜索
        </Button>
        <FormControl
          placeholder='请输入院校名称'
          aria-label='please enter product code'
          aria-describedby='请输入院校名称'
        />
      </InputGroup>
      <Form>
        <Row className='align-items-center'>
          <Col xs='auto' className='my-1'>
            <Form.Label className='me-sm-2' htmlFor='provicesSelect'>
              省份
            </Form.Label>
            <Form.Select className='me-sm-2' id='provicesSelect'>
              <option value='all'>全部</option>
              <option value='guangdong'>广东</option>
              <option value='guangxi'>广西</option>
              <option value='hunan'>湖南</option>
            </Form.Select>
          </Col>
          <Col xs='auto' className='my-1'>
            <Form.Label
              className='me-sm-2'
              htmlFor='universityAdvanctagesSelect'>
              院校特色
            </Form.Label>
            <Form.Select className='me-sm-2' id='universityAdvanctagesSelect'>
              <option value='all'>全部</option>
              <option value='985'>985</option>
              <option value='211'>211</option>
            </Form.Select>
          </Col>
          <Col xs='auto' className='my-1'>
            <Form.Label className='me-sm-2' htmlFor='universityTypesSelect'>
              院校类型
            </Form.Label>
            <Form.Select className='me-sm-2' id='universityTypesSelect'>
              <option value='all'>全部</option>
              <option value='benke'>本科</option>
              <option value='zhuanke'>专科</option>
              <option value='gongban'>公办</option>
              <option value='minban'>民办</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>
      <Form>
        <Row className='align-items-center'>
          <Col xs='auto' className='my-1'>
            <Form.Label className='me-sm-2' htmlFor='studentProvicesSelect'>
              考生省份
            </Form.Label>
            <Form.Select className='me-sm-2' id='studentProvicesSelect'>
              <option value='guangdong'>广东</option>
              <option value='guangxi'>广西</option>
              <option value='hunan'>湖南</option>
            </Form.Select>
          </Col>
          <Col xs='auto' className='my-1'>
            <Form.Group className='d-flex me-2' controlId='studentScore'>
              <Form.Label className='align-middle'>高考分数:</Form.Label>
              <Form.Control type='number' placeholder='请输入高考分数' />
            </Form.Group>
          </Col>
          <Col xs='auto' className='my-1'>
            <Form.Label className='me-sm-2' htmlFor='majorsSelect'>
              专业
            </Form.Label>
            <Form.Select className='me-sm-2' id='majorsSelect'>
              <option value='all'>全部</option>
              <option value='guangdong'>信息工程</option>
              <option value='guangxi'>英语</option>
              <option value='hunan'>医学</option>
            </Form.Select>
          </Col>
          <Col xs='auto' className='my-1'>
            <Form.Label className='me-sm-2' htmlFor='universityTypesSelect'>
              目标省份分数线
            </Form.Label>
            <Form.Select className='me-sm-2' id='targetProviceSelect'>
              <option value='all'>全部</option>
              <option value='guangdong'>广东</option>
              <option value='guangxi'>广西</option>
              <option value='hunan'>湖南</option>
            </Form.Select>
          </Col>
          <Col xs='auto' className='my-1'>
            <Button type='submit'>推荐学校</Button>
          </Col>
        </Row>
      </Form>
    </header>
  );
};

export default Header;

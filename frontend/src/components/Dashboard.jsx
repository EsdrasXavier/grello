import React from 'react';
import { Form, Icon, Input, Button, Row, Col, notification } from 'antd';
import axios from 'axios';
import Config from '../config';

class Dashboard extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Row gutter={[16, 16]} type="flex" justify="center">
        <Col span={6} >
          Dashboard
        </Col>
      </Row>
    );
  }
}

export default Dashboard;
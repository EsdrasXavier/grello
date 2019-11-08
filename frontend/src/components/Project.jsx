import React from 'react';
import { Card, Row, Col, Input } from 'antd';
import axios from 'axios';
import Config from '../config';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../helpers/notify';

import './Dashboard.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px', width: '100%' }}>
        <Row gutter={16}>
          <Col span={6} style={{ width: '100%', display: 'flex' }}>

          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  profile: store.profileState.profile
});

export default connect(mapStateToProps)(Project);
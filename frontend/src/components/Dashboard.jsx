import React from 'react';
import { Card, Row, Col, Input } from 'antd';
import axios from 'axios';
import Config from '../config';
import { connect } from 'react-redux';

import './Dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.profile)
  }

  handleInputEvent = event => {
    if (event.keyCode === 13) {
      console.log('New card')
    }
  }

  render() {
    return (  
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>      
          <Col span={6}>
          <Card style={{ width: 300 }} >
            <Input className="custom-input" placeholder="Nome" onKeyDown={this.handleInputEvent} />
          </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  profile: store.profileState.profile
});

export default connect(mapStateToProps)(Dashboard);
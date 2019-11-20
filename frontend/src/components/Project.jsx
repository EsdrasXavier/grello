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
      boards: []
    }

    console.log(this.props);
  }

  componentDidMount = () => {
    this.getBoardData();
  }

  getBoardData = () => {
    let projectId = '2';

    axios.get(`${Config.URL}/board/${projectId}`, config).then(res => {
      if (res.data) {
        let data = res.data;
        console.log(res.data)
        data.push({ title: 'Insira o nome', id: null });
        this.setState({ boards: data });
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px', width: '100%' }}>
        <Row gutter={16}>
          <Col span={6} style={{ width: '100%', display: 'flex' }}>
            {this.state.boards.map(item => {
              return (
                <Card
                  style={{ width: 300, cursor: 'pointer' }}
                  key={item.id}
                >
                  <Input value={item.title} className="custom-input"
                    data-id={item.id}
                    id={`${item.id}`}
                    placeholder={item.title}
                    onChange={this.handleInputEvent}
                    onKeyDown={this.onKeyDown}
                  />
                </Card>
              )
            })
            }
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  profile: store.profileState.profile,
  project: store.projectState.project
});

export default connect(mapStateToProps)(Project);
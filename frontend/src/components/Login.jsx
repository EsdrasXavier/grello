import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { Link } from 'react-router-dom'
import { openNotificationWithIcon } from '../helpers/notify';
import Config from '../config';
import axios from 'axios';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;

    axios.post(`${Config.URL}/login`, {
      email: email,
      password: password
    }).then(res => {
      const data = res.data;
      if (data.error || data.sqlMessage || data.length <= 0) {
        openNotificationWithIcon('error', 'Erro', `Houve um erro ao realizar cadastro. Erro: ${data.error || data.sqlMessage || ''}`);  
      } else {
        this.props.history.push('/dashboard');
      }
    }).catch(() => {
      openNotificationWithIcon('error', 'Erro', 'Houve um erro ao realizar cadastro. Por favor tente novamente mais tarde.');
    })
  }

  setEmail = event => {
    this.setState({ email: event.target.value });
  }

  setPassword = event => {
    this.setState({ password: event.target.value })
  }

  render() {
    return (
      <Row gutter={[16, 16]} type="flex" justify="center">
        <Col span={6} >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              <Input onChange={this.setEmail}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item>
              <Input onChange={this.setPassword}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              ou <Link to="/register">Cadastre-se</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Login;
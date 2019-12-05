import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import Config from '../config';
import { openNotificationWithIcon } from '../helpers/notify';

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props)
    if (this.validateForm()) {
      const { email, username, password } = this.state;

      axios.post(`${Config.URL}/createAccount`, {
        email: email,
        username: username,
        password: password
      }).then(res => {
        const data = res.data;
        if (data.error || data.sqlMessage) {
          openNotificationWithIcon('error', 'Erro', `Houve um erro ao realizar cadastro. Erro: ${data.error || data.sqlMessage}`);  
        } else {
          openNotificationWithIcon('success', 'Cadastrado!', `Usuário cadastrado com sucesso.`);  
          this.props.history.push('/project');
        }
      }).catch(() => {
        openNotificationWithIcon('error', 'Erro', 'Houve um erro ao realizar cadastro. Por favor tente novamente mais tarde.');
      })
    } else {      
      openNotificationWithIcon('error', 'Erro', 'Favor preencher todos os dados.');
    }
  }

  validateForm = () => {
    const { email, username, password } = this.state;
    
    if (email.length <= 0 || username.length <= 0 || password.length <= 0) return false;
    return true;
  }

  setEmail = event => {
    this.setState({ email: event.target.value });
  }

  setName = event => {
    this.setState({ username: event.target.value })
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
                prefix={<Icon type="user" id="email" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item>
              <Input onChange={this.setName}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="text"
                placeholder="Nome"
              />
            </Form.Item>
            <Form.Item>
              <Input onChange={this.setPassword}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Senha"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default Register;
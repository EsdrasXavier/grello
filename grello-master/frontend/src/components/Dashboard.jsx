import React from 'react';
import { Card, Row, Col, Input } from 'antd';
import axios from 'axios';
import Config from '../config';
import { connect } from 'react-redux';
import { openNotificationWithIcon } from '../helpers/notify';
import { bindActionCreators } from 'redux';
import { setProject } from '../actions/index';

import './Dashboard.css';

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  componentDidMount = () => {
    this.getCardsData()
  }

  getCardsData = () => {
    let email = 'e@e.com';
    if (this.props.profile) {
      email = this.props.profile.profile || email
    }

    axios.get(`${Config.URL}/projects/${email}`, config, { email: email }).then(res => {
      console.log(res)
      if (res.data) {
        let data = res.data;
        console.log(data)
        data.push({ title: 'Insira o nome', id: null });
        this.setState({ cards: data });
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleInputEvent = event => {
    const { id, value } = event.target;
    const { cards } = this.state;

    if (id === 'null') {
      const newCard = { ...cards[cards.length - 1] };
      newCard.title = value;
      cards[cards.length - 1] = newCard;
      this.setState({ cards: cards });
    } else {
      const newCard = { ...cards[id - 1] };
      newCard.title = value;
      cards[id - 1] = newCard;
      this.setState({ cards: cards });
    }
  }

  onKeyDown = event => {
    if (event.keyCode === 13) {
      let email = 'e@e.com';
      if (this.props.profile) {
        email = this.props.profile.profile || email
      }

      axios.post(`${Config.URL}/project/create`, {
        title: this.state.cards[this.state.cards.length - 1].title,
        email: email
      }).then(res => {
        const data = res.data;
        if (data.error || data.sqlMessage) {
          openNotificationWithIcon('error', 'Erro', `Houve um erro ao cadastrar novo. Erro: ${data.error || data.sqlMessage}`);
        } else {
          this.getCardsData();
          openNotificationWithIcon('success', 'Adicionado', 'Novo card adicionado com sucesso');
        }
      }).catch(err => {
        openNotificationWithIcon('error', 'Erro', `Erro ao adicionar card. Erro: ${err}`);
      });
    }
  }

  openCard = event => {
    if (event.target.children[0]) {
      const id = event.target.children[0].id;
      if (id !== 'null' && id !== null) {
        console.log(id)
        this.props.setProject({project: id});
        this.props.history.push('/project');
      }
    }
  }

  render() {
    return (
      <div style={{ background: '#ECECEC', padding: '30px', width: '100%' }}>
        <Row gutter={16}>
          <Col span={6} style={{ width: '100%', display: 'flex' }}>

            {this.state.cards.map(item => {
              return (
                <Card onClick={this.openCard}
                  style={{ width: 300, cursor: 'pointer' }}
                  key={item.id}
                  data-id={'a'}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setProject }, dispatch);

const mapStateToProps = store => ({
  profile: store.profileState.profile,
  project: store.projectState.project
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
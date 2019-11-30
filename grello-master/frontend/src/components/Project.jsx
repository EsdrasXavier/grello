
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Col, Row } from 'antd';
import update from 'immutability-helper'
import Card from './Card';
import axios from 'axios';
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { connect } from 'react-redux';
import Config from '../config';
import './Dashboard.css';
import ItemTypes from './ItemTypes';


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
  moveCard = (id, atIndex) => {
    // const { card, index } = this.findCard(id)
    // this.setState(card)

  }

  findCard = id => {
    // const card = cards.filter(c => `${c.id}` === id)[0]
    // return {
    //   card,
    //   index: cards.indexOf(card),
    // }
  }

  render() {

    return (
      <div style={{ background: '#ECECEC', padding: '30px', width: '100%' }}>
        <Row gutter={16}>
          <Col span={6} style={{ width: '100%', display: 'flex' }}>
            <DndProvider backend={HTML5Backend}>

              <Boards />
            </DndProvider>
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

const style = {
  width: 400,
}
const ITEMS = [
  {
    id: 1,
    text: 'Write a cool JS library',
  },
  {
    id: 2,
    text: 'Make it generic enough',
  },
  {
    id: 3,
    text: 'Write README',
  },
  {
    id: 4,
    text: 'Create some examples',
  },
  {
    id: 5,
    text: 'Spam in Twitter and IRC to promote it',
  },
  {
    id: 6,
    text: '???',
  },
  {
    id: 7,
    text: 'PROFIT',
  },
]


const Boards = (props) => {

  const [cards, setCards] = useState(ITEMS)
  const moveCard = (id, atIndex) => {
    const { card, index } = findCard(id)
    setCards(
      update(cards, {
        $splice: [[index, 1], [atIndex, 0, card]],
      }),
    )
  }
  const findCard = id => {
    const card = cards.filter(c => `${c.id}` === id)[0]
    return {
      card,
      index: cards.indexOf(card),
    }
  }
  const [, drop] = useDrop({ accept: ItemTypes.CARD })
  return (
    <>
      <div ref={drop} style={style}>
        {cards.map(card => (
          <Card
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
          />
        ))}
      </div></>
  )
}

import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Board from "react-trello";
import Config from '../config';
import './Dashboard.css';

const removeDups = (names) => {
  let unique = {};
  names.forEach(function(i) {
    if(!unique[i]) {
      unique[i] = true;
    }
  });
  return Object.keys(unique);
}

const data = {
  "lanes": [
    {
      "id": "PLANNED",
      "title": "Planned Tasks",
      "label": "20/70",
      "style": {
        "width": 280
      },
      "cards": [
        {
          "id": "Milk",
          "title": "Buy milk",
          "label": "15 mins",
          "description": "2 Gallons of milk at the Deli store"
        },
        {
          "id": "Plan2",
          "title": "Dispose Garbage",
          "label": "10 mins",
          "description": "Sort out recyclable and waste as needed"
        },
        {
          "id": "Plan3",
          "title": "Write Blog",
          "label": "30 mins",
          "description": "Can AI make memes?"
        },
        {
          "id": "Plan4",
          "title": "Pay Rent",
          "label": "5 mins",
          "description": "Transfer to bank account"
        }
      ]
    },
    {
      "id": "WIP",
      "title": "Work In Progress",
      "label": "10/20",
      "style": {
        "width": 280
      },
      "cards": [
        {
          "id": "Wip1",
          "title": "Clean House",
          "label": "30 mins",
          "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
        }
      ]
    },
    {
      "id": "BLOCKED",
      "title": "Blocked",
      "label": "0/0",
      "style": {
        "width": 280
      },
      "cards": []
    },
    {
      "id": "COMPLETED",
      "title": "Completed",
      "style": {
        "width": 280
      },
      "label": "2/5",
      "cards": [
        {
          "id": "Completed1",
          "title": "Practice Meditation",
          "label": "15 mins",
          "description": "Use Headspace app"
        },
        {
          "id": "Completed2",
          "title": "Maintain Daily Journal",
          "label": "15 mins",
          "description": "Use Spreadsheet for now"
        }
      ]
    },
    {
      "id": "REPEAT",
      "title": "Repeat",
      "style": {
        "width": 280
      },
      "label": "1/1",
      "cards": [
        {
          "id": "Repeat1",
          "title": "Morning Jog",
          "label": "30 mins",
          "description": "Track using fitbit"
        }
      ]
    },
    {
      "id": "ARCHIVED",
      "title": "Archived",
      "style": {
        "width": 280
      },
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED2",
      "title": "Archived2",
      "style": {
        "width": 280
      },
      "label": "1/1",
      "cards": [
        {
          "id": "Archived2",
          "title": "Go Jogging",
          "label": "300 mins",
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED3",
      "title": "Archived3",
      "style": {
        "width": 280
      },
      "label": "1/1",
      "cards": [
        {
          "id": "Archived3",
          "title": "Go Cycling",
          "label": "300 mins",
          "description": "Completed 10km on cycle"
        }
      ]
    }
  ]
}


const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

class Project extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {"lanes": []}
    }

    console.log(this.props);
  }

  // TODO: Make it acctually works rs
  componentDidMount = () => {
    this.getBoardData();
  }

  getBoardData = () => {
    let projectId = '2';

    let email = 'e@e.com';
    if (this.props.profile) {
      email = this.props.profile.profile || email
    }

    axios.get(`${Config.URL}/projects/${email}`, config, { email: email }).then(res => {
      console.log(res)
      if (res.data) {
        let data = res.data;
        const lanes = data.filter(i => (i.card_title && i.lane_title) || (i.card_title === null && i.lane_title && i.lane_title.length > 0))
        .map(i => {
          return {
            id: i.lane_id,
              title: i.lane_title,
              label: i.lane_title,
              cards: []
          }
        });

        const cards = data.filter(i => i.card_title && i.card_title.length > 0)
        .map(i => {
          return {
            id: i.card_title,
            title: i.card_title,
            label: i.card_label,
            description: i.card_description,
            laneId: i.card_lane_id
          }
        });

        lanes.forEach(lane => {
          const data = cards.filter(card => {
            console.log(' i >> ', card, lane)
            
            return card.laneId === lane.id;
          }).map(i => {
            return {
              id: i.id,
              title: i.title,
              label: i.label,
              description: i.description,
              laneId: i.laneId
            }});

          console.log('Card >> ', data)  
          if (data && data.length > 0) lane.cards.push(data)
        })

        console.log(lanes);
        console.log(cards)
        this.setState({ data: {"lanes": lanes} });
      }
    }).catch(err => {
      console.log(err)
    })
  }

  onCardAdd = (card, laneId) => {
    const id = card.id || '???';
    const title = card.title || '';
    const description = card.description || '';
    const label = card.label || '';
    const lane_id = laneId;

    axios.post(`${Config.URL}/project/createCard`, {
      id, title,
      description,
      label, lane_id
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })

    console.log(card, laneId)
  }

  onLaneAdd = (data) => {
    console.log(data)

    let email = 'e@e.com';
    if (this.props.profile) {
      email = this.props.profile.profile || email
    }

    axios.post(`${Config.URL}/project/createLane`, 
      { email: email, title: data.title }).then(res => {
      console.log(res)
      if (res.data) {
        let data = res.data;
        
      }
    }).catch(err => {
      console.log(err)
    })
  }

  deleteCard = (cardId, laneId) => {
    console.log(cardId, laneId)
  }

  render() {
    const data = {...this.state.data};
    console.log(data)
    return (
      <div style={{ background: '#ECECEC', width: '100%' }}>
            <Board 
              data={data} 
              draggable 
              editable={true} 
              canAddLanes={true}
              onLaneDelete={this.deleteCard}
              onLaneAdd={this.onLaneAdd}
              onCardAdd={this.onCardAdd}
            />  
      </div>
    );
  }
}

const mapStateToProps = store => ({
  profile: store.profileState.profile,
  project: store.projectState.project
});

export default connect(mapStateToProps)(Project);
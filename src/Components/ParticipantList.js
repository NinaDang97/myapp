import React, {Component} from 'react';
import './ParticipantList.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

class ParticipantList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        //icon edit, delete styling
        const icon = {
            fill: '#909090',
            // height: 24,
            // width: 24
        }
        const pencil = (
            <FontAwesomeIcon style={icon} icon={faPencilAlt} />
        )          
        const trash = (
            <FontAwesomeIcon style={icon} icon={faTrash} />
        )

        //looping participants list
        let participant = this.props.participants.map((val) => (
            <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.number}</td>
                <td><a>{pencil}</a><a onClick={() => this.props.deletePart(val.id)}>{trash}</a></td>
            </tr>
        ));
        return(
            <table className="table">
            <thead>
              <tr>
                <th>Name<i className="fa fa-long-arrow-down"></i></th>
                <th>E-mail address</th>
                <th>Phone number</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {participant}
            </tbody>
          </table>
        );
    }
}

export default ParticipantList;
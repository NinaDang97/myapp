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
        const trash = (
            <FontAwesomeIcon style={icon} icon={faTrash} />
        )
        const pencil = (
            <FontAwesomeIcon style={icon} icon={faPencilAlt} />
        )

        //looping participants list
        let participant = this.props.participants.map((val) => (
            <tr key={val.id}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.number}</td>
                <td>{pencil}{trash}</td>
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
              <tr>
                <td>John Doe</td>
                <td>john.doe@gmail.com</td>
                <td>12749822</td>
                <td>{pencil}{trash}</td>
              </tr>
              <tr>
                <td>Joonas Turunen</td>
                <td>joonas.turu@gmail.com</td>
                <td>3523523</td>
                <td>{pencil}{trash}</td>
              </tr>
              <tr>
                <td>Nga Tran</td>
                <td>nga.tran@gmail.com</td>
                <td>5723557</td>
                <td>{pencil}{trash}</td>
              </tr>
              {participant}
            </tbody>
          </table>
        );
    }
}

export default ParticipantList;
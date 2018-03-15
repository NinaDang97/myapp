import React, {Component} from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';

class ParticipantGenerator extends Component{
    constructor(props){
        super(props);
        this.state = {
            rdmPartList: []
        }
    }

    componentDidMount(){
        fetch("https://randomuser.me/api/?results=20")
        .then((response) => response.json())
        .then((responseData) => {
            let rdmPartList = responseData.results.map((element, i) => {
               return {
                   id: i,
                   name: `${element.name.first} ${element.name.last}`,
                   email: element.email,
                   number: element.phone
               }
            });
          this.setState({rdmPartList});
        })
    }

    deleteRdmPart = (deletedId) => {
        let rdmPartList = this.state.rdmPartList.filter((val) => val.id !== deletedId);
        this.setState({rdmPartList});
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

        let rdmParticipants = this.state.rdmPartList.map((val, i) => (            
            <tr key={i}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.number}</td>
                <td><a>{pencil}</a><a onClick={() => this.deleteRdmPart(val.id)}>{trash}</a></td>
            </tr>
        ))
        return(
            <tbody>
                {rdmParticipants} 
            </tbody>
        );
    }
}

export default ParticipantGenerator;
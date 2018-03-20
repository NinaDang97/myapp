import React, {Component} from 'react';
import './ParticipantList.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import faPencilAlt from '@fortawesome/fontawesome-free-solid/faPencilAlt';
import faArrowDown from '@fortawesome/fontawesome-free-solid/faArrowDown';
import ParticipantEdit from './ParticipantEdit';

const Participant = props => {
    return (
        <tr key={props.id} id={props.id}>
            <td >{props.name}</td>
            <td>{props.email}</td>
            <td>{props.number}</td>
            <td className='btn'><a onClick={() => props.editPart(props.id)}>{props.pencil}</a><a onClick={() => props.deletePart(props.id)}>{props.trash}</a></td>
        </tr>
    );
}

class ParticipantList extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            participants: []
        }
    }
        
    //receive props from FetchAPI random generator
    componentWillReceiveProps(props){
        if(typeof props.rdmPartList !== 'undefined'){
            this.setState({participants: props.rdmPartList});
        }
    }

    //onChange event
    inputChanged = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //handle validation
    //name must not be undefined
    validateName(name)
    {
        if(name !== ''){
            return true;
        } else{
            alert("Invalid Name");
            return false;
        }
    }

    //valid email must contain some special characters
    validateEmail(email) 
    {
        const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email.match(validEmail) !== null)
        {
            return true;
        } else{
            alert("Invalid Email")
            return false;
        }
        
    }

    //Add new participant row function
    btnPress = () => {
        let participant = {
            name: this.state.name,
            email: this.state.email,
            number: this.state.number,
            show: true //set show row table to true 
        }

        //validate name, email & phone number
        if(this.validateName(participant.name) && this.validateEmail(participant.email)){
            //after submit, input will be left blank
            let name = '', email = '', number = '';

            this.setState({
                name, email, number,
                participants: [participant, ...this.state.participants]
            })
        }
    }

    sortName = () => {
        let participants = this.state.participants;
        participants.sort(function(a, b){
            if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return 0;
        });
        this.setState({participants});
    }

    //delete participant row
    deletePart = (deletedId) => {
        let participants = this.state.participants.filter((val, i) => i !== deletedId);
        this.setState({participants});
    }

    //open participant edit form
    editPart = (editId) => {
        let participants = this.state.participants.map(function(val, i){
            if(i === editId){
                val.show = false;
            } 
            return val;
        })
        this.setState({
            participants
        });
    }

    //update participant edit 
    updatePart = (id, name, email, number) => {
        let participants = this.state.participants.map((val, i) => {
            if(i === id){
                val.name = name;
                val.email = email;
                val.number = number;
                val.show = true; 
            }
            return val;
        })
        this.setState({participants}); 
    }

    //cancel participant edit form
    cancelPart = (id) => {
        let participants = this.state.participants.map((val, i) => {
            if(i === id){
                val.show = true; 
            }
            return val;
        })
        this.setState({participants}); 
    }

    render(){
        //icon edit, delete styling
        const icon = {
            fill: '#909090',
            // height: 24,
            // width: 24
        }
        const sort = (
            <FontAwesomeIcon style={icon} icon={faArrowDown} />
        )
        const pencil = (
            <FontAwesomeIcon style={icon} icon={faPencilAlt} />
        )          
        const trash = (
            <FontAwesomeIcon style={icon} icon={faTrash} />
        )


        //looping participants list
        let participant = this.state.participants.map((val, i) => {
            if(val.show === true){
                return (
                    <Participant 
                        key={i} 
                        id={i}
                        {...val}
                        pencil={pencil}
                        trash={trash}
                        deletePart={this.deletePart}
                        editPart={this.editPart}  
                    />
                )
            } 
            else {
                return ( //show edit form when show = false
                    <ParticipantEdit
                        key={i}
                        id={i}
                        name={val.name}
                        email={val.email}
                        number={val.number}
                        cancelPart={this.cancelPart}
                        updatePart={this.updatePart}
                    />
                )
            }
        }); 
        
        return(
            <div>
                <table className="form">
                    <tbody>
                        <tr>
                            <td className="name">
                                <input type="text" name="name" value={this.state.name} onChange={this.inputChanged} placeholder="Full name" />
                            </td>
                            <td className="email">
                                <input type="email" name="email" value={this.state.email} onChange={this.inputChanged} placeholder="E-mail address" />
                            </td>
                            <td className="number">
                                <input type="text" name="number" value={this.state.number} onChange={this.inputChanged} placeholder="Phone number" />
                            </td>
                            <td className="btn"><button onClick={() => this.btnPress()}>Add new</button></td>
                        </tr>
                    </tbody>
                </table>  
    
                <table className="table">
                    <thead>
                        <tr>
                            <th className="name">Name <a onClick={() => this.sortName()}>{sort}</a></th>
                            <th className="email">E-mail address</th>
                            <th className="number">Phone number</th>
                            <th className="btn"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {participant}
                    </tbody>
                    
                </table> 
            </div>
        );
    }
}

export default ParticipantList;
import React, {Component} from 'react';
import './Form.css';
import ParticipantList from './ParticipantList';

class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            number: '',
            participants: []
        }
    }
        
    static defaultProps = {
        persons: [
            {
                id: 0,
                name: 'John Doe',
                email: 'john.doe@gmail.com',
                number: '30219707',
            }
        ]
    }

    inputChanged = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    btnPress = (event) => {
        //generate unique id based on milliseconds
        let id = Date.now();  
        let participant = {
            id: id,
            name: this.state.name,
            email: this.state.email,
            number: this.state.number
        }
        this.setState({
            participants: [...this.state.participants, participant]
        })
    }
    
    deletePart = (deletedId) => {
        let participants = this.state.participants.filter((val) => val.id !== deletedId);
        this.setState({participants});
    }
    
    render(){
        return (
            <div>
                <table className="form">
                    <tbody>
                    <tr> 
                        <td><input type="text" name="name" value={this.state.name} onChange={this.inputChanged} placeholder="Full name" /></td>
                        <td><input type="email" name="email" value={this.state.email} onChange={this.inputChanged} placeholder="E-mail address" /></td>
                        <td><input type="text" name="number" value={this.state.number} onChange={this.inputChanged} placeholder="Phone number" /></td>
                        <td><button onClick={this.btnPress}>Submit</button></td>
                    </tr>
                    </tbody>
                </table>   

                 {/* All participants table goes here */}
                <ParticipantList participants={this.state.participants} deletePart={this.deletePart}  />
            </div>
        );
    }
}

export default Form;
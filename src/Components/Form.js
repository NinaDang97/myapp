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
    //valid phone number must contain numeric characters and NANP
    validatePhone(number)
    {
        const validPhone =/^[\]?[(]?[0-9]{3}[)]?[-\s\]?[0-9]{3}[-\s\]?[0-9]{4,6}$/;
        if(number.match(validPhone) !== null){
            return true;
        } else{            
            alert("Invalid Phone Number");
            return false;
        }
    }

    btnPress = (event) => {
        //generate unique id based on milliseconds
        let id = Date.now();  
        let participant = {
            id,
            name: this.state.name,
            email: this.state.email,
            number: this.state.number
        }

        if(this.validateName(participant.name) && this.validateEmail(participant.email) && this.validatePhone(participant.number)){
            //after submit, input will be left blank
            let name = '', email = '', number = '';

            this.setState({
                name, email, number,
                participants: [...this.state.participants, participant]
            })
        }
        
        
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
                <ParticipantList participants={this.state.participants} deletePart={this.deletePart} />
            </div>
        );
    }
}

export default Form;
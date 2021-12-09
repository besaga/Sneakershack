import React, { Component } from "react";
// import { Container, Row, Col } from "react-bootstrap";
import ProfileService from "../../services/profile.service";
import { Redirect } from "react-router-dom";

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password:"",
            firstName:"",
            lastName:"",
            adress:"",
            phoneNumber:""
        }
        this.profileService = new ProfileService();
        
    }

    // componentDidMount() {
    //     this.profileService.getProfile()
    // }
    handleChange = (e) => {
        const {email,password,firstName,lastName,adress,phoneNumber } = e.target;
        this.setState({
            ...this.state,
            [Profile]:
        })
    }
    



    render(){
        return(
            this.props.loggedUser ? 

            <>
            <h1>holix</h1>
            <p>{this.props.loggedUser.email}</p>
            <p>{this.props.loggedUser.password}</p>
{/* 
            <p>{this.props.loggedUser.password}</p>
            <p>{this.props.loggedUser.firstName}</p>
            <p>{this.props.loggedUser.lastName}</p>
            <p>{this.props.loggedUser.adress}</p>
            <p>{this.props.loggedUser.phoneNumber}</p> */}
        </>
        :
        <Redirect to="/"></Redirect>

    )
    }
 }


export default Profile

import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import api from "../../Api/api"
import "./route.css"

let _isMounted = false;

const isLogin = async () => {
    if (_isMounted){
        const resp = await api.checkIfUserLoggedIn();
        return resp.data.status === 'success'
    }
    return false;
};

const isAdmin = async () => {
    if (_isMounted){
        const resp = await api.checkIfUserIsAdmin();
        console.log("admin:", resp.data.admin)
        return resp.data.admin
    }
    return false;
};


export default class AdminRoute extends Component {
    constructor() {
        super();
        this.state = {
            proceed: null
        };
    }
    componentDidMount = async () => {
        _isMounted = true;
        if (_isMounted){
            this.setState({proceed: (await isLogin() && await isAdmin())})
        }
    }

    componentWillUnmount(){
        _isMounted = false;
    }
  render() {
    return (
        (this.state.proceed != null) ?
        <Route render={() => (
            (this.state.proceed) ?
            this.props.component
            : <Redirect to="/Home" />
        )} /> : null
    );
  }
}
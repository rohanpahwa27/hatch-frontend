import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import api from "../../Api/api"
import "./route.css"

let _isMounted = false;

const isLogin = async () => {
    const resp = await api.checkIfUserLoggedIn();
    return resp.data.status === 'success'
};

export default class PublicRoute extends Component {
    constructor() {
        super();
        this.state = {
            proceed: null
        };
    }

    componentDidMount = async () => {
        _isMounted = true;
        if (_isMounted){
            this.setState({proceed: (await isLogin() && this.props.restricted)})
        }
    }
    
    componentWillUnmount(){
        _isMounted = false;
    }
  render() {
    return (
        (this.state.proceed != null) ?
        <Route render={props => (
            (this.state.proceed)?
                <Redirect to="/Home" />
            : this.props.component
        )} /> : null
    );
  }
}
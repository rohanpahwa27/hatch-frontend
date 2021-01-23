import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import api from "../../Api/api"
import Loading from "@kiwicom/orbit-components/lib/Loading";
import "./route.css"

let _isMounted = false;

const isLogin = async () => {
    const resp = await api.checkIfUserLoggedIn();
    return resp.data.status == 'success'
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
            console.log(await isLogin())
            this.setState({proceed: (await isLogin())})
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
            : <Redirect to="/Login" />
        )} /> : ((this.props.loadingScreen) ? <div id="loading-screen"><Loading/></div> : null)
    );
  }
}
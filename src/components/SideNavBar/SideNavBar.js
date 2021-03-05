import React, { Component } from "react";
import "./SideNavBar.css";
import AdminSideBarItem from "./AdminSideBarItem/AdminSideBarItem.js";
import ProfileSideBarItem from "./ProfileSideBarItem/ProfileSideBarItem.js";
import HomeSideBarItem from "./HomeSideBarItem/HomeSideBarItem.js";
import api from "../../Api/api"

class SideNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingProfile: false,
            showAdmin: null
        };
        this.setShowingProfile = this.setShowingProfile.bind(this);
    }

    componentDidMount = async () => {
        const resp = await api.checkIfUserIsAdmin();
        this.setState({showAdmin: resp.data.admin})
    }

    setShowingProfile(setToThis) {
        this.setState({ showingProfile: setToThis });
    }

    render() {
        //if profile and other item shouldn't be, then gotta pull up the profile state
        return (
            (this.state.showAdmin != null) ?
            <div id="sidenav-grid-container">
                <HomeSideBarItem showingProfile={this.state.showingProfile}/>
                <ProfileSideBarItem setShowingProfile={this.setShowingProfile}/>
                {(this.state.showAdmin)? <AdminSideBarItem showingProfile={this.state.showingProfile}/> : null}
            </div> : null
        )
    }
}

export default SideNavBar;
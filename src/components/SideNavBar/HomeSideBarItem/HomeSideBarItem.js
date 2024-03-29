import React, { Component } from "react"
import "./HomeSideBarItem.css"
import { NavLink } from "react-router-dom";

class HomeSideBarItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    render() {
        let navlink;
        navlink = (this.props.showingProfile) ? 
        <NavLink
            id="applicants-to-home-link"
            to="/home">
            <span id="profile-image">
                <svg width="25" height="25" viewBox="0 0 16 16" fill="#00A991" xmlns="http://www.w3.org/2000/svg"><path d="M7.31299 1.26164C7.69849 0.897163 8.30151 0.897163 8.68701 1.26164L13.5305 5.84098C13.8302 6.12431 14 6.51853 14 6.93094V12.5002C14 13.3286 13.3284 14.0002 12.5 14.0002H10.5C9.67157 14.0002 9 13.3286 9 12.5002V10.0002C9 9.72407 8.77614 9.50021 8.5 9.50021H7.5C7.22386 9.50021 7 9.72407 7 10.0002V12.5002C7 13.3286 6.32843 14.0002 5.5 14.0002H3.5C2.67157 14.0002 2 13.3286 2 12.5002V6.93094C2 6.51853 2.1698 6.12431 2.46948 5.84098L7.31299 1.26164ZM8 1.98828L3.15649 6.56762C3.0566 6.66207 3 6.79347 3 6.93094V12.5002C3 12.7763 3.22386 13.0002 3.5 13.0002H5.5C5.77614 13.0002 6 12.7763 6 12.5002V10.0002C6 9.17179 6.67157 8.50022 7.5 8.50022H8.5C9.32843 8.50022 10 9.17179 10 10.0002V12.5002C10 12.7763 10.2239 13.0002 10.5 13.0002H12.5C12.7761 13.0002 13 12.7763 13 12.5002V6.93094C13 6.79347 12.9434 6.66207 12.8435 6.56762L8 1.98828Z" fill="#212121"/></svg>
            </span>
            <span className="side-nav-bar-item-text">Home</span>
        </NavLink> : 
        <NavLink
            id="applicants-to-home-link"
            to="/home">
            <span id="profile-image">
                <svg width="25" height="25" viewBox="0 0 16 16" fill="#00A991" xmlns="http://www.w3.org/2000/svg"><path d="M8.68701 1.26164C8.30151 0.897163 7.69849 0.897163 7.31299 1.26164L2.46948 5.84098C2.1698 6.12431 2 6.51853 2 6.93094V12.5002C2 13.3286 2.67157 14.0002 3.5 14.0002H5C5.82843 14.0002 6.5 13.3286 6.5 12.5002V10.0002C6.5 9.72407 6.72386 9.50021 7 9.50021H9C9.27614 9.50021 9.5 9.72407 9.5 10.0002V12.5002C9.5 13.3286 10.1716 14.0002 11 14.0002H12.5C13.3284 14.0002 14 13.3286 14 12.5002V6.93094C14 6.51853 13.8302 6.12431 13.5305 5.84098L8.68701 1.26164Z" fill="#00A991"/></svg>
            </span>
            <span className="color-side-bar-nav-text side-nav-bar-item-text">Home</span>
        </NavLink>

        return (
            <div id="home-side-bar-item">
                {window.location.pathname.toLowerCase()==="/home"?
                navlink
                    :
                <NavLink
                    id="applicants-to-home-link"
                    to="/home">
                    <span id="profile-image">
                        <svg width="25" height="25" viewBox="0 0 16 16" fill="#00A991" xmlns="http://www.w3.org/2000/svg"><path d="M7.31299 1.26164C7.69849 0.897163 8.30151 0.897163 8.68701 1.26164L13.5305 5.84098C13.8302 6.12431 14 6.51853 14 6.93094V12.5002C14 13.3286 13.3284 14.0002 12.5 14.0002H10.5C9.67157 14.0002 9 13.3286 9 12.5002V10.0002C9 9.72407 8.77614 9.50021 8.5 9.50021H7.5C7.22386 9.50021 7 9.72407 7 10.0002V12.5002C7 13.3286 6.32843 14.0002 5.5 14.0002H3.5C2.67157 14.0002 2 13.3286 2 12.5002V6.93094C2 6.51853 2.1698 6.12431 2.46948 5.84098L7.31299 1.26164ZM8 1.98828L3.15649 6.56762C3.0566 6.66207 3 6.79347 3 6.93094V12.5002C3 12.7763 3.22386 13.0002 3.5 13.0002H5.5C5.77614 13.0002 6 12.7763 6 12.5002V10.0002C6 9.17179 6.67157 8.50022 7.5 8.50022H8.5C9.32843 8.50022 10 9.17179 10 10.0002V12.5002C10 12.7763 10.2239 13.0002 10.5 13.0002H12.5C12.7761 13.0002 13 12.7763 13 12.5002V6.93094C13 6.79347 12.9434 6.66207 12.8435 6.56762L8 1.98828Z" fill="#212121"/></svg>
                    </span>
                    <span className="side-nav-bar-item-text">Home</span>
                </NavLink>    }
            </div>
        )
    }
}

export default HomeSideBarItem
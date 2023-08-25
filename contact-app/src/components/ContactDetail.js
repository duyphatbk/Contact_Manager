import React from "react";
import user from "../images/user.jpg";
import { useParams } from "react-router-dom";

const ContactDetail = () => {
    const {name, email} = useParams();
    return (
        <div className="main" style={{margin:"auto"}}>
            <div className="ui card centerd" style ={{margin:"auto", marginTop: "50px"}}>
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
        </div>
    );
}
export default ContactDetail;
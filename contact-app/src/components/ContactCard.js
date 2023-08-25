import React from "react";
import user from "../images/user.jpg"
import { Link } from "react-router-dom";

const ContactCard = (props) => {
    return (
        <div className="item">
            <img className="ui avatar image" src={user} alt="user" />
            <div className="content">
                <Link to={{
                    pathname: `/contact/${props.contact.name}/${props.contact.email}`
                }}>
                    <div className="header">{props.contact.name}</div>
                    <div className="header">{props.contact.email}</div>
                </Link>
            </div>
            <Link to={{ pathname: `/` }}>
                <i className="trash alternate outline icon"
                    style={{ color: 'red', float: "right" }}
                    onClick={() => props.removeContact(props.contact.id)}
                />
            </Link>
            <Link to={{ pathname: `/edit/${props.contact.id}` }}>
                <i
                    className="edit alternate outline icon"
                    style={{ color: "blue", float: "right" }}
                />
            </Link>           
        </div>
    );
}
export default ContactCard;
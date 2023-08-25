import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { Link } from "react-router-dom";

const ContactList = (props) => {
    const inputEl = useRef("");
    const deleteHandler = (id) => {
        props.removeCardContact(id);
    }

    const renderContactList = props.contacts.map((contact) => {
        return (
            <ContactCard key={contact.id} contact={contact}
                removeContact={deleteHandler}
            />
        );
    })
    const getSearchTerm = () => {
        props.searchKeyWord(inputEl.current.value);
    }
    return (
        <div className="main" style= {{ paddingTop: "50px", margin: "auto", width: "50%" }}>
            <h2>
                Contact List
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={props.term} onChange={getSearchTerm} />
                    <i className="search icon" />
                </div>
                <Link to="/add">
                    <button className="ui right floated primary button">Add Contact</button>
                </Link>
            </div>
            <div className="ui celled list" style={{ marginTop: "20px" }}>
                {renderContactList.length > 0 ?
                    renderContactList :
                    "No contacts available"}
            </div>
        </div>

    );
}
export default ContactList;
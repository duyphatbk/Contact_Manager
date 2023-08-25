import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../api/contact';

const EditContact = (props) => {
    const param = useParams();
    const [contact, setContacts] = useState({ name: "", email: "" });
    const retriveContacts = async () => {
        const response = await api.get("/contacts");
        return response.data;
    }

    useEffect(() => {
        const getAllContacts = async () => {
            const allContacts = await retriveContacts();
            if (allContacts) {
                const oldContact = allContacts.find((contact) => contact.id === parseInt(param.id));
                setContacts(oldContact);
            }
        };
        getAllContacts();
    },[param.id]);
    const update = (e) => {
        e.preventDefault();
        if (contact.name === "" || contact.email === "") {
            alert("All fileds are mandatory!");
            return;
        }
        props.updateContactHandler(contact);
        if (window.confirm("Contact have already updated successfully!")) 
            document.location.assign('http://localhost:3000');
    }

    return (
        <div className="main" style= {{ margin: "auto", width: "50%" }}>
            <h2 style={{ marginTop: 75 }}>Update Contact</h2>
            <div className="ui main">
                <form className="ui form" onSubmit={update}>
                    <div className="field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={contact.name}
                            onChange={(e) => setContacts({ ...contact, name: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={contact.email}
                            onChange={(e) => setContacts({ ...contact, email: e.target.value })} />
                    </div>
                    <button className="ui button blue">Save</button>
                </form>
            </div>
        </div>
    );
}
export default EditContact;
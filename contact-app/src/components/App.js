import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import AddContact from "./AddContact";
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contact';
import UpdateContact from './UpdateContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }

  const addContactHandler = async (contact) => {
    const response = await api.post("/contacts", contact);
    console.log(response);
    setContacts([...contacts, response.data]);
  };

  //api.delete only delete item by id
  const removeContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContacts = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContacts);
    setSearchResult(newContacts);
  }

  const updateContactHandler = async (contact) => {
    //console.log(contact);
    const res = await api.put(`/contacts/${contact.id}`, contact);
    const id = res.data.id;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...res.data } : contact;
    })
    );
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    }
    else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // }
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        setContacts(allContacts);
        setSearchResult(allContacts);
      }
    };
    getAllContacts();
  }, []);

  return (
    <div className='ui container' style={{ alignItem: "center" }}>
      <Header />
      <Router>
        <Routes>
          <Route path='/add' element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path='/' element={<ContactList searchKeyWord={searchHandler} term={searchTerm}
            contacts={searchResult} removeCardContact={removeContact} />} />
          <Route path='/contact/:name?/:email?' Component={ContactDetail} />
          <Route path='/edit/:id' element={<UpdateContact updateContactHandler={updateContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
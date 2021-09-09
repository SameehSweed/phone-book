import React, { useState } from "react";
import "../Css/main.css";
import contacts from "../persons/contacts";
import AddPersonWidget from "./AddPersonWidget";

function capitalize(myString) {
  return myString.charAt(0).toUpperCase() + myString.slice(1);
}

function Main() {
  // define variables with useState  {median && sameeh}
  const [contactsList] = useState(contacts);

  const [contactsAfterSearchList, setContactsAfterSearchList] =
    useState(contactsList);

  // search function work by name  {median && sameeh}
  const searchForContact = (name) => {
    const results = contactsList.filter((contact) =>
      contact.name.toLowerCase().includes(name)
    );
    setContactsAfterSearchList(results);
  };

  // define more variables with useState  {median && sameeh}
  const [isTheShowOpen, setIsTheShowOpen] = useState(false);
  const [forShowContact, setForShowContact] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    imgSrc:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    text: "",
  });

  //
  const sortContacts = () => {
    contactsAfterSearchList.sort(function (itemA, itemB) {
      var nameA = itemA.name.toUpperCase();
      var nameB = itemB.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  };

  // uniq key for mapping the personslist   {median && sameeh}
  var index = 0;
  const [isAddOpen, setIsAddOpen] = useState(false);

  // add person function that get newperson details and store them in our list {median && sameeh}
  const addPerson = (newPerson, e) => {
    e.preventDefault();
    setContactsAfterSearchList([...contactsAfterSearchList, newPerson]);

    setIsAddOpen((isAddOpen) => !isAddOpen);
  };

  // update details function that get new details and update them in our list  {median && sameeh}
  const saveDetails = (newPerson, help) => {
    const newList = contactsAfterSearchList.map((person) => {
      if (person.name === help) {
        const updatedItem = {
          ...person,
          name: newPerson.name,
          address: newPerson.address,
          email: newPerson.email,
          description: newPerson.description,
          phone: newPerson.phone,
        };

        return updatedItem;
      }

      return person;
    });

    setContactsAfterSearchList(newList);
    setIsAddOpen((isAddOpen) => !isAddOpen);
  };

  return (
    <div className="app-main">
      {/**start main/header */}
      <header className="app-main-header">
        {" "}
        <ul>
          <li>
            <input
              id="searchbar"
              onChange={(e) => searchForContact(e.target.value)}
              className="searchbar"
              placeholder="search"
            />
          </li>
          <li>
            <button
              onClick={(e) => {
                // function that open addPerson window
                e.preventDefault();
                setIsAddOpen((isAddOpen) => !isAddOpen);
                setForShowContact({
                  name: "",
                  phone: "",
                  address: "",
                  email: "",
                  imgSrc: "https://via.placeholder.com/150/0000FF/ffffff",
                  text: "",
                });
              }}
              id="addcontact"
              className="addcontact"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 8c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-6 4c.22-.72 3.31-2 6-2 2.7 0 5.8 1.29 6 2H9zm-3-3v-3h3v-2H6V7H4v3H1v2h3v3z" />
              </svg>
            </button>
          </li>
          <li>
            <button
              id="deleteAll"
              onClick={() => {
                // function that delete all the persons in our list
                setContactsAfterSearchList([]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
              </svg>
            </button>
          </li>
        </ul>
      </header>

      {/** finish main/header*/}

      {/** start addperson component */}
      {isAddOpen ? (
        <AddPersonWidget
          setForShowContact={setForShowContact}
          setIsAddOpen={setIsAddOpen}
          person={forShowContact}
          add={(newPerson, e) => {
            addPerson(newPerson, e);
          }}
          save={(newContact, tempName) => {
            saveDetails(newContact, tempName);
          }}
        />
      ) : (
        console.log("400000")
      )}
      {/** finish addperson component */}

      {/**start showdetails component */}
      {isTheShowOpen ? (
        <div className="istheshow-open">
          <div className="x">
            <div>
              <button
                onClick={() => {
                  setIsTheShowOpen((isTheShowOpen) => !isTheShowOpen);
                }}
              >
                X
              </button>
            </div>
          </div>

          <h1>{capitalize(forShowContact.name)}</h1>
          <img
            className="imageinshow"
            alt="H"
            src={forShowContact.imgSrc}
          ></img>
          <p>{forShowContact.address}</p>
          <p>{forShowContact.email}</p>
          <p>{forShowContact.phone}</p>
          <p>{forShowContact.text}</p>
        </div>
      ) : null}

      {/**finish showdetails component */}

      {/**start contactcontainer component */}

      <div className="contacts-container">
        {/** here we show the no contacts found message by the length of our list */}
        {contactsAfterSearchList.length === 0 ? (
          <div className="nocontacts-foundmessage">No Contacts Found!</div>
        ) : null}

        {/** here we are sorting the list */}
        {sortContacts()}

        {/**here we mapping the list to use the details */}
        {contactsAfterSearchList.map((item) => (
          <div className="contact" key={index++}>
            {/** left side of the card */}
            <li id="a">
              <img src={item.imgSrc} alt="no " />
              <h3>{capitalize(item.name)}</h3>
              <div></div>

              {/** right side of the card */}

              {/** first button , onpressed show details about the person */}
              <button
                onClick={() => {
                  // function that show window with the person details
                  setIsTheShowOpen((isTheShowOpen) => !isTheShowOpen);

                  setForShowContact({
                    name: item.name,
                    phone: item.phone,
                    address: item.address,
                    email: item.email,
                    imgSrc: item.imgSrc,
                    text: item.text,
                  });
                }}
              >
                <svg
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="15"
                  height="20"
                  viewBox="0 0 45.311 45.311"
                >
                  <g>
                    <path
                      d="M22.675,0.02c-0.006,0-0.014,0.001-0.02,0.001c-0.007,0-0.013-0.001-0.02-0.001C10.135,0.02,0,10.154,0,22.656
                c0,12.5,10.135,22.635,22.635,22.635c0.007,0,0.013,0,0.02,0c0.006,0,0.014,0,0.02,0c12.5,0,22.635-10.135,22.635-22.635
                C45.311,10.154,35.176,0.02,22.675,0.02z M22.675,38.811c-0.006,0-0.014-0.001-0.02-0.001c-0.007,0-0.013,0.001-0.02,0.001
                c-2.046,0-3.705-1.658-3.705-3.705c0-2.045,1.659-3.703,3.705-3.703c0.007,0,0.013,0,0.02,0c0.006,0,0.014,0,0.02,0
                c2.045,0,3.706,1.658,3.706,3.703C26.381,37.152,24.723,38.811,22.675,38.811z M27.988,10.578
                c-0.242,3.697-1.932,14.692-1.932,14.692c0,1.854-1.519,3.356-3.373,3.356c-0.01,0-0.02,0-0.029,0c-0.009,0-0.02,0-0.029,0
                c-1.853,0-3.372-1.504-3.372-3.356c0,0-1.689-10.995-1.931-14.692C17.202,8.727,18.62,5.29,22.626,5.29
                c0.01,0,0.02,0.001,0.029,0.001c0.009,0,0.019-0.001,0.029-0.001C26.689,5.29,28.109,8.727,27.988,10.578z"
                    />
                  </g>
                </svg>
              </button>

              {/* second button ,onpressed we open window and can edit details of the user */}
              <button
                onClick={() => {
                  // function that open window and let as edit the person
                  setIsAddOpen((isAddOpen) => !isAddOpen);
                  setForShowContact({
                    name: item.name,
                    phone: item.phone,
                    address: item.address,
                    email: item.email,
                    imgSrc: item.imgSrc,
                    text: item.text,
                  });
                }}
              >
                <svg
                  height="20"
                  viewBox="0 -1 401.52289 401"
                  width="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m370.589844 250.972656c-5.523438 0-10 4.476563-10 10v88.789063c-.019532 16.5625-13.4375 29.984375-30 30h-280.589844c-16.5625-.015625-29.980469-13.4375-30-30v-260.589844c.019531-16.558594 13.4375-29.980469 30-30h88.789062c5.523438 0 10-4.476563 10-10 0-5.519531-4.476562-10-10-10h-88.789062c-27.601562.03125-49.96875 22.398437-50 50v260.59375c.03125 27.601563 22.398438 49.96875 50 50h280.589844c27.601562-.03125 49.96875-22.398437 50-50v-88.792969c0-5.523437-4.476563-10-10-10zm0 0" />
                  <path d="m376.628906 13.441406c-17.574218-17.574218-46.066406-17.574218-63.640625 0l-178.40625 178.40625c-1.222656 1.222656-2.105469 2.738282-2.566406 4.402344l-23.460937 84.699219c-.964844 3.472656.015624 7.191406 2.5625 9.742187 2.550781 2.546875 6.269531 3.527344 9.742187 2.566406l84.699219-23.464843c1.664062-.460938 3.179687-1.34375 4.402344-2.566407l178.402343-178.410156c17.546875-17.585937 17.546875-46.054687 0-63.640625zm-220.257812 184.90625 146.011718-146.015625 47.089844 47.089844-146.015625 146.015625zm-9.40625 18.875 37.621094 37.625-52.039063 14.417969zm227.257812-142.546875-10.605468 10.605469-47.09375-47.09375 10.609374-10.605469c9.761719-9.761719 25.589844-9.761719 35.351563 0l11.738281 11.734375c9.746094 9.773438 9.746094 25.589844 0 35.359375zm0 0" />
                </svg>
              </button>
              {/** third button ,onpressed we delete the specific person */}
              <button
                onClick={() => {
                  // function that delete person by name
                  setContactsAfterSearchList(
                    contactsAfterSearchList.filter(
                      (contact) => contact.name !== item.name
                    )
                  );
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  viewBox="0 0 24 24"
                  width="15"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                </svg>
              </button>
            </li>
          </div>
        ))}
      </div>
      {/**finish contactContainer component */}
    </div>
  );
}

export default Main;

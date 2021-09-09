import React from "react";

import "../Css/addperson.css";

class AddPersonWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.person.name != null ? props.person.name : "",
      phone: props.person.phone != null ? props.person.phone : "",
      address: props.person.address != null ? props.person.address : "",
      email: props.person.email != null ? props.person.email : "",
      descreption:
        props.person.descreption != null ? props.person.descreption : "",
    };
  }

  Changevalue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="formaddnewperson">
        <form
          id="addnewperson"
          onSubmit={(e) => {
            var newperson = {
              name: this.state.name,
              phone: this.state.phone,
              address: this.state.address,
              email: this.state.email,
              imgSrc:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              text: this.state.descreption,
            };

            this.props.person.name === ""
              ? this.props.add(newperson, e)
              : this.props.save(newperson, this.props.person.name);
          }}
        >
          <h1>
            {this.props.person.name === "" ? "Add " : "Edit "} contact{" "}
          </h1>
          <label htmlFor="name">Name:</label>
          <input
            name="name"
            value={this.state.name}
            type="text"
            id="name"
            onChange={(event) => {
              this.Changevalue(event);
            }}
            required
          />
          <label htmlFor="telephone">Telephone:</label>
          <input
            name="phone"
            value={this.state.phone}
            onChange={(event) => {
              this.Changevalue(event);
            }}
            type="text"
            id="telephone"
            required
          />
          <label
            htmlFor="address"
            title="must enter first big letter then small letter"
          >
            Address:
          </label>
          <input
            name="address"
            value={this.state.address}
            onChange={(event) => {
              this.Changevalue(event);
            }}
            type="text"
            id="address"
          />
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            value={this.state.email}
            onChange={(event) => {
              this.Changevalue(event);
            }}
            type="text"
            id="email"
          />
          <label htmlFor="description">Description:</label>
          <input
            name="descreption"
            value={this.state.text}
            onChange={(event) => this.Changevalue(event)}
            className="description"
            type="text"
            id="description"
          />

          <input
            className="btnadd"
            id="addnewpersonbtn"
            type="Submit"
            name="add"
            defaultValue={this.props.person.name === "" ? "Add" : "edit"}
          />

          <input
            className="btncancel"
            onClick={() => {
              this.props.setisaddopen((isaddopen) => !isaddopen);
            }}
            id="cancelbtn"
            name="cancel"
            defaultValue="Cancel"
          />
        </form>
      </div>
    );
  }
}

export default AddPersonWidget;

import "./App.css";
import React from "react";
import { useState } from "react";
import Api from "./Api";

export default function App() {
  const [recipientsList, setrecipientsList] = useState([{ email: "" }]);
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleInputChange = (e, index) => {
    const { value } = e.target;
    const list = [...recipientsList];
    list[index].email = value;
    setrecipientsList(list);
  };

  const handleRemoveClick = (e, index) => {
    e.preventDefault();
    const list = [...recipientsList];
    list.splice(index, 1);
    setrecipientsList(list);
  };

  const handleSendClick = () => {
    if (validateInput() === false) 
      return;
  
    Api.email
      .post({
        recipients: recipientsList,
        message: message,
        subject: subject,
      })
      .then((resp) => {
        if (resp.data === "successful") {
          if (recipientsList.length === 1) alert("Email sent successful");
          else alert("Emails sent successful");
          setrecipientsList([{ email: "" }]);
          setMessage("");
          setSubject("");
        } else alert("error occured please try again");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const validateInput = () => {
    if (validateRecipientsList() === false) {
      if (recipientsList.length === 1)
        alert("Email are invalid format please check then send again");
      else alert("Emails are invalid format please check then send again");
      return false;
    }

    if (message.length === 0) {
      alert("Please make sure to fill the message");
      return false;
    }
    if (subject.length === 0) {
      alert("Please make sure to fill the subject");
      return false;
    }
    return true;
  };

  const validateRecipientsList = () => {
    for (let val of recipientsList)
      if (validateEmail(val.email) === false) return false;
  };

  const validateEmail = (email) => {
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    return regexEmail.test(email);
  };
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <label>Recipients:</label> <br></br>
          {recipientsList.map((x, i) => {
            return (
              <div className="box" key={i}>
                <input
                  name="email"
                  placeholder="Enter email"
                  value={x.email}
                  onChange={(e) => handleInputChange(e, i)}
                />
                {recipientsList.length !== 1 && (
                  <button
                    className="mr10"
                    onClick={(e) => handleRemoveClick(e, i)}
                  >
                    Remove
                  </button>
                )}
                {recipientsList.length - 1 === i && (
                  <button
                    onClick={() =>
                      setrecipientsList([...recipientsList, { email: "" }])
                    }
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
          <br></br>
          <label>Subject:</label>
          <br></br>
          <textarea
            style={{ height: 50, width: 400 }}
            type="text"
            id="Subject"
            name="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></textarea>
          <br></br>
          <label>Message:</label>
          <br></br>
          <textarea
            style={{ height: 200, width: 600 }}
            type="text"
            id="Message"
            name="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </form>
        <button onClick={handleSendClick}>Send</button>
      </header>
    </div>
  );
}

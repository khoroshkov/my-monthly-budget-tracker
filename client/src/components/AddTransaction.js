import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "./Alert";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });

  const { addTransaction } = useContext(GlobalContext);

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });

    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (+amount === 0) {
      handleAlert({
        type: "danger",
        text: "Amount can't be 0",
      });
      return;
    }

    const newTransaction = {
      id: uuidv4(),
      text,
      amount: +amount,
    };

    addTransaction(newTransaction);

    if (+amount > 0) {
      handleAlert({
        type: "success",
        text: "Your income amount added to total balance",
      });
    } else if (+amount < 0) {
      handleAlert({
        type: "substruct",
        text: "Your expense amount subtracted from total balance",
      });
    }

    setText("");
    setAmount("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmitHandler}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            required
          />
        </div>
        <div className="form-control">
          {alert.show && <Alert type={alert.type} text={alert.text} />}
          <label htmlFor="amount">
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
          />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};

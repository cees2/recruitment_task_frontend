import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import resultClasses from "./SingleResult.module.css";
import { useSelector } from "react-redux";
import { DOMAIN } from "../../store/authentication";
import SingleResult from "./SingleResult";

const GET_ITEMS_URL = `${DOMAIN}/api/v1/items/`;

const LoginForm = (props) => {
  const token = useSelector((state) => state.auth.token);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const itemValueChanged = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const getItemsHandler = async () => {
      try {
        if (inputValue === "") {
          setResults([]);
          return;
        }
        const bearerToken = `Bearer ${token}`;
        const response = await fetch(`${GET_ITEMS_URL}/${inputValue}`, {
          headers: {
            Authorization: bearerToken,
          },
        });

        if (!response.ok) throw new Error("Could not fetch that data");

        const data = await response.json();

        const { items } = data.data;

        setResults(items);
      } catch (err) {
        setError(err.message);
      }
    };

    getItemsHandler();
  }, [inputValue, token]); // do poprawy

  return (
    <React.Fragment>
      {!token && (
        <h1 className={classes.homePageCaption}>
          Log in or sign up to get access to resources.
        </h1>
      )}
      {token && (
        <>
          <div className={classes.selectItemWrapper}>
            <label htmlFor="selectItem">Select item to get details</label>
            <select id="selectItem" onChange={itemValueChanged}>
              <option>---</option>
              <option value="pen">Pens</option>
              <option value="printer">Printers</option>
              <option value="tractor">tractors</option>
              <option value="battery">Batteries</option>
              <option value="window">Windows</option>
              <option value="computer">Coumputers</option>
              <option value="office space">Office spaces</option>
            </select>
          </div>
          <div className={classes.dataResults}>
            <div className={classes.searchForItems}>
              <label htmlFor="searchItems">Search by name</label>
              <input id="searchItems" />
            </div>
            <SingleResult
              data={{
                name: "Name",
                amount: "Amount",
                description: "Description",
                dateAdded: "Date Added",
                descriptionRow: true,
              }}
            />
            {results.map((item, i) => (
              <SingleResult key={i} data={item} />
            ))}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default LoginForm;

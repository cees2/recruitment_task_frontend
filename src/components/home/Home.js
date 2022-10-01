import React, { useState, useEffect, useCallback, useMemo } from "react";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import SingleResult from "./SingleResult";
import useHttp from "../../hooks/use-http";
import ManageItemsDataModal from "./ManageItemsDataModal";
import ReactDOM from "react-dom";
import { ITEM_CRUD } from "../../hooks/use-http";

const Home = (props) => {
  const [results, setResults] = useState([]);
  const [searchedResults, setSearchedResults] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState("");
  const [createItemModalIsOpened, setCreateItemModalIsOpened] = useState(false);
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const itemValueChanged = (e) => {
    setSelectedItemType(e.target.value);
  };

  const updateList = useCallback(async () => {
    const data = await sendRequest({
      url: `${ITEM_CRUD}/item/${selectedItemType}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setResults(data.data.items);
    setSearchedResults(data.data.items);
  }, [selectedItemType, token, sendRequest]);

  const memoizedList = useMemo(
    () =>
      searchedResults.map((item, i) => (
        <SingleResult key={i} data={item} onUpdate={updateList} />
      )),
    [searchedResults]
  );

  useEffect(() => {
    if (selectedItemType === "") {
      setResults([]);
      setSearchedResults([]);
      return;
    }
    const recieveData = async () => await updateList();
    recieveData();
  }, [selectedItemType, token, sendRequest, updateList]);

  const searchByNameHandler = (e) => {
    if (e.target.value === "") {
      setSearchedResults(results);
      return;
    }
    setSearchedResults(
      results.filter((result) => {
        if (result.name.toUpperCase().startsWith(e.target.value.toUpperCase()))
          return result;
      })
    );
  };

  const modalRejected = () => {
    setCreateItemModalIsOpened(false);
  };

  const modalConfirmed = async () => {
    setCreateItemModalIsOpened(false);
  };

  const addItemHandler = () => {
    setCreateItemModalIsOpened(true);
  };

  return (
    <React.Fragment>
      {createItemModalIsOpened &&
        ReactDOM.createPortal(
          <ManageItemsDataModal
            type="create"
            onModalRejected={modalRejected}
            onModalConfirmed={modalConfirmed}
            onUpdate={updateList}
          />,
          document.getElementById("modal-root")
        )}
      {!token && (
        <h1 className={classes.homePageCaption}>
          Log in or sign up to get access to resources.
        </h1>
      )}
      {token && (
        <>
          <div className={classes.selectItemWrapper}>
            <label htmlFor="selectItem">Select item to get details</label>
            <select
              id="selectItem"
              onChange={itemValueChanged}
              className={classes.searchItemsInput}
            >
              <option value="">---</option>
              <option value="pen">Pens</option>
              <option value="printer">Printers</option>
              <option value="tractor">Tractors</option>
              <option value="battery">Batteries</option>
              <option value="window">Windows</option>
              <option value="computer">Coumputers</option>
              <option value="office space">Office spaces</option>
            </select>
          </div>
          <div className={classes.dataResults}>
            <div className={classes.searchForItems}>
              <div className={classes.searchItemWrapper}>
                <label htmlFor="searchItems">Search by name</label>
                <input id="searchItems" onChange={searchByNameHandler} />
              </div>
              {role === "admin" && (
                <button
                  className={classes.addItemButton}
                  onClick={addItemHandler}
                >
                  <img
                    src={require("../../images/add.png")}
                    alt="Add item"
                    className={classes.addItemIcon}
                  />
                  Add Item
                </button>
              )}
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
            {memoizedList.length === 0 && (
              <p className={classes.noItemsParagraph}>
                No items found. Choose item or search again.
              </p>
            )}
            {memoizedList}
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Home;

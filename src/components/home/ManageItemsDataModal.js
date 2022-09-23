import React, { useRef } from "react";
import classes from "./ManageItemsDataModal.module.css";
import useHttp from "../../hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import { errorActions } from "../../store/errorSlice";
import GlobalError from "../UI/GlobalError";
import { ITEM_CRUD } from "../../hooks/use-http";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick}></div>;
};

const ManageItemsDataModal = (props) => {
  const { sendRequest } = useHttp();
  const { itemId } = props;
  const itemTypeInputRef = useRef();
  const nameInputRef = useRef();
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.error.error);
  const dispatch = useDispatch();

  const modalSubmitted = async () => {
    try {
      const requestBody = {};

      const name = nameInputRef.current.value;
      const amount = amountInputRef.current.value;
      const description = descriptionInputRef.current.value;

      const bearerToken = `Bearer ${token}`;

      if (name) requestBody.name = name;
      if (amount) requestBody.amount = amount;
      if (description) requestBody.description = description;

      let method, url;

      if (props.type === "update") {
        method = "PATCH";
        url = `${ITEM_CRUD}/item/${itemId}`;
      } else if (props.type === "create") {
        const itemType = itemTypeInputRef.current.value;
        if (itemType) requestBody.itemType = itemType;
        method = "POST";
        url = ITEM_CRUD;

        // debugger;
        if (Object.keys(requestBody).length !== 4)
          throw new Error("Fill in every input");

        await sendRequest({
          url,
          method,
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        props.onModalConfirmed(false);
        await props.onUpdate();
        dispatch(errorActions.removeError());
      }
    } catch (err) {
      console.log(err);
      dispatch(errorActions.setError(err.message));
    }
  };

  const modalRejected = () => {
    props.onModalRejected(false);
  };

  const approveButtonContent = props.type === "update" ? "Update" : "Create";

  return (
    <React.Fragment>
      {error && <GlobalError errorMessage={error} />}
      <Backdrop onClick={modalRejected} />
      <div className={classes.modalWrapper}>
        <header className={classes.updateModalHeader}>
          <h4>Fill in properties you want to change</h4>
        </header>
        <div className={classes.updateModalContent}>
          {props.type === "create" && (
            <div className={classes.singleInput}>
              <label htmlFor="itemType">Item Type</label>
              <input
                id="itemType"
                maxLength="15"
                ref={itemTypeInputRef}
                placeholder="e.g. pen"
              />
            </div>
          )}
          <div className={classes.singleInput}>
            <label htmlFor="name">Name</label>
            <input id="name" maxLength="50" ref={nameInputRef} />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Max value: 10000"
              max="10000"
              ref={amountInputRef}
            />
          </div>
          <div className={classes.singleInput}>
            <label htmlFor="description">Description</label>
            <input id="description" maxLength="250" ref={descriptionInputRef} />
          </div>
        </div>
        <footer className={classes.updateModalFooter}>
          <button onClick={modalRejected} className={classes.cancelButton}>
            Cancel
          </button>
          <button onClick={modalSubmitted} className={classes.updateButton}>
            {approveButtonContent}
          </button>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default ManageItemsDataModal;

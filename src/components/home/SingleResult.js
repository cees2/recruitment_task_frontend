import React, { useState, useEffect } from "react";
import classes from "./SingleResult.module.css";
import ConfirmationModal from "./ConfirmationModal";
import ManageItemsDataModal from "./ManageItemsDataModal";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { useDispatch } from "react-redux";
import { errorActions } from "../../store/errorSlice";
import { ITEM_CRUD } from "../../hooks/use-http";

const SingleResult = (props) => {
  console.log(props.data.name);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const {
    name,
    amount,
    description,
    dateAdded,
    descriptionRow,
    _id: id,
  } = props.data;
  const [confirmationModalIsOpened, setConfirmationModalIsOpened] =
    useState(false);
  const [updateModalIsOpened, setUpdateModalIsOpened] = useState(false);
  const [sendData, setSendData] = useState(false);
  const { sendRequest } = useHttp();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const deleteItem = async () => {
        const bearerToken = `Bearer ${token}`;

        await sendRequest({
          url: `${ITEM_CRUD}/${id}`,
          method: "DELETE",
          headers: {
            Authorization: bearerToken,
          },
        });

        await props.onUpdate();
      };

      if (sendData) {
        deleteItem();
        setSendData(false);
      }
    } catch (err) {
      dispatch(errorActions.setError(err.message));
    }
  }, [sendData, id, token, sendRequest, props, dispatch]);

  const wrapperClasses = `${classes.singleItemWrapper} ${
    descriptionRow ? `${classes.resultsDescriptionRow}` : ""
  }`;

  let date;
  if (dateAdded !== "Date Added") {
    const dateObj = new Date(dateAdded);
    date = new Intl.DateTimeFormat("pl-PL").format(dateObj);
  }

  // Managing data based on modals actions
  const confirmedModalHandler = async (confirmationModal = true) => {
    if (confirmationModal) {
      setConfirmationModalIsOpened(false);
      setSendData(true);
      return;
    }
    setUpdateModalIsOpened(false);
  };

  const rejectedModalHandler = (confirmationModal = true) => {
    if (confirmationModal) {
      setConfirmationModalIsOpened(false);
      return;
    }
    setUpdateModalIsOpened(false);
  };

  //Showing modals

  const deleteItemHandler = () => {
    setConfirmationModalIsOpened(true);
  };

  const updateItemHandler = () => {
    setUpdateModalIsOpened(true);
  };

  return (
    <React.Fragment>
      {confirmationModalIsOpened &&
        ReactDOM.createPortal(
          <ConfirmationModal
            onModalConfirmed={confirmedModalHandler}
            onModalRejected={rejectedModalHandler}
          />,
          document.getElementById("modal-root")
        )}
      {updateModalIsOpened &&
        ReactDOM.createPortal(
          <ManageItemsDataModal
            onModalConfirmed={confirmedModalHandler}
            onModalRejected={rejectedModalHandler}
            itemId={id}
            type="update"
            onUpdate={props.onUpdate}
          />,
          document.getElementById("modal-root")
        )}
      <div className={wrapperClasses}>
        <p className={classes.itemName}>{name}</p>
        <p className={classes.itemAmount}>{amount}</p>
        <p className={classes.itemDescription}>{description}</p>
        <p className={classes.itemDate}>{date || dateAdded}</p>
        <div className={classes.itemActionsWrapper}>
          {date && ( // non-header component
            <>
              <img
                src={require("../../images/edit.png")}
                alt="edit"
                className={classes.manageItemIcon}
                onClick={updateItemHandler}
              />
              {role === "admin" && (
                <img
                  src={require("../../images/remove.png")}
                  alt="remove"
                  className={classes.manageItemIcon}
                  onClick={deleteItemHandler}
                />
              )}
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleResult;

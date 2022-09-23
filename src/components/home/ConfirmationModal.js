import React from "react";
import classes from "./ConfirmationModal.module.css";

const ModalBackdrop = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

const ConfirmationModal = (props) => {
  return (
    <React.Fragment>
      <ModalBackdrop onClick={props.onModalRejected} />
      <div className={classes.modalWrapper}>
        <header className={classes.confirmationHeader}>
          <h4>Are you sure you want to delete this item?</h4>
        </header>
        <footer className={classes.confirmationButtons}>
          <button
            className={classes.confirmButton}
            onClick={props.onModalConfirmed}
          >
            Yes
          </button>
          <button
            className={classes.rejectButton}
            onClick={props.onModalRejected}
          >
            No
          </button>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default ConfirmationModal;

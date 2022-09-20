import React from "react";
import classes from "./SingleResult.module.css";

const SingleResult = (props) => {
  const { name, amount, description, dateAdded, descriptionRow } = props.data;

  const wrapperClasses = `${classes.singleItemWrapper} ${
    descriptionRow ? `${classes.resultsDescriptionRow}` : ""
  }`;

  let date;
  if (dateAdded !== "Date Added") {
    const dateObj = new Date(dateAdded);
    date = new Intl.DateTimeFormat("pl-PL").format(dateObj);
  }

  return (
    <div className={wrapperClasses}>
      <p className={classes.itemName}>{name}</p>
      <p className={classes.itemAmount}>{amount}</p>
      <p className={classes.itemDescription}>{description}</p>
      <p className={classes.itemDate}>{date || dateAdded}</p>
      <div className={classes.itemActionsWrapper}></div>
    </div>
  );
};

export default SingleResult;

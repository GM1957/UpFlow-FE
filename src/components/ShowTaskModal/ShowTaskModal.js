import React from "react";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import classes from "./ShowTaskModal.module.css";

const ShowTaskModal = (props) => {
  return (
    <div className={classes.TaskModal}>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          <p>
            Title:{" "}
            <strong>{props.Task.taskTitle}</strong>
          </p>
          <p>
            Description:{" "}
            <strong>
              {props.Task.taskDescription
                ? props.Task.taskDescription
                : "No Description"}
            </strong>
          </p>
          <p>
            Assigned To:{" "}
            <strong>
              {props.Task.assigneeDetails.email
                ? props.Task.assigneeDetails.email
                : "No One"}
            </strong>
          </p>
          <p>
            Assigned By:{" "}
            <strong>
              {props.Task.assignedByDetails.email
                ? props.Task.assignedByDetails.email
                : "No One"}
            </strong>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default ShowTaskModal;

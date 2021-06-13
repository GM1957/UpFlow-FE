import React, { useState, useEffect } from "react";
import Modal from "../UI/Modal/Modal";
import Select from "react-select";
import Backdrop from "../UI/Backdrop/Backdrop";

import classes from "./CreateTaskModal.module.css";

const CreateTaskModal = (props) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assigneeDetails, setAssigneeDetails] = useState({});
  const [assignedByDetails, setAssignedByDetails] = useState({});
  const [options, setOptions] = useState([]);

  const submitHandler = () => {
    props.createNewTaskHandler({
      columnId: props.columnId,
      taskTitle,
      taskDescription,
      assigneeDetails,
      assignedByDetails,
    });
    props.CloseBtn()
  };

  const assigneeSelectHandler = (selected) => {
    setAssigneeDetails(selected.value)
  };

  const assignedBySelectHandler = (selected) => {
    setAssignedByDetails(selected.value)
  };

  useEffect(() => {
    const optionsArr = props.Project.teamMemberIds.map((item) => ({
      value: item,
      label: item.email,
    }));
    setOptions([...optionsArr]);
  }, [props.Project]);

  return (
    <div>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          <label>Task Title</label>
          <input
            type="text"
            onChange={(event) => setTaskTitle(event.target.value)}
          />
          <label>Task Description</label>
          <input
            type="text"
            onChange={(event) => setTaskDescription(event.target.value)}
          />
          <div className={classes.AssignSection}>
            <div className={classes.AssignDropDown}>
              <p>Assign To: </p>
              <Select onChange={assigneeSelectHandler} options={options} />
            </div>
            <div className={classes.AssignDropDown}>
              <p>Assigned By: </p>
              <Select onChange={assignedBySelectHandler} options={options} />
            </div>
          </div>

          <div
            className={classes.CreateTaskButton}
            onClick={() => submitHandler()}
          >
            CREATE TASK
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateTaskModal;

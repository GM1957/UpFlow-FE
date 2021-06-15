import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import MembersModal from "../MembersModal/MembersModal";
import classes from "./KanbanHeader.module.css";

const KanbanHeader = (props) => {
  const [showMembersModal, setShowMembersModal] = useState(false);

  const closeMembersModalHandler = () => {
    setShowMembersModal(false);
  };

  return (
    <div>
      {showMembersModal ? (
        <div className={classes.MembersModalArea}>
          <MembersModal
            Project={props.Project}
            SetProject={props.SetProject}
            CloseBtn={closeMembersModalHandler}
          />
        </div>
      ) : null}

      <div className={classes.TheHeader}>
        <img
          className={classes.ProjecImage}
          src={
            props.Project?.projectPicture?.length
              ? props.Project?.projectPicture
              : Logo
          }
          alt="project-pic"
        />
        <p className={classes.ProjectName}>{props.Project?.projectName}</p>
        <div className={classes.ProjectIdAndUserSection}>
          <div
            className={classes.MembersButton}
            onClick={() => setShowMembersModal(true)}
          >
            Members
          </div>
          <p>Joining ID: {props.Project?.joinId}</p>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;

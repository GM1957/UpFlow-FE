import React, { useState, useEffect } from "react";
import { apis, axios } from "../../services";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import { connect } from "react-redux";
import classes from "./MembersModal.module.css";

const MembersModal = (props) => {
  const [adminIds, setAdminIds] = useState([]);

  const removeUserHandler = async (userId) => {
    try {
      const oldUTeamIdsArr = [...props.Project.teamMemberIds];

      const newTeamIdsArr = [];
      oldUTeamIdsArr.forEach((item) => {
        if (item.userId !== userId) newTeamIdsArr.push(item);
      });

      const updatedProject = { ...props.Project };
      updatedProject.teamMemberIds = newTeamIdsArr;
      props.SetProject(updatedProject);

      const res = await axios.post(apis.PROJECT_REMOVE_MEMBER, {
        projectId: props.Project.projectId,
        removedUserId: userId,
        newTeamMemberIds: newTeamIdsArr,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.Project?.adminIds?.length) {
      setAdminIds(props.Project.adminIds.map((item) => item.userId));
    }
  }, [props.Project?.adminIds, props.Auth.isLoggedIn]);
  return (
    <div>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          {props.Project?.teamMemberIds?.map((item, i) => (
            <div className={classes.UserCard} key={"card" + i}>
              <p>{item.email}</p>{" "}
              {adminIds.includes(props.Auth?.cognitoUserInfo?.attributes?.sub) &&
              !adminIds.includes(item.userId) ? (
                <div
                  className={classes.RemoveUserButton}
                  onClick={() => removeUserHandler(item.userId)}
                >
                  <p>Remove</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, {})(MembersModal);

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import { apis, axios } from "../../services";
import { setUserDetails } from "../../redux/actions";
import { connect } from "react-redux";
import Logo from "../../assets/logo.png";

import classes from "./LeftSideBar.module.css";

const LeftSideBar = (props) => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [shouldUpdateList, setShouldUpdateList] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const shouldUpdateListHandler = () => {
    setShouldUpdateList(true);
  };

  const joinProjectHandler = async () => {
    if (joinCode.length < 8) {
      toast.error("Unable to join the project please re-check the joining Id");
      return;
    }
    setIsJoining(true);
    try {
      const res = await axios.post(apis.JOIN_PROJECT, { joinId: joinCode });
      console.log("resss", res);
      if (res.data.status) {
        const oldUserDetails = props.Auth?.userdetails;
        oldUserDetails.projectIds = [
          ...oldUserDetails.projectIds,
          { ...res.data.data },
        ];
        props.setUserDetails({ ...oldUserDetails });
        toast.success("Joined the project successfully");
      } else {
        toast.error(
          "Unable to join the project please re-check the joining Id"
        );
      }
    } catch (err) {
      console.log(err);
    }
    setIsJoining(false);
  };

  useEffect(() => {
    if (props.Auth?.userdetails?.projectIds.length) {
      setMyProjects(props.Auth?.userdetails?.projectIds);
    }
  }, [props.Auth?.userdetails?.projectIds.length, shouldUpdateList]);

  return (
    <div>
      {showCreateProjectModal ? (
        <div className={classes.CreateProjectModal}>
          <CreateProjectModal
            shouldUpdateListHandler={shouldUpdateListHandler}
            CloseBtn={closeCreateProjectModal}
          />
        </div>
      ) : null}
      <div className={classes.LeftProjectBar}>
        <div
          className={classes.CreateNewProjectButton}
          onClick={() => setShowCreateProjectModal(true)}
          key={"-card"}
        >
          <p>
            <span className={classes.PlusIcon}>+ </span>Create Project
          </p>
        </div>
        <br />
        <div className={classes.JoinProject}>
          <input
            type="text"
            placeholder="enter project code here"
            onChange={(event) => setJoinCode(event.target.value)}
          />
          <div
            className={classes.JoinButton}
            onClick={() => joinProjectHandler()}
          >
            {isJoining ? (
              <i className="ui active centered inline loader small"></i>
            ) : (
              "Join Project"
            )}
          </div>
        </div>
        {myProjects.map((item, i) => {
          return (
            <NavLink
              activeClassName={classes.ProjectCardActive}
              to={"/project/" + item.projectId}
              exact
              key={i + "-card"}
            >
              <div className={classes.ProjectNameBox}>
                <img
                  src={
                    item?.projectPicture?.length ? item.projectPicture : Logo
                  }
                  alt=""
                />
                <div className={classes.ProjectNameSection}>
                  {item.projectName}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, { setUserDetails })(LeftSideBar);

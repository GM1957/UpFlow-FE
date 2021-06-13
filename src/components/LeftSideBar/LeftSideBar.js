import React, { useState, useEffect } from "react";
import {NavLink} from "react-router-dom";
import CreateProjectModal from "../CreateProjectModal/CreateProjectModal";
import Logo from "../../assets/logo.png";
import { connect } from "react-redux";

import classes from "./LeftSideBar.module.css";

const LeftSideBar = (props) => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [myProjects, setMyProjects] = useState([]);
  const [shouldUpdateList, setShouldUpdateList] = useState(false);

  const closeCreateProjectModal = () => {
    setShowCreateProjectModal(false);
  };

  const shouldUpdateListHandler = () => {
    setShouldUpdateList(true);
  };

  useEffect(() => {
    console.log("inside", props.Auth);
    if (props.Auth?.userdetails?.projectIds.length) {
      console.log("inside yo");
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
          <i className="plus icon"></i>
        </div>
        {myProjects.map((item, i) => {
          return (
            <NavLink activeClassName={classes.ProjectCardActive} to={"/project/"+item.projectId} exact>
            <div className={classes.ProjectNameBox} key={i + "-card"}>
              <img
                src={item.projectPicture.length ? item.projectPicture : Logo}
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

export default connect(mapStateToProps, {})(LeftSideBar);

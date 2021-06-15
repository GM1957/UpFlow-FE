import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import { useDropzone } from "react-dropzone";
import { getS3Signeture, s3UploadImage, axios, apis } from "../../services";
import { setUserDetails } from "../../redux/actions";
import { connect } from "react-redux";
import classes from "./CreateProjectModal.module.css";

const CreateProjectModal = (props) => {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (pendingImage) => {
    setLoadingImage(true);
    setSelectedImageUrl(URL.createObjectURL(pendingImage[0]));
    setSelectedImage(pendingImage[0]);
    setLoadingImage(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    disabled: false,
    onDrop,
  });

  const createProjectHandler = async () => {
    setIsLoading(true);
    try {
      let projectPicture = "";

      if (selectedImage) {
        const s3Sign = await getS3Signeture(selectedImage.name);
        const response = await s3UploadImage(s3Sign, selectedImage);
        projectPicture = response.url;
      }

      const response = await axios.post(apis.CREATE_PROJECT, {
        projectDescription,
        projectName,
        projectPicture,
      });
      console.log("reess",response)
      const oldUserDetails = props.Auth?.userdetails;
      oldUserDetails.projectIds = [
        ...oldUserDetails.projectIds,
        { ...response.data.data },
      ];
      props.setUserDetails({ ...oldUserDetails });

      toast.success("Wooah 😻 Your Project is Created successfully");
      props.shouldUpdateListHandler();
      props.CloseBtn();
    } catch (err) {
      toast.error("Internal server error, failed to create the project");
      console.log("failed to create the project", err);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <Backdrop show zIndex={400} clicked={props.CloseBtn} />
      <Modal>
        <div className={classes.ModalDesign}>
          <label className={classes.InputLabel}>
            <p>Give a project name</p>
          </label>
          <input
            className={classes.InputBoxs}
            onChange={(event) => setProjectName(event.target.value)}
            type="text"
          />
          <label className={classes.InputLabel}>
            <p>Give a project description</p>
          </label>
          <input
            className={classes.InputBoxs}
            type="text"
            onChange={(event) => setProjectDescription(event.target.value)}
          />

          {selectedImageUrl.length ? (
            <div className={classes.SelectedProjectImageArea}>
              <img src={selectedImageUrl} alt="selectedImageUrl" />
              <div
                className={classes.RemoveImageButton}
                onClick={() => setSelectedImageUrl("")}
              >
                <p>Delete the project picture</p>
              </div>
            </div>
          ) : (
            <div className={classes.AddProjectPhotoSection}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {loadingImage ? (
                  <div className="ui active centered inline loader"></div>
                ) : isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag a perfect project picture here or click to add one</p>
                )}
              </div>
            </div>
          )}

          <div
            className={
              isLoading
                ? classes.CreateProjectDisabled
                : classes.CreateProjectButton
            }
            onClick={() => (isLoading ? null : createProjectHandler())}
          >
            {isLoading ? (
              <div className="ui active centered inline loader"></div>
            ) : (
              "CREATE"
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { Auth: state.Auth };
};

export default connect(mapStateToProps, { setUserDetails })(CreateProjectModal);

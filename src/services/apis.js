const apis = {
  BASE_LOCAL_URL: "http://localhost:3000",
  BASE_SERVER_URL:
    process.env.NODE_ENV === "production"
      ? "https://mqv333ndk6.execute-api.us-west-1.amazonaws.com/dev"
      : "https://mqv333ndk6.execute-api.us-west-1.amazonaws.com/dev",

  GET_USER: "/user", //{email_id} GET REQUEST

  CREATE_PROJECT: "/project", // POST REQUEST
  UPDATE_PROJECT: "/project", // PUT REQUEST
  GET_PROJECT: "/project/get", // POST REQUEST
  DELETE_PROJECT: "/project", // Delete REQUEST
  PROJECT_REMOVE_MEMBER: "/project/remove-member", // POST REQUEST

  JOIN_PROJECT: "/project/join", // POST REQUEST

  S3_GET_PRESIGNED_URL: "/s3upload/get-signed-url", // POST REQUEST GET PRESIGNED URL
};

export default apis;

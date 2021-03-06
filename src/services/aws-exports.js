const appConfig =
  process.env.NODE_ENV === "production"
    ? {
        aws_amplify_config: {
          // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
          identityPoolId: "us-west-1:a8624025-517a-434c-937a-d0c0630572e8",

          // REQUIRED - Amazon Cognito Region
          region: "us-west-1",

          // OPTIONAL - Amazon Cognito Federated Identity Pool Region
          // Required only if it's different from Amazon Cognito Region
          identityPoolRegion: "us-west-1",

          // OPTIONAL - Amazon Cognito User Pool ID
          userPoolId: "us-west-1_CsYbKL6Dn",

          // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
          userPoolWebClientId: "3tasnou2pl1426dltlrscj1mtt",

          // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
          mandatorySignIn: false,

          authenticationFlowType: "USER_PASSWORD_AUTH",

          // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
          clientMetadata: { myCustomKey: "myCustomValue" },

          // OPTIONAL - Hosted UI configuration
          oauth: {
            domain: "dev-upflow-be.auth.us-west-1.amazoncognito.com",
            scope: [
              "phone",
              "email",
              "profile",
              "openid",
              "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "http://upflow.devrook.com",
            redirectSignOut: "http://upflow.devrook.com",
            responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
          },
        },
      }
    : {
        aws_amplify_config: {
          // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
          identityPoolId: "us-west-1:a8624025-517a-434c-937a-d0c0630572e8",

          // REQUIRED - Amazon Cognito Region
          region: "us-west-1",

          // OPTIONAL - Amazon Cognito Federated Identity Pool Region
          // Required only if it's different from Amazon Cognito Region
          identityPoolRegion: "us-west-1",

          // OPTIONAL - Amazon Cognito User Pool ID
          userPoolId: "us-west-1_CsYbKL6Dn",

          // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
          userPoolWebClientId: "3tasnou2pl1426dltlrscj1mtt",

          // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
          mandatorySignIn: false,

          authenticationFlowType: "USER_PASSWORD_AUTH",

          // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
          clientMetadata: { myCustomKey: "myCustomValue" },

          // OPTIONAL - Hosted UI configuration
          oauth: {
            domain: "dev-upflow-be.auth.us-west-1.amazoncognito.com",
            scope: [
              "phone",
              "email",
              "profile",
              "openid",
              "aws.cognito.signin.user.admin",
            ],
            redirectSignIn: "http://localhost:3000",
            redirectSignOut: "http://localhost:3000",
            responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
          },
        },
      };

// You can get the current config object
export default appConfig;

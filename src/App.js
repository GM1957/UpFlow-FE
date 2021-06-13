import AuthGuard from "./partials/AuthGuard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import configureStore from "./redux";
import { awsConfig } from "./services";
import Amplify from "aws-amplify";

Amplify.configure(awsConfig.aws_amplify_config);

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AuthGuard />
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Provider>
  );
}

export default App;

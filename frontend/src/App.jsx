import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

function App(props) {
  if (props.page == "home") {
    return <Home />;
  }
  if (props.page == "sign-in") {
    return <Signin />
  }
  if (props.page == "sign-up") {
    return <Signup />
  }
  return <></>;
}

export default App;

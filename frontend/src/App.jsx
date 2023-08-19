import Home from "./pages/Home";
import Signin from "./pages/Signin";

function App(props) {
  if (props.page == "home") {
    return <Home />;
  }
  if (props.page == "sign-in") {
    return <Signin />
  }
  return <></>;
}

export default App;

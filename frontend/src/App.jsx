import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PostView from "./pages/PostView";

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
  if (props.page == "post-view") {
    return <PostView />
  }
  return <></>;
}

export default App;

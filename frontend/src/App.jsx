import Home from "./pages/Home";

function App(props) {
  if (props.page == "home") {
    return <Home />;
  }
  return <></>;
}

export default App;

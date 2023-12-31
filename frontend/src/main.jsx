import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "gray.100",
      },
    }),
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App page={"home"} />,
  },
  {
    path: "/home/",
    element: <App page={"home"} />,
  },
  {
    path: "/sign-in/",
    element: <App page={"sign-in"} />,
  },
  {
    path: "/sign-up/",
    element: <App page={"sign-up"} />,
  }, 
  {
    path: "/post-view/:id",
    element: <App page={"post-view"} />
  },
  {
    path: "/profile",
    element: <App page={"profile"} />
  },
  {
    path: "/profile/:username",
    element: <App page={"public-profile"} />
  },
  {
    path: "*",
    element: <App page={"sign-in"} />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

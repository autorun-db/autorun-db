import { StrictMode } from "react";
import App from "./App.jsx";
import Form from "./Form.jsx";

function Root() {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

export const routes = [
  { path: "/", element: <Root /> },
  { path: "/form", element: <Form /> },
];

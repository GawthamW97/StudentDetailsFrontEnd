import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { store } from "../src/actions/store";
import { Provider } from "react-redux";
import Student from "./components/Student";
import StudentForm from "./components/StudentForm";
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
function App() {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <Router>
          <Fragment>
            <Container maxWidth="lg">
              <Route exact path="/" component={Student} />
            </Container>
          </Fragment>
        </Router>
      </ToastProvider>
    </Provider>
  );
}

export default App;

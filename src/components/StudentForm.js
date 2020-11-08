import { Button, Grid, TextField, withStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import useForm from "./useForm";
import * as actions from "../actions/Student";
import { useToasts } from "react-toast-notifications";

// styling used for material ui components
const style = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 230,
    },
    smMargin: {
      margin: theme.spacing(1),
    },
  },
});

const initialFieldValues = {
  //define an object to contains values of the Student
  code: "",
  firstName: "",
  lastName: "",
  dob: "",
  username: "",
  password: "",
};

const StudentForm = ({ classes, ...props }) => {
  //Toast Message
  const { addToast } = useToasts;

  //validation()
  const validate = (fieldValues = values) => {
    //Field validation
    let temp = { ...errors }; //Initiate a variabel to contain the errors
    if ("code" in fieldValues)
      temp.code = fieldValues.code ? "" : "This field is required.";
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "This field is required.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName ? "" : "This field is required.";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "This field is required.";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "This field is required.";

    //set the errors to the state variable
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const {
    //common functions are stored in the file useForm
    values,
    setValues,
    handleChange,
    errors,
    setErrors,
    resetForm,
  } = useForm(initialFieldValues, validate, props.setCurrentId); //Values for the functions in the useForm files are passed

  //Submit function triggerd on clicking the Submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      //Validate fieleds
      const onSuccess = () => {
        resetForm();
        addToast("Submitted Successfully", { appearance: "success" }); //Show notification for the action completion
      };
      if (props.currentId === 0) {
        //if no user is selcted from the table create Action will be triggeted.
        props.createStudent(values, onSuccess);
      } else {
        props.updateStudent(props.currentId, values, onSuccess); //when the user selects a record, edited it and submit this function will be triggered
      }
    }
  };

  useEffect(() => {
    if (props.currentId !== 0)
      setValues({
        ...props.StudentList.find((x) => x.code == props.currentId), //Find the Student that has been selected from the table
      });
    setErrors({});
  }, [props.currentId]); //the website will re-render when the currentId Variable changes.

  return (
    <form autoComplete="off" className={classes.root} onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            id="code"
            variant="outlined"
            label="Student Code"
            value={values.code}
            onChange={handleChange}
            {...(errors.code && { error: true, helperText: errors.code })}
          />
          <TextField
            id="firstName"
            variant="outlined"
            label="First Name"
            value={values.firstName}
            onChange={handleChange}
            {...(errors.firstName && {
              error: true,
              helperText: errors.firstName,
            })}
          />
          <TextField
            id="lastName"
            variant="outlined"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange}
            {...(errors.lastName && {
              error: true,
              helperText: errors.lastName,
            })}
          />
          <TextField
            id="dob"
            variant="outlined"
            label="Date of Birth"
            value={values.dob}
            onChange={handleChange}
            {...(errors.dob && { error: true, helperText: errors.dob })}
          />
          <TextField
            id="username"
            variant="outlined"
            label="Username"
            value={values.username}
            onChange={handleChange}
            {...(errors.username && {
              error: true,
              helperText: errors.username,
            })}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            value={values.password}
            onChange={handleChange}
            {...(errors.password && {
              error: true,
              helperText: errors.password,
            })}
          />

          <div>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.smMargin}
              style={{ margin: "5px" }}
              size="small"
            >
              Submit
            </Button>
            <Button
              variant="contained"
              className={classes.smMargin}
              size="small"
              style={{ margin: "5px" }}
              onClick={resetForm}
            >
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  StudentList: state.Student.list,
});

const mapActionToProps = {
  createStudent: actions.Create,
  updateStudent: actions.Update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(style)(StudentForm));

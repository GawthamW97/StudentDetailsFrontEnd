import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableContainer,
  TableRow,
  TableBody,
  withStyles,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/Student";
import StudentForm from "../components/StudentForm";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useToasts } from "react-toast-notifications";

const styles = (theme) => ({
  // styling used for material ui components
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const Student = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0); //state variabel is initilized to store the user id

  useEffect(() => {
    props.fetAllStudents(); //Fetch all the student in the data base
  }, []);

  //Toast Message
  const { addToast } = useToasts;

  const onDelete = (id) => {
    // Function used to trigger the delete method.
    if (window.confirm("Are you sure to delete this record? "))
      props.deleletStudent(
        id,
        () => addToast("Deleted Successfully", { appearance: "info" }) // Toast notification to show the completion of the action
      );
  };
  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={3}>
          {/*  pass currentId and setCurrentId to the StudentForm component,
          The setCurrentId function will pass the id when Edit Button is clicked */}
          <StudentForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={9}>
          <TableContainer>
            <Table>
              {/* Name the table column names */}
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Code</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.StudentList.map((record, index) => {
                  //traverse each student to display the data in the table.
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.code}</TableCell>
                      <TableCell>{record.firstName}</TableCell>
                      <TableCell>{record.lastName}</TableCell>
                      <TableCell>{record.dob}</TableCell>
                      <TableCell>{record.username}</TableCell>
                      <TableCell>{record.password}</TableCell>
                      <TableCell>
                        <ButtonGroup>
                          <Button
                            size="small"
                            onClick={() => {
                              setCurrentId(record.code);
                            }}
                          >
                            <EditIcon color="primary" />
                          </Button>
                          <Button
                            size="small"
                            onClick={() => onDelete(record.code)}
                          >
                            <DeleteIcon color="primary" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  StudentList: state.Student.list,
});

const mapActionToProps = {
  fetAllStudents: actions.fetchAll,
  deleletStudent: actions.Delete,
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Student));

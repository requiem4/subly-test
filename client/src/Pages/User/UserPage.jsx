import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {connect, useDispatch} from 'react-redux';
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import {getUsersError, getUsersPending, getUsersSuccess} from './UserReducers'
import PageTitle from "../../Components/PageTitle";
import getUsers from "./UserMiddleware";
import {getUsersAction} from "./UserActions";

function UserPage() {
  const [users, setUsers] = React.useState([]);
  const columns = ["Name", "Country", "Email"];
  const dispatch = useDispatch();
  useEffect( () => {
    dispatch(getUsers());
    console.log(users)
  }, [users])

  const options = {
    filterType: 'checkbox',
  };
  return(
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="User List"
            data={users}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = state => ({
  error: getUsersError(state),
  users: getUsersSuccess(state),
  pending: getUsersPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getUsers: getUsersAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
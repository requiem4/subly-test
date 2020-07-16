import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Grid} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import {getUsers} from "./UserMiddleware";

function UserPage() {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [])
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "country_origin",
      label: "Country",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];
  const options = {
    filterType: 'checkbox',
  };
  return (
    <>
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

export default UserPage
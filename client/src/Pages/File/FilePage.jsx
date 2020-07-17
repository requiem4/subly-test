import React, {useEffect} from "react";
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MUIDataTable from "mui-datatables";
import {getFiles, uploadFiles} from "./FileActionsApi";

function FilePage() {
  const [open, setOpen] = React.useState(false);
  const users = useSelector(state => state.file.files);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  })

  const submitFiles = (files) => {
    console.log('Files:', files);
    dispatch(uploadFiles(files));
    setOpen(false);
  }
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

          <DropzoneDialog
            acceptedFiles={['.mp4', '.wav']}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={10000000}
            dropzoneText={"Upload .mp4 or .wav"}
            open={open}
            onClose={() => setOpen(false)}
            onSave={submitFiles}
            showPreviews={true}
            showFileNamesInPreview={true}
          />
          <MUIDataTable
            title={
              <Button variant="contained" color="primary"
                      onClick={() => setOpen(true)}>
                Upload File
              </Button>}
            data={users}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default FilePage
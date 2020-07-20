import React, {useEffect} from "react";
import {DropzoneDialog} from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import MUIDataTable from "mui-datatables";
import {deleteFiles, getFiles, uploadFiles} from "./FileActionsApi";

function FilePage() {
  const [open, setOpen] = React.useState(false);
  const files = useSelector(state => state.file.files);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFiles());
  },[dispatch])

  const submitFiles = (files) => {
    console.log('Files:', files);
    dispatch(uploadFiles(files));
    setOpen(false);
  }
  const columns = [
    {
      name: "id",
      options: {
        display: "excluded",
        filter: false,
        sort: false,
        download: false,
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "size",
      label: "Size",
      options: {
        filter: true,
        sort: true,
        customBodyRender:  (value, tableMeta, updateValue) => {
          return value / 1024 / 1024 + ' MB'
        }
      },

    },
    {
      name: "created_at",
      label: "Uploaded",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "path",
      label: "File path",
      options: {
        filter: true,
        sort: true,
      }
    },

  ];
  const options = {
    filterType: 'checkbox',
    onRowsDelete: (rowsDeleted) => {
      const idsToDelete = rowsDeleted.data.map(d => files[d.dataIndex].id); // array of all ids to to be deleted
      return dispatch(deleteFiles({files: idsToDelete})).then( (response) => {
        return true
      });
    },
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
            data={files}
            columns={columns}
            options={options}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default FilePage
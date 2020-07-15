import React, { useState } from "react";
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
function FilePage() {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return(
    <Paper>
      <Grid container spacing={1}>
        <div>
          <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
            Add Image
          </Button>
          <DropzoneDialog
            acceptedFiles={['.mp4','.wav']}
            cancelButtonText={"cancel"}
            submitButtonText={"submit"}
            maxFileSize={5000000}
            dropzoneText={"Upload .mp4 or .wav"}
            open={open}
            onClose={() => setOpen(false)}
            onSave={(files) => {
              console.log('Files:', files);
              setOpen(false);
            }}
            showPreviews={true}
            showFileNamesInPreview={true}
          />
        </div>
      </Grid>
    </Paper>
  )
}
export default FilePage
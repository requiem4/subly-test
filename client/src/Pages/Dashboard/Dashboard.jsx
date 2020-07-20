import React, {useEffect} from "react";
import {Grid, Typography,} from "@material-ui/core";
// styles
import useStyles from "./styles";
import LinearProgress from '@material-ui/core/LinearProgress';

import Widget from "../../Components/Widget/Widget";
import {useDispatch, useSelector} from "react-redux";
import Dot from "../../Components/Layout/Sidebar/components/Dot";
import {getUsersReport} from "../User/UserActionsApi";
import {getFilesReport} from "../File/FileActionsApi";

// components

export default function Dashboard(props) {
  var classes = useStyles();
  const userReport = useSelector(state => state.user.report);
  const fileReport = useSelector(state => state.file.report);
  const mp4Report = fileReport.types.mp4
  const wavReport = fileReport.types.wav
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersReport());
    dispatch(getFilesReport())
  },[dispatch])
  return (
    <>
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Number of users"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {userReport.totalUserCount}
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Number of videos"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>

              <Typography size="xl" weight="medium">
                {fileReport.totalFileCount}
              </Typography>
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Type of files"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >

            <div className={classes.legendElement}>
              <Dot color="warning"/>
              <Typography
                className={classes.legendElementText}
              >
                Wav {wavReport.count} / {fileReport.totalFileCount}
              </Typography>
            </div>
            <div className={classes.legendElement}>
              <Dot color="primary"/>
              <Typography
                className={classes.legendElementText}
              >
                Mp4 {mp4Report.count} / {fileReport.totalFileCount}
              </Typography>
            </div>
            <div className={classes.progressSection}>
              <Typography
                size="md"
              >
                Wav
              </Typography>
              <LinearProgress
                variant="determinate"
                value={wavReport.percent}
                classes={{barColorPrimary: classes.progressBar}}
                className={classes.progress}
              />
            </div>
            <div>
              <Typography
                size="md"
              >
                Mp4
              </Typography>
              <LinearProgress
                variant="determinate"
                value={mp4Report.percent}
                classes={{barColorPrimary: classes.progressBar}}
                className={classes.progress}
              />
            </div>
          </Widget>
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <Widget
            title="Size of videos"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
          >
            <div className={classes.visitsNumberContainer}>
              <div>
                Max wav : {wavReport.maxMb} Mb
                <div>
                  Max mp4 : {mp4Report.maxMb} Mb
                </div>
              </div>
            </div>
            <div className={classes.visitsNumberContainer}>
              <div>
                Min : {wavReport.minMb} Mb
                <div>
                  Min mp4 : {mp4Report.minMb} Mb
                </div>
              </div>
            </div>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}

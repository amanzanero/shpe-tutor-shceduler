import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppointmentCard from '../../components/AppointmentCard';
import theme, { button } from '../../theme';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button,
  header: {
    margin: '0.5em',
    color: theme.palette.primary.main,
  },
};

const Appointments = props => {
  const { classes, appts, courses } = props;

  const hasCourses = courses && courses.length > 0;
  const NoApptsButton = () => {
    if (hasCourses)
      return (
        <Button
          size="medium"
          variant="contained"
          className={classes.button}
          // onClick={() => onToggleModal()}
        >
          Book an appointment
        </Button>
      );
    return (
      <Button
        size="medium"
        variant="contained"
        className={classes.button}
        // onClick={() => onToggleModal()}
      >
        Add courses
      </Button>
    );
  };

  return (
    <div className={classes.root}>
      {!appts || appts.length === 0 ? (
        <React.Fragment>
          <Typography className={classes.header} variant="h5">
            {!hasCourses ? 'You need to add courses!' : 'No appointments!'}
          </Typography>
          <NoApptsButton />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className={classes.header} variant="h5">
            Your upcoming appointments
          </Typography>
          {appts.map(appt => (
            <AppointmentCard appt={appt} />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default withStyles(styles)(Appointments);

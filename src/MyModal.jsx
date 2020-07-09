import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content'
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120
  },
  formControlLabel: {
    marginTop: theme.spacing(1)
  }
}));

export default function MaxWidthDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [withLimit, setWithLimit] = React.useState(true);
  const [item, setItem] = React.useState(props.item);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleWithLimitChange = event => {
    setWithLimit(event.target.checked);
  };

  const handleOnCallChange = event => {
    //날짜,주는 그대로두고, 사람,색,카운트 증감시켜야되고,
    const current = props.doctors.find(x => x.name === event.target.value);
    setItem({
      ...item,
      name: event.target.value,
      color: current.color,
      year: current.year,
      count: current.count + 1
    });
  };

  const AvailableDoctors = () => {
    console.log(item);
    return props.doctors.map(x =>
      x.year < 3 ? <MenuItem value={x.name}>{x.name}</MenuItem> : null
    );
  };

  React.useEffect(() => {}, [item]);

  return (
    <React.Fragment>
      {item.name !== undefined ? (
        <div
          key={item.id}
          className="cell"
          style={{ background: `${item.color}` }}
          onClick={handleClickOpen}
        >
          {item.date.substr(3, 2)}
          <br />
          <span
            style={{
              fontSize: '.4rem'
            }}
          >
            {'⭐'.repeat(parseInt(item.year))}
          </span>
          <br />
          {item.name}
          <br />
          <span
            style={{
              fontSize: '.5rem',
              padding: '1px',
              background: 'rgba(255,255,255,.2)'
            }}
          >
            {item.backup1.name}
            <br />
            {item.backup2.name}
          </span>
        </div>
      ) : (
        <div key={item.id} className="cell white">
          X
        </div>
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby="onCallDialog">
        <DialogTitle id="onCallDialog">당직의변경</DialogTitle>
        <DialogContent>
          <DialogContentText>
            제한 조건을 풀경우, 근무시간을 수동으로 체크하세요.
          </DialogContentText>
          <form className={classes.form} noValidate>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="name">name</InputLabel>
              <Select
                autoFocus
                value={item.name}
                onChange={handleOnCallChange}
                inputProps={{
                  name: 'fuck',
                  id: item.id
                }}
              >
                {withLimit
                  ? AvailableDoctors()
                  : props.doctors.map(x => (
                      <MenuItem value={x.name}>{x.name}</MenuItem>
                    ))}
              </Select>
            </FormControl>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Switch checked={withLimit} onChange={handleWithLimitChange} />
              }
              label="제한조건적용"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

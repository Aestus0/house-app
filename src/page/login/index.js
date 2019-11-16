import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {Paper} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {inject, observer} from "mobx-react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

function AlertDialog(prop){
   const {open, closeFunc} = prop;
  return (
    <>
      <Dialog
        open={open}
        onClose={closeFunc}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"登陆错误"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            用户名或密码错误
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFunc} color="primary" autoFocus>
            关闭
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

@inject('rootStore')
@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPassword: false,
      open: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleChange(prop) {
    return ((event) => {
      const val = event.target.value;
      this.setState((state) => ({...state, [prop]: val}));
    });
  }

  handleAlert() {
    this.setState((state) =>({...state, open: !state.open}))
  }

  handleClickShowPassword() {
    this.setState((state) => ({...state, showPassword: !state.showPassword}));
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  doLogin() {
    const user = {
      username: this.state.username,
      password: this.state.password,
    };
    debugger;
    this.props.rootStore.LoginStore.doLogin(user)
      .then(r => {
        if (r.data.success) {
          this.props.history.push('/')
        }
      });
  }

  render() {
    const {state} = this;
    return (
      <Paper
        style={{
          width: 500,
          height: 200,
          margin: '50px auto',
        }}
        color="secondary"
      >
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <FormControl style={{margin: '20px 0 0 0'}}>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              style={{width: 223}}
              value={state.username}
              onChange={this.handleChange('username')}
              id="username"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={state.showPassword ? 'text' : 'password'}
              value={state.password}
              style={{width: 223}}
              onChange={this.handleChange('password')}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {state.showPassword ? <Visibility/> : <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{margin: '20px 0 0 0'}}
          >
            <Button variant="contained" color="primary" onClick={this.doLogin}>
              登陆
            </Button>
          </Grid>
        </Grid>
        <AlertDialog open={state.open} closeFunc={this.handleAlert}/>
      </Paper>
    );
  }
}

import React, { Component } from 'react';
import MyCalendar from './MyCalendar';

import { lightTheme } from './theme';
import { Button, Box, MuiThemeProvider, Paper } from '@material-ui/core';

class MonthPicker extends Component {
  state = {
    month: this.props.currentMonth
  };

  constructor(props) {
    super(props);
    console.log('constructor');
  }

  componentDidCatch(error, info) {
    this.setState({
      error: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
  }

  handleIncrease = () => {
    const { month } = this.state;
    this.state.month < 12
      ? this.setState(
          {
            month: month + 1
          },
          () => {
            //셋스테이트 완료 후 콜백형태로 핸들 데이터 함수 콜
            this.handleData();
          }
        )
      : this.setState(
          {
            month: 1
          },
          () => {
            this.handleData();
          }
        );
  };

  handleDecrease = () => {
    this.state.month > 1
      ? this.setState(
          {
            month: this.state.month - 1
          },
          () => {
            this.handleData();
          }
        )
      : this.setState(
          {
            month: 12
          },
          () => {
            this.handleData();
          }
        );
  };
  handleAgain = () => {
    this.setState(
      {
        month: this.state.month
      },
      () => {
        this.handleData();
      }
    );
  };

  handleData = () => {
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
  };

  render() {
    console.log(',,,,,', this.props);
    if (this.state.error) return <h1>에러발생!</h1>;

    return (
      <div>
        <MuiThemeProvider theme={lightTheme}>
          <Paper square>
            <Button variant="contained" color="primary">
              {' '}
              {this.state.month}월
            </Button>
            {/* {this.state.month === 4 && <Problematic />} */}
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleIncrease}
            >
              +
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleDecrease}
            >
              -
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleAgain}
            >
              다시
            </Button>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MonthPicker;

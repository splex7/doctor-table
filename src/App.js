import React, { Component } from 'react';

import 'sanitize.css';
import './App.css';

import MyCalendar2 from './MyCalendar2';
import LimitController from './LimitController';
import MonthPicker from './MonthPicker';
import CreateDoctor from './CreateDoctor';
import MyForm from './MyForm';

// 두날짜의 담당자를 바꾸는 기능도 필요함

class App extends Component {
  state = {
    currentMonth: 7,
    doctors: [
      {
        id: 0,
        name: '김종원',
        year: 1,
        color: '#96f2d7',
        limit: 25
      },
      {
        id: 1,
        name: '신명얼',
        year: 1,
        color: '#69db7c',
        limit: 25
      },
      {
        id: 2,
        name: '장석인',
        year: 2,
        color: '#15aabf',
        limit: 5
      },
      {
        id: 3,
        name: '이태호',
        year: 2,
        color: '#4c6ef5',
        limit: 5
      },
      {
        id: 4,
        name: '조의환',
        year: 3,
        color: '#ae3ec9',
        limit: 4
      },
      {
        id: 5,
        name: '소지섭',
        year: 3,
        color: '#fd7e14',
        limit: 4
      },
      {
        id: 6,
        name: '김건중',
        year: 4,
        color: '#f03e3e',
        limit: 1
      },
      {
        id: 7,
        name: '이병헌',
        year: 4,
        color: '#fab005',
        limit: 1
      }
    ]
  };

  handleCreate = data => {
    console.log(data.month);

    const { currentMonth } = this.state;
    this.setState(
      {
        currentMonth: data.month
      },
      () => {
        console.log(
          'get currentMonth data successfully : ',
          this.state.currentMonth
        );
      }
    );
  };

  render() {
    return (
      <div>
        {/* <div>
          {doctors.map((e, i) => {
            return (
              <div className="cell" style={{ background: `${e.color}` }}>
                {e.name} [{e.class}년차]
              </div>
            );
          })}
        </div> */}
        {/* <MyForm /> */}
        <MonthPicker
          onCreate={this.handleCreate}
          currentMonth={this.state.currentMonth}
        />
        {/* <CreateDoctor /> */}
        <LimitController
          currentMonth={this.state.currentMonth}
          doctors={this.state.doctors}
        />
        <MyCalendar2
          currentMonth={this.state.currentMonth}
          doctors={this.state.doctors}
        />
        {/* <MyCalendar result={result[0]} msg="그냥 랜덤...연속근무가능" />
        <MyCalendar result={result[1]} msg="연속근무 절대 불가" />
        <MyCalendar result={result[2]} msg="다른조건추가" /> */}
      </div>
    );
  }
}

export default App;

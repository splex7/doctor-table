import React, { Component, useState, useEffect } from 'react';

import 'sanitize.css';
import './App.css';

import MyCalendar2 from './MyCalendar2';
import MonthPicker from './MonthPicker';
import Settings from './settings';
import { Card, Typography } from '@material-ui/core';
import { defualtResidents } from './Residents';

const App = () => {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth() + 2);
  const [residents, setResidents] = useState(defualtResidents);
  const [isCreated, setIsCreated] = useState(false); // 테이블이 생성된 상태인지 ?
  const [nonPref, setNonPref] = useState([15, 16]); // 비선호 일 추가 로직

  useEffect(() => {
    console.log('M :', month);
  }, [month]);

  useEffect(() => {
    if (!isCreated) {
      console.log('table cleared'); //테이블이 제거되면 근무일수 카운트 초기화
      setResidents(
        residents.map(x => {
          return (x.count = 0), x;
        })
      );
    }
  }, [isCreated]);

  return (
    <div>
      <Card>
        <Typography variant="h6" color="inherit" align="center">
          {' '}
          Duty Table
        </Typography>
      </Card>
      <MonthPicker
        isCreated={isCreated}
        setIsCreated={setIsCreated}
        setMonth={setMonth}
        currentMonth={month}
      />
      <MyCalendar2
        isCreated={isCreated}
        currentMonth={month}
        residents={residents}
      />
      <Settings
        currentMonth={month}
        residents={residents}
        isCreated={isCreated}
      />
    </div>
  );
};
export default App;

import React, { Component, useState, useEffect } from 'react';
import getDaysArray from './getDaysArray';

import CalendarTable from './CalendarTable';
//함수형으로 선언

const MyCalendar2 = props => {
  const [...doctors] = [...props.doctors];

  // useEffect(() => {
  //   console.log('MyCalendar 값이 설정됨');
  //   console.log(props);
  //   return () => {
  //     console.log('MyCalendar 가 바뀌기 전 값 ');
  //     console.log(props);
  //   };
  // }, [props]);

  let week = [];
  let weekNum = 1;

  const getRandomDoctor = (prev, date) => {
    //조건1 연속당직 금지
    let tempArr = doctors.filter(x => x.name !== prev.name);

    //조건2 월 정해진 당직근무 횟수 초과금지
    tempArr = tempArr.filter(x => x.count < x.limit);

    // 조건3 월화수에는 2년차이상만 가능
    tempArr = ['월', '화', '수', '목'].some(x => x === date.substr(-1, 1))
      ? tempArr.filter(x => x.year > 1)
      : tempArr;

    // 조건4 금토일에는 1년차만 가능
    tempArr = ['금', '토', '일'].some(x => x === date.substr(-1, 1))
      ? tempArr.filter(x => x.year < 2)
      : tempArr;

    //조건5 주 2회 이상 근무 금지, 3년차는 주 1회 이상 금지
    //--월요일이라면, 기존 주 배열 초기화
    console.log(`-------${date.substr(-4, 2)}일 ${week}-------`);
    if (date.substr(-1, 1) === '월') {
      week = [];
      weekNum++;
    }
    if (week.length > 0) {
      const result = week.reduce((t, a) => {
        if (t[a]) {
          t[a]++;
        } else {
          t[a] = 1;
        }
        return t;
      }, {});
      // console.log('리듀스결과 : ', result);
      // console.log(date.substr(-4, 2), date.substr(-1, 1), result, Object.entries(result));

      const yearOver3 = tempArr.filter(x => x.year > 2).map(x => x.id);
      // console.log('3년차이상 id 목록', yearOver3);

      for (const [k, v] of Object.entries(result)) {
        // 만약 이번주안에 2번 이상 일한사람이 있으면 후보에서 제외하세요.
        if (v === 2) {
          tempArr = tempArr.filter(x => x.id !== parseInt(k));
          // console.log(tempArr);
        }
        // 만약 이번주안에 1번 이상 일한 모든 3년차를 찾아서 후보에서 제외하세요.
        if (v === 1 && yearOver3.includes(parseInt(k))) {
          // console.log('한번이상 일한 3년차 발견');
          tempArr = tempArr.filter(x => x.id !== parseInt(k));
        }
      }
    }

    // 조건5 1명이상의 당직 후보가 남아있어야함.
    if (tempArr.length === 0)
      alert(`경 고:${date.substr(-4, 2)}일 후보 근무자가 없는 조합 발생`);

    //조건6 같은연차는 근무일수가 2일이상 차이나지 않도록할것.

    //조건7 2년차가 3년차보다 근무일수 많아야됨.
    const current = tempArr[Math.floor(Math.random() * tempArr.length)];

    //주,월 배열에 현재 뽑은 이름 추가
    week.push(current.id);
    current.week = weekNum;
    return current;
  };

  const shuffle = array => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const makeRandom3 = function(y, m, prev) {
    //카운터 초기화
    doctors.map(x => (x.count = 0));

    const dates = getDaysArray(y, m);

    return dates.map((x, i) => {
      if (x.substr(-4, 2) !== '00') {
        const current = getRandomDoctor(prev, x);
        prev = current;
        // 카운터
        doctors.filter(x => x.id === current.id)[0].count++;
      }
      const backup = doctors.filter(x => x.id !== prev.id);
      shuffle(backup);
      console.log(prev);
      return x.substr(-4, 2) !== '00'
        ? Object.assign(
            {},
            {
              id: i,
              date: x,
              name: prev.name,
              color: prev.color,
              count: prev.count,
              year: prev.year,
              week: prev.week,
              backup1: backup[0],
              backup2: backup[1]
              //백당 두명 붙여주기 어떻게(?)
            }
          )
        : Object.assign({}, { id: i, date: x, name: undefined });
    });
  };
  const tableResult = makeRandom3(2020, props.currentMonth, props.prev);

  return (
    <div>
      <div className="cell head text-r">일</div>
      <div className="cell head">월</div>
      <div className="cell head">화</div>
      <div className="cell head">수</div>
      <div className="cell head">목</div>
      <div className="cell head">금</div>
      <div className="cell head">토</div>
      <CalendarTable tableResult={tableResult} doctors={doctors} />
    </div>
  );
};

MyCalendar2.defaultProps = {
  currentMonth: 1,
  prev: {
    id: 0,
    name: '김종원',
    year: 1,
    color: '#96f2d7',
    limit: 18,
    count: 0
  },
  defaultPropsApplied: true
};

export default MyCalendar2;

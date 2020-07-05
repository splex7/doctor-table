import React, { Component, useState } from 'react';

//함수형으로 선언

const MyCalendar2 = props => {
  const [...doctorCounter] = [...props.doctors];
  console.log(doctorCounter.map(x => Object.assign(x, { count: 0 })));

  const getDaysArray = function(year, month) {
    const monthIndex = month - 1; // 0..11 instead of 1..12
    const names = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date(year, monthIndex, 1);
    const result = [];
    while (date.getMonth() === monthIndex) {
      // console.log(date.getDate());
      if (date.getDate() === 1) {
        for (let i = 0; i < date.getDay(); i++)
          result.push('00/00/' + names[i]);
      }
      result.push(
        String(date.getMonth() + 1).padStart(2, '0') +
          '/' +
          String(date.getDate()).padStart(2, '0') +
          '/' +
          names[date.getDay()]
      );
      date.setDate(date.getDate() + 1);
    }
    return result;
  };
  const randoc2 = (prev, date) => {
    let tempArr = doctorCounter.filter(x => x.name !== prev.name);
    tempArr = tempArr.filter(x => x.count < x.limit);

    // 금토일에는 1년차만 들어갑니다.
    tempArr = ['금', '토', '일'].some(x => x === date.substr(-1, 1))
      ? tempArr.filter(x => x.year < 2)
      : tempArr;

    const res = tempArr[Math.floor(Math.random() * tempArr.length)];
    return res;
  };
  const makeRandom3 = function(y, m, prev) {
    console.log('!');
    const dates = getDaysArray(y, m);

    return dates.map(x => {
      if (x.substr(-4, 2) !== '00') {
        const current = randoc2(prev, x);
        prev = current;
        // 카운터
        doctorCounter.filter(x => x.id === current.id)[0].count++;
      } else {
        prev = prev;
      }

      return x.substr(-4, 2) !== '00'
        ? Object.assign(
            {},
            {
              date: x,
              name: prev.name,
              class: prev.class,
              color: prev.color,
              count: prev.count
            }
          )
        : Object.assign({}, { date: x, name: 'ㅁㅁㅁ', class: 99 });
    });
  };

  return (
    <div>
      <div className="cell head text-r">일</div>
      <div className="cell head">월</div>
      <div className="cell head">화</div>
      <div className="cell head">수</div>
      <div className="cell head">목</div>
      <div className="cell head">금</div>
      <div className="cell head">토</div>
      {makeRandom3(2020, props.currentMonth, props.prev).map((e, i) => {
        return e.class !== 99 ? (
          <div key={i} className="cell" style={{ background: `${e.color}` }}>
            {e.date.substr(3, 2)}
            <br />
            {e.name}
          </div>
        ) : (
          <div key={i} className="cell white">
            X
          </div>
        );
      })}
    </div>
  );
};

MyCalendar2.defaultProps = {
  currentMonth: 1,
  prev: {
    name: '김종원',
    class: 1,
    color: '#f783ac',
    limit: 99
  },
  defaultPropsApplied: true
};

export default MyCalendar2;

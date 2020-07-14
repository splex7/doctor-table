import React from 'react';
import { useMemo } from 'react';
import getDaysArray from './getDaysArray';
import CalendarTable from './CalendarTable';
import zeropad from 'zeropad';
import { defualtStaff } from './Staff';
//함수형으로 선언

const MyCalendar2 = props => {
  console.log('MyCalendar2 called');
  const [...residents] = [...props.residents];

  let week = [];
  let weekNum = 1;

  const getRandomResident = (prev, date) => {
    //절대엄수조건 1  연속 당직 불가
    let tempArr = residents.filter(x => x.name !== prev.name);

    //절대엄수조건 2 법정80시간 근무초과불가 = 주 2회 이상 근무 금지( + 3년차이상은  주 1회 이상 금지 )

    //만약 오늘이 1일이라면
    // 지난달데이터의 마지막주차의 근무표를 복사해서 추출한  아이디를 week에 푸시한다.

    if (date.substr(-1, 1) === '월') {
      //월요일이 주단위 검수 기준일, 초기화
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

      const yearOver3 = tempArr.filter(x => x.year > 2).map(x => x.id);
      // console.log('3년차이상 id 목록', yearOver3);
      for (const [k, v] of Object.entries(result)) {
        // 만약 이번주안에 2번 이상 일한사람이 있으면 후보에서 제외
        if (v === 2) {
          tempArr = tempArr.filter(x => x.id !== parseInt(k));
        }
        // 만약 이번주안에 1번 이상 일한 모든 3년차를 찾아서 후보에서 제외
        if (v === 1 && yearOver3.includes(parseInt(k))) {
          tempArr = tempArr.filter(x => x.id !== parseInt(k));
        }
      }
    }

    // 절대엄수조건 3 휴가기간에 해당 근무자 제외
    // tempArr.map(x=> console.log("체커", x.dayOffInput.value.split(',').map(y=>y?zeropad(y):'').includes(date.substr(-4, 2))))

    if (
      tempArr.some(x =>
        x.dayOffInput.value
          .split(',')
          .map(y => (y ? zeropad(y) : ''))
          .includes(date.substr(-4, 2))
      )
    ) {
      tempArr = tempArr.filter(
        x =>
          !x.dayOffInput.value
            .split(',')
            .map(y => (y ? zeropad(y) : ''))
            .includes(date.substr(-4, 2))
      );

      // 휴가자가 있다면  금토일에는 1, 2년차만 가능
      tempArr = ['금', '토', '일'].some(x => x === date.substr(-1, 1))
        ? tempArr.filter(x => x.year < 3)
        : tempArr;
    } else {
      // 휴가자가 없다면 금토일에는 1년차만 가능
      tempArr = ['금', '토', '일'].some(x => x === date.substr(-1, 1))
        ? tempArr.filter(x => x.year < 2)
        : tempArr;
    }

    // 조건3 월화수에는 2년차이상만 가능
    tempArr = ['월', '화', '수', '목'].some(x => x === date.substr(-1, 1))
      ? tempArr.filter(x => x.year > 1)
      : tempArr;

    // console.log(parseInt(date.substr(-4, 2)), tempArr);

    // 조건1 월 정해진 당직근무 횟수 초과금지.
    tempArr = tempArr.filter(x => x.count < x.limit);

    // 조건5 1명이상의 당직 후보가 남아있어야함.
    if (tempArr.length === 0) {
      console.log(`경 고:${date.substr(-4, 2)}일 후보 근무자가 없는 조합 발생`);
      tempArr.push({
        id: 0,
        name: 'XXXX',
        year: 1,
        color: 'gray',
        limit: 99,
        count: 0
      });
    }

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
    console.log('makeRandom3');
    //카운터 초기화
    residents.map(x => (x.count = 0));

    //월에 대한 Date를 얻어오는부분 한번 연산하면 그 값이 절대 바뀔리가 없으니 useMemo로 감싸준다.
    const dates = useMemo(() => getDaysArray(y, m), [m]);

    return dates.map((x, i) => {
      if (x.substr(-4, 2) !== '00') {
        const current = getRandomResident(prev, x);
        prev = current;
        // 카운터
        residents.filter(x => x.id === current.id)[0].count++;
      }
      const backupArr = residents.filter(
        x => x.id !== prev.id && x.year > prev.year
      );
      //4년차가 설때는 스태프를 대신 집어넣는다.
      backupArr.length === 0 ? defualtStaff.map(x => backupArr.push(x)) : null;
      shuffle(backupArr);

      // console.log(prev);
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
              backup1: backupArr[0],
              backup2: backupArr[1]
              //백당 두명 붙여주기 어떻게(?)
            }
          )
        : Object.assign({}, { id: i, date: x, name: undefined });
    });
  };
  // makeRandom3(2020, props.currentMonth, props.prev)

  return (
    <div>
      {props.isCreated === false ? (
        <div>
          <img
            className="fadeIn"
            style={{
              opacity: '0.2',
              backgroundSize: 'contain',

              maxWidth: '100vw'
            }}
            src="https://i.ibb.co/hdYH7gv/casting-broken-bones.jpg"
            alt="broken"
            border="0"
          />
        </div>
      ) : (
        <CalendarTable
          tableResult={makeRandom3(2020, props.currentMonth, props.prev)}
          residents={residents}
        />
      )}
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

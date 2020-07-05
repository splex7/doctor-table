import React, { Component } from 'react';

class MyCalendar2 extends Component {
  static defaultProps = {
    currentMonth: 1,
    prev: {
      name: '김종원',
      class: 1,
      color: '#f783ac',
      limit: 99
    },
    doctors: [
      {
        name: '박눈물',
        class: 1,
        color: '#d3f9d8',
        limit: 99
      },
      {
        name: '김불쌍',
        class: 1,
        color: '#b2f2bb',
        limit: 99
      },
      {
        name: '김종원',
        class: 2,
        color: '#69db7c',
        limit: 2
      },
      {
        name: '이태호',
        class: 2,
        color: '#51cf66',
        limit: 2
      },
      {
        name: '조의환',
        class: 3,
        color: '#40c057',
        limit: 1
      },
      {
        name: '김건중',
        class: 3,
        color: '#37b24d',
        limit: 1
      },
      {
        name: '킹왕짱',
        class: 4,
        color: '#2f9e44',
        limit: 1
      },
      {
        name: '농땡이',
        class: 4,
        color: '#2b8a3e',
        limit: 1
      }
    ]
  };

  render() {
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
    const randoc2 = prev => {
      let tempArr = this.props.doctors.filter(x => x.name !== prev.name);
      return tempArr[Math.floor(Math.random() * tempArr.length)];
    };
    const makeRandom3 = function(y, m, prev) {
      const dates = getDaysArray(y, m);

      return dates.map(x => {
        const current = randoc2(prev);
        prev = current;

        return x.substr(-4, 2) !== '00'
          ? Object.assign(
              {},
              {
                date: x,
                name: current.name,
                class: current.class,
                color: current.color
              }
            )
          : Object.assign({}, { date: x, name: 'ㅁㅁㅁ', class: 99 });
      });
    };

    return (
      <div>
        <h4>
          2020년 당직 표
          {/* {result[result.length - 1].date.substr(0, 2)}월 : {msg} */}
        </h4>
        <table>
          <th>
            <td className="cell head text-r">일</td>
            <td className="cell head">월</td>
            <td className="cell head">화</td>
            <td className="cell head">수</td>
            <td className="cell head">목</td>
            <td className="cell head">금</td>
            <td className="cell head">토</td>
          </th>
        </table>
        {makeRandom3(2020, this.props.currentMonth, this.props.prev).map(
          (e, i) => {
            return e.class !== 99 ? (
              <div
                key={i}
                className="cell"
                style={{ background: `${e.color}` }}
              >
                {e.date.substr(3, 2)}
                <br />
                {e.name}
              </div>
            ) : (
              <div key={i} className="cell white">
                X
              </div>
            );
          }
        )}
      </div>
    );
  }
}

export default MyCalendar2;

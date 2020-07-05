import React from 'react';

const MyCalendar = ({ result, msg }) => {
  return (
    <div>
      <h4>
        {result[result.length - 1].date.substr(0, 2)}월 : {msg}
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
      {result.map((e, i) => {
        return e.class !== 99 ? (
          (i + 1) % 7 === 0 ? (
            <div key={i} className="cell" style={{ background: `${e.color}` }}>
              {e.date.substr(3, 2)} <br />
              {e.name}
            </div>
          ) : (
            <div key={i} className="cell" style={{ background: `${e.color}` }}>
              {e.date.substr(3, 2)} <br />
              {e.name}
            </div>
          )
        ) : (
          <div key={i} className="cell white">
            X
          </div>
        );
      })}
    </div>
  );
};

export default MyCalendar;

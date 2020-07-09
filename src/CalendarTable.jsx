import React from 'react';

import MaxWidthDialog from './MyModal';

const CalendarTable = props => {
  console.log('1', props.tableResult);
  return (
    <div>
      {props.tableResult.map((e, i) => (
        <MaxWidthDialog item={e} key={i} doctors={props.doctors} />
      ))}
    </div>
  );
};

export default CalendarTable;

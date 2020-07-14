import React, { useEffect, useRef } from 'react';
import MaxWidthDialog from './MyModal';
import AlertDialog from './AlertDialog';

const CalendarTable = props => {
  const [open, setOpen] = React.useState(false);

  const itemsRef = useRef([]);
  useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, props.tableResult.length);
  }, [props.tableResult]);

  const handleClickOpen = id => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeSelectedItem = e => {
    console.log(e.target);
    setOpen(false);
  };

  console.log('tableResult', props.tableResult);
  return (
    <>
      <div className="cell head text-r">일</div>
      <div className="cell head">월</div>
      <div className="cell head">화</div>
      <div className="cell head">수</div>
      <div className="cell head">목</div>
      <div className="cell head">금</div>
      <div className="cell head">토</div>
      {props.tableResult.map(e =>
        e.name !== undefined ? (
          <div
            key={e.id}
            ref={el => (itemsRef.current[e.id] = el)}
            className="cell"
            style={{ background: `${e.color}` }}
            onClick={() => handleClickOpen(e.id)}
          >
            {e.date.substr(3, 2)}
            <br />
            <span
              style={{
                fontSize: '.4rem'
              }}
            >
              {'★'.repeat(parseInt(e.year))}
            </span>
            <br />
            {e.name}
            <br />
            <span className="backup">{e.backup1.name}</span>
            <br />
            <span className="backup">{e.backup2.name}</span>
          </div>
        ) : (
          <div key={e.id} className="cell white">
            X
          </div>
        )
      )}

      <AlertDialog open={open} handleClose={handleClose} />
    </>
  );
};

export default CalendarTable;

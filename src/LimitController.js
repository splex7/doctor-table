import React, { Component, useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { lightTheme } from './theme';
import {
  TextField,
  Card,
  MuiThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const LimitController = props => {
  //리액트 훅 폼
  const { register, handleSubmit, watch } = useForm();
  //리액트 훅 스테이트
  const [items, setItems] = useState(props.doctors);

  //리액트 유즈 스타일
  const onSubmit = data => {
    console.log(Object.values(data));
    items.map(x => (x.limit = parseInt(Object.values(data)[x.id], 10)));
    setItems(x => [...x]);
    console.log(items);
  };

  useEffect(() => {
    console.log('LimitContr 값이 설정됨');
    console.log(props);
    return () => {
      console.log('LimitContr 가 바뀌기 전 값 ');
      console.log(props);
    };
  }, [props]);
  // 콘솔 워치
  // (() => items.map(x =>  console.log(watch(x.id)),))()

  return (
    <MuiThemeProvider theme={lightTheme}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> 개인별 설정 </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit(onSubmit)}>
            {items.map(e => (
              <Card key={e.id.toString()}>
                <div className="dot" style={{ background: e.color }} />
                <Typography component="span">
                  {e.name} R{e.year} : {e.count}일 /
                </Typography>
                <TextField
                  inputProps={{
                    min: 0,
                    max: 18,
                    style: {
                      textAlign: 'right',
                      width: '50px',
                      padding: '2px',
                      outline: '1px soild gray'
                    }
                  }}
                  variant="outlined"
                  name={e.id.toString()}
                  type="number"
                  style={{ marginLeft: '1rem', height: '1rem' }}
                  defaultValue={e.limit}
                  inputRef={register}
                >
                  {e.limit}
                </TextField>
                <Typography component="span">일</Typography>
              </Card>
            ))}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: '200px' }}
            >
              Save
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </MuiThemeProvider>
  );
};

export default LimitController;

import React, { Component, useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { lightTheme } from './theme';
import {
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  MuiThemeProvider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useInput } from './hooks';

const Settings = props => {
  //리액트 훅 폼
  const { register, handleSubmit, watch } = useForm();
  //리액트 훅 스테이트
  const [items, setItems] = useState(props.residents);

  //리액트 유즈 스타일

  //데이터 업데이트
  const onSubmit = data => {
    // 근무일수 업데이트
    console.log(Object.values(data));
    items.map(x => (x.limit = parseInt(Object.values(data)[x.id], 10)));
    setItems(x => [...x]);
    console.log(items);
  };
  //
  useEffect(() => {
    console.log('Settings : value changed');
  }, [props.residents]);

  // 이거 프롭스로 넘어온 값을 수정해서  부모에있는 state가 변경된것인데 이렇게 써도 되나?
  items.map(x => (x.dayOffInput = useInput('')));

  return (
    <MuiThemeProvider theme={lightTheme}>
      <Accordion defaultExpanded={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Settings </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <form onSubmit={handleSubmit(onSubmit)}>
            {items.map(e => (
              <Card key={e.id.toString()}>
                <CardHeader
                  style={{ background: e.color, borderRadius: '3px' }}
                  title={`${e.name} R${e.year}`}
                  subheader={`${props.currentMonth}월 근무일 수 : ${e.count}`}
                />

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {' '}
                    <Typography variant="caption" component="span">
                      {' '}
                      월최대 :{' '}
                    </Typography>
                    <TextField
                      inputProps={{
                        min: 0,
                        max: 18,
                        style: {
                          textAlign: 'right',
                          width: '50px',
                          padding: '2px',
                          outline: '2px soild gray'
                        }
                      }}
                      variant="outlined"
                      name={e.id.toString()}
                      type="number"
                      style={{ marginRight: '15px' }}
                      defaultValue={e.limit}
                      inputRef={register}
                    >
                      {e.limit}
                    </TextField>
                    <Typography variant="caption" component="span">
                      {' '}
                      휴가 :{' '}
                    </Typography>
                    <input placeholder="입력예) 9,10,11" {...e.dayOffInput} />
                  </Typography>
                </CardContent>
              </Card>
            ))}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ width: '100%' }}
            >
              Save
            </Button>
          </form>
        </AccordionDetails>
      </Accordion>
    </MuiThemeProvider>
  );
};

export default Settings;

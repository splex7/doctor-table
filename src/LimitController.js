import React, { Component, useState, useEffect, Fragment } from 'react';
import { useForm } from 'react-hook-form';

import { lightTheme } from './theme';
import {
  Input,
  Card,
  MuiThemeProvider,
  Paper,
  Button
} from '@material-ui/core';

const LimitController = props => {
  //리액트 훅 폼
  const { register, handleSubmit, watch } = useForm();
  //리액트 훅 스테이트
  const [items, setItems] = useState(props.doctors);

  const onSubmit = data => {
    console.log(Object.values(data));
    items.map(x => (x.limit = parseInt(Object.values(data)[x.id], 10)));
    setItems(x => [...x]);
    console.log(items);
  };

  //감시를 위한 코드 (지워도 됨 )
  // (() => items.map(x =>  console.log(watch(x.id)),))()

  return (
    <MuiThemeProvider theme={lightTheme}>
      <Paper>
        <form onSubmit={handleSubmit(onSubmit)}>
          {items.map(e => (
            <Card key={e.id.toString()}>
              {e.name} R{e.year}
              <Input
                name={e.id.toString()}
                type="number"
                style={{ marginLeft: '15px', maxWidth: '100px' }}
                defaultValue={e.limit}
                inputRef={register}
              >
                {e.limit}
              </Input>
            </Card>
          ))}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: '200px' }}
          >
            제출하기
          </Button>
        </form>
      </Paper>
    </MuiThemeProvider>
  );
};

export default LimitController;

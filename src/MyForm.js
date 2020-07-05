// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: ''
  };
  handleChange = e => {
    this.setState({
      name: e.target.value
    });
  };
  handleSubmit = e => {
    // 페이지 리로딩 방지
    e.preventDefault();
    // 상태값을 onCreate 를 통하여 부모에게 전달
    this.props.onCreate(this.state);
    // 상태 초기화
    this.setState({
      name: '',
      phone: ''
    });
  };
  render() {
    return (
      <form>
        <input
          placeholder="이름"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <div>{this.state.name}</div>
      </form>
    );
  }
}

export default PhoneForm;

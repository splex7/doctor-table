import React from 'react';

function CreateDoctor({ name, year, limit, onChange, onCreate }) {
  return (
    <div>
      <input
        name="username"
        placeholder="이름"
        onChange={onChange}
        value={name}
      />
      <input name="class" placeholder="년차" onChange={onChange} value={year} />
      <input
        name="limit"
        placeholder="월최대"
        onChange={onChange}
        value={limit}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
}

export default CreateDoctor;

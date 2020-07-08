const getDaysArray = function(year, month) {
  const monthIndex = month - 1; // 0..11 instead of 1..12
  const names = ['일', '월', '화', '수', '목', '금', '토'];
  const date = new Date(year, monthIndex, 1);
  const result = [];
  while (date.getMonth() === monthIndex) {
    // console.log(date.getDate());
    if (date.getDate() === 1) {
      for (let i = 0; i < date.getDay(); i++) result.push('00/00/' + names[i]);
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

export default getDaysArray;

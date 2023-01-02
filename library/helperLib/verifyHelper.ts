
function verifyTime(time):Boolean {
  const regExp:RegExp = new RegExp("([0-1][0-9]|2[0-3])\:[0-5][0-9]\:[0-5][0-9]")
  return regExp.test(time);
} 

export {
  verifyTime
};

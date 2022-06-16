//아이디 영문 숫자 조합 최소3자리 이상
const checkId_Reg = (id) => {
  const regExp = /[a-zA-Z0-9]{3,}/g;
  if (regExp.test(id)) {
    return true;
  } else {
    return false;
  }
};

//이메일 형식 판단 정규표현식
const checkEmail_Reg = (email) => {
  const regExp = /([\w+@[a-zA-Z]+?\.[a-zA-Z]{2,6})/g;
  if (regExp.test(email)) {
    return true;
  } else {
    return false;
  }
};

//비밀번호 형식 판단 영어 문자 조합 최소6자리 이상
const checkPW_Reg = (pw) => {
  const regExp = /[a-zA-Z0-9]{6,}/g;
  if (regExp.test(pw)) {
    return true;
  } else {
    return false;
  }
};

export { checkId_Reg, checkEmail_Reg, checkPW_Reg };

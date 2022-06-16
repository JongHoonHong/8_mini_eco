////토큰 정보 가져오기

const getToken = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return token;
  } else {
    return null;
  }
};

const setToken = (token) => {
  if (!token) {
    return false;
  }
  localStorage.setItem("token", token);
};

const delToken = () => {
  localStorage.removeItem("token");
};

//유저 정보 가져오기

const getUserId = () => {
  const user_id = localStorage.getItem("user_id");

  if (user_id) {
    return user_id;
  } else {
    return null;
  }
};

const setUserId = (user_id) => {
  if (!user_id) {
    return false;
  }
  localStorage.setItem("user_id", user_id);
};

const delUserId = () => {
  localStorage.removeItem("user_id");
};

export { getToken, setToken, delToken, setUserId, getUserId, delUserId };

// --------------usersLogic--------------
export const users = [];
export const addNewUser = ({ id, userName }) => {
  const checkUser = users.find((user) => user.userName === userName);
  if (!checkUser) {
    users.push({ id, userName });
  }
};
export const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
  }
};
export const getUsers = () => {};

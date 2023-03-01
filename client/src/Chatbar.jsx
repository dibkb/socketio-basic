import React, { useEffect, useState } from "react";
const Chatbar = ({ socket }) => {
  const loggedIn = localStorage.getItem("username");
  const [users, setUsers] = React.useState([]);
  const [selectUser, setSelectUser] = useState({});
  useEffect(() => {
    socket.on("totalUsers", (data) => {
      setUsers(data);
    });
  }, [socket]);
  const usersList = users.map((user, id) => {
    if (loggedIn !== user.userName) {
      if (selectUser.id === user.id) {
        return (
          <span
            key={user.id}
            className="bg-blue-600 py-3 text-center rounded-lg cursor-pointer text-white"
            onClick={() => {
              setSelectUser({
                id: user.id,
                userName: user.userName,
              });
            }}
          >
            {user.userName}
          </span>
        );
      } else
        return (
          <span
            key={user.id}
            className="bg-blue-100 py-3 text-center rounded-lg cursor-pointer"
            onClick={() => {
              setSelectUser({
                id: user.id,
                userName: user.userName,
              });
            }}
          >
            {user.userName}
          </span>
        );
    }
  });
  return (
    <div className="w-1/3 border border-gray-500 p-2">
      <span className="flex justify-between items-center">
        <h4>Active Users</h4>
        <button className="bg-red-600 p-1 text-white rounded-md">Logout</button>
      </span>
      <div className="flex flex-col gap-2 mt-4">{usersList}</div>
    </div>
  );
};

export default Chatbar;

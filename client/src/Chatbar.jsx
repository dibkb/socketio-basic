import React, { useEffect, useState } from "react";
const Chatbar = ({ socket, select, setSelect }) => {
  const loggedIn = localStorage.getItem("username");
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    socket.on("totalUsers", (data) => {
      setUsers(data);
    });
  }, [socket]);
  const usersList = users.map((user, id) => {
    if (loggedIn !== user.userName) {
      if (select?.id === user.id) {
        return (
          <span
            key={user.id}
            className="bg-blue-600 py-3 text-center rounded-lg cursor-pointer text-white"
            onClick={() => {
              setSelect({
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
              setSelect({
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
      <div className="flex flex-col gap-2 mt-4">
        {usersList}
        <span
          className="bg-green-500 py-3 text-center rounded-lg cursor-pointer"
          onClick={() => {
            setSelect({
              id: 0,
              userName: "group",
            });
          }}
        >
          group
        </span>
      </div>
    </div>
  );
};

export default Chatbar;

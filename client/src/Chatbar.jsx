import React, { useEffect, useState } from "react";
const Chatbar = ({ socket, select, setSelect, selectRoom, setSelectRoom }) => {
  const loggedIn = localStorage.getItem("username");
  const [users, setUsers] = React.useState([]);
  const [rooms, setRooms] = React.useState([]);
  useEffect(() => {
    socket.on("totalUsers", (data) => {
      setUsers(data);
    });
    socket.on("allRooms", (data) => {
      setRooms(data);
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
  const lounge = (
    <span
      className="bg-lime-300 py-3 text-center rounded-lg cursor-pointer font-medium"
      onClick={() => {
        setSelect({
          id: 0,
          userName: "general",
        });
      }}
    >
      General Lounge
    </span>
  );
  const roomList = rooms.map((user, id) => {
    return (
      <span
        key={user.id}
        className="bg-cyan-800 py-3 text-center rounded-lg cursor-pointer text-white"
        onClick={() => {
          setSelect({
            id: user.id,
            userName: user.userName,
          });
        }}
      >
        # {user.userName}
      </span>
    );
  });
  return (
    <div className="w-1/3 border border-gray-500 p-2">
      <span className="flex justify-between items-center">
        <h4>Active Users</h4>
        <button className="bg-red-600 p-1 text-white rounded-md">Logout</button>
      </span>
      <div className="flex flex-col gap-2 mt-4">
        {lounge}
        {usersList}
        {roomList}
      </div>
    </div>
  );
};

export default Chatbar;

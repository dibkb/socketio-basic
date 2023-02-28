import React, { useEffect } from "react";
const Chatbar = ({ socket }) => {
  const loggedIn = localStorage.getItem("username");
  const [users, setUsers] = React.useState([]);
  useEffect(() => {
    socket.on("connectedUsers", (data) => {
      console.log(data);
    });
  }, [socket]);
  const usersList = users.map((user, id) => {
    if (loggedIn !== user.userName) {
      return (
        <span
          key={user.userID}
          className="bg-blue-100 py-3 text-center rounded-lg cursor-pointer"
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

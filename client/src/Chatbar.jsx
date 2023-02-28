import React from "react";
const Chatbar = ({ users }) => {
  const loggedIn = localStorage.getItem("username");
  const usersList = users.map((user, id) => {
    if (loggedIn !== user.username) {
      return (
        <span
          key={id}
          className="bg-blue-100 py-3 text-center rounded-lg cursor-pointer"
        >
          {user.username}
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

import React, { useEffect, useState } from "react";

import useAuth from "../../../hooks/useAuth";
import User from "./User";

const MakeAdmin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]); // use redux here

  useEffect(() => {
    fetch(`https://secure-eyrie-37258.herokuapp.com/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  return (
    <section className="max-w-screen-xl mx-auto px-6 bg-white p-4 box-border rounded-xl shadow-xl">
      {/* form  */}
      <div className="flex flex-col space-y-3 mb-4">
        <h1 className="font-primary m-0 text-xl text-gray-700 text-left">
          Make Admin
        </h1>
        <div className="w-36 h-1 rounded-full bg-red-400"></div>
      </div>
      <table className="max-w-screen-xl mx-auto">
        <thead className="hidden lg:block bg-red-500 font-primary">
          <tr className="grid grid-cols-1 lg:grid-cols-6 place-items-center">
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Status
            </th>
          </tr>
        </thead>
        {users.length > 0 &&
          users.map((singleUser) => (
            <User key={singleUser._id} user={singleUser} mail={user.email} />
          ))}
      </table>
    </section>
  );
};

export default MakeAdmin;

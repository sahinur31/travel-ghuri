import React, { useState } from "react";

const User = ({ user, mail }) => {
  const { email, role } = user;
  const [currentRole, setCurrentRole] = useState(role);

  const handleChange = (email, role) => {
    if (mail === email) {
      alert("You can not change it");
      return;
    }
    const userData = { email, role };
    fetch(`http://localhost:5000/users/admin`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result.modifiedCount) {
          setCurrentRole(data.role);
          alert("User Role change successfully!");
        }
      });
  };
  // console.log(currentRole);

  return (
    
       
      <>
        <tbody>
          <tr className="bg-white border-b font-primary text-sm grid grid-cols-1 lg:grid-cols-6 place-items-center">
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{email}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{currentRole}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
              <button
                className="button-color border-0 btn-1"
                size="sm"
                onClick={() => handleChange(user.email, currentRole)}
              >
                Change
              </button>
            </td>
          </tr>
        </tbody>
      
        </>
  );
};

export default User;

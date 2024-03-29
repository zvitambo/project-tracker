import React from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Admin = () => {
  const { isAdmin, users, activateUser } = useAppContext();

  console.log("user_isAdmin", isAdmin);

  const toggleStatus = (e, email) => {
    e.preventDefault();
    activateUser(email);
  };

  return (
    <Wrapper>
      <table>
        <tr>
          <th>name</th>
          <th>surname</th>
          <th>email</th>
          <th>status</th>
        </tr>
        {users?.map((user) => {
          return (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className={
                    user.isActive ? "btn btn-primary" : "btn btn-danger"
                  }
                  onClick={(e) => toggleStatus(e, user.email)}
                >
                  {user.isActive ? "Active" : "InActive"}
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </Wrapper>
  );
};

export default Admin;

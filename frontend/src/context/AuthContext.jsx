import React, { useState, useEffect, useContext } from "react";
import getAuth from "../../util/Auth";

const AuthContext = React.createContext();
const UserRoleContext = React.createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserRole = () => {
  return useContext(UserRoleContext);
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const value = {
    isLogged,
    setIsLogged,
  };

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    // console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      console.log(response);
      if (response) {
        setIsLogged(true);
        // 3 is the employee_role for admin
      }
    });
  }, []);

  console.log(isLogged);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react/prop-types
export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      // Check if token exists in local storage
      const token = localStorage.getItem("Token");
      if (!token) {
        console.log("No token found. Setting role to default 'Patient'.");
        setUserRole("Patient");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:9000/detection/customers/me/",
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        const userData = await response.json();
        console.log(userData);
        setUserRole(userData.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  console.log(userRole);

  const userRoleValue = {
    userRole,
  };

  return (
    <UserRoleContext.Provider value={userRoleValue}>
      {children}
    </UserRoleContext.Provider>
  );
};

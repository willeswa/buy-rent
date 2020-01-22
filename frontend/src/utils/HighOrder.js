import React from "react";


export const withUserAuthentication = Component => props =>
  !props.loggedin ? (
    <Component
      signup="Signup"
      login="Login"
      loginLink="/login"
      signupLink="/signup"
    />
  ) : (
    <Component
      login={props.user.user.email}
      loginLink={`/dashboard/users/${props.user.user.id}`}
      logout={props.onClick}
      logoutText="Logout"
    />
  );

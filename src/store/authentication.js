export const DOMAIN = "http://localhost:3000";
const AUTH_URL = `${DOMAIN}/api/v1/users/`;
const LOGIN_PATH = `${AUTH_URL}/login`;
const SIGNUP_PATH = `${AUTH_URL}/signup`;

export const authenticationManager = async (authData, loginUser = true) => {
  try {
    const response = await fetch(loginUser ? LOGIN_PATH : SIGNUP_PATH, {
      method: "POST",
      body: JSON.stringify(authData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    throw err;
  }
};

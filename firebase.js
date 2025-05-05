const API_KEY = "AIzaSyAWpnpgsSXYCUcNjsZOYccCn2v_ltmO3V0"; // Use your Firebase API key here

// Sign up a new user
export const signUpUser = async (email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
  const body = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data; // Returns user data including the token
  } catch (error) {
    throw new Error(error.message || "Failed to register.");
  }
};

// Log in an existing user
export const loginUser = async (email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  const body = JSON.stringify({
    email,
    password,
    returnSecureToken: true,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error.message);
    }

    return data; // Returns user data including the token
  } catch (error) {
    throw new Error(error.message || "Failed to log in.");
  }
};

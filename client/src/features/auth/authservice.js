// export const registerService = async (api, payload) => {
//   const res = await fetch(api, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload),
//   });
//   const response = res.json();
//   return response;
// }; First method using fetch.

//second method
// import axios from "axios";
// export const registerService = async (payload)=>{
//   try {
//     const response = await axios.post("/api/register", payload);
//     return response.data;
//   } catch (error) {
//     return { message: error };
//   }
// }

import axios from "axios";

class AuthService {
  #baseUrl = process.env.REACT_APP_BASE_URL;
  async register(payload) {
    try {
      const response = await axios.post(
        `${this.#baseUrl}/registration`,
        payload
      );
      if (response.data) {
        localStorage.setItem(
          "verificationToken",
          response.data.activationToken
        );
      }
      return response.data;
    } catch (error) {
      // Return a proper, serializable error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "An error occurred during registration";

      throw new Error(message); // Throw the error so that your thunk catches it
    }
  }

  async verifyUser(payload) {
    try {
      const response = await axios.post(
        `${this.#baseUrl}/activate-user`,
        payload
      );
      return response.data;
    } catch (error) {
      // Return a proper, serializable error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "An error occurred during verification";

      throw new Error(message); // Throw the error so that your thunk catches it
    }
  }

  async login(payload) {
    try {
      const response = await axios.post(`${this.#baseUrl}/login`, payload);
      return response.data;
    } catch (error) {
      // Return a proper, serializable error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        "An error occurred during login";

      throw new Error(message);
    }
  }
}

export const ControllerService = new AuthService();

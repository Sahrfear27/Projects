import React, { ChangeEvent, FormEvent, useState } from "react";
import User from "../../types/types";
import musicServices from "../../apis/services/music.services";
export default function Login() {
  const [users, setUsers] = useState<User>({
    username: "",
    password: "",
  });

  const [logInStatus, setLogInStatus] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await musicServices.signIn(users);
      console.log(response.data);
      const token = response.data.accessToken;
      // Save jwt in session storage
      sessionStorage.setItem("token", token);

      if (response.status === 201) {
        console.log(response);
        console.log("Success");
        // Handle successful login, e.g., redirect to another page
      } else {
        setLogInStatus("Username or Password is Incorrect");
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error occurred during login:", error);
      setLogInStatus("Username or password is Invalid");
    }
    setUsers({ username: "", password: "" });
  };
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <form
          className="form-signin border p-5 text-center"
          onSubmit={handleSubmit}
        >
          <img
            className="mb-4"
            src="../../assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="text" className="sr-only">
            User Name
          </label>
          <input
            type="text"
            id="inputName"
            className="form-control"
            placeholder="User name"
            name="username"
            value={users.username}
            onChange={handleInput}
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            name="password"
            value={users.password}
            onChange={handleInput}
            required
          />
          {logInStatus && (
            <div className="alert alert-danger mt-3" role="alert">
              {logInStatus}
            </div>
          )}
          <button
            className="mt-4 btn btn-lg btn-primary btn-block"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}

import { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
// import { LogInUser, UserDetails } from "../../types/types";
import { LogInUser, UserDetails } from "../../types/types";
import musicServices from "../../apis/services/music.services";
import logo from "../../Images/music.jpg";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [users, setUsers] = useState<LogInUser>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [logInStatus, setLogInStatus] = useState<string | null>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsers({ ...users, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await musicServices.signIn(users);

      // Add the token to session storage
      const token = response.data.accessToken;
      sessionStorage.setItem("token", token);
      // console.log(token);

      if (response.status === 200) {
        const dataBaseUser: UserDetails = response.data;

        const sessionToken = sessionStorage.getItem("token");
        if (dataBaseUser.accessToken == sessionToken) {
          // Redirect user to main page

          navigate("/user");
        }
      } else {
        setLogInStatus("Username or Password is Incorrect");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      setLogInStatus("Username or password is Invalid");
    }
    setUsers({ username: "", password: "" });
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 border-0">
      <form
        className="form-signin border p-5 text-center logInCard"
        onSubmit={handleSubmit}
      >
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="text" className="sr-only">
          User Name
        </label>
        <input
          type="text"
          id="inputName"
          className="form-control"
          placeholder="User name"
          autoComplete="on"
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
          autoComplete="on"
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
        <button className="mt-4 btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

import axios from "axios";
export default axios.create({
  baseURL: "http://localhost:6007",
  headers: {
    "Content-Type": "application/json",
  },
});

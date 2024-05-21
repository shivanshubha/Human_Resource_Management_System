// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
// import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handlerLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(data.message);

      setEmail("");

      setRole("");
      setPassword("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="../../../public/JobZeelogo.png" alt="logo" />
            <h3>Login to your account</h3>
          </div>

          <form>
            <div className="inputTag">
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Jon Seeker">Job Seeker </option>
                </select>

                <FaRegUser />
              </div>
            </div>

            {/*  */}

            {/*  */}

            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shivanshu@gmail.com"
                />

                <MdOutlineMailOutline />
              </div>
            </div>

            {/*  */}

            {/*  */}

            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />

                <RiLock2Fill />
              </div>
            </div>
            <button onClick={handlerLogin} type="submit">
              Login
            </button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="../../../public/login.png" alt="login" />
        </div>
      </div>
    </>
  );
};

export default Login;

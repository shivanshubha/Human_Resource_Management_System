// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="page notfound">
      <div className="content">
        <img src="/public/notfound.png" alt="notfound" />
        <Link to={"/"}>RETURN TO HOME</Link>
      </div>
    </section>
  );
};

export default NotFound;

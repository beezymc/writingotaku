import React from 'react';
import Header from "../components/Header"

export default function home() {
  return (
    <div>
        <Header />
        <div>
          <a href="/viewboard">Viewboard</a>
        </div>
        <div>
          <a href="/login">Login</a>
        </div>
        <div>
          <a href="/register">Register</a>
        </div>
    </div>
  );
}

import React from "react";

export default function Header() {
  return (
    <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <p className="h5 my-0 me-md-auto fw-normal">EmailAZON / AmazonCSV</p>
      <nav className="my-2 my-md-0 me-md-3">
        <a className="p-2 text-dark" href="/">
          Features
        </a>
        <a className="p-2 text-dark" href="/">
          Support
        </a>
        <a className="p-2 text-dark" href="/">
          Pricing
        </a>
      </nav>
      {false && (
        <a className="btn btn-outline-primary" href="/">
          Sign up
        </a>
      )}
    </header>
  );
}

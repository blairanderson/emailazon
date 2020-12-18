import React from "react";
import App from "./App";
import Header from "./Header";
import Pricing from "./Pricing";
import Footer from "./Footer";

export default function Main() {
  const [file, fileChange] = React.useState("");
  const [filesUploaded, changeFiles] = React.useState([]);
  React.useEffect(
    function () {
      if (!filesUploaded.includes(file)) {
        changeFiles(filesUploaded.concat([file]));
      } 
    },
    [file, filesUploaded]
  );

  return (
    <div>
      <Header />
      <main className="container">
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-5">{document.title}</h1>
          <p className="lead">
            Quickly build an effective pricing table for your potential
            customers with this Bootstrap example. It’s built with default
            Bootstrap components and utilities with little customization.
          </p>
        </div>

        {filesUploaded.length < 3  ? "" : <Pricing />}



        <App {...{ file, fileChange }} />

        <Footer />
      </main>
    </div>
  );
}

import React from "react";
import jsonexport from "jsonexport/dist";

export default function TableExport({ className, data, filename, text }) {
  function downloadCSV(event) {
    event.preventDefault();

    jsonexport(data, function (err, csv) {
      if (err) {
        alert(err);
        return console.error(err);
      }
      // CSV FILE
      const csvFile = new Blob([csv], { type: "text/csv" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(csvFile);

      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(csvFile, filename);
      } else {
        if (link.download !== undefined) {
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  }

  return (
    <button
      className={className}
      onClick={downloadCSV}
      title={`Export ${filename}`}
    >
      {text || "Export CSV"}
    </button>
  );
}

TableExport.defaultProps = {
  className: "btn btn-outline-primary",
  filename: "table.csv"
};

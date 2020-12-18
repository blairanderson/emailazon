import React from "react";
import "./styles.css";
import Papa from "papaparse";
import TableExport from "./TableExport";

const CONFIG = {
  delimiter: "\t",
  header: true,
  dynamicTyping: false,
  skipEmptyLines: false,
  preview: 0,
  encoding: "",
  worker: false,
  comments: "",
  download: false
};

export default function App({ file, fileChange }) {
  const [parsedRows, updateRows] = React.useState([]);

  React.useEffect(
    function () {
      if (file !== "") {
        handleChange(file);
      }
      if (file === "") {
        updateRows([]);
      }
    },
    [file]
  );

  function handleChange(file) {
    console.log(file);
    var config = Object.assign({}, CONFIG, {
      before: function (file, inputElem) {
        console.log("Parsing file...", file);
      },
      error: function (err, file) {
        console.log("ERROR:", err, file);
        //firstError = firstError || err;
        //errorCount++;
      },
      complete: function completeFn(results) {
        updateRows(results.data);
        console.log("Parse complete");
        console.log("  Row count:", results.data.length);
        if (results.errors) {
          console.log("     Errors:", results.errors.length);
          console.log("First error:", results.errors[0]);
        }
        console.log("    Results:", results);
      }
    });

    Papa.parse(file, config);
  }

  return (
    <div className="App">
      <input
        type="file"
        id="files"
        defaultValue={file}
        onChange={(e) => fileChange(e.target.files[0])}
        multiple={false}
      />

      {parsedRows.length === 0 ? (
        ""
      ) : (
        <div>
          <hr />
          <div>
            <button
              className="btn btn-outline-danger"
              onClick={(e) => {
                handleChange("");
              }}
            >
              Reset
            </button>
            <TableExport data={parsedRows} />
          </div>
          <hr />
          <table className="table table-condensed table-bordered table-highlight">
            {Object.keys(parsedRows[0]).map(function (key) {
              return <th key={key}>{key}</th>;
            })}
            {parsedRows.map(function (rw, rowIndex) {
              return (
                <tr className="" key={JSON.stringify(rw)}>
                  {Object.keys(rw).map(function (key) {
                    const value = rw[key];
                    if (value.length > 20) {
                      return (
                        <td className="truncate" key={rowIndex + "|" + key}>
                          {value.slice(0, 20)}...
                        </td>
                      );
                    } else {
                      return (
                        <td className="truncate" key={rowIndex + "|" + key}>
                          {value}
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </div>
  );
}

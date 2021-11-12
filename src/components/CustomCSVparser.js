import React, { Component } from "react";
import { CSVReader } from "react-papaparse";

const buttonRef = React.createRef();

export default class CustomCSVparser extends Component {
  csv_to_json(data) {
    var header = data[0]["data"];
    var json_data = {};
    for (let i = 0; i < header.length; i++) {
      json_data[header[i]] = [];
    }

    for (let i = 1; i < data.length; i++) {
      var data_array = data[i]["data"];
      for (let j = 0; j < header.length; j++) {
        json_data[header[j]].push(data_array[j]);
      }
    }
    return json_data;
  }

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data, file) => {
    console.log(data);
    console.log(file.name);
    console.log("---------------------------");
    this.props.onUploadDataChange(this.csv_to_json(data), file.name);
    console.log("---------------------------");
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log("---------------------------");
    this.props.onRemoveDataChange();
    console.log("---------------------------");
  };

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    // TODO we also need to notify the parent to clean out the data
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <div>
        <CSVReader
          ref={buttonRef}
          onFileLoad={this.handleOnFileLoad}
          onError={this.handleOnError}
          noClick
          noDrag
          onRemoveFile={this.handleOnRemoveFile}
        >
          {({ file }) => (
            <aside
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: 30,
              }}
            >
              <div className="pull-right">
                <button
                  type="button"
                  onClick={this.handleOpenDialog}
                  className="btn btn-primary"
                >
                  Browse file
                </button>
              </div>
              <div className="pull-right">
                <button
                  className="btn btn-danger"
                  onClick={this.handleRemoveFile}
                >
                  Remove
                </button>
              </div>
            </aside>
          )}
        </CSVReader>
      </div>
    );
  }
}

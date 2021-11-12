import "./App.css";

import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import CustomCSVparser from "./components/CustomCSVparser";
import NavBar from "./components/navbar";
import Select from "react-select";
import LinePlot from "./components/LinearPlot";

//life cycle hooks:
//Mount - construction render componentDidMount
//Update - reader componentDidUpdate
//UnMount - componentWillUnmount

const initialState = {
  fileUploadData: {},
  Selectors: [
    { id: "graph-1-xselector", options: [], value: [] },
    { id: "graph-1-yselector", options: [], value: [] },
    { id: "graph-2-xselector", options: [], value: [] },
    { id: "graph-2-yselector", options: [], value: [] },
  ],
  graphOneSelect: {
    x: undefined,
    y: undefined,
    xaxis: undefined,
    yaxis: undefined,
  },
  graphTwoSelect: {
    x: undefined,
    y: undefined,
    xaxis: undefined,
    yaxis: undefined,
  },
  fileName: "",
};

//clone function to clone initial state - it only works for object and [] for now
//which is enough for this sample purpose
function clone(target, map = new Map()) {
  if (typeof target === "object") {
    let cloneTarget = Array.isArray(target) ? [] : {};
    if (map.get(target)) {
      return map.get(target);
    }
    map.set(target, cloneTarget);
    for (const key in target) {
      cloneTarget[key] = clone(target[key], map);
    }
    return cloneTarget;
  } else {
    return target;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = clone(initialState);
  }

  updateGraph = (selector, selectorID) => {
    const { graphOneSelect, graphTwoSelect, fileUploadData, Selectors } =
      this.state;
    let head = selector.value;
    if (selectorID === 0 || selectorID === 1) {
      //in this case, update graph
      if (selectorID === 0) {
        graphOneSelect.x = fileUploadData[head];
        graphOneSelect.xaxis = head;
        Selectors[0].value = selector;
      } else if (selectorID === 1) {
        graphOneSelect.y = fileUploadData[head];
        graphOneSelect.yaxis = head;
        Selectors[1].value = selector;
      }
      this.setState({ Selectors });
      if (
        graphOneSelect["xaxis"] !== undefined &&
        graphOneSelect["yaxis"] !== undefined
      ) {
        this.setState({ graphOneSelect });
      }
    } else {
      //assume they are definitely 2 and 3
      //in this case, update graph
      if (selectorID === 2) {
        graphTwoSelect.x = fileUploadData[head];
        graphTwoSelect.xaxis = head;
        Selectors[2].value = selector;
      } else if (selectorID === 3) {
        graphTwoSelect.y = fileUploadData[head];
        graphTwoSelect.yaxis = head;
        Selectors[3].value = selector;
      }
      this.setState({ Selectors });
      if (
        graphTwoSelect["xaxis"] !== undefined &&
        graphTwoSelect["yaxis"] !== undefined
      ) {
        this.setState({ graphTwoSelect });
      }
    }
    console.log(Selectors);
  };

  handleUpdateFileData = (data, filename) => {
    let headers = Object.keys(data).map((head) => ({
      value: head,
      label: head,
    }));
    const selectors = [...this.state.Selectors];
    const fileUploadData = data;
    const fileName = filename;

    selectors.map((selector) => (selector.options = [...headers]));
    this.setState({ selectors, fileUploadData, fileName });
  };

  handleRemoveFileData = () => {
    //this function handles the remove of the dataset
    this.setState(clone(initialState));
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Container>
          <div>
            <CustomCSVparser
              onUploadDataChange={this.handleUpdateFileData}
              onRemoveDataChange={this.handleRemoveFileData}
            />
          </div>
          <div>
            <h1>{this.state.fileName}</h1>
            <form>
              <Row className="align-items-center mb-3">
                <Col md={12}>
                  <Select
                    options={this.state.Selectors[0].options}
                    id={this.state.Selectors[0].id}
                    value={this.state.Selectors[0].value}
                    onChange={(e) => this.updateGraph(e, 0)}
                  />
                  <Select
                    options={this.state.Selectors[1].options}
                    id={this.state.Selectors[1].id}
                    value={this.state.Selectors[1].value}
                    onChange={(e) => this.updateGraph(e, 1)}
                  />
                  <div id="graph-1">
                    <LinePlot data={this.state.graphOneSelect} />
                  </div>
                </Col>
              </Row>
              <Row className="align-items-center mb-3">
                <Col md={12}>
                  <Select
                    options={this.state.Selectors[2].options}
                    id={this.state.Selectors[2].id}
                    value={this.state.Selectors[2].value}
                    onChange={(e) => this.updateGraph(e, 2)}
                  />
                  <Select
                    options={this.state.Selectors[3].options}
                    id={this.state.Selectors[3].id}
                    value={this.state.Selectors[3].value}
                    onChange={(e) => this.updateGraph(e, 3)}
                  />
                  <div id="graph-2">
                    <LinePlot data={this.state.graphTwoSelect} />
                  </div>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;

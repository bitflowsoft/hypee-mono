import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

const App = () => (
  <div className="container">
    <button onClick={() => {
      window.plugin.download();
    }}>
      플러그인 다운로드
    </button>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));

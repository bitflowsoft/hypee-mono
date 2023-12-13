import React, {useEffect} from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { useHypee } from "./useHypee";

const App = () => {
  const hypee = useHypee();

  useEffect(() => {
    hypee.subscribe('progress', (emitter, progress) => {
      alert(progress[0]);
    })
  }, []);

  return (
    <div className="container">
      <h4> Example Plugin </h4> <hr/>
      <button onClick={() => {
        hypee.call('start');
      }}>
        시작하기
      </button>
    </div>
  );
}
ReactDOM.render(<App />, document.getElementById("app"));

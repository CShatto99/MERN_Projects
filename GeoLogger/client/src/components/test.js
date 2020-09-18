import React, { useState, useEffect } from "react";

import axios from "axios";

let myTxt = require("Z:\\DayZServer1.09\\ServerProfile\\DayZServer_x64.ADM");

const TextFileReader = props => {
  const [text, setText] = useState("");

  useEffect(() => {
    getText();
  });

  const getText = async () => {
    const { allText } = await axios.get("austinleath.com/logs/FILENAMEHERE");
    setText(allText);
  };

  // const readTextFile = file => {
  //   let rawFile = new XMLHttpRequest();
  //   rawFile.open("GET", myTxt, false);
  //   rawFile.onreadystatechange = () => {
  //     if (rawFile.readyState === 4) {
  //       if (rawFile.status === 200 || rawFile.status === 0) {
  //         let allText = rawFile.responseText;
  //         setText(allText);
  //       }
  //     }
  //   };
  //   rawFile.send(null);
  // };

  return (
    <div>
      {text.split("\n").map((item, key) => {
        return (
          <span key={key}>
            {item}
            <br />
          </span>
        );
      })}
    </div>
  );
};

export default TextFileReader;

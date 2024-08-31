import React, { useRef, useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const barcodeRef = useRef(null);

  useEffect(() => {
    if (text) {
      JsBarcode(barcodeRef.current, text, {
        format: "CODE128",
        displayValue: false, // Removed text below the barcode
        height: 120,
        lineColor: "#000",
        background: "#fff",
        margin: 10,
      });
    }
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Text to Barcode Generator</h1>
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={handleChange}
        />
        <div className="barcode-container">
          <svg ref={barcodeRef}></svg>
        </div>
      </div>
    </div>
  );
}

export default App;

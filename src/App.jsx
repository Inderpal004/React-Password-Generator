import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const generatePassword = useCallback(() => {
    let password = "";
    let charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) {
      charset += "0123456789";
    }
    if (charAllowed) {
      charset += "|!@#$%^&*~";
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    setPass(password);
  }, [length, numAllowed, charAllowed]);

  const passwordRef = useRef(null);

  const copyPassword = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(pass);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full h-screen bg-gray-200 flex justify-center items-center">

      <div className="w-[550px] bg-violet-500 text-white rounded-xl p-7">
        <h1 className="text-2xl mb-3 font-semibold">Password Generator</h1>
        <div className="flex  my-3">
          <input
            className="text-black w-[90%] py-2 mr-3 rounded-md px-3 font-semibold"
            type="text"
            value={pass}
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword} className="py-2 px-4 bg-white text-black rounded-lg font-medium ">
            Copy
          </button>
        </div>
        <div className="flex items-center justify-between">
            <input
              type="range"
              onChange={(e) => setLength(Number(e.target.value))}
              value={length}
              min={6}
              max={30}
            />
          <div>
            <label className="font-[500]">Length : {length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={() => setNumAllowed(!numAllowed)}
              className="mx-2 cursor-pointer"
            />
            <label className="font-[500]">Numbers</label>
          </div>
          <div>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed(!charAllowed)}
              className="mx-2 cursor-pointer"
            />
            <label className="font-[500]">Special Characters</label>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

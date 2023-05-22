import { useEffect, useState } from "react";
import getKeyList from "../utils/getKeyList";
import getValueList from "../utils/getValueList";
import postKey from "../utils/postKey";

export default function Home() {
  const [keyList, setKeyList] = useState([]);
  const [valueList, setValueList] = useState([]);
  const [key, setKey] = useState("");
  const keyElementList = (
    <ul>
      {keyList.map((key) => (
        <li key={key}>{key}</li>
      ))}
    </ul>
  );
  const valueElementList = (
    <ul>
      {valueList.map((value, index) => (
        <li key={index}>{value}</li>
      ))}
    </ul>
  );

  useEffect(() => {
    getKeyList().then(setKeyList);
  }, []);
  useEffect(() => {
    getValueList().then(setValueList);
  }, []);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          postKey(key);
        }}
      >
        <label>Enter your key : </label>
        <input value={key} onChange={updateKeyState} />
        <button>Submit</button>
      </form>
      <h3>Keys I have seen :</h3>
      {keyElementList}
      <h3>Calculated values :</h3>
      {valueElementList}
    </>
  );

  function updateKeyState(event) {
    setKey(event.target.value);
  }
}

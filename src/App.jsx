import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    setResult(data);
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {result.map((result, index) => (
        <div key={index}>
          <h2>Word: </h2>
          <p>{result.word}</p>
          <h2>Phonetic: </h2>
          <p> {result.phonetic}</p>

          {result.phonetics.map((phonetic, index) => (
            <div key={index}>
              <h2>Phonetic Text: </h2>
              <p>{phonetic.text}</p>
              <audio controls src={phonetic.audio}></audio>
            </div>
          ))}
          {result.meanings.map((meaning, index) => (
            <div key={index}>
              <h2>Part Of Speech: </h2> <p>{meaning.partOfSpeech}</p>
              {meaning.definitions.map((definition, index) => (
                <div key={index}>
                  <h2>Definition: </h2>
                  <p> {definition.definition}</p>
                  <h2>Example: </h2>
                  <p>{definition.example} </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;

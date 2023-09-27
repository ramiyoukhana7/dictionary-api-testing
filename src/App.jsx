import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("")

  const handleSearch = async () => {
    handleMessage()
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    console.log(data);


    if(data.message){
      setMessage(data.message)
    }else{
    setResult(data);
    setMessage("")
    }
  };

  const handleMessage = () => {
    if (!word) {
      setMessage("Sorry pal, we couldn't find definitions for the word you were looking for.")
      
    }
  
  }


  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="cards-container">
      <p>{message}</p>
        {result.map((result, index) => (
          <div key={index} className="card">
            <h2>Word: </h2>
            <p>{result.word}</p>
            <h2>Phonetic: </h2>
            <p> {result.phonetic}</p>

            <h2>Phonetic Text: </h2>
            {result.phonetics.map((phonetic, index) => (
              <div key={index}>
                <p>{phonetic.text}</p>
                <audio controls src={phonetic.audio}></audio>
              </div>
            ))}

            <h2>Example: </h2>
            {result.meanings.map((meaning, index) => (
              <div key={index}>
                {meaning.definitions.map((definition, index) => (
                  <div key={index}>
                    <p>{definition.example} </p>
                  </div>
                ))}
              </div>
            ))}
            
            <h2>Part Of Speech: </h2>
            {result.meanings.map((meaning, index) => (
              <div key={index}>
                 <p>{meaning.partOfSpeech}</p>
              </div>
            ))}

            <h2>Synonym: </h2>
            {result.meanings.map((synonym, index) => (
              <div key={index}>
                 <p>{synonym.synonyms.join(', ')}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

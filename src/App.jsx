import { useState } from "react";
import "./App.css";

function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");

  //Hanterar search funktionen
  const handleSearch = async () => {
    //Kollar ifall ordet finns med i Dictionary
    handleMessage();
    //Skickar med ordet som användaren har angett till APIn för att få tillbaka data att visa för användaren
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    //Översätter datan till Json
    const data = await response.json();
    console.log(data);
    //Om vi får error meddelandet från APIn, då ska vi ändra vår setMessage state
    if (data.message) {
      setMessage(data.message);
    }
    //Annars mata in datan till Result staten, vilket sedan används för att visa datan för användaren
    else {
      setResult(data);
      setMessage("");
    }
  };
  //Kollar ifall word får existerar
  const handleMessage = () => {
    if (!word) {
      setMessage(
        "Sorry pal, we couldn't find definitions for the word you were looking for."
      );
    }
  };

  return (
    <div>
      {/* Skapar en search container där användaren gör sina sökningar */}
      <div className="search-container">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        {/* När användaren klickar på knappen så körs handleSearch funktionen, vilket tar ordet som använadren har angett och skickar det till dictionary API */}
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="cards-container">
        {/* Här visar vi vårt error meddelande som vi får från APIn */}
        <p>{message}</p>

        {/* Vi mappar genom reslutatet och visar upp datan för användaren ifall ordet matchar med dictionary API */}
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
                {phonetic.audio && (
                  <audio
                    data-testid="audio"
                    controls
                    src={phonetic.audio}
                  ></audio>
                )}
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
                <p>{synonym.synonyms.join(", ")}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

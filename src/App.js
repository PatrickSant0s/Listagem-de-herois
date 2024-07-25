import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import "./styles.css";

const api = "https://kitsu.io/api/edge/";

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");

  // Fetch initial data when the component mounts
  useEffect(() => {
    fetch(`${api}anime?page[limit]=16`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, []);

  // Fetch data based on search input
  useEffect(() => {
    if (text) {
      setInfo({});

      fetch(`${api}anime?filter[text]=${text}&page[limit]=16`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
        });
    }
  }, [text]);

  return (
    <div className="App">
      <h1>Lista de Heróis</h1>
      <SearchInput value={text} onChange={(search) => setText(search)} />
      {text && !info.data && <span>Carregando...</span>}
      {info.data && (
        <ul className="animes-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

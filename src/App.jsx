import "./index.css"
import "./App.css"
import { useState, useEffect } from "react"
import { saveNewJoke, getAllJokes, updateJoke, deleteJoke } from "./jokeService"
import stevePic from "./assets/steve.png"

// const useState = defaultVal => {
//   let state = defaultVal;

//   const setState = (val) => {
//     state = val;
//   };

//   return [state, setState];
// }

export const App = () => {
  const [newJokeEntry, setJokeEntry] = useState('');
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  console.log({ newJokeEntry })

  const fetchAndSetAllJokes = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray)
      console.log("Jokes Set!")
    })
  }

  useEffect(() => {
    fetchAndSetAllJokes();
  }, [])

 useEffect(() => {
  if (allJokes.length > 0) {
    setToldJokes(allJokes.filter(joke => joke.told === true))
    setUntoldJokes(allJokes.filter(joke => joke.told === false))
  }
 }, [allJokes] )

  return <>
    <div className="app-container">
      <article className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </article>
      <div>
        <h2>Add Joke</h2>
      </div>
      <div className="joke-add-form">
        <input className="joke-input" type="text" placeholder="New One Liner" value={newJokeEntry} onChange={(event) => {
          setJokeEntry(event.target.value)
        }}></input>
        <button className="joke-input-submit" onClick={async () => {
          await saveNewJoke(newJokeEntry)
          setJokeEntry("")
          fetchAndSetAllJokes();
        }}>Add</button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <div>
            <h2>Untold <span className="untold-count">{untoldJokes.length}</span></h2>
          </div>
          {untoldJokes.map(joke => {
            return (
              <section className="joke-list-item" key={`untoldJoke -- ${joke.id}`}>
                <p className="joke-list-item-text">
                  {joke.text}
                </p>
                <div className="joke-list-action-delete">
                  <button onClick={() => {
                    console.log(joke.id)
                    deleteJoke(joke.id)
                    fetchAndSetAllJokes
                  }}>X</button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => {
                    let editedJoke = {
                      "id": joke.id,
                      "text":joke.text,
                      "told": true,
                    }
                    updateJoke(editedJoke)
                    fetchAndSetAllJokes()
                  }}>?</button>
                </div>
              </section>
            )
            })
          }
        </div>
        <div className="joke-list-container">
          <div>
            <h2>Told <span className="told-count">{toldJokes.length}</span></h2>
          </div>
          {toldJokes.map(joke => {
            return (
              <section className="joke-list-item" key={`toldJoke -- ${joke.id}`}>
                <p className="joke-list-item-text">{joke.text}</p>
                <div className="joke-list-action-delete">
                  <button onClick={() => {
                    console.log(joke.id)
                    deleteJoke(joke.id)
                    fetchAndSetAllJokes()
                  }}>X</button>
                </div>
                <div className="joke-list-action-toggle">
                  <button onClick={() => {
                    let editedJoke = {
                      "id": joke.id,
                      "text":joke.text,
                      "told": false,
                    }
                    updateJoke(editedJoke)
                    fetchAndSetAllJokes()
                  }}>?</button>
                </div>
              </section>
            )
            })
          }
      </div>
    </div>
  </div>
  </>
}

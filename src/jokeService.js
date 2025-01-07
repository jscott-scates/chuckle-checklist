export const saveNewJoke = async (newJokeEntry) => {
    const newJokeDataPOST = {
        "text": newJokeEntry,
        "told": false
    }

    const postOptions = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(newJokeDataPOST)
    }
    const response = await fetch ('http://localhost:8088/jokes', postOptions)
}

export const getAllJokes = () => {
    return fetch('http://localhost:8088/jokes').then(res => res.json())
}

export const updateJoke = async (joke) => {

    const putData = {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(joke)
    }

    const response = await fetch (`http://localhost:8088/jokes/${joke.id}`, putData)

}

export const deleteJoke = async (jokeId) => {
    const response = await fetch (`http://localhost:8088/jokes/${jokeId}`, {
        method: "DELETE"
    })
} 
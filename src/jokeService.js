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
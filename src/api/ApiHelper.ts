export const fetchData = (URL: string) => new Promise((resolve, reject) => {
    fetch(URL)
    .then(response => response.json())
    .then(resolve)
    .catch(reject);
})

export const fetchAllCharacterFilms = (filmUrls: string[]) => {
    const promises = filmUrls.map(url => () => fetch(url))
    return Promise.all(promises.map(item => item().then(response => response.json())))
}

export const fetchAllHomePlanets = (planetUrls: string[]) => {
    const promises = planetUrls.map(url => () => fetch(url))
    return Promise.all(promises.map(item => item().then(response => response.json())))
}
const PHOTOS_PATH = 'http://my-json-server.typicode.com/octavian202/photos-for-shibe/urls'

const photosCountInput = document.getElementById("numberOfPhotos")
const photosDisplay = document.getElementById("photos")

let count = 0

function getShibePhotoHtml(shibePhotoUrl) {
    return `
        <img src="${shibePhotoUrl}" class="shibe-photo">
    `
}

function getShibePhotosHtml(shibePhotosArr) {
    return shibePhotosArr.map(element => `
        ${getShibePhotoHtml(element)}
    `).join('');
}

document.getElementById("photosForm").addEventListener("submit", e => {
    e.preventDefault();

    count = photosCountInput.value

    appendShibePhotos(count)
        .catch((err) => console.error(err));
});

async function appendShibePhotos(count) {
    let response = await fetch(PHOTOS_PATH);
    let data = await response.json();

    let randomIndexes = getRandomIndexes(count, data.length)
    photoUrls = randomIndexes.map(index => data[index])

    photosDisplay.innerHTML = getShibePhotosHtml(photoUrls)
}

function getRandomIndexes(numberOfIndexes, maxIndex) {
    let arr = []
    while (numberOfIndexes != arr.length) {
        let newIndex = Math.floor(Math.random() * maxIndex)
        while (arr.includes(newIndex && newIndex == null)) {
            newIndex = Math.floor(Math.random() * maxIndex)
        }
        arr.push(newIndex)
    }
    return arr
}
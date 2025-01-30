//fetch data
async function fetchdata() 
{
try 
{
const response = await fetch('https://hp-api.onrender.com/api/characters');
if (!response.ok) {
throw new Error('Failed to fetch data');
}
const data = await response.json();
return data;
} catch (error) 
{
console.error('Error fetching data:', error);
return [];
}
}

//display list of characters
function displaylist(characters) 
{
const list = document.getElementById('characters-list');
list.innerHTML = ''; 

characters.forEach(character => {
const characterContainer = document.createElement('div');
characterContainer.classList.add('character-container');
const characterImage = document.createElement('img');
characterImage.src = character.image;
characterImage.alt = character.name;
characterImage.classList.add('character-image');
characterContainer.appendChild(characterImage);

const characterInfo = document.createElement('div');
characterInfo.innerHTML = `
    <h2>${character.name}</h2>
    <p>House: ${character.house}</p>
    <p>Gender: ${character.gender}</p>
    <p>Date of Birth: ${character.dateOfBirth}</p>
        `;
    characterContainer.appendChild(characterInfo);

    list.appendChild(characterContainer);
    });
}

//function to filter the characters
function filter()
{
const selectedCategory = document.getElementById('category-select').value;

fetchdata().then(charactersData => {
let filteredCharacters = charactersData;

if (selectedCategory !== 'all')
{
filteredCharacters = charactersData.filter(character => character.house === selectedCategory);
}

displaylist(filteredCharacters);
});
}


window.addEventListener('load', () => {
fetchdata().then(charactersData => {
displaylist(charactersData);
});

document.getElementById('category-select').addEventListener('change', filter);
});

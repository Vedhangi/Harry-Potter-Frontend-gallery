// Function to fetch character data
async function fetchall() {
try
{
const response = await fetch('https://hp-api.onrender.com/api/characters');
if (!response.ok) 
{
throw new Error('Failed to fetch data');
}
const data = await response.json();
return data;
} catch (error) {
console.error('Error fetching data:', error);
return [];
}
}

// Function to filter characters 
function filterall() {
    const housetype = document.getElementById('house').value;
    const gendertype = document.getElementById('gender').value;
    const wandcoretype = document.getElementById('wandcore').value;

    fetchall().then(charactersData => {
        let filteredCharacters = charactersData;

        if (housetype !== 'all') {
            filteredCharacters = filteredCharacters.filter(character => character.house === housetype);
        }

        if (gendertype !== 'all') {
            filteredCharacters = filteredCharacters.filter(character => character.gender === gendertype);
        }

        if (wandcoretype !== 'all') {
            filteredCharacters = filteredCharacters.filter(character => {
                return character.wand && character.wand.core.toLowerCase() === wandcoretype.toLowerCase();
            });
        }

        displayall(filteredCharacters);
    });
}

// Function to display list of characters 
function displayall(characters) 
{
    const charactersList = document.getElementById('characters-list');
    charactersList.innerHTML = ''; // Clear previous characters

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
        <p>Wand: ${character.wand ? character.wand.core : 'None'}</p>
        `;
        characterContainer.appendChild(characterInfo);

        charactersList.appendChild(characterContainer);
    });
}

// Function to fetch  only Hogwarts students data
async function fetchstudent() {
try 
{
const response = await fetch('https://hp-api.onrender.com/api/characters/students');
if (!response.ok)
{
throw new Error('Failed to fetch Hogwarts students data');
}
const data = await response.json();
displayall(data);
} catch (error) {
console.error('Error fetching Hogwarts students data:', error);
}
}

// Function to fetch only Hogwarts staff data
async function fetchstaff() {
try
{
const response = await fetch('https://hp-api.onrender.com/api/characters/staff');
if (!response.ok) 
{
throw new Error('Failed to fetch Hogwarts staff data');
}
const data = await response.json();
displayall(data);
} catch (error) 
{
console.error('Error fetching Hogwarts staff data:', error);
}
}

document.getElementById('filter-button').addEventListener('click', filterall);
document.getElementById('hogwarts-student-button').addEventListener('click', fetchstudent);
document.getElementById('hogwarts-staff-button').addEventListener('click', fetchstaff);


window.addEventListener('load', filterall);

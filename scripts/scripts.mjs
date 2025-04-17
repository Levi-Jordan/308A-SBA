const breedSelect = document.getElementById("selectByBreed");
const dog = document.getElementById("dog");

async function loadBreeds() {
  try {
    const response = await fetch("https://api.thedogapi.com/v1/breeds", {
      headers: {
        "x-api-key": "live_mNZ855VqhboS3HCQlYxXQY3QON7ZGzqbqnVW61QfutAbQJgMtTVx1uJKcoAH8XtW",
      },
    });
    const breeds = await response.json();

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (error) {
    console.error("Failed:", error);
  }
}

async function fetchDog() {
  const selectedBreedId = selectByBreed.value;
  dog.style.cursor = "wait";

  try {
    const response = await fetch(
      `https://api.thedogapi.com/v1/images/search?breed_id=${selectedBreedId}`,
      {
        headers: {
          "x-api-key": "live_mNZ855VqhboS3HCQlYxXQY3QON7ZGzqbqnVW61QfutAbQJgMtTVx1uJKcoAH8XtW",
        },
      }
    );

    const data = await response.json();
    if (data.length > 0) {
      dog.src = data[0].url;
    } else {
      dog.src = "";
    }
  } catch (error) {
    console.error("Image failed:", error);
  } finally {
    dog.style.cursor = "pointer";
  }
}

loadBreeds();

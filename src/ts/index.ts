const formElement = document.querySelector("#search-form");
const inputElement: HTMLInputElement | null = document.querySelector("#search-input");
const figureElement = document.querySelector("#search-result");

if (
  formElement !== null && 
  inputElement !== null &&
  figureElement !== null
) {
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();
    const breed = inputElement.value;
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    const apiResponse = await fetch(url);

    if (!apiResponse.ok) {
      return alert("En feil har oppstått.");
    }

    const data = await apiResponse.json();
    
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", data.message);
    imageElement.setAttribute("alt", "");
    figureElement.replaceChildren(imageElement);
  });
}

const formElement = document.querySelector("#search-form");
const inputElement: HTMLInputElement | null = document.querySelector("#search-input");
const checkboxElement: HTMLInputElement | null = document.querySelector("#search-get-all-images");
const figureElement = document.querySelector("#search-result");

if (
  formElement !== null && 
  inputElement !== null &&
  checkboxElement !== null &&
  figureElement !== null
) {
  formElement.addEventListener("submit", async function (event) {
    event.preventDefault();
    const breed = inputElement.value;

    let url;

    if (checkboxElement.checked) {
      url = `https://dog.ceo/api/breed/${breed}/images`;
    } else {
      url = `https://dog.ceo/api/breed/${breed}/images/random`;
    }

    const apiResponse = await fetch(url);

    if (!apiResponse.ok) {
      return alert("En feil har oppstått.");
    }

    const data = await apiResponse.json();
    
    if (checkboxElement.checked) {
      let imageElements = [];

      for (let i = 0; i < data.message.length; i++) {
        const imageElement = document.createElement("img");
        imageElement.setAttribute("src", data.message[i]);
        imageElement.setAttribute("alt", "");
        imageElements.push(imageElement);
      }

      figureElement.replaceChildren(...imageElements);      
    } else {
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", data.message);
      imageElement.setAttribute("alt", "");
      figureElement.replaceChildren(imageElement);
    }
  });
}

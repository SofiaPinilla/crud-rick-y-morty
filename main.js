const charactersDiv = document.querySelector(".characters");
// const btnNextPage = document.querySelector("#btn-next-page")
const btnNextPage = document.getElementById("btn-next-page");
const btnPrevPage = document.getElementById("btn-prev-page");
// console.log(btnPrevPage);

// console.log(btnNextPage);

// console.log(charactersDiv);
// charactersDiv.innerHTML = `<h1>Hola</h1>`;
let page = 52;
const deleteCharacter = async(id)=>{
    console.log("eliminado",id)
    // axios.delete("url")
    // https://api-rick-y-morty-q7uk.onrender.com/characters/id/7/
    await axios.delete(`https://api-rick-y-morty-q7uk.onrender.com/characters/id/${id}`)
    getCharacters();
}
const getCharacters = async () => {
  const res = await axios.get(
    `https://api-rick-y-morty-q7uk.onrender.com/characters?page=${page}`
  );
  //   console.log(res.data[0].name);
  // charactersDiv.innerHTML = `<p>Nombre: ${res.data[0].name}</p>
  // `
  //   console.log(res.data);
  charactersDiv.innerHTML = "";
  res.data.forEach((element) => {
    // console.log(element.name);
    // charactersDiv.innerHTML += `<p>Nombre: ${element.name}</p>`
    charactersDiv.innerHTML += `<div class="card text-white bg-success mb-3" style="max-width: 20rem;">
        <div class="card-header">${element.status}</div>
        <img src="${element.image}" />
            <div class="card-body">
                <h4 class="card-title">${element.name}</h4>
            <button class="btn btn-danger" onclick="deleteCharacter('${element._id}')">Delete</button>
                </div>
        </div>  `;
  });
};

getCharacters();

// async function getCharacters() {
//     const res = await axios.get(
//         "https://api-rick-y-morty-q7uk.onrender.com/characters"
//       )
//       console.log(res.data);

// }

btnNextPage.addEventListener("click", () => {
  page++;
  btnPrevPage.classList.remove("disabled");
  //   console.log(page);
  getCharacters();
});

btnPrevPage.addEventListener("click", () => {
  //   console.log(page);
  if (page <= 1) {
    // console.log("1", page);

    btnPrevPage.classList.add("disabled");
  } else {
    // console.log("2", page);
    btnPrevPage.classList.remove("disabled");
    if (page === 2) {
      btnPrevPage.classList.add("disabled");
    }
    page--;
    getCharacters();
  }
});

//**SPA */
const charactersNav = document.getElementById("charactersNav");
const createCharacterNav = document.getElementById("createCharacterNav");
const charactersPage = document.querySelector(".characters-page");
const charactersFormPage = document.querySelector(".characters-form");
// console.log(charactersNav,createCharacterNav);
// console.log(charactersFormPage);

createCharacterNav.addEventListener("click", () => {
  // console.log("hola");
  // console.log(charactersPage);
  charactersPage.classList.add("d-none");
  charactersFormPage.classList.remove("d-none");
});

charactersNav.addEventListener("click", () => {
  charactersPage.classList.remove("d-none");
  charactersFormPage.classList.add("d-none");
});

//**Formulario crear Character */
const nameInput = document.querySelector("#name");
const statusInput = document.querySelector("#status");
const imageInput = document.querySelector("#image");
const btn = document.querySelector("#btn");
// console.log(nameInput,statusInput,imageInput,btn);

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  const newCharacter = {
    name: nameInput.value,
    status: statusInput.value,
    image: imageInput.value,
  };
  console.log(newCharacter);
//   axios.post("url",body(objeto que creo))
  await axios.post("https://api-rick-y-morty-q7uk.onrender.com/characters",newCharacter)
});

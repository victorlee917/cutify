const jsonUrl = "https://victorlee917.github.io/cutify/array.json";

const search = () => {
  const urlValue = document.getElementById("urlInput").value;
  let previewUrl = document.getElementById("url");
  let previewTitle = document.getElementById("title");
  let previewDesc = document.getElementById("desc");
  let previewImg = document.getElementById("image");
  let previewAll = document.getElementById("all");
  const data = {
    key: "5cc819fae5edbab33d7af928bc6bd6ef560d4b4081276",
    q: urlValue,
  };
  fetch(jsonUrl)
    .then((res) => res.json())
    .then(async (results) => {
      const checking = (result) => {
        if (result.url == urlValue) {
          return new Promise(function (resolve, reject) {
            resolve(true);
          });
        } else {
          return new Promise(function (resolve, reject) {
            resolve(false);
          });
        }
      };
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        const tf = await checking(result);
        if (tf) {
          previewUrl.innerHTML = "already exist";
          previewDesc.innerHTML = "";
          previewImg.innerHTML = "";
          previewTitle.innerHTML = "";
          previewAll.value = "";
          return;
        }
      }
      fetch("https://api.linkpreview.net", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((response) => {
          const { url, title, description, image } = response;
          let jsonText = `
            {
              "image": "${image}",
              "title": "${title}",
              "desc": "${description}",
              "url": "${url}",
              "category": "",
              "time": "",
              "author": "",
              "channel": "youtube"
            },`;
          previewUrl.innerHTML = url;
          previewDesc.innerHTML = description;
          previewImg.innerHTML = image;
          previewTitle.innerHTML = title;
          previewAll.value = jsonText;
        });
    })
    .catch((err) => {
      throw err;
    });
};

const Count = () => {
  const category = ["Dog", "Cat"];
  let AllLength = document.getElementById("AllLength");
  let DogLength = document.getElementById("DogLength");
  let CatLength = document.getElementById("CatLength");
  let OthersLength = document.getElementById("OthersLength");
  fetch(jsonUrl)
    .then((res) => res.json())
    .then(async (results) => {
      AllLength.innerHTML = `All-${results.length}개`;
      let DogArray = [];
      let CatArray = [];
      let OthersArray = [];
      const Filter = (result) => {
        if (result.category == "Dog") {
          DogArray = [...DogArray, result];
        } else if (result.category == "Cat") {
          CatArray = [...CatArray, result];
        } else {
          OthersArray = [...OthersArray, result];
        }
        return new Promise(function (resolve, reject) {
          resolve();
        });
      };
      for (let i = 0; i < results.length; i++) {
        let result = results[i];
        await Filter(result);
      }
      DogLength.innerHTML = `Dog-${DogArray.length}개`;
      CatLength.innerHTML = `Cat-${CatArray.length}개`;
      OthersLength.innerHTML = `Others-${OthersArray.length}개`;
    });
};

document.addEventListener("DOMContentLoaded", () => {
  Count();
});

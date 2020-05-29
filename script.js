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
        "author": "",
        "channel": "youtube"
      },`;
      previewUrl.innerHTML = url;
      previewDesc.innerHTML = description;
      previewImg.innerHTML = image;
      previewTitle.innerHTML = title;
      previewAll.value = jsonText;
    });
};

"use strict";

fetch("/users.json")
  .then((resp) => resp.json())
  .then((users) => {
    const ul = document.getElementById("ul");

    const usersList = users.map((user) => {
      const li = document.createElement("li");
      const div = document.createElement("div");
      const img = document.createElement("img");
      const h1 = document.createElement("h1");
      const p = document.createElement("p");
      const button = document.createElement("button");

      div.setAttribute("class", "userCardContainer");
      img.setAttribute("src", user.profilePicture);

      h1.textContent = `${user.firstName} ${user.lastName}`;
      p.textContent = randomProfession();
      button.textContent = "Connect";

      div.append(img, h1, p, button);
      li.append(div);

      return li;
    });
    ul.append(...usersList);
  })
  .catch(console.error);

function randomProfession() {
  let prof = [
    "Brewer",
    "Lift engineer",
    "Refuse collector",
    "Solicitor",
    "Historian",
    "Jockey",
    "Teacher",
    "Laboratory technician",
    "Electrician",
    "Park ranger",
  ];

  const random = Math.floor(Math.random() * prof.length);
  return prof[random];
}

"use strict";

fetch("/users.json")
  .then((resp) => resp.json())
  .then((users) => {
    const ul = document.getElementById("ul");

    const usersList = users.map((user) => {
      if (user.id < 100) {
        const liOptions = {
          className: "userCardContainer",
        };

        const imgOptions = {
          src: user.profilePicture ?? "/assets/image/defaultUser.png",
        };

        const headingOptions = {
          tagName: "h1",
          textContent: `${user.firstName} ${user.lastName}`,
        };

        const paragraphOptions = {
          textContent: randomProfession(),
        };

        const buttonOptions = {
          textContent: "Connect",
        };

        const li = createLi(liOptions);
        const img = createImage(imgOptions);
        const h1 = createHeading(headingOptions);
        const p = createParagraph(paragraphOptions);
        const button = createButton(buttonOptions);

        li.append(img, h1, p, button);

        return li;
      } else {
        return null;
      }
    });
    ul.append(
      ...usersList.filter(function (e) {
        return e != null;
      })
    );
  })
  .catch(console.error);

function createLi({ className = "li" } = options) {
  const li = document.createElement("li");
  li.setAttribute("class", className);
  return li;
}

function createImage({ src = "/assets/image/defaultUser.png" } = options) {
  const img = document.createElement("img");
  img.src = src;
  return img;
}

function createHeading({
  tagName = "h1",
  textContent = "User Name",
} = options) {
  const headingElement = document.createElement(tagName);
  headingElement.textContent = textContent;
  return headingElement;
}

function createParagraph({ textContent = "Profession" } = options) {
  const pElement = document.createElement("p");
  pElement.textContent = textContent;
  return pElement;
}

function createButton({ textContent = "More" } = options) {
  const btn = document.createElement("button");
  btn.textContent = textContent;
  return btn;
}

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

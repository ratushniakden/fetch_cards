"use strict";

const header = document.getElementById("header");
header.classList.add("topBar");

fetch("/auth.json")
  .then((resp) => resp.json())
  .then((loggedUser) => {
    const imgOptions = {
      src: loggedUser.profilePicture ?? "/assets/image/defaultUser.png",
      className: "authUserPicture",
    };

    const fullName = {
      tagName: "h2",
      textContent: `${loggedUser.firstName} ${loggedUser.lastName}`,
    };

    const profession = {
      tagName: "h6",
      textContent: `> ${loggedUser.position} <`,
    };

    const userInfo = document.createElement("div");
    userInfo.classList.add("userInfo");

    const userPicture = createImage(imgOptions);
    const h2 = createHeading(fullName);
    const h6 = createHeading(profession);

    userInfo.append(h2, h6);
    header.append(userPicture, userInfo);
  });

fetch("/users.json")
  .then((resp) => resp.json())
  .then((users) => {
    const ul = document.getElementById("ul");
    const usersList = users.map((user) => createUserCard(user));
    ul.append(
      ...usersList.filter(function (e) {
        return e !== null;
      })
    );
  })
  .catch(console.error);

function createUserCard(user) {
  const liOptions = {
    className: "userCardContainer",
  };

  const imgOptions = {
    src: user.profilePicture ?? "/assets/image/defaultUser.png",
    className: "avatarImage",
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

  if (user.firstName === "" || user.lastName === "") {
    return null;
  }

  img.addEventListener("error", () => {
    img.parentNode.prepend(imageErrorHandler(user));
    img.remove();
  });

  li.addEventListener("click", () => {
    const title = document.getElementById("title");
    title.textContent = `${user.firstName} ${user.lastName}`;
  });

  li.append(img, h1, p, button);
  return li;
}

function createLi({ className = "li" } = options) {
  const li = document.createElement("li");
  li.setAttribute("class", className);
  return li;
}

function createImage({
  src = "/assets/image/defaultUser.png",
  className,
} = options) {
  const img = document.createElement("img");
  img.classList.add(className);
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

function imageErrorHandler(user) {
  const div = document.createElement("div");
  const span = document.createElement("span");

  div.style.backgroundColor = "#" + userColor(user);
  span.textContent = `${user.firstName[0]}${user.lastName[0]}`;
  div.classList.add("avatarImage", "avatarBackground");
  div.append(span);
  return div;
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

function randomBgColor() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor;
}

function userColor(user) {
  let color = `${user.firstName.length}${user.lastName.length}`;
  while (color.length !== 6) {
    color = color.concat("0");
  }
  return color;
}

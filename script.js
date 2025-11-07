let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");

const userManager = {
  users: [],
  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
    //yaha hamlogo ne bind islie use kia hai taaki hamlog bol sakte submitForm ko ki this ka value ye hi object ko rakhne k lie, and this pass kia hai kyuki iss function mein this matlab ye object hi hota hai
  },
  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },
  addUser: function () {
    this.users.push({
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    });

    form.reset();
    this.renderUi();
  },
  renderUi: function () {
    document.querySelector(".users").innerHTML = ""; //this is being done bcz or else it will get repeated the same users many times
    this.users.forEach((user, index) => {
    const card = document.createElement("div");
    card.className =
      "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition";

    // Image
    const img = document.createElement("img");
    img.className =
      "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
    img.src = user.photo;
    img.alt = "User Photo";
    card.appendChild(img);

    // Name
    const name = document.createElement("h2");
    name.className = "text-2xl font-bold mb-1 text-blue-700";
    name.textContent = user.username;
    card.appendChild(name);

    // Role 
    const roleText = document.createElement("p");
    roleText.className = "text-purple-500 mb-2 font-medium";
    roleText.textContent = user.role;
    card.appendChild(roleText);

    // Description
    const desc = document.createElement("p");
    desc.className = "text-gray-700 text-center mb-4";
    desc.textContent = user.bio;
    card.appendChild(desc);

    // Delete Button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className =
      "bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition";
    delBtn.setAttribute("data-index", index);
    delBtn.addEventListener("click", this.removeUser.bind(this));
    card.appendChild(delBtn);

      // Finally, append the card wherever needed, for example:

      document.querySelector(".users").appendChild(card);
    });
  },
  removeUser: function (e) {
    const index = e.target.getAttribute("data-index");
  this.users.splice(index, 1);
  this.renderUi();
  },
};

userManager.init();


// Let's understand how I noticed which button the user was clicking to delete that card - 

/*
🧩 The Problem We're Solving

When you click Delete, your removeUser() function needs to know:
👉 Which user/card did the user just click delete on?

We can’t hardcode that — we need a way to connect the delete button to its corresponding user in this.users[].
🪄 The Trick: Using data-* Attributes

Every HTML element can have custom attributes that start with data-, like:

<button data-index="0">Delete</button>

JavaScript can read or set these values easily:

btn.setAttribute("data-index", 0);
console.log(btn.getAttribute("data-index")); // "0"

So here we’re using that trick to “tag” each delete button with which user it represents (its index in the array).

🧠 Step-by-Step Breakdown
Step 1: delBtn.setAttribute("data-index", index);

When we loop through this.users in renderUi():

this.users.forEach((user, index) => {

index is the array position of that user — like:

0 for the first user,

1 for the second, and so on.

So this line:

delBtn.setAttribute("data-index", index);

adds that number as a custom attribute on the delete button:

<button data-index="1">Delete</button>

Now each button carries with it the info about which user it’s linked to.

Step 2: delBtn.addEventListener("click", this.removeUser.bind(this));

Here we’re saying:

“Whenever this button is clicked, call the function removeUser() from the userManager object.”

But we also use .bind(this) because inside an event listener, this normally points to the element that triggered the event (the button).
We don’t want that — we want this inside removeUser to still refer to the userManager object.

So .bind(this) makes sure the context (this) remains the userManager.

Step 3: Inside removeUser()

When you click Delete:

removeUser: function (e) {
  const index = e.target.getAttribute("data-index");
  this.users.splice(index, 1);
  this.renderUi();
}

Here’s what happens:

e.target → The element that was clicked (the delete button).

e.target.getAttribute("data-index") → Reads the custom attribute you set earlier.
If the button looked like <button data-index="1">,
this will return "1".

this.users.splice(index, 1) → Removes 1 element from this.users starting at position index.
So if index = 1, it removes the second user.

this.renderUi() → Re-renders the list with the updated array — meaning the deleted card disappears from the screen.*/
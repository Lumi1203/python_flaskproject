document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.querySelector('.welcome-message');
  //add friend button//
  const addFriendBtn = document.getElementById("showAddFriendForm");
  const addFriendSection = document.getElementById("addFriendSection");
  const addFriendForm = document.getElementById("addFriendForm");
  const newFriendName = document.getElementById("newFriendName");
  const addFriendError = document.getElementById("addFriendError");
  const friendDropdown = document.getElementById("friendDropdown");
  const friendList = document.getElementById("friendList");

  const friends = [];

  addFriendBtn?.addEventListener("click", () => {
    addFriendSection.classList.toggle("hidden");
    addFriendError.textContent = "";
  });

  addFriendForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = newFriendName.value.trim();
  
    if (!name) {
      addFriendError.textContent = "Name cannot be empty.";
      return;
    }
  
    if (friends.includes(name)) {
      addFriendError.textContent = "This friend is already added.";
      return;
    }
  
    friends.push(name);
    addFriendError.textContent = "";
  
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    friendDropdown?.appendChild(option);
  
    renderFriendList();
  
    const successMsg = document.createElement("p");
    successMsg.textContent = "Friend added successfully!";
    successMsg.className = "success";
    addFriendForm.appendChild(successMsg);
    setTimeout(() => successMsg.remove(), 3000);
  
    newFriendName.value = "";
    addFriendSection.classList.add("hidden");
  });

  function renderFriendList() {
    friendList.innerHTML = ""; 
  
    friends.forEach((friend, index) => {
      const li = document.createElement("li");
      li.textContent = `${friend} `;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";
      removeBtn.style.background = "#f44336";
      removeBtn.style.color = "white";
      removeBtn.style.border = "none";
      removeBtn.style.padding = "5px 10px";
      removeBtn.style.borderRadius = "5px";
      removeBtn.style.cursor = "pointer";
  
      removeBtn.addEventListener("click", () => {
        friends.splice(index, 1);
  
        Array.from(friendDropdown.options).forEach((opt) => {
          if (opt.value === friend) opt.remove();
        });

        renderFriendList();
      });
  
      li.appendChild(removeBtn);
      friendList.appendChild(li);
    });
  }
  //split a bill//
  const billForm = document.getElementById("billForm");
  const amount = document.getElementById("amount");
  const formError = document.getElementById("formError");

  billForm?.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const totalAmount = parseFloat(amount.value);
    const payer = friendDropdown.value;
  
    if (isNaN(totalAmount) || totalAmount <= 0) {
      formError.textContent = "Please enter a valid total amount.";
      return;
    }
  
    if (!payer) {
      formError.textContent = "Please select the friend who paid.";
      return;
    }
  
    if (friends.length < 2) {
      formError.textContent = "Please add at least two friends to split the bill.";
      return;
    }
  
    formError.textContent = "";
    friendList.innerHTML = "";;
  
    const debtors = friends.filter(friend => friend !== payer);
    const share = totalAmount / friends.length;
  
    debtors.forEach(debtor => {
      const li = document.createElement("li");
      li.textContent = `${debtor} owes ${payer} €${share.toFixed(2)}`;
      friendList.appendChild(li);
    });
  
    const payerLine = document.createElement("li");
    payerLine.textContent = `${payer} paid €${totalAmount.toFixed(2)} for ${friends.length} people (each owes €${share.toFixed(2)})`;
    payerLine.style.fontWeight = "bold";
    friendList.insertBefore(payerLine, friendList.firstChild);
  
    billForm.reset();
  });
  
  //sign up//
  const showSignupForm = document.getElementById("showSignupForm");
  const signupForm = document.getElementById("signupForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const signupError = document.getElementById("signupError");

  showSignupForm?.addEventListener("click", () => {
    signupForm.classList.remove("hidden");
    signupError.textContent = "";
  });

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!name) {
      signupError.textContent = "Please enter your full name.";
      return;
    }

    if (!emailRegex.test(email)) {
      signupError.textContent = "Please enter a valid email.";
      return;
    }

    if (!phoneRegex.test(phone)) {
      signupError.textContent = "Enter a valid phone number (10–15 digits).";
      return;
    }

    if (!passwordRegex.test(password)) {
      signupError.textContent =
        "Password must include uppercase, lowercase, number, special character, and be at least 6 characters.";
      return;
    }

    if (password !== confirmPassword) {
      signupError.textContent = "Passwords do not match.";
      return;
    }

    signupError.textContent = "";
    welcomeMessage.textContent = `Welcome, ${name}! `;
    signupForm.style.display = "none";
    showSignupForm.style.display = "none";
  });

  //log in//
  const showLoginFormBtn = document.getElementById("showLoginForm");
  const loginForm = document.getElementById("loginForm");
  const loginUsername = document.getElementById("loginUsername");
  const loginPassword = document.getElementById("loginPassword");
  const loginError = document.getElementById("loginError");

  showLoginFormBtn?.addEventListener("click", () => {
    loginForm.classList.toggle("hidden");
    loginError.textContent = "";
  });

  loginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    const isPasswordValid = (pwd) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(pwd);

    if (!isPasswordValid(password)) {
      loginError.textContent =
        "Password must include uppercase, lowercase, number, special character, and be at least 6 characters.";
      return;
    }

    loginError.textContent = "";
    welcomeMessage.textContent = `Welcome ${username}!`;
    showLoginFormBtn.style.display = "none";

  });

  //photo slider//
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);

  //refer a friend//
  const referForm = document.getElementById("referForm");
  const referralMethod = document.getElementById("referralMethod");
  const referralInput = document.getElementById("referralInput");
  const referError = document.getElementById("referError");
  const referSuccess = document.getElementById("referSuccess");

  referForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    referError.textContent = "";
    referSuccess.textContent = "";

    const method = referralMethod.value;
    const input = referralInput.value.trim();

    if (!method) {
    referError.textContent = "Please select a referral method.";
    return;
    }

    if (!input) {
    referError.textContent = "Please enter a valid email or phone number.";
    return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{10,15}$/;

    if (
      (method === "email" && !emailRegex.test(input)) ||
      (method === "phone" && !phoneRegex.test(input))
    ) {
      referError.textContent = `Invalid ${method}`;
      return;
    }

    referSuccess.textContent = `Referral sent successfully!`;
    referForm.reset();
  });

  //dark mode//
  const darkModeToggle = document.getElementById('darkModeToggle');

  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  
    if(document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = 'Light Mode';
    } else {
    darkModeToggle.textContent = 'Dark Mode';
    }
  });
  
});


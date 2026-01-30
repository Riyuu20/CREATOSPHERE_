document.addEventListener("DOMContentLoaded", () => {

  /* ==================================================
     STORAGE KEYS
  ================================================== */
  const PROFILE_KEY = "cs_profile_data";
  const PHOTO_KEY   = "cs_profile_photo";

  /* ==================================================
     ELEMENT REFERENCES
  ================================================== */
  const profileName  = document.querySelector(".profile-name");
  const profileTitle = document.querySelector(".profile-title");
  const profileImg   = document.getElementById("profileImage");
  const navbarImg    = document.querySelector(".user-avatar img");
  const aboutText    = document.getElementById("aboutText");

  const settingsForm = document.getElementById("settingsForm");
  const nameInput    = document.getElementById("displayName");
  const bioInput     = document.getElementById("userBio");
  const goalInput    = document.getElementById("learningGoals");

  const editAvatarBtn = document.querySelector(".edit-avatar-btn");

  /* ==================================================
     DEFAULT PROFILE (FIRST LOAD)
  ================================================== */
  const defaultProfile = {
    name: "Your Name",
    title: "Tech Learner",
    bio: "Passionate learner building skills step by step 🚀",
    goals: "Become a full-stack developer"
  };

  /* ==================================================
     LOAD PROFILE DATA
  ================================================== */
  function loadProfile() {
    const savedProfile = JSON.parse(localStorage.getItem(PROFILE_KEY));
    const savedPhoto   = localStorage.getItem(PHOTO_KEY);

    const data = savedProfile || defaultProfile;

    profileName.textContent  = data.name;
    profileTitle.textContent = data.title;
    aboutText.textContent    = data.bio;

    nameInput.value = data.name;
    bioInput.value  = data.bio;
    goalInput.value = data.goals;

    if (savedPhoto) {
      profileImg.src = savedPhoto;
      if (navbarImg) navbarImg.src = savedPhoto;
    }
  }

  loadProfile();

  /* ==================================================
     SAVE PROFILE FROM SETTINGS (UI BASED)
  ================================================== */
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const updatedProfile = {
      name:  nameInput.value.trim(),
      title: profileTitle.textContent,
      bio:   bioInput.value.trim(),
      goals: goalInput.value.trim()
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));

    profileName.textContent = updatedProfile.name;
    aboutText.textContent   = updatedProfile.bio;
  });

  /* ==================================================
     PROFILE IMAGE UPLOAD
  ================================================== */
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.hidden = true;
  document.body.appendChild(fileInput);

  editAvatarBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(PHOTO_KEY, reader.result);
      profileImg.src = reader.result;
      if (navbarImg) navbarImg.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  /* ==================================================
     TABS SYSTEM
  ================================================== */
  const tabButtons  = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  /* ==================================================
     CARD EDIT BUTTONS (INLINE EDIT EXPERIENCE)
  ================================================== */
  document.addEventListener("click", (e) => {

    /* Edit About / Bio Card */
    if (e.target.closest(".card-edit") && e.target.closest(".card")) {
      const card = e.target.closest(".card");

      if (card.dataset.type === "bio") {
        bioInput.focus();
        document.querySelector('[data-tab="settings"]').click();
      }
    }

  });

});

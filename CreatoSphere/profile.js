document.addEventListener("DOMContentLoaded", () => {

  /* ================= STORAGE KEY ================= */
  const PHOTO_KEY = "cs_profile_photo";

  /* ================= ELEMENTS ================= */
  const profileImg = document.getElementById("profileImage");
  const navbarImg  = document.querySelector(".user-avatar img");
  const editBtn    = document.querySelector(".edit-avatar-btn");

  /* ================= HIDDEN FILE INPUT ================= */
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.hidden = true;
  document.body.appendChild(fileInput);

  /* ================= OPEN FILE PICKER ================= */
  editBtn.addEventListener("click", () => {
    fileInput.click();
  });

  /* ================= IMAGE UPLOAD ================= */
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(PHOTO_KEY, reader.result);
      applyProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  });

  /* ================= APPLY IMAGE EVERYWHERE ================= */
  function applyProfilePhoto(src) {
    if (profileImg) profileImg.src = src;
    if (navbarImg)  navbarImg.src  = src;
  }

  /* ================= LOAD ON PAGE LOAD ================= */
  const savedPhoto = localStorage.getItem(PHOTO_KEY);
  if (savedPhoto) {
    applyProfilePhoto(savedPhoto);
  }

});

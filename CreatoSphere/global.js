document.addEventListener("DOMContentLoaded", () => {

  function loadProfilePhoto() {
    const photo = localStorage.getItem("cs_profile_photo");
    if (!photo) return;

    document.querySelectorAll(".user-avatar img, #profileImage")
      .forEach(img => img.src = photo);
  }

  window.saveProfilePhoto = function(base64) {
    localStorage.setItem("cs_profile_photo", base64);
    loadProfilePhoto();
  };

  loadProfilePhoto();
});

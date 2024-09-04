//JavaScript for Image Handling and API Interaction -->

// Image preview when user selects an image
document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("previewImg").src = e.target.result;
        document.getElementById("previewImg").style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

// Handle Check Image button click
document.getElementById("checkImageBtn").addEventListener("click", function () {
  const file = document.getElementById("imageUpload").files[0];
  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    fetch("/api/check-image", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.is_deepfake) {
          alert("The image is a deepfake!");
        } else {
          alert("The image is real.");
        }
      })
      .catch((error) => console.error("Error:", error));
  } else {
    alert("Please upload an image first.");
  }
});

// Reset the form when the modal is closed
$("#uploadModal").on("hidden.bs.modal", function () {
  document.getElementById("imageUpload").value = "";
  document.getElementById("previewImg").src = "";
  document.getElementById("previewImg").style.display = "none";
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

//form submission alert
document.getElementById("contact-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent actual form submission
  alert("Thank you for reaching out! We will get back to you soon.");
  event.target.reset(); // Clear the form
});

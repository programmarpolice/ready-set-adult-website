// Function to load a page dynamically
function loadPage(page) {
  fetch(page) // Fetch the HTML content of the page
    .then((response) => response.text()) // Convert the response to text
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const newContent = doc.getElementById("content");
      document.getElementById("content").innerHTML = newContent.innerHTML; // Replace current content
    })
    .catch((error) => console.error("Error loading page:", error)); // Log any errors
}

// Attach click event listeners to navigation links
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    const page = link.getAttribute("data-page");
    loadPage(page); // Call the loadPage function with the specified page
  });
});

// Smooth scroll for anchor links on the same page
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default jump behavior
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  });
});

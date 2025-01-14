// Function to load a page dynamically
function loadPage(page) {
  const loadingIndicator = document.getElementById("loading-indicator");
  const contentContainer = document.getElementById("content");
  loadingIndicator.style.display = "block"; //Show loading indicator

  fetch(page) // Fetch the HTML content of the page
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Failes to load ${page}: ${response.status} ${response.statusText}"
        );
      }
      return response.text(); // Convert the response to text
    })
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");
      const newContent = doc.getElementById("content");
      document.getElementById("content").innerHTML = newContent.innerHTML; // Replace current content
    })
    .catch((error) => {
      console.error("Error loading page:", error);
      contentContainer.innerHTML = `
      <div class="error-message">
      <h2> Oops! Something went wrong. </h2>
      <p> We couldn't load the page. Please try again later. </p>
      </div>
      `;
    })
    .finally(() => {
      loadingIndicator.style.display = "none"; //Hide loading indicator
    });
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

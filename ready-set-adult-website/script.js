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

// Search functionality for Webinars Page
document.addEventListener("DOMContentLoaded", () => {
  const searchField = document.getElementById("search-field");
  const webinarBoxes = document.querySelectorAll(".webinar-box");
  const suggestionsList = document.getElementById("search-suggestions");

  if (searchField) {
    // Listen for user input to show matching webinar suggestions
    searchField.addEventListener("input", () => {
      const searchQuery = searchField.value.toLowerCase();
      suggestionsList.innerHTML = ""; // Clear previous suggestions

      if (searchQuery.length > 0) {
        webinarBoxes.forEach((box) => {
          const title = box.querySelector("h3").textContent.toLowerCase();
          if (title.includes(searchQuery)) {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = box.querySelector("h3").textContent;
            suggestionItem.classList.add("suggestion-item");

            // When a suggestion is clicked, set the search field and filter results
            suggestionItem.addEventListener("click", () => {
              searchField.value = suggestionItem.textContent;
              filterWebinars(); // Run search filtering
              suggestionsList.innerHTML = ""; // Clear suggestions after selection
            });

            suggestionsList.appendChild(suggestionItem);
          }
        });
      }
    });

    // Listen for "Enter" key to trigger search
    searchField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        filterWebinars();
        suggestionsList.innerHTML = ""; // Clear suggestions after search
      }
    });

    // Function to filter webinar list based on search input
    function filterWebinars() {
      const searchQuery = searchField.value.toLowerCase();
      webinarBoxes.forEach((box) => {
        const title = box.querySelector("h3").textContent.toLowerCase();
        const description = box
          .querySelector("p:nth-of-type(2)")
          .textContent.toLowerCase();

        if (title.includes(searchQuery) || description.includes(searchQuery)) {
          box.style.display = "flex"; // Show matching webinars
        } else {
          box.style.display = "none"; // Hide non-matching webinars
        }
      });
    }
  }
});

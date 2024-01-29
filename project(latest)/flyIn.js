document.addEventListener("DOMContentLoaded", function() {
  const flyInElement = document.querySelector(".fly-in");

  // Function to add the fly-in animation class
  function animateFlyIn(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        flyInElement.classList.add("animate-fly-in");
      }
    });
  }

  // Create the Intersection Observer
  const observer = new IntersectionObserver(animateFlyIn, {
    root: null,
    rootMargin: "0px",
    threshold: 0.05, // Adjust this threshold as needed, 0.05 means when 5% of the element is visible
  });

  // Check the screen width
  if (window.innerWidth <= 768) { // For phone-sized screens
    setTimeout(() => {
      flyInElement.classList.add("animate-fly-in");
    }, 500); // 5000 milliseconds = 5 seconds
  } else { // For tablet or laptop screens
    setTimeout(() => {
      observer.observe(flyInElement);
    }, 500); // 500 milliseconds
  }
});

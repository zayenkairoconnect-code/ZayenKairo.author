const header = `
<header class="site-header">
  <a class="brand" href="index.html">ZAYEN KAIRO<small>AUTHOR · TECHNOLOGY</small></a>
  <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>
  <nav class="nav" aria-label="Main navigation">
    <a href="index.html">Home</a><a href="books.html">Books</a><a href="about.html">About</a>
    <a href="resources.html">Library</a>
    <a href="blog.html">Insights</a>
    <a class="nav-cta" href="contact.html">Contact</a>
  </nav>
</header>`;
const footer = `<footer class="site-footer"><div class="footer-inner"><div class="footer-copy">© ${new Date().getFullYear()} Zayen Kairo. All rights reserved.</div><div class="footer-links"><a href="books.html">Books</a><a href="resources.html">Resources</a><a href="contact.html">Contact</a></div></div></footer>`;
document.getElementById("site-header")?.insertAdjacentHTML("afterbegin", header);
document.getElementById("site-footer")?.insertAdjacentHTML("afterbegin", footer);
const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".nav");
toggle?.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(open)); });
function bookCard(book) { return `<article class="book-card"><div class="book-cover"><img src="${book.cover}" alt="Placeholder cover design for ${book.title}"></div><div class="book-meta"><span class="book-category">${book.category}</span><h3>${book.title}</h3><p>${book.description}</p><a class="book-link" href="${book.amazonUrl}" ${book.amazonUrl === "#" ? 'aria-label="Amazon link to be added for ' + book.title + '"' : 'target="_blank" rel="noopener"'}>VIEW BOOK ↗</a></div></article>`; }
if (typeof books !== "undefined") {
  const featured = document.getElementById("featured-books");
  const all = document.getElementById("all-books");
  if (featured) featured.innerHTML = books.filter(b => b.featured).map(bookCard).join("");
  if (all) all.innerHTML = books.map(bookCard).join("");
}

/* =================================
   MAILERLITE NEWSLETTER SIGNUP
================================= */

const newsletter = document.getElementById("newsletter-form");

if (newsletter) {
  newsletter.innerHTML = `
    <form class="newsletter-placeholder" id="newsletter-signup">
      <label class="visually-hidden" for="newsletter-email">
        Email address
      </label>

      <input
        type="email"
        id="newsletter-email"
        name="email"
        placeholder="Your email address"
        autocomplete="email"
        required
      >

      <div class="newsletter-honeypot" aria-hidden="true">
        <label for="newsletter-website">Leave this field empty</label>
        <input
          type="text"
          id="newsletter-website"
          name="website"
          tabindex="-1"
          autocomplete="off"
        >
      </div>

      <button type="submit" id="newsletter-submit">
        SUBSCRIBE
      </button>
    </form>

    <p
      id="newsletter-message"
      class="newsletter-message"
      role="status"
      aria-live="polite"
    ></p>
  `;

  const form = document.getElementById("newsletter-signup");
  const emailInput = document.getElementById("newsletter-email");
  const submitButton = document.getElementById("newsletter-submit");
  const message = document.getElementById("newsletter-message");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const website = document.getElementById("newsletter-website").value;

    message.textContent = "";

    if (!email) {
      message.textContent = "Please enter your email address.";
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "SUBMITTING...";

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, website })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your subscription.");
      }

      message.textContent = result.message;
      form.reset();

    } catch (error) {
      message.textContent =
        error.message || "Something went wrong. Please try again.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "SUBSCRIBE";
    }
  });
}


/* Home page motion: reveal sections as they enter the viewport. */
(() => {
  const loader = document.querySelector(".page-loader");
  window.addEventListener("load", () => {
    window.setTimeout(() => loader?.classList.add("is-hidden"), 350);
  });

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  /* =================================
     ACTIVE NAVIGATION MENU
  ================================= */

  function updateActiveNavigation() {

    const header = document.getElementById("site-header");

    if (!header) return;

    const links = header.querySelectorAll("nav a");

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    links.forEach(link => {

      const linkPage = new URL(
        link.href,
        window.location.href
      ).pathname.split("/").pop();

      if (linkPage === currentPage) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }

    });
  }

  // Run when page loads
  updateActiveNavigation();

  // Handle dynamically loaded navigation
  new MutationObserver(updateActiveNavigation).observe(
    document.getElementById("site-header"),
    { childList: true, subtree: true }
  );

  // Subtle pointer movement on desktop. Disabled for touch and reduced-motion users.
  const hero = document.querySelector(".hero-visual");
  const scene = document.querySelector(".hero-book-scene");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (hero && scene && window.matchMedia("(pointer:fine)").matches && !reduceMotion) {
    hero.addEventListener("pointermove", event => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      scene.style.transform = `translate(${x * 10}px, ${y * 10}px) rotate(${-4 + x * 2}deg)`;
    });
    hero.addEventListener("pointerleave", () => {
      scene.style.transform = "";
    });
  }
})();

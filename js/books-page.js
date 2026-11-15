/* =========================================================
   BOOKS PAGE — EDITORIAL BOOKSHELF + FORMAT SELECTOR
   Uses the existing `books` array from books-data.js.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const bookList = document.getElementById("all-books");
  if (!bookList || !Array.isArray(window.books || books)) return;

  const bookData = window.books || books;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  bookList.classList.remove("books-list");
  bookList.classList.add("bookshelf-list");

  const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);

  const safeUrl = value => {
    const url = String(value || "").trim();
    return /^https:\/\/(www\.)?amazon\.[a-z.]+\/.+/i.test(url) ? url : "";
  };

  const money = value => {
    if (value === "" || value === null || value === undefined) return "Coming Soon";
    const amount = Number(value);
    if (!Number.isFinite(amount)) return "Coming Soon";
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD"
    }).format(amount);
  };

  const getFormats = book => {
    // Preferred structure: book.formats = { Kindle: { price, amazonUrl }, ... }
    if (book.formats && typeof book.formats === "object") {
      return ["Kindle", "Paperback", "Hardcover"]
        .filter(name => Object.prototype.hasOwnProperty.call(book.formats, name))
        .map(name => ({
          name,
          price: book.formats[name]?.price ?? "",
          amazonUrl: safeUrl(book.formats[name]?.amazonUrl)
        }));
    }

    // Backward-compatible fallback: preserve the existing listing URL and format.
    // Other format links/prices remain blank until supplied in books-data.js.
    const currentFormat = ["Kindle", "Paperback", "Hardcover"].includes(book.format)
      ? book.format : "Paperback";

    return ["Kindle", "Paperback", "Hardcover"].map(name => ({
      name,
      price: name === currentFormat ? (book.price ?? "") : "",
      amazonUrl: name === currentFormat ? safeUrl(book.amazonUrl) : ""
    }));
  };

  const createBook = (book, index) => {
    const formats = getFormats(book);
    const initialFormat = formats.find(item => item.name === book.format)
      || formats.find(item => item.amazonUrl)
      || formats[0];

    const shortDescription = String(book.description || "");
    const fullDescription = String(book.fullDescription || book.description || "");
    const hasMore = fullDescription.length > shortDescription.length + 20;
    

const number = String(index + 1).padStart(2, "0");
const card = document.createElement("article");

card.className = "shelf-book-card";

// Give each book a unique URL anchor
const slug = book.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-|-$/g, "");

card.id = `book-${slug}`;

card.style.setProperty("--book-index", index);


    const formatOptions = formats.map((format, formatIndex) => `
      <button
        class="format-option${format.name === initialFormat.name ? " is-selected" : ""}"
        type="button"
        data-format-index="${formatIndex}"
        aria-pressed="${format.name === initialFormat.name}"
        ${!format.amazonUrl && format.price === "" ? 'aria-label="' + escapeHTML(format.name) + ' format; price and purchase link not supplied yet"' : ""}
      >${escapeHTML(format.name)}</button>
    `).join("");

    card.innerHTML = `
      <div class="shelf-book-visual">
        <span class="shelf-book-number">BOOK ${number}</span>
        <span class="shelf-book-shadow" aria-hidden="true"></span>
        <div class="shelf-cover-button">
          <img class="shelf-book-cover"
               src="${escapeHTML(book.cover)}"
               alt="${escapeHTML(book.title)} book cover"
               loading="lazy">
        </div>
      </div>

      <div class="shelf-book-information">
        <div class="shelf-book-topline">
          <span>${escapeHTML(book.category || "BOOK")}</span>
          <span>${number} / ${String(bookData.length).padStart(2, "0")}</span>
        </div>

        <h3>${escapeHTML(book.title)}</h3>
        ${book.subtitle ? `<p class="shelf-book-subtitle">${escapeHTML(book.subtitle)}</p>` : ""}

        <div class="shelf-description-area">
          <p class="shelf-book-description">
            <span class="description-short">${escapeHTML(shortDescription)}</span>
            ${hasMore ? `<span class="description-full" hidden>${escapeHTML(fullDescription)}</span>` : ""}
          </p>
          ${hasMore ? `
            <button class="description-toggle" type="button" aria-expanded="false">
              Read more <span aria-hidden="true">＋</span>
            </button>
          ` : ""}
        </div>

        <section class="shelf-format-panel" aria-label="Choose book format">
          <p class="shelf-details-heading">CHOOSE YOUR FORMAT</p>
          <div class="format-options" role="group" aria-label="Available formats">
            ${formatOptions}
          </div>
          <div class="shelf-selected-format">
            <span class="selected-format-name">${escapeHTML(initialFormat.name)}</span>
            <strong class="selected-format-price">${money(initialFormat.price)}</strong>
          </div>
        </section>

        <div class="shelf-book-details">
          <p class="shelf-details-heading">PUBLICATION DETAILS</p>
          <dl>
            <div class="shelf-detail-row"><dt>Release date</dt><dd>${escapeHTML(book.releaseDate || "Not specified")}</dd></div>
            <div class="shelf-detail-row"><dt>Pages</dt><dd>${escapeHTML(book.pages || "Not specified")}</dd></div>
            <div class="shelf-detail-row"><dt>Language</dt><dd>${escapeHTML(book.language || "English")}</dd></div>
            <div class="shelf-detail-row"><dt>Edition</dt><dd>${escapeHTML(book.edition || "Not specified")}</dd></div>
          </dl>
        </div>

        <div class="shelf-book-actions">
          <a class="shelf-action-primary${initialFormat.amazonUrl ? "" : " is-unavailable"}"
             href="${initialFormat.amazonUrl || "#"}"
             ${initialFormat.amazonUrl ? 'target="_blank" rel="noopener noreferrer"' : 'aria-disabled="true"'}
          >${initialFormat.amazonUrl ? "VIEW ON AMAZON" : "AMAZON LINK NOT ADDED"} <span aria-hidden="true">↗</span></a>
          <span class="format-note" aria-live="polite"></span>
        </div>
      </div>
    `;

    const descriptionToggle = card.querySelector(".description-toggle");
    if (descriptionToggle) {
      descriptionToggle.addEventListener("click", () => {
        const shortText = card.querySelector(".description-short");
        const fullText = card.querySelector(".description-full");
        const expanded = descriptionToggle.getAttribute("aria-expanded") === "true";
        descriptionToggle.setAttribute("aria-expanded", String(!expanded));
        shortText.hidden = !expanded;
        fullText.hidden = expanded;
        descriptionToggle.innerHTML = expanded
          ? 'Read more <span aria-hidden="true">＋</span>'
          : 'Read less <span aria-hidden="true">−</span>';
      });
    }

    const formatButtons = [...card.querySelectorAll(".format-option")];
    const priceElement = card.querySelector(".selected-format-price");
    const nameElement = card.querySelector(".selected-format-name");
    const amazonLink = card.querySelector(".shelf-action-primary");
    const formatNote = card.querySelector(".format-note");

    const selectFormat = selectedIndex => {
      const selected = formats[selectedIndex];
      if (!selected) return;

      formatButtons.forEach((button, buttonIndex) => {
        const active = buttonIndex === selectedIndex;
        button.classList.toggle("is-selected", active);
        button.setAttribute("aria-pressed", String(active));
      });

      // Animate the format label
nameElement.animate(
  [
    { opacity: 0, transform: "translateY(5px)" },
    { opacity: 1, transform: "translateY(0)" }
  ],
  { duration: 300, easing: "ease-out" }
);

nameElement.textContent = selected.name;

// Animate the price
priceElement.animate(
  [
    { opacity: 0, transform: "translateY(8px) scale(0.97)" },
    { opacity: 1, transform: "translateY(0) scale(1)" }
  ],
  { duration: 400, easing: "ease-out" }
);

priceElement.textContent = money(selected.price);

      if (selected.amazonUrl) {
  amazonLink.href = selected.amazonUrl;
  amazonLink.textContent = "VIEW ON AMAZON ";

  const arrow = document.createElement("span");
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "↗";
  amazonLink.appendChild(arrow);

  amazonLink.classList.remove("is-unavailable");
  amazonLink.removeAttribute("aria-disabled");
  amazonLink.target = "_blank";
  amazonLink.rel = "noopener noreferrer";

  formatNote.textContent = "";
} else {
  amazonLink.href = "#";
  amazonLink.textContent = "AMAZON LINK NOT ADDED";
  amazonLink.classList.add("is-unavailable");
  amazonLink.setAttribute("aria-disabled", "true");
  amazonLink.removeAttribute("target");
  amazonLink.removeAttribute("rel");

  
}
    };

    formatButtons.forEach((button, buttonIndex) => {
      button.addEventListener("click", () => selectFormat(buttonIndex));
    });

    // Initial display is synchronized with the selected format.
    selectFormat(formats.indexOf(initialFormat));
    return card;
  };

  bookList.replaceChildren(...bookData.map(createBook));

  const cards = [...bookList.querySelectorAll(".shelf-book-card")];
  if (reducedMotion || !("IntersectionObserver" in window)) {
    cards.forEach(card => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  cards.forEach(card => observer.observe(card));
});

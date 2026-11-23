
/* =========================================================
   ZAYEN KAIRO — INSIGHTS LISTING
   Search, topic filters, featured article and Load More.
   Requires js/insights-data.js to load before this file.
========================================================= */

(() => {
  "use strict";

  const initInsights = () => {
    const grid = document.getElementById("insights-grid");
    if (!grid) return;

    const articles = Array.isArray(window.insightsArticles)
      ? window.insightsArticles
      : [];

    const searchInput = document.getElementById("insights-search-input");
    const filters = document.getElementById("insights-filters");
    const count = document.getElementById("insights-count");
    const featured = document.getElementById("featured-insight");
    const empty = document.getElementById("insights-empty");
    const loadMore = document.getElementById("insights-load-more");
    const reset = document.getElementById("insights-reset");

    if (!searchInput || !filters || !count || !featured || !empty || !loadMore) {
      console.warn("Insights: one or more required page elements are missing.");
      return;
    }

    const PAGE_SIZE = 6;
    let activeCategory = "All";
    let visibleCount = PAGE_SIZE;

    const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);

    const safeUrl = (value) => {
      const url = String(value ?? "").trim();
      if (!url || /^(javascript|data|vbscript):/i.test(url)) return "";
      return url;
    };

    const formatDate = (value) => {
      if (!value) return "";
      const date = new Date(`${value}T12:00:00`);

      if (Number.isNaN(date.getTime())) return "";

      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      }).format(date);
    };

    const publishedArticle = (article) =>
      article.published === true && Boolean(safeUrl(article.url));

    const searchableText = (article) => [
      article.title,
      article.category,
      article.excerpt,
      article.keywords,
      article.readTime
    ].join(" ").toLowerCase();

    const getMatches = () => {
      const query = searchInput.value.trim().toLowerCase();

      return articles.filter((article) => {
        const categoryMatches =
          activeCategory === "All" || article.category === activeCategory;

        const queryMatches =
          !query || searchableText(article).includes(query);

        return categoryMatches && queryMatches;
      });
    };

    /* AUTOMATIC TOPIC FILTERS */

    const createFilters = () => {
      const categories = [...new Set(
        articles
          .map((article) => String(article.category || "").trim())
          .filter(Boolean)
      )].sort((a, b) => a.localeCompare(b));

      filters.replaceChildren();

      const allButton = document.createElement("button");
      allButton.className = "insight-filter is-active";
      allButton.type = "button";
      allButton.dataset.category = "All";
      allButton.setAttribute("aria-pressed", "true");
      allButton.textContent = "All topics";

      filters.appendChild(allButton);

      categories.forEach((category) => {
        const button = document.createElement("button");

        button.className = "insight-filter";
        button.type = "button";
        button.dataset.category = category;
        button.setAttribute("aria-pressed", "false");

        button.textContent =
          category === "Artificial Intelligence"
            ? "AI & Claude"
            : category;

        filters.appendChild(button);
      });
    };

    /* ARTICLE METADATA */

    const renderMeta = (article) => {
      const dateText = formatDate(article.date);
      const isPublished = publishedArticle(article);

      return `
        <div class="insight-meta">
          <span class="insight-category">
            ${escapeHTML(article.category || "Technology")}
          </span>

          ${dateText
            ? `<span>${escapeHTML(dateText)}</span>`
            : ""}

          ${isPublished && article.readTime
            ? `<span>${escapeHTML(article.readTime)}</span>`
            : ""}

          ${!isPublished
            ? '<span class="insight-status">IN DEVELOPMENT</span>'
            : ""}
        </div>`;
    };

    /* ARTICLE CARDS */

    const renderCard = (article, index) => {
      const isPublished = publishedArticle(article);
      const url = isPublished ? safeUrl(article.url) : "#latest-insights";
      const image = safeUrl(article.image);

      const imageAlt = escapeHTML(
        article.imageAlt || article.title || "Technology article image"
      );

      const title = escapeHTML(article.title || "Untitled article");

      const excerpt = escapeHTML(
        article.excerpt || "More details will be available soon."
      );

      return `
        <article
          class="insight-card ${isPublished ? "" : "is-coming-soon"}"
          style="--card-index:${index}"
        >

          <a
            class="insight-card-image"
            href="${escapeHTML(url)}"
            ${!isPublished ? 'aria-label="Browse latest insights"' : ""}
          >
            ${
              image
                ? `<img
                    src="${escapeHTML(image)}"
                    alt="${imageAlt}"
                    loading="lazy"
                    decoding="async"
                  >`
                : '<span class="insight-image-placeholder" aria-hidden="true"></span>'
            }
          </a>

          <div class="insight-card-body">

            ${renderMeta(article)}

            <h3>
              ${
                isPublished
                  ? `<a href="${escapeHTML(url)}">${title}</a>`
                  : title
              }
            </h3>

            <p>${excerpt}</p>

            ${
              isPublished
                ? `<a class="insight-read-link" href="${escapeHTML(url)}">
                    READ ARTICLE <span aria-hidden="true">↗</span>
                  </a>`
                : '<span class="insight-status">ARTICLE COMING SOON</span>'
            }

          </div>
        </article>`;
    };

    /* FEATURED ARTICLE */

    const renderFeatured = (matches, shouldShow) => {
      const article = matches.find(
        (item) => item.featured && publishedArticle(item)
      );

      if (!article || !shouldShow) {
        featured.hidden = true;
        featured.innerHTML = "";
        return;
      }

      const image = safeUrl(article.image);
      const url = safeUrl(article.url);

      featured.hidden = false;

      featured.innerHTML = `
        <a
          class="featured-image"
          href="${escapeHTML(url)}"
          aria-label="Read ${escapeHTML(article.title)}"
        >
          ${
            image
              ? `<img
                  src="${escapeHTML(image)}"
                  alt="${escapeHTML(article.imageAlt || article.title)}"
                  loading="lazy"
                  decoding="async"
                >`
              : '<span class="insight-image-placeholder" aria-hidden="true"></span>'
          }
        </a>

        <div class="featured-copy">

          <p class="eyebrow">EDITOR'S PICK</p>

          ${renderMeta(article)}

          <h3>${escapeHTML(article.title)}</h3>

          <p>${escapeHTML(article.excerpt || "")}</p>

          <a class="insight-read-link" href="${escapeHTML(url)}">
            READ THE FEATURE <span aria-hidden="true">↗</span>
          </a>

        </div>`;
    };

    /* RENDER ARTICLES */

    const render = () => {
      const matches = getMatches();

      const hasActiveSearch = Boolean(searchInput.value.trim());

      const isDefaultView =
        activeCategory === "All" && !hasActiveSearch;

      const visibleArticles = matches.slice(0, visibleCount);

      renderFeatured(matches, isDefaultView);

      grid.innerHTML = visibleArticles
        .map(renderCard)
        .join("");

      count.textContent =
        `${matches.length} ${matches.length === 1 ? "article" : "articles"} and guides`;

      empty.hidden = matches.length > 0;
      grid.hidden = matches.length === 0;
      loadMore.hidden = matches.length <= visibleCount;

      if (matches.length === 0) {
        featured.hidden = true;
      }
    };

    /* FILTER BUTTON EVENTS */

    filters.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-category]");

      if (!button || !filters.contains(button)) return;

      activeCategory = button.dataset.category || "All";

      filters.querySelectorAll("button[data-category]").forEach(
        (filterButton) => {
          const selected = filterButton === button;

          filterButton.classList.toggle("is-active", selected);

          filterButton.setAttribute(
            "aria-pressed",
            String(selected)
          );
        }
      );

      visibleCount = PAGE_SIZE;
      render();
    });

    /* SEARCH */

    searchInput.addEventListener("input", () => {
      visibleCount = PAGE_SIZE;
      render();
    });

    /* LOAD MORE */

    loadMore.addEventListener("click", () => {
      visibleCount += PAGE_SIZE;
      render();
    });

    /* RESET SEARCH AND FILTERS */

    if (reset) {
      reset.addEventListener("click", () => {
        searchInput.value = "";
        activeCategory = "All";
        visibleCount = PAGE_SIZE;

        filters.querySelectorAll("button[data-category]").forEach(
          (button) => {
            const selected = button.dataset.category === "All";

            button.classList.toggle("is-active", selected);

            button.setAttribute(
              "aria-pressed",
              String(selected)
            );
          }
        );

        render();
        searchInput.focus();
      });
    }

    /* EMPTY ARTICLE COLLECTION */

    if (articles.length === 0) {
      count.textContent = "No articles published yet";

      featured.hidden = true;
      grid.hidden = true;
      empty.hidden = false;
      loadMore.hidden = true;

      return;
    }

    createFilters();
    render();

    /* HERO REVEAL ANIMATION */

    const revealItems = document.querySelectorAll(
      ".insights-page .reveal"
    );

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reduceMotion) {
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              currentObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -30px 0px"
        }
      );

      revealItems.forEach((item) => observer.observe(item));

    } else {
      revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initInsights,
      { once: true }
    );
  } else {
    initInsights();
  }
})();

(() => {
  const lang = new URLSearchParams(window.location.search).get("lang");
  if (!["ru", "tr", "en", "ua"].includes(lang)) return;

  window.addEventListener("load", () => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      const button = [...document.querySelectorAll(".langs button")].find(
        (item) => item.textContent.trim().toLowerCase() === lang
      );
      if (button) button.click();
      attempts += 1;
      if (document.documentElement.lang === lang || attempts >= 30) {
        window.clearInterval(timer);
      }
    }, 200);
  });
})();

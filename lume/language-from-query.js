(() => {
  const lang = new URLSearchParams(window.location.search).get("lang");
  if (!["ru", "tr", "en", "ua"].includes(lang)) return;

  window.addEventListener("load", () => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      const select = [...document.querySelectorAll("select")].find((item) =>
        [...item.options].some((option) => option.value === "en") &&
        [...item.options].some((option) => option.value === "ru")
      );
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      }
      attempts += 1;
      if (document.documentElement.lang === lang || attempts >= 30) {
        window.clearInterval(timer);
      }
    }, 200);
  });
})();

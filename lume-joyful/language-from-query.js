(() => {
  const lang = new URLSearchParams(window.location.search).get("lang");
  if (!["ru", "tr", "en", "ua"].includes(lang)) return;

  window.addEventListener("load", () => {
    window.setTimeout(() => {
      const select = [...document.querySelectorAll("select")].find((item) =>
        [...item.options].some((option) => option.value === "en") &&
        [...item.options].some((option) => option.value === "ru")
      );
      if (!select) return;
      select.value = lang;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }, 250);
  });
})();

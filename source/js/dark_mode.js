(() => {
  const rootElement = document.documentElement;
  const darkModeStorageKey = "user-color-scheme";
  const darkModeMediaQueryKey = "--color-mode";
  const rootElementDarkModeAttributeName = "data-user-color-scheme";
  const darkModeToggleBottonElement = document.getElementById(
    "dark-mode-switch"
  );

  const setLS = (k, v) => {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  };

  const removeLS = (k) => {
    try {
      localStorage.removeItem(k);
    } catch (e) {}
  };

  const getLS = (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  };

  const getModeFromCSSMediaQuery = () => {
    var res;
    if (document.body.classList.contains("dark-mode")) {
      res = "dark";
    } else {
      res = "light";
    }
    if (res.length) return res.replace(/\"/g, "").trim();
    return res === "dark" ? "dark" : "light";
  };

  const resetRootDarkModeAttributeAndLS = (mode) => {
    rootElement.removeAttribute(rootElementDarkModeAttributeName);
    if (mode === "light") {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    }
    removeLS(darkModeStorageKey);
  };

  const validColorModeKeys = {
    dark: true,
    light: true,
  };

  const applyCustomDarkModeSettings = (mode) => {
    const currentSetting = mode || getLS(darkModeStorageKey);

    if (currentSetting === getModeFromCSSMediaQuery()) {
      resetRootDarkModeAttributeAndLS(currentSetting);
    } else if (validColorModeKeys[currentSetting]) {
      rootElement.setAttribute(
        rootElementDarkModeAttributeName,
        currentSetting
      );
      if (currentSetting === "light") {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
      } else {
        document.body.classList.remove("light-mode");
        document.body.classList.add("dark-mode");
      }
    } else {
      resetRootDarkModeAttributeAndLS(currentSetting);
    }
  };

  const invertDarkModeObj = {
    dark: "light",
    light: "dark",
  };

  const toggleCustomDarkMode = () => {
    let currentSetting = getLS(darkModeStorageKey);

    if (validColorModeKeys[currentSetting]) {
      currentSetting = invertDarkModeObj[currentSetting];
    } else if (currentSetting === null) {
      currentSetting = invertDarkModeObj[getModeFromCSSMediaQuery()];
    } else {
      return;
    }
    setLS(darkModeStorageKey, currentSetting);

    return currentSetting;
  };

  applyCustomDarkModeSettings();

  darkModeToggleBottonElement.addEventListener("click", () => {
    applyCustomDarkModeSettings(toggleCustomDarkMode());
  });
})();

const moonToggle = document.querySelector(".moon-icon");
const sunToggle = document.querySelector(".sun-icon");
const html = document.documentElement;

// Transision theme
function applyTheme(theme) {
  // check is browser support this feature
  if (!document.startViewTransition) {
    // if not , change theme without animation
    updateUI(theme);
    return;
  }

  // if yes, change with animation
  document.startViewTransition(() => {
    updateUI(theme);
  });
}

// Apply dark mode to UI
function updateUI(theme) {
  html.setAttribute("data-theme", theme);
  // set UI icon
  if (theme === "dark") {
    // dark theme
    moonToggle.style.display = "none";
    sunToggle.style.display = "block";
  } else {
    // light theme
    sunToggle.style.display = "none";
    moonToggle.style.display = "block";
  }
  // set preferences to localstorage: prevent default when refresh
  localStorage.setItem("selected-theme", theme);
}

// set theme when user visit website for the frist time
const saveTheme = localStorage.getItem("selected-theme");
const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

if (saveTheme) {
  applyTheme(saveTheme);
} else if (systemSettingDark.matches) {
  applyTheme("dark");
} else {
  applyTheme("light");
}

// sensor theme detector
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
mediaQuery.addEventListener("change", (event) => {
  const currentSaveTheme = localStorage.getItem("selected-theme");

  // Jika user belum pernah memilih manual, ikuti perubahan sistem
  if (!currentSaveTheme) {
    const newTheme = event.matches ? "dark" : "light";
    applyTheme(newTheme);
  }
});

// evenListener for moon and sun
sunToggle.addEventListener("click", () => applyTheme("light"));
moonToggle.addEventListener("click", () => applyTheme("dark"));

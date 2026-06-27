type ThemeChoice = "system" | "light" | "dark";

const storageKey = "blue-wisent-theme";
const media = window.matchMedia("(prefers-color-scheme: dark)");

function getStoredTheme(): ThemeChoice {
  const stored = window.localStorage.getItem(storageKey);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
}

function getResolvedTheme(choice: ThemeChoice) {
  return choice === "system" ? (media.matches ? "dark" : "light") : choice;
}

function applyTheme(choice: ThemeChoice) {
  document.documentElement.dataset.themeChoice = choice;
  document.documentElement.dataset.theme = getResolvedTheme(choice);

  for (const select of document.querySelectorAll<HTMLSelectElement>("[data-theme-select]")) {
    select.value = choice;
  }
}

function setupThemeSelect() {
  applyTheme(getStoredTheme());

  for (const select of document.querySelectorAll<HTMLSelectElement>("[data-theme-select]")) {
    select.addEventListener("change", () => {
      const choice = select.value as ThemeChoice;
      window.localStorage.setItem(storageKey, choice);
      applyTheme(choice);
    });
  }

  media.addEventListener("change", () => {
    if (getStoredTheme() === "system") {
      applyTheme("system");
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupThemeSelect);
} else {
  setupThemeSelect();
}

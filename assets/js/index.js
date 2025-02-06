const toggleModeButton = document.querySelector('[data-button="toggle_mode"]');
const body = document.querySelector("body");

function getLocalStorage(item) {
    return localStorage.getItem(item);
}

function setLocalStorage(item, value) {
    return localStorage.setItem(item, value);
}

const handleTheme = (e) => {
    const toggleModeButton = e.target.closest('[data-button="toggle_mode"]');
    if (toggleModeButton) {
        const currentTheme = body.classList.contains("light") ? "light" : "dark";

        if (currentTheme === "light") {
            updateTheme("dark");
            updateIcon("dark");
        } else {
            updateTheme("light");
            updateIcon("light");
        }
    }
};

function updateTheme(mode) {
    body.classList.remove("light", "dark");
    body.classList.add(mode);
    setLocalStorage("theme", mode);
}

function updateIcon(mode) {
    const icon = toggleModeButton.querySelector("i");
    if (mode === "dark") {
        icon.classList.replace("icon_moon-solid", "icon_sun-solid");
    } else {
        icon.classList.replace("icon_sun-solid", "icon_moon-solid");
    }
}

function getSystemTheme() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
}

function initializeTheme() {
    const savedTheme = getLocalStorage("theme");
    if (savedTheme) {
        updateTheme(savedTheme);
        updateIcon(savedTheme);
    } else {
        const systemTheme = getSystemTheme();
        if (systemTheme === 'light') {
            updateTheme('light');
            updateIcon('light');
        }
    }
}

function handleSystemThemeChange(event) {
    const systemTheme = event.matches ? 'dark' : 'light';
    if (systemTheme === 'light') {
        updateTheme('light');
        updateIcon('light');
    }
}

initializeTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleSystemThemeChange);


document.addEventListener('click', function (e) {
    handleTheme(e);
});
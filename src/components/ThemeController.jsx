import { useTheme } from "../contexts/ThemeProvider.jsx";
import { LuSunMedium } from "react-icons/lu";
import { BsMoon } from "react-icons/bs";

function ThemeController() {
    const { theme, setTheme } = useTheme('light');
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-blue-200/70 bg-white/80 text-blue-600 transition hover:bg-blue-50 dark:border-blue-300/20 dark:bg-slate-800 dark:text-amber-300 dark:hover:bg-slate-700"
            onClick={() => {
                setTheme(isDark ? "light" : "dark");
            }}
        >
            {isDark ? (
                <LuSunMedium className="w-5 h-5" />
            ) : (
                <BsMoon className="w-5 h-5" />
            )}
        </button>
    );
}

export default ThemeController;

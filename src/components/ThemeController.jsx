import { useTheme } from "../contexts/ThemeProvider.jsx";
import { LuSunMedium } from "react-icons/lu";
import { BsMoon } from "react-icons/bs";
function ThemeController() {
    const { theme, setTheme } = useTheme('light');

    return (
        <>
            <label className="swap swap-rotate w-5 h-5   ">
                {/* this hidden checkbox controls the state */}
                <input
                    type="checkbox"
                    className="theme-controller border-none"
                    value={theme}
                    onChange={() => {
                        setTheme(theme == "dark" ? "light" : "dark");
                    }}
                />

                {/* sun icon */}
                <LuSunMedium className="swap-on fill-current w-6 h-6 text-sky-500"/>


                {/* moon icon */}
                <BsMoon className="swap-off fill-current w-6 h-6 text-orange-400"/>

            </label>
        </>
    );
}

export default ThemeController;

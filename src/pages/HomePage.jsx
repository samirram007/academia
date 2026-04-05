import { CiUser } from "react-icons/ci";
import { NavLink } from "react-router";

const HomePage = () => {
    return (
        <section
            className="relative min-h-screen w-full overflow-hidden text-white"
            style={{ background: 'linear-gradient(135deg, #061227 0%, #0b2b5a 50%, #061227 100%)' }}
        >
            <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
                <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-10 lg:w-3/5 lg:px-14">
                    <p className="mb-4 inline-flex w-fit items-center rounded-full border border-blue-300/30 bg-blue-400/10 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-blue-100">
                        ACADEMIA ERP
                    </p>

                    <h1 className="max-w-2xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        School operations,
                        <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                            unified in one workspace.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        Manage admissions, attendance, fees, examinations, and reporting from a clean and reliable dashboard built for daily school workflows.
                    </p>

                    <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                            <div className="text-2xl font-extrabold text-cyan-200">5000+</div>
                            <div className="text-xs text-slate-300">Students</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                            <div className="text-2xl font-extrabold text-blue-200">500+</div>
                            <div className="text-xs text-slate-300">Teachers</div>
                        </div>
                        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3">
                            <div className="text-2xl font-extrabold text-indigo-200">100+</div>
                            <div className="text-xs text-slate-300">Classes</div>
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center px-6 pb-12 pt-2 sm:px-10 lg:w-2/5 lg:px-8 lg:pb-0">
                    <div className="w-full max-w-md rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl sm:p-8">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                            <CiUser className="text-5xl text-white" />
                        </div>

                        <h2 className="text-center text-2xl font-bold text-white">
                            Welcome to Academia
                        </h2>
                        <p className="mt-2 text-center text-sm text-slate-200">
                            Continue to your secure school management portal.
                        </p>

                        <NavLink
                            to="/login"
                            className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-base font-bold text-white transition hover:-translate-y-0.5 hover:from-blue-500 hover:to-indigo-500"
                        >
                            Go to Login
                        </NavLink>

                        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-center text-xs text-slate-300">
                            Trusted by schools for daily operations, fast reporting, and fee collection workflows.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomePage
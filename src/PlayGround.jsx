import { Suspense } from "react";
import { useAuth } from "./contexts";
import { AuthLayout, GuestLayout } from "./layouts";

import AuthRouter from "./Routes/AuthRouter";
import GuestRouter from "./Routes/GuestRouter";
import Loader from "./components/Loader";

const PlayGround = () => {
    const { isGuest } = useAuth();


    return isGuest ?
        <Suspense fallback={<Loader />}>
            <GuestLayout>
                <GuestRouter />
            </GuestLayout>
        </Suspense>
        : <Suspense fallback={<Loader />}>
            <AuthLayout>
                <AuthRouter />
            </AuthLayout>
        </Suspense>
}

export default PlayGround
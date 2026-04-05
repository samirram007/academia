import { useAuth } from "./contexts";
import { AuthLayout, GuestLayout } from "./layouts";

import AuthRouter from "./Routes/AuthRouter";
import GuestRouter from "./Routes/GuestRouter";

const PlayGround = () => {
    const { isGuest } = useAuth();


    return isGuest ?
        <GuestLayout>
            <GuestRouter />
        </GuestLayout>
        :
            <AuthLayout>
                <AuthRouter />
        </AuthLayout>
}

export default PlayGround
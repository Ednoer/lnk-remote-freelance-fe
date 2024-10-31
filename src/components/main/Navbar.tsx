import { FC, useEffect, useState } from "react";
import Drawer from "./Drawer";
import sessions from "@/helpers/sessions";
import utils from "@/helpers/utils";
import { Avatar } from "..";
import { LoginResponse } from "@/layouts/auth/interface";
import { useRouter } from "next/router";
import useStoreGlobal from "@/stores/global";
import { useMutation } from "react-query";
import api from "@/layouts/auth/api";

interface INavBar {
    title?: string
}

const Navbar: FC<INavBar> = ({ title }) => {
    const router = useRouter()
    const [profile, setProfile] = useState<any>()

    const setGlobalProfile = useStoreGlobal(s => s.setProfile)

    useEffect(() => {
        const sessionData = sessions.getToken()
        const token_ = utils.parseJwt(sessionData || '');
        setProfile(token_)
        setGlobalProfile(token_)
    }, [])

    const { isLoading, mutate } = useMutation(
        () => api.logout()
    )

    const handleLogout = () => {
        mutate()
        sessions.logout()
    };

    return (
        <div className="p-2">
            <div className="navbar navbar-sticky">
                <div className="navbar-start">
                    <a className="navbar-item">
                        <Drawer />
                    </a>
                    <div className="font-semibold text-2xl whitespace-nowrap">
                        {title}
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="avatar avatar-ring avatar-md">
                        <div className="dropdown-container">
                            <div className="dropdown">
                                <label className="btn btn-ghost flex cursor-pointer px-0" tabIndex={0}>
                                    <Avatar name={profile?.username || ''} imageUrl={profile?.photo || ''} size={12} />
                                </label>
                                <div className="dropdown-menu dropdown-menu-bottom-left">
                                    <div className="dropdown-item text-sm" onClick={handleLogout}>Logout</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
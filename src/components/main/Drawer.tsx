import sessions from "@/helpers/sessions";
import api from "@/layouts/auth/api";
import useStoreGlobal from "@/stores/global";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useMutation } from "react-query";


const adminMenus = [
    {
        path: '/',
        label: 'Big Calendar'
    },
]

interface IDrawer { }

const Drawer: FC<IDrawer> = ({ }) => {
    const router = useRouter()
    const { asPath } = router
    const [menus, setMenus] = useState<any[]>([])

    const profileGlobal = useStoreGlobal(s => s.profile);
    
    const currenPath = asPath.split('/');

    const handlePath = (path: string) => {
        router.push(path)
    }

    const { isLoading, mutate } = useMutation(
        () => api.logout()
      )

    const handleLogout = () => {
        mutate()
        sessions.logout()
    };

    useEffect(() => {
        setMenus(adminMenus)
    }, [profileGlobal])

    return (
        <>
            <input type="checkbox" id="drawer-left" className="drawer-toggle" />
            <label htmlFor="drawer-left">
                <i className="fa fa-bars" aria-hidden="true" />
            </label>
            <label className="overlay" htmlFor="drawer-left" />
            <div className="drawer bg-gray-2">
                <div className="drawer-content pt-5 flex flex-col h-full">
                    <div className="flex flex-row items-center justify-between">
                        <div className="ml-4">
                            <i className="fa fa-child fa-2x" aria-hidden="true" />
                        </div>
                        <div>
                            <label htmlFor="drawer-left" className="btn btn-sm btn-circle btn-ghost">✕</label>
                        </div>
                    </div>
                    <div className="h-full">
                        <nav className="menu bg-gray-2 rounded-md flex flex-col items-between h-full justify-between">
                            <section className="menu-section">
                                <ul className="menu-items mt-4">
                                    {
                                        menus.map((item, index) =>
                                            <li
                                                key={index}
                                                className={`menu-item ${item.path.split('/')[1] === currenPath[1] && 'menu-active'}`}
                                                onClick={() => handlePath(item.path)}
                                            >
                                                {item.label}
                                            </li>)
                                    }
                                </ul>
                            </section>
                            <div>
                                <ul className="menu-items mt-4">
                                    <li
                                        className={`menu-item`}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawer;
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

export function Navbar() {

    const { logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <nav className="flex justify-around items-center fixed inset-x-0 top-0 z-50 h-16 bg-[#f5f3ee] border-b border-gray-400">
            <h1 className="font-geis text-lg font-semibold">taskflow<span className="text-lime-500 text-3xl">.</span></h1>
            <button className="font-mono border border-gray-400 py-1 px-2 cursor-pointer hover:bg-white transition-all duration-300 ease-in-out hover:-translate-y-1" onClick={handleLogout}>
                Log out
            </button>
        </nav>
    )
}
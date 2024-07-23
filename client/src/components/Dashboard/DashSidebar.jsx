import { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { BiSolidUser } from "react-icons/bi";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { signOut } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [tab, setTab] = useState('')

    const signOutHandler = (e) => {
        e.preventDefault();
        dispatch(signOut());
        navigate('/sign-in');
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab')
        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])
    return (
        <Sidebar className="w-full md:w-56">
            <SidebarItems>
                <SidebarItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item active={tab === 'profile'} icon={BiSolidUser} label={'User'} labelColor={'green'} >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={FaArrowRightFromBracket} className={'cursor-pointer'} onClick={signOutHandler}>
                        Sign Out
                    </Sidebar.Item>
                </SidebarItemGroup>
            </SidebarItems>

        </Sidebar>
    )
}

export default DashSidebar
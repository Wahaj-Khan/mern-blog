import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react"
import { BiSolidUser } from "react-icons/bi";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const DashSidebar = () => {
    const location = useLocation()
    const [tab, setTab] = useState('')
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
                    <Sidebar.Item icon={FaArrowRightFromBracket} className={'cursor-pointer'}>
                        Sign Out
                    </Sidebar.Item>
                </SidebarItemGroup>
            </SidebarItems>

        </Sidebar>
    )
}

export default DashSidebar
import { Button, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
const Header = () => {
    const path = useLocation().pathname
    return (
        <Navbar className="border-b-2 p-4 w-full">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white">
                <span className="px-2 py-1 rounded-lg text-white bg-gradient-to-r from-purple-500 to-blue-500">
                    Wahaj&apos;s
                </span>
                Blog
            </Link>
            <form>
                <TextInput className="hidden lg:inline"
                    type="text"
                    placeholder="Search..."
                    rightIcon={AiOutlineSearch}
                />
            </form>
            <Button className="w-12 h-10 items-center lg:hidden" color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 items-center hidden sm:inline" color='gray' pill>
                    <FaMoon/>
                </Button>
                <Link to="/sign-in">
                    <Button className="items-center" gradientDuoTone='purpleToBlue' outline>
                        Sign In
                    </Button>
                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link className="text-base" to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link className="text-base" to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/projects'} as={'div'}>
                    <Link className="text-base" to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
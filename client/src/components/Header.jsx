import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react"
import { Link, useLocation } from "react-router-dom"
import { AiOutlineSearch } from "react-icons/ai"
import { FaMoon } from "react-icons/fa"
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useSelector } from "react-redux"

const Header = () => {
    const { currentUser } = useSelector(state => state.user)
    const path = useLocation().pathname
    return (
        <Navbar className="border-b-2 p-4 w-full">
            <Link to="/" className="ml-6 self-center whitespace-nowrap text-sm sm:text-lg font-semibold dark:text-white">
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
            <div className="flex mr-6 gap-4 md:order-2">
                <Button className="w-14 h-12 items-center hidden sm:inline" color='gray' pill>
                    <FaMoon size={16} />
                </Button>

                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                size='md'
                                rounded
                                alt="user"
                                img={currentUser.profilePicture}
                            />
                        }
                    >
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item className="flex items-center font-bold text-base">
                                <Avatar
                                    size='sm'
                                    rounded
                                    alt="user"
                                    img={currentUser.profilePicture}
                                />
                                <span className="ml-2">{currentUser.username}</span>
                            </Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Link to="#">
                            <Dropdown.Item className="font-medium text-base">
                                <FaArrowRightFromBracket className="mr-4 w-5 h-5"/>
                                Sign out
                            </Dropdown.Item>
                        </Link>

                    </Dropdown>
                ) : (
                    <Link to="/sign-in">
                        <Button className="items-center" gradientDuoTone='purpleToBlue' outline>
                            Sign In
                        </Button>
                    </Link>

                )
                }
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
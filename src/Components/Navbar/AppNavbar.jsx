import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Switch from "../Switch/Switch";


export default function AppNavbar() {
  const{ token, signOut , UserData} = useContext(authContext);
  const navigate = useNavigate();

  return (
<Navbar className="fixed w-full top-0 start-0 end-0 bg-blue-200 shadow-lg z-30"> 
      <NavbarBrand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold text-sky-600 dark:text-white">{token? "Social App" : "Log in First"}</span>
      </NavbarBrand>

      <div className="flex md:order-2 ms-auto">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt={UserData?.name}  img={UserData?.photo}  rounded /> 
          }
        >
          <DropdownHeader>
            <span className="block text-sm">{UserData?.name}</span>
            <span className="block truncate text-sm font-medium">{UserData?.email}</span>
          </DropdownHeader>
          {!token && <DropdownItem as={Link} to="/login"><span className='block size-full transition-none me-auto text-gray-400 hover:text-sky-700 dark:hover:text-white'>Login</span></DropdownItem>}
          {!token && <DropdownItem as={Link} to="/register" ><span className='block size-full transition-none me-auto text-gray-400 hover:text-sky-700 dark:hover:text-white'>Register</span></DropdownItem>}
          {token && <DropdownItem as={Link} to="/profile" ><span className='block size-full transition-none me-auto text-gray-400 hover:text-sky-700 dark:hover:text-white'>Profile</span></DropdownItem>}
          
          {token &&  <DropdownDivider/> &&<DropdownItem as="button" 
          onClick={()=>{signOut(); navigate("/login");}}
          >
            <span className='block size-full transition-none text-gray-400 hover:text-sky-700 dark:hover:text-white'>Sign Out</span>
          </DropdownItem> }
          
        </Dropdown>
        {token && <NavbarToggle className="ms-2" />}
      </div>
      {token && <NavbarCollapse className="ms-auto">
        <NavLink  as={NavLink} to="/" className={({isActive}) => isActive? `text-sky-600  dark:text-white ` : 'text-gray-400'} >Home</NavLink>
        <NavLink  as={NavLink} to="/profile" className={({isActive}) => isActive? `text-sky-600  dark:text-white` : 'text-gray-400'} >Profile</NavLink>
        <Switch className="md:ms-auto me-auto md:pt-0 pt-5" />

      </NavbarCollapse>}
    </Navbar>
  );
}

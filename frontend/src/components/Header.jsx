import { useNavigate } from 'react-router-dom'
import {Badge,Navbar,Nav,Container,NavbarBrand,NavbarCollapse, NavDropdown} from 'react-bootstrap'
import {FaShoppingCart,FaUser} from 'react-icons/fa'
import {LinkContainer} from "react-router-bootstrap"
import logo from "../assets/logo.png"
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useSelector,useDispatch } from 'react-redux'

const Header = () => {
 const {cartItems}=useSelector((state)=>state.cart)
 const {userInfo}=useSelector((state)=>state.auth)
 const dispatch=useDispatch()
 const navigate=useNavigate()
 const [logoutApiCall]=useLogoutMutation()

const logoutHandler=async ()=>{
 try {
    await logoutApiCall().unwrap()
    dispatch(logout())     //dispatch the logout action which is logout for clearing the local storage 
     navigate("/login")
  } catch (err) {
   console.log(err)
 }
}

  return (
    <header>
      <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <NavbarBrand >
              <img src={logo} alt="MayoufTech" />
              MAYOUFTECH</NavbarBrand>
              </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <NavbarCollapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                    <LinkContainer to="/cart">
                        <Nav.Link>
                          <FaShoppingCart />Cart
                          {cartItems.length>0&&(
                            <Badge pill bg="success" style={{marginLeft:"5px"}}>
                                {cartItems.reduce((a,c)=>a+c.qty,0)}
                            </Badge>
                          )}
                          </Nav.Link>
                          </LinkContainer>
                          {userInfo ?(
                            <NavDropdown title={userInfo.name} id="username">
                              <LinkContainer to="/profile">
                              <NavDropdown.Item>Profile</NavDropdown.Item>  
                              </LinkContainer>
                              <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                              </NavDropdown.Item>
                            </NavDropdown>
                          ):(<LinkContainer to="/login">
                        <Nav.Link href='/login'>
                        <FaUser />Sign In
                        </Nav.Link>
                        </LinkContainer>)}
                          
                    </Nav>
                  </NavbarCollapse>
        </Container>
      </Navbar>
    </header>
   )
}

export default Header
import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, 
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { LoginContext } from '../context/ContextProvider';
import { confirmAlert } from 'react-confirm-alert';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchVal, setSearchVal] = useState('')

    const toggle = () => setIsOpen(!isOpen);
    const account = useContext(LoginContext)

    const history = useHistory();
    const { oktaAuth, authState } = useOktaAuth();

    if (!authState) return null;

    const login = async () => history.push('/login');

    const logout = async () => oktaAuth.signOut();

    const button = authState.isAuthenticated ?
        <button onClick={logout} className='btn'>Logout</button> :
        <button onClick={login} className='btn'>Login</button>;

    const getAccessReq = () => {
        confirmAlert({
            title: 'Access to write blogs',
            message: `We are sorry, but currently we arent accepting any
                    requests as there are many improvements to be done. 
                    We will release access links soon. Thanks for coming till here, 
                    please go through entire website and give me your valuable suggestions`,
            buttons: [
                {
                    label: 'Close',
                    onClick: () => console.log('Thank you')
                },
                {
                    label: 'Ok',
                    onClick: () => console.log('Nice')
                }
            ]
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        history.push(`/search?val=${searchVal}`)
    }

    return (
        <div>
            <Navbar color="" fixed='top' dark expand="md" className='px-4'>
                <NavbarBrand href="/">SS'Blogs</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink href="/" className='active'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        {   authState.isAuthenticated ? 
                            <NavLink className='active' href="/blogs/new">
                                Add post
                            </NavLink>
                            : <NavLink className='active' className='btn text-white' onClick={getAccessReq}>
                                Get Access Request
                            </NavLink> 
                            }
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='active'>
                            {account && account.account ? `Hi ${account.account}` : 'Options'}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                {button}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                About
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <form onSubmit={(e) => handleSubmit(e)} className='d-flex'>
                    <input type="text" className='form-control' value={searchVal} 
                        onChange={(e) => setSearchVal(e.target.value) }/>
                    <button type='submit' className='ms-2 btn btn-outline-success'>
                        Search
                    </button>
                </form>
                </Collapse>
            </Navbar>
        </div>
    )
}

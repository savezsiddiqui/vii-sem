import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const BottomNav = ({ setIndex, setLocal }) => {
    return (
        <Navbar className='fixed-bottom justify-content-center shadow' variant='dark'>
            <Nav style={{ overflowX: 'scroll' }}>
                {days.map((item, i) =>
                    <Nav.Link onClick={() => { setIndex(i) }} key={i}>{item}</Nav.Link>
                )}
                <Nav.Link onClick={() => {
                    localStorage.removeItem('time-table');
                    setLocal(null);
                }}>RESET</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default BottomNav;

import { Badge, Button, Col, Form, InputGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import React from 'react';
import { useRouter } from 'next/router';
import { PersonCircle, Search } from 'react-bootstrap-icons';
import styles from '../../styles/Home.module.css';


const TopHeader = () => {
    

	

	const router = useRouter();

	
	
	return (
		<>
			<Row className='mt-3'>
				<Col xs={6} md={4}>
                <h3 className={styles.logoHeading} onClick={() => router.push('/')}>
						Compra Facil
					</h3>
				</Col>
				<Col xs={6} md={4}>
                <InputGroup>
						<InputGroup.Text id='search'>
							<Search />
						</InputGroup.Text>
						<Form.Control
							aria-label='search'
							placeholder='Search the product here...'
						/>
						<Button
							variant='outline-secondary'
							id='button-addon2'
						>
							Search
						</Button>
					</InputGroup>
				</Col>
				<Col xs={6} md={4}>
					<PersonCircle
						height='40'
						width='40'
						color='#4c575f'
						className={styles.personIcon}
					/>
				</Col>
			</Row>
			<Navbar
				collapseOnSelect
				expand='lg'
				bg='light'
				variant='light'
				color='#4c575f'
			>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='me-auto'>
					    <Nav.Link onClick={() => router.push('/')}>Home</Nav.Link>
                        <NavDropdown title='Products' id='collasible-nav-dropdown'>
                        <NavDropdown.Item>Computer</NavDropdown.Item>
							<NavDropdown.Item>Mobile</NavDropdown.Item>
							<NavDropdown.Item >All</NavDropdown.Item>
						</NavDropdown>
                    </Nav>
                    <Nav>
					<Nav.Link className={styles.cartItems}> 
                        Items: <Badge bg='secondary'></Badge> (₹123)
					</Nav.Link>
						
					</Nav>	
				</Navbar.Collapse>
			</Navbar>
			
		</>
	);
};

export default TopHeader;
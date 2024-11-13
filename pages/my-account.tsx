/* eslint-disable @typescript-eslint/no-unused-vars */
import Router from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { useToasts } from 'react-toast-notifications';
import AccountDetails from '../components/MyAccount/AccountDetails';
import AllOrders from '../components/MyAccount/AllOrders';
import { Context } from '../context';
import { User } from '../services/user.service';

const MyAccount = () => {
	

	return (
		<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
			<Row>
				<Col sm={3}>
					<Nav variant='pills' className='flex-column'>
						<Nav.Item>
							<Nav.Link eventKey='first' href='#'>
								Account Details
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='second' href='#'>
								All Orders
							</Nav.Link>
						</Nav.Item>
						{/* <Nav.Item>
							<Nav.Link eventKey='third' href='#'>
								Support tickets
							</Nav.Link>
						</Nav.Item> */}
						<Nav.Item>
							<Nav.Link eventKey='third' href='#' onClick={logoutHandler}>
								Logout
							</Nav.Link>
						</Nav.Item>
					</Nav>
				</Col>
				<Col sm={9}>
					<Tab.Content>
						<Tab.Pane eventKey='first'>
							<AccountDetails
								user={user}
								dispatch={dispatch}
								addToast={addToast}
							/>
						</Tab.Pane>
						<Tab.Pane eventKey='second'>
							<AllOrders />
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MyAccount;
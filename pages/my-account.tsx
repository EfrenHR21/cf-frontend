/* eslint-disable @typescript-eslint/no-unused-vars */
import AccountDetails from '@/components/MyAccount/AccountDetails';
import AllOrders from '@/components/MyAccount/AllOrders';
import { Context } from '@/context';
import { User } from '@/services/User.service';
import Router, { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { Col, Row, Nav, Tab } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';

const MyAccount = () => {
	const { addToast } = useToasts();
	const {
		state: { user },
		dispatch,
	} = useContext(Context);

	const router = useRouter();
	useEffect(() => {
		if (!user) {
			router.push('/auth');
		}
	}, [user, router]);
	
	const logoutHandler = async (e: any) => {
		e.preventDefault();
		try {
			dispatch({ type: 'LOGOUT', payload: null });
			await User.logoutUser();
			localStorage.removeItem('_digi_user');
			addToast('Logout Successful', { appearance: 'success' });
		} catch (error: any) {
			addToast(error.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	};

	return (
		<Tab.Container id='left-tabs-example' defaultActiveKey='first'>
			<Row>
				<Col sm={3}>
					<Nav variant='pills' className='flex-column'>
						<Nav.Item>
							<Nav.Link eventKey='first'>
								Account Details
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='second' href='#'>All Orders</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey='third' href='#' onClick={(e) => logoutHandler(e)}>
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
							<h1>All Orders</h1>
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
};

export default MyAccount;
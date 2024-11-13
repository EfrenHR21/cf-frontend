
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterLogin from '@/components/Auth/RegisterLogin';




const Auth = () => {
	return (
			<Row>
				<Col m={6} className='mt-3'>
                    <RegisterLogin />
                </Col>
                <Col m={6} className='mt-3'>
                    <RegisterLogin isRegisterForm={true} />
                </Col>
			</Row>
	);
};



export default Auth;
import React, { useEffect, useState } from 'react';
import insec from './pubic/insec.png';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useFetch } from './Api/Api';

const App = () => {
	const {
		resp,
		deal,
		mailResp,
		serchResult,
		allDeals,
		updateMailResp,
		logninUser,
		registerUser,
		createDeal,
		addNewDeal,
		changeDealCreatedState,
		sendMail,
		changeMailState,
		searchDealsByBusinessName,
		getAllDeals,
		updateBusinessEmail
	} = useFetch();


	const [registerFormData, setRegisterFormData] = useState({
		bus_name: "",
		name: "",
		email: "",
		password: "",
	});

	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});

	const [isNewDeal, setNewDealState] = useState(false)
	const [dealFormData, setDealFormData] = useState({
		pro_name: '',
		pro_desc: '',
		price: 0,
	});


	const cleanDealForm = () => {
		setDealFormData({
			pro_name: "",
			pro_desc: "",
			price: 0.0
		})
	}

	const [emailFormData, setEmailFormData] = useState({
		from: '',
		to: '',
		subject: '',
		body: '',
	});

	const [searchFormData, setSearchFormData] = useState({
		search: ''
	})

	//update email
	const [updateEmail, setUpdateEmail] = useState({
		bus_id: 0,
		email: ""
	})

	const handleRegisterChange = (e) => {
		setRegisterFormData({
			...registerFormData,
			[e.target.name]: e.target.value,
		});

	};

	const handleLoginChange = (e) => {
		setLoginFormData({
			...loginFormData,
			[e.target.name]: e.target.value,
		});
	};

	const handleDealChange = (e) => {
		setDealFormData({
			...dealFormData,
			[e.target.name]: e.target.value,
		});
	};

	const handleEmailChange = (e) => {
		setEmailFormData({
			...emailFormData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSearchChange = (e) => {
		setSearchFormData({
			...searchFormData,
			[e.target.name]: e.target.value
		})
	}

	// update business email 
	const handleUpdateBusinessEmailChange = (e) => {
		setUpdateEmail({
			...updateEmail,
			[e.target.name]: e.target.value
		})
	}
	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		// Add your registration logic here
		registerUser(registerFormData)
		// console.log('Registration form submitted:', registerFormData);
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		// Add your login logic here

		logninUser(loginFormData)
		// console.log('Login form submitted:', loginFormData);
	};

	const handleDealSubmit = (e) => {
		e.preventDefault();
		// Add your create deal logic here
		const newDeal = {
			...dealFormData,
			bus_id: resp.my_business.bus_id,
			bus_name: resp.my_business.bus_name,
			price: parseFloat(dealFormData.price),
		}

		createDeal(newDeal)
		addNewDeal(newDeal)
		cleanDealForm()
		// console.log('Create Deal form submitted:', dealFormData);
	};

	const handleEmailSubmit = (e) => {
		e.preventDefault();
		sendMail(emailFormData)
		// Add your send email logic here
		console.log('Send Email form submitted:', emailFormData);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault()
		searchDealsByBusinessName(searchFormData.search)
	}

	// handle submit update email
	const handleUpdateBusinessEmail = (e) => {
		e.preventDefault()
		const myBusiness = {
			...updateEmail,
			bus_id: resp.my_business.bus_id
		}
		updateBusinessEmail(myBusiness)
	}

	// all deals 
	useEffect(() => {
		getAllDeals()
	}, [])


	useEffect(() => {
		if (mailResp.delivered) {
			setTimeout(() => {
				changeMailState()
			}, 1800)
		}
	}, [mailResp])

	useEffect(() => {
		if (deal.created) {
			setTimeout(() => {
				// change state joined message on alert display for 1.5 seconds
				changeDealCreatedState()
			}, 1800);
		}
	}, [deal])

	return (
		<Container className="mt-5">
			<div className="text-center mt-5">
				<img src={insec} alt="My Logo" />
			</div>
			<Row>
				<Col>
					<h2>Register</h2>
					<Form onSubmit={handleRegisterSubmit}>
						<Form.Group controlId="formBusinessName">
							<Form.Label>Business Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter business name"
								name="bus_name"
								value={registerFormData.bus_name}
								onChange={handleRegisterChange}
							/>
						</Form.Group>
						<Form.Group controlId="formFullName">
							<Form.Label>Full Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter full name"
								name="name"
								value={registerFormData.name}
								onChange={handleRegisterChange}
							/>
						</Form.Group>
						<Form.Group controlId="formEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
								value={registerFormData.email}
								onChange={handleRegisterChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								name="password"
								value={registerFormData.password}
								onChange={handleRegisterChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Register
						</Button>
					</Form>
					<Col>
						{resp.success &&
							<div>
								<Alert variant={'success'}>
									<p> 🟢 Registed </p>
									<>
										{
											JSON.stringify(resp.my_business, null, 4)
										}
									</>
								</Alert>
							</div>
						}
					</Col>
				</Col>
				<Col>
					<h2>Login</h2>
					<Form onSubmit={handleLoginSubmit}>
						<Form.Group controlId="formLoginEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								name="email"
								value={loginFormData.email}
								onChange={handleLoginChange}
							/>
						</Form.Group>
						<Form.Group controlId="formLoginPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Enter password"
								name="password"
								value={loginFormData.password}
								onChange={handleLoginChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Login
						</Button>
					</Form>
					<Col>
						{resp.success &&
							<div>
								<Alert variant={'success'}>
									<p> 🟢 Welcome Back</p>
									<b>Access : {resp.message}</b>
									<br></br>
									<>
										{
											JSON.stringify(resp.my_business, null, 4)
										}
									</>
								</Alert>
							</div>
						}
					</Col>
				</Col>
				<Col>
					<h2>Change Email</h2>
					<Form onSubmit={handleUpdateBusinessEmail}>
						<Form.Group controlId="formLoginEmail">
							<Form.Label>Email</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email"
								name="email"
								value={updateEmail.email}
								onChange={handleUpdateBusinessEmailChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Change Email
						</Button>
					</Form>
					<Col>
						{updateMailResp.updated &&
							<div>
								<Alert variant={'success'}>
									<p> 🟢 Email Updated </p>
									<br></br>
									<>
										{
											JSON.stringify(updateMailResp.business_info, null, 4)
										}
									</>
								</Alert>
							</div>
						}
					</Col>
				</Col>
			</Row>

			<Row className="mt-5">
				<Col>
					<h2>Create New Deal</h2>
					<Form onSubmit={handleDealSubmit}>
						<Form.Group controlId="formProductName">
							<Form.Label>Product Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter product name"
								name="pro_name"
								value={dealFormData.pro_name}
								onChange={handleDealChange}
							/>
						</Form.Group>
						<Form.Group controlId="formProductDescription">
							<Form.Label>Product Description</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter product description"
								name="pro_desc"
								value={dealFormData.pro_desc}
								onChange={handleDealChange}
							/>
						</Form.Group>
						<Form.Group controlId="formPrice">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								name="price"
								value={dealFormData.price}
								onChange={handleDealChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Create Deal
						</Button>
					</Form>
					{deal.created &&
						<div>
							<Alert variant={'success'}>
								<p> 🟢 Your deal was created</p>
								<br></br>
							</Alert>
						</div>
					}
				</Col>
				<Col>
					<h2>Search Deal</h2>
					<Form onSubmit={handleSearchSubmit}>
						<Form.Group controlId="formBusinessName">
							<Form.Label>Business Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Business name"
								name="search"
								value={searchFormData.search}
								onChange={handleSearchChange}
							/>
						</Form.Group>
						{
							serchResult.deals &&
							<Form.Group controlId="formResult">
								<Form.Label>Result</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									placeholder="result"
									value={JSON.stringify(serchResult, null, 4)}
								/>
							</Form.Group>
						}
						<Button variant="primary" type="submit">
							Search
						</Button>
					</Form>
				</Col>

				<Col>
					<h2>Send Email</h2>
					<Form onSubmit={handleEmailSubmit}>
						<Form.Group controlId="formFrom">
							<Form.Label>From</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter your email"
								name="from"
								value={emailFormData.from}
								onChange={handleEmailChange}
							/>
						</Form.Group>
						<Form.Group controlId="formTo">
							<Form.Label>To</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter recipient's email"
								name="to"
								value={emailFormData.to}
								onChange={handleEmailChange}
							/>
						</Form.Group>
						<Form.Group controlId="formSubject">
							<Form.Label>Subject</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter email subject"
								name="subject"
								value={emailFormData.subject}
								onChange={handleEmailChange}
							/>
						</Form.Group>
						<Form.Group controlId="formBody">
							<Form.Label>Body Message</Form.Label>
							<Form.Control
								as="textarea"
								rows={3}
								placeholder="Enter email body"
								name="body"
								value={emailFormData.body}
								onChange={handleEmailChange}
							/>
						</Form.Group>
						<Button variant="primary" type="submit">
							Send Email
						</Button>
					</Form>
					{mailResp.delivered &&
						<div>
							<Alert variant={'success'}>
								<p> 🟢 {mailResp.message}</p>
								<br></br>
							</Alert>
						</div>
					}
				</Col>
			</Row>
			<Row>
				<Col>
					<h1>All Deals</h1>
					{
						allDeals.deals.length > 1 &&
						<Form.Group controlId="formResult">
							<Form.Label>Result</Form.Label>
							<Form.Control
								as="textarea"
								rows={30}
								placeholder="result"
								value={JSON.stringify(allDeals, null, 4)}
							/>
						</Form.Group>
					}
				</Col>
			</Row>
		</Container>
	);
};

export default App;

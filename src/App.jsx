import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom'
import RegisterPage from './pages/LoginSignup/Signup.jsx'
import LoginPage from './pages/LoginSignup/Login.jsx'

function App() {
	const [authenticated, setAuthenticated] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const checkAuth = () => {
			const accessToken = localStorage.getItem('accessToken')
			if (accessToken) {
				setAuthenticated(true)
			}
			setLoading(false)
		}
		checkAuth()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<Router>
			<Routes>
				<Route path='/' element={<Navigate to='/login' />} />
				<Route path='/signup' element={<RegisterPage />} />
				<Route
					path='/login'
					element={<LoginPage setAuthenticated={setAuthenticated} />}
				/>
				<Route
					path='*'
					element={<ProtectedRoutes authenticated={authenticated} />}
				/>
			</Routes>
		</Router>
	)
}

function ProtectedRoutes({ authenticated }) {
	return (
		<Layout>
			<Routes>
				<Route
					path='/example_link'
					element={authenticated ? <ExamplePage /> : <Navigate to='/login' />}
				/>
			</Routes>
		</Layout>
	)
}

export default App

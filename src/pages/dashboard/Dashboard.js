import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import WelcomeComponent from '../../components/proms2poc/WelcomeComponent'

function Dashboard(props) {
	const { selectDashboard } = props

	useEffect(selectDashboard, [selectDashboard])

	return <WelcomeComponent />
}

Dashboard.propTypes = {
	selectDashboard: PropTypes.func.isRequired
}

export default Dashboard

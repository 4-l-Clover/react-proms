import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../functions/utils'

const renderMergedProps = (component, ...rest) => {
	const finalProps = Object.assign({}, ...rest)
	return React.createElement(component, finalProps)
}

const PropsRoute = ({ component, needAuth = true, ...rest }) => (
	<Route
		{...rest}
		render={routeProps =>
			needAuth ^ isAuthenticated() ? (
				<Redirect to={{ pathname: isAuthenticated() ? '/c/deals/assets' : '/' }} />
			) : (
				renderMergedProps(component, routeProps, rest)
			)
		}
	/>
)

PropsRoute.propTypes = {
	component: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
}

export default PropsRoute

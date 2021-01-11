import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import Dashboard from '../../pages/dashboard/Dashboard'
import Posts from '../../pages/posts/Posts'
import PropsRoute from '../../shared/components/PropsRoute'
import Assets from '../../pages/deals/assets'

const styles = theme => ({
	wrapper: {
		margin: theme.spacing(1),
		width: 'auto',
		[theme.breakpoints.up('xs')]: {
			width: '95%',
			marginLeft: 'auto',
			marginRight: 'auto',
			marginTop: theme.spacing(4),
			marginBottom: theme.spacing(4)
		},
		[theme.breakpoints.up('sm')]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: '90%',
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		[theme.breakpoints.up('md')]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: '82.5%',
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		[theme.breakpoints.up('lg')]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			width: '70%',
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	}
})

function Routing(props) {
	const {
		classes,
		EmojiTextArea,
		ImageCropper,
		Dropzone,
		DateTimePicker,
		pushMessageToSnackbar,
		posts,
		toggleAccountActivation,
		statistics,
		targets,
		setTargets,
		setPosts,
		isAccountActivated,
		selectDashboard,
		selectPosts
	} = props
	return (
		<div className={classes.wrapper}>
			<Switch>
				<PropsRoute
					path="/c/posts"
					component={Posts}
					EmojiTextArea={EmojiTextArea}
					ImageCropper={ImageCropper}
					Dropzone={Dropzone}
					DateTimePicker={DateTimePicker}
					pushMessageToSnackbar={pushMessageToSnackbar}
					posts={posts}
					setPosts={setPosts}
					selectPosts={selectPosts}
				/>
				<PropsRoute
					path="/c/dashboard"
					component={Dashboard}
					toggleAccountActivation={toggleAccountActivation}
					pushMessageToSnackbar={pushMessageToSnackbar}
					statistics={statistics}
					targets={targets}
					setTargets={setTargets}
					isAccountActivated={isAccountActivated}
					selectDashboard={selectDashboard}
				/>
				<PropsRoute path="/c/deals/assets" component={Assets} />
			</Switch>
		</div>
	)
}

Routing.propTypes = {
	classes: PropTypes.object.isRequired,
	EmojiTextArea: PropTypes.elementType,
	ImageCropper: PropTypes.elementType,
	Dropzone: PropTypes.elementType,
	DateTimePicker: PropTypes.elementType,
	pushMessageToSnackbar: PropTypes.func,
	setTargets: PropTypes.func.isRequired,
	setPosts: PropTypes.func.isRequired,
	posts: PropTypes.arrayOf(PropTypes.object).isRequired,
	transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
	toggleAccountActivation: PropTypes.func,
	statistics: PropTypes.object.isRequired,
	targets: PropTypes.arrayOf(PropTypes.object).isRequired,
	isAccountActivated: PropTypes.bool.isRequired,
	selectDashboard: PropTypes.func.isRequired,
	selectPosts: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(memo(Routing))

import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MuiAppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const useStyles = makeStyles(theme => ({
	appBar: {
		backgroundColor: 'white',
		color: '#333',
		fontSize: '1rem',
		textTransform: 'unset',
		boxShadow: 'none'
	},
	indicator: {
		backgroundColor: theme.palette.primary.main
	},
	tab: {
		textTransform: 'unset',
		minWidth: 120
	}
}))
const SubTabs = ({ labels, value, handleChange }) => {
	const classes = useStyles()
	return (
		<MuiAppBar position="static" color="primary" className={classes.appBar}>
			<Tabs value={value} onChange={handleChange} classes={{ indicator: classes.indicator }} aria-label="Tabs">
				{labels.map(label => (
					<Tab key={label} label={label} className={classes.tab} />
				))}
			</Tabs>
		</MuiAppBar>
	)
}

export default SubTabs

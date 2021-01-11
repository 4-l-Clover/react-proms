import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

export default class VmTableActionMenu extends React.PureComponent {
	state = {
		anchorEl: null
	}

	openMenu = e => {
		this.setState({ anchorEl: e.currentTarget })
	}

	closeMenu = () => {
		this.setState({ anchorEl: null })
	}

	onItemClick = (onAction, row) => e => {
		e.stopPropagation()
		this.closeMenu()
		onAction(row)
	}

	render() {
		const { anchorEl } = this.state
		const open = Boolean(anchorEl)
		const { row, options } = this.props

		return (
			<>
				<IconButton onClick={this.openMenu}>
					<MoreVertIcon />
				</IconButton>
				<Menu anchorEl={anchorEl} open={open}>
					{options.map(({ key, onAction, label }) => (
						<MenuItem key={key} onClick={this.onItemClick(onAction, row)}>
							{label}
						</MenuItem>
					))}
				</Menu>
			</>
		)
	}
}

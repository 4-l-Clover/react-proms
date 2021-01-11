import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AssetIcon from '@material-ui/icons/Category'
import PortfolioIcon from '@material-ui/icons/ArtTrack'
import MarketIcon from '@material-ui/icons/AccountBalance'
import ScenarioIcon from '@material-ui/icons/EventAvailable'
import CounterpartyIcon from '@material-ui/icons/AllInclusive'
import SectorIcon from '@material-ui/icons/DonutSmall'
import Tooltip from '@material-ui/core/Tooltip'
import { Link, withRouter } from 'react-router-dom'
import FlexDiv from '../../../shared/components/FlexDiv'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import TabIndicator from '@material-ui/core/Tabs/TabIndicator'

const DrawerWidth = 240

const PageLists = [
	{
		group: 'Deals',
		lists: [
			{
				link: '/c/deals/assets',
				name: 'Assets',
				Icon: AssetIcon
			},
			{
				link: '/c/deals/portfolios',
				name: 'Portfolios',
				Icon: PortfolioIcon
			}
		]
	},
	{
		group: 'Assumptions',
		lists: [
			{
				link: '/c/assumptions/sectors',
				name: 'Sectors',
				Icon: SectorIcon
			},
			{
				link: '/c/assumptions/markets',
				name: 'Markets',
				Icon: MarketIcon
			},
			{
				link: '/c/assumptions/scenarios',
				name: 'Scenarios',
				Icon: ScenarioIcon
			},
			{
				link: '/c/assumptions/counterparties',
				name: 'Counterparties',
				Icon: CounterpartyIcon
			}
		]
	}
]

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.shart,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: DrawerWidth,
		width: `calc(100% - ${DrawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.shart,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: DrawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: DrawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.shart,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.shart,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(1, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	miniHead: {
		height: 24,
		width: 24
	},
	content: {
		flexGrow: 1,
		paddingTop: theme.spacing(3)
	},
	icon: {
		color: theme.palette.primary.main
	},
	text: {
		fontSize: 14
	},
	actived: {
		color: theme.palette.common.orange
	},
	inActived: {
		color: theme.palette.common.lightPersianBlue
	},
	indicator: {
		width: 4,
		backgroundColor: theme.palette.common.orange,
		borderRadius: '4px 0 0 4px',
		transform: 'translateY(-50%)',
		height: '50%'
	},
	listItem: {
		display: '-webkit-box',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3)
	},
	menulink: {
		textDecoration: 'none'
	},
	menu: {
		background: theme.palette.common.persianBlue,
		flexGrow: 1,
		paddingTop: theme.spacing(4)
	},
	groupItem: {
		color: theme.palette.common.lightPersianBlue,
		paddingLeft: theme.spacing(2),
		marginTop: theme.spacing(2),
		textTransform: 'uppercase'
	},
	itemHover: {
		color: theme.palette.common.orange,
		transition: theme.transitions.create('color', {
			easing: theme.transitions.easing.easeIn,
			duration: theme.transitions.duration.standard
		})
	}
}))

const AppDrawer = props => {
	const classes = useStyles()

	const [isOver, setIsOver] = useState(false)
	const onOver = () => setIsOver(true)
	const onLeave = () => setIsOver(false)

	const [open, setOpen] = useState(true)
	const handleDrawer = () => {
		setOpen(open => !open)
	}

	const [isItemOver, setIsItemOver] = useState(null)
	const onItemOver = name => setIsItemOver(name)
	const onItemLeave = () => setIsItemOver(null)

	const url = props.location.pathname || ''
	const tags = url.split('/') || []

	return (
		<aside>
			<Drawer
				variant="permanent"
				className={clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx(
						{
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open
						},
						classes.drawerPaper
					)
				}}
			>
				<div className={classes.toolbar}>
					{open && <img src={`${process.env.PUBLIC_URL}/images/logo.png`} style={{ width: 170 }} alt="logo" />}
					<FlexDiv item grow />
					<IconButton onClick={handleDrawer} onMouseOver={onOver} onMouseLeave={onLeave}>
						{open ? (
							<ChevronLeftIcon />
						) : isOver ? (
							<ChevronRightIcon />
						) : (
							<img
								src={`${process.env.PUBLIC_URL}/images/logo-abbr.png`}
								style={{ width: 37, marginTop: -4, marginBottom: -5 }}
								alt="logo"
							/>
						)}
					</IconButton>
				</div>
				<List className={classes.menu}>
					{PageLists.map(({ group, lists }) => (
						<React.Fragment key={group}>
							<ListItemText primary={group} className={classes.groupItem} classes={{ primary: classes.text }} />
							{lists.map(({ link, name, Icon }) => (
								<Link to={link} key={link} className={classes.menulink}>
									<Tooltip title={!open ? name : ''} placement="right">
										<ListItem
											button
											className={classes.listItem}
											onMouseOver={() => onItemOver(name)}
											onMouseLeave={onItemLeave}
										>
											<ListItemIcon>
												<Icon
													className={clsx(classes.icon, {
														[classes.itemHover]: isItemOver === name,
														[classes.actived]: name.toLowerCase() === tags[3],
														[classes.inActived]: name.toLowerCase() !== tags[3]
													})}
												/>
											</ListItemIcon>
											<ListItemText
												primary={name}
												className={clsx(classes.text, {
													[classes.itemHover]: isItemOver === name,
													[classes.actived]: name.toLowerCase() === tags[3],
													[classes.inActived]: name.toLowerCase() !== tags[3]
												})}
												classes={{ primary: classes.text }}
											/>
											{name.toLowerCase() === tags[3] && (
												<TabIndicator orientation="vertical" color="primary" className={classes.indicator} />
											)}
										</ListItem>
									</Tooltip>
								</Link>
							))}
						</React.Fragment>
					))}
				</List>
			</Drawer>
		</aside>
	)
}

export default withRouter(AppDrawer)

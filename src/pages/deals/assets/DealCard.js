import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import AccountBalanceWalletOutlinedIcon from '@material-ui/icons/AccountBalanceWalletOutlined'
import UpdateIcon from '@material-ui/icons/Update'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		width: '100%'
	},
	media: {
		height: 200
	},
	content: {
		height: 300
	},
	actionButton: {
		textDecoration: 'none',
		marginLeft: 'auto'
	}
})

function DealCard(props) {
	const classes = useStyles()
	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia
					className={classes.media}
					image={`${process.env.PUBLIC_URL}/images/logged_in/image5.jpg`}
					title="map"
				/>
				<CardContent className={classes.content}>
					<Typography variant="h5" component="h5" style={{ marginTop: 16, marginBottom: 16, fontWeight: 400 }}>
						{props.reff}
					</Typography>

					<Box display="flex" mb={2}>
						<RoomOutlinedIcon style={{ marginRight: 8 }} color="primary" />
						<div>
							<Typography variant="body2" color="textSecondary" component="address" style={{ marginBottom: 4 }}>
								50 Regent Street, Hudson County, Jersey City
							</Typography>
							<Typography variant="body2" color="textSecondary" component="p">
								07302, US
							</Typography>
						</div>
					</Box>
					<Box display="flex" mb={1} justifyContent="space-between">
						<Box display="flex" alignItems="center">
							<DonutLargeIcon color="primary" style={{ marginRight: 8 }} />
							<Typography variant="body2" color="textSecondary" component="span">
								Sector :
							</Typography>
						</Box>
						<Typography variant="body2" color="textPrimary" component="b">
							US Multifamily
						</Typography>
					</Box>
					<Box display="flex" mb={1} justifyContent="space-between">
						<Box display="flex" alignItems="center">
							<AccountBalanceWalletOutlinedIcon color="primary" style={{ marginRight: 8 }} />
							<Typography variant="body2" color="textSecondary" component="span">
								Valuation :
							</Typography>
						</Box>
						<Typography variant="body2" color="textPrimary" component="b">
							US$501,000,000
						</Typography>
					</Box>
					<Box display="flex" mb={1} justifyContent="space-between">
						<Box display="flex" alignItems="center">
							<UpdateIcon color="primary" style={{ marginRight: 8 }} />
							<Typography variant="body2" color="textSecondary" component="span">
								Opened :
							</Typography>
						</Box>
						<Typography variant="body2" color="textPrimary" component="b">
							08-Jan-21 6.13PM
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Link to={`/c/deals/assets/${props.did}`} className={classes.actionButton}>
					<Button size="small" color="secondary" endIcon={<ArrowRightAltIcon />}>
						Check in Detail
					</Button>
				</Link>
			</CardActions>
		</Card>
	)
}

export default DealCard

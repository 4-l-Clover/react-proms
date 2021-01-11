import React, { useCallback, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import axios from '../../../../constants/axios'
import DealCard from '../DealCard'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import PostAddIcon from '@material-ui/icons/PostAdd'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Tooltip from '@material-ui/core/Tooltip'
import AppsIcon from '@material-ui/icons/Apps'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	inputRoot: {
		width: 190,
		'@media (max-width:  400px)': {
			width: 160
		},
		'@media (max-width:  360px)': {
			width: 140
		},
		'@media (max-width:  340px)': {
			width: 120
		}
	},
	select: {
		width: 170,
		marginRight: theme.spacing(1)
	},
	searchButton: {
		width: 150
	},
	selectInput: {
		padding: '9px 34px 9px 14.5px'
	},
	normalInput: {
		padding: '9px 9px 9px 0'
	},
	mr1: {
		marginRight: theme.spacing(1)
	}
}))

const inputOptions = [
	{
		value: 'all',
		label: 'All fields'
	},
	{
		value: 'obligor_ref',
		label: 'Obligor reference'
	},
	{
		value: 'building_ref',
		label: 'Building ref'
	},
	{
		value: 'address',
		label: 'Address'
	},
	{
		value: 'postcode',
		label: 'Postcode'
	},
	{
		value: 'zipcode',
		label: 'Zipcode'
	},
	{
		value: 'owner',
		label: 'Owner'
	}
]
const inputOptions2 = [
	{
		value: 'contain',
		label: 'Contains'
	},
	{
		value: 'start',
		label: 'Starts with'
	},
	{
		value: 'end',
		label: 'Exact match'
	}
]

function ObligorSearch(props) {
	const classes = useStyles()
	const { history } = props

	const [searchTarget, setSearchTarget] = useState(inputOptions[0].value)
	const [searchType, setSearchType] = useState(inputOptions2[0].value)

	const handleChange = useCallback(
		event => {
			const { name, value } = event.target
			switch (name) {
				case 'searchType':
					setSearchType(value)
					break
				case 'searchTarget':
					setSearchTarget(value)
					break
				default:
					throw new Error('No branch selected in switch-statement.')
			}
		},
		[setSearchType, setSearchTarget]
	)

	const [searchStr, setSearchStr] = useState('')
	const handleInputChange = e => {
		setSearchStr(e.target.value)
	}

	const [obligors, setObligors] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		let ignore = false

		const getTop3Obligors = async () => {
			setLoading(true)
			try {
				const result = await axios.get('jpa/obligorsummaries/findtop10byid')
				if (result.data.content) {
					if (!ignore) {
						setObligors(result.data.content)
						setLoading(false)
						console.log('data:', result.data.content)
					}
				} else {
					throw new Error('Invalid response')
				}
			} catch (err) {
				console.log('getTop3 catch:', err)
				if (!ignore) {
					setLoading(false)
				}
			}
		}
		getTop3Obligors()

		return () => {
			ignore = true
		}
	}, [])

	return (
		<>
			<Box mb={3} mt={1} display="flex" justifyContent="space-between">
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<Typography variant="subtitle1" color="textPrimary">
						Obligor Search
					</Typography>
				</Breadcrumbs>
				<div>
					<IconButton
						aria-label="new"
						color="primary"
						onClick={() => {
							history.push('/c/deals/assets/new')
						}}
					>
						<Tooltip placement="bottom" title="New">
							<PostAddIcon />
						</Tooltip>
					</IconButton>
					<IconButton
						aria-label="import"
						color="primary"
						onClick={() => {
							history.push('/c/deals/assets/import')
						}}
					>
						<Tooltip placement="bottom" title="Import">
							<CloudUploadIcon />
						</Tooltip>
					</IconButton>
				</div>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
				<FormControl variant="outlined">
					<Select
						value={searchTarget}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="searchTarget"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{inputOptions.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="outlined">
					<Select
						value={searchType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="searchType"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{inputOptions2.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<OutlinedInput
					value={searchStr}
					type="text"
					className={classes.mr1}
					classes={{ input: classes.normalInput }}
					onChange={handleInputChange}
					placeholder="Search Obligor"
					startAdornment={
						<InputAdornment position="start">
							<SearchIcon color="secondary" />
						</InputAdornment>
					}
					style={{ flexGrow: 1 }}
				/>
				<Button variant="contained" color="secondary" className={classes.searchButton} disabled={loading}>
					Search
				</Button>
			</Box>

			<Box mt={4} mb={2}>
				<Typography variant="subtitle2" component="span" className={classes.mr1}>
					View Mode :
				</Typography>
				<IconButton aria-label="grid">
					<AppsIcon />
				</IconButton>
				<IconButton aria-label="list">
					<FormatListBulletedIcon />
				</IconButton>
			</Box>

			<Grid container spacing={2}>
				{obligors.map((v, i) => (
					<Grid item xs={12} sm={6} md={4} key={i}>
						<DealCard address="..." reff={v.ref} key={i} did={v.id} />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default withRouter(ObligorSearch)

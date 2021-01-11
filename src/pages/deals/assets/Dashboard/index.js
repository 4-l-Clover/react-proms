import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
	Box,
	Breadcrumbs,
	Button,
	FormControl,
	makeStyles,
	MenuItem,
	OutlinedInput,
	Paper,
	Select,
	Typography
} from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import MLink from '@material-ui/core/Link'
import { withRouter } from 'react-router-dom'
import axios from '../../../../constants/axios'
import HighlightedInformation from '../../../../shared/components/HighlightedInformation'
import { convertObligorStatusToString } from '../../../../shared/functions/utils'
import VmTableActionMenu from '../../../../shared/components/VmTableActionMenu'
import VmTable from '../../../../shared/components/table'

const reviewStatusOptions = [
	{
		label: 'No Select',
		value: '0'
	},
	{
		label: 'Unverified',
		value: '1'
	},
	{
		label: 'Data verified',
		value: '2'
	},
	{
		label: 'Approved',
		value: '3'
	}
]

const dealStatusOptions = [
	{
		label: 'No Select',
		value: '0'
	},
	{
		label: 'Declined',
		value: '1'
	},
	{
		label: 'Credit Approved',
		value: '2'
	},
	{
		label: 'Lost',
		value: '3'
	}
]

const useStyles = makeStyles(theme => ({
	select: {
		width: 170
		// marginRight: theme.spacing(1)
	},
	selectInput: {
		padding: '9px 34px 9px 14.5px'
	}
}))

function DealDashboard(props) {
	const oId = props.match.params.id
	const [loading, setLoading] = useState(false)
	const [obligorData, setObligorData] = useState(null)

	const [reviewStatus, setReviewStatus] = useState('0')
	const [dealStatus, setDealStatus] = useState('0')

	const classes = useStyles()

	const handleChange = useCallback(
		event => {
			const { name, value } = event.target
			switch (name) {
				case 'reviewStatus':
					setReviewStatus(value)
					break
				case 'dealStatus':
					setDealStatus(value)
					break
				default:
					throw new Error('No branch selected in switch-statement.')
			}
		},
		[setReviewStatus, setDealStatus]
	)

	useEffect(() => {
		if (!oId) return
		let ignore = false
		const getObligor = async () => {
			setLoading(true)
			try {
				const result = await axios.get(`jpa/obligors/getbyid/${oId}`)
				if (result.data) {
					if (!ignore) {
						setObligorData(result.data)
						setLoading(false)
						console.log('data:', result.data)
					}
				} else {
					throw new Error('Invalid response')
				}
			} catch (err) {
				console.log('getObligor catch:', err)
				if (!ignore) {
					setLoading(false)
				}
			}
		}
		getObligor()

		return () => {
			ignore = true
		}
	}, [oId])

	const tableData = useMemo(
		() => ({
			rows: obligorData?.enquiries || [],
			columnSettings: [
				{
					key: 'snapshotStatusId',
					label: 'Record Status',
					sortable: false,
					disablePadding: false,
					align: 'left'
				},
				{
					key: 'modifiedDate',
					label: 'Last Saved',
					sortable: false,
					disablePadding: false,
					align: 'left'
				},
				{
					key: 'equivalentGrade',
					label: 'Equivalent Grade',
					sortable: false,
					disablePadding: false,
					align: 'left'
				},
				{
					key: 'expectedReturn',
					label: 'Expected Return',
					sortable: false,
					disablePadding: false,
					align: 'left'
				},
				{
					key: 'comments1',
					label: 'Description',
					sortable: false,
					disablePadding: false,
					align: 'left'
				},
				{
					key: 'actions',
					label: 'Actions',
					sortable: false,
					disablePadding: false,
					align: 'center',
					renderElement: row => {
						const menuOptions = [
							{
								key: 'view',
								label: 'View',
								onAction: () => {
									props.history.push(`/c/deals/assets/${oId}/${row.id}`)
								}
							},
							{
								key: 'copyToNewObligor',
								label: 'Copy into new obligor',
								onAction: () => {}
							},
							{
								key: 'downloadAsExcel',
								label: 'Download as excel',
								onAction: () => {}
							},
							{
								key: 'generateMergedDocument',
								label: 'Generate merged document',
								onAction: () => {}
							}
						]
						return <VmTableActionMenu options={menuOptions} row={row} />
					}
				}
			]
		}),
		[obligorData, props.history, oId]
	)

	return (
		<>
			<Box mb={3} mt={1} display="flex" justifyContent="space-between">
				<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
					<MLink
						component="button"
						variant="subtitle1"
						onClick={() => props.history.push('/c/deals/assets')}
						color="textPrimary"
					>
						Obligors
					</MLink>
					<Typography variant="subtitle1" color="textPrimary">
						{obligorData?.ref}
					</Typography>
				</Breadcrumbs>
			</Box>

			<Typography variant="h6" component="h6">
				Deal Information
			</Typography>

			<Box display="flex" justifyContent="space-between" mt={2} mb={5}>
				<Paper elevation={3} square={false} style={{ padding: 16 }}>
					<Typography variant="subtitle2">Ref</Typography>
					<Typography variant="subtitle1">{obligorData?.ref}</Typography>
					<Typography variant="subtitle2">Owner</Typography>
					<Typography variant="subtitle1">{obligorData?.owner?.userName}</Typography>
					<Typography variant="subtitle2">Status</Typography>
					<Typography variant="subtitle1">{convertObligorStatusToString(obligorData?.obligorStatusId)}</Typography>
				</Paper>
				<Box>
					<HighlightedInformation>You currently have this obligor opened for editing</HighlightedInformation>
					<Typography variant="subtitle2">Data Review Status :</Typography>
					<FormControl variant="outlined">
						<Select
							value={reviewStatus}
							onChange={handleChange}
							input={
								<OutlinedInput
									name="reviewStatus"
									color="secondary"
									labelWidth={0}
									className={classes.select}
									classes={{ input: classes.selectInput }}
								/>
							}
							MenuProps={{ disableScrollLock: true }}
						>
							{reviewStatusOptions.map(({ value, label }) => (
								<MenuItem value={value} key={label}>
									{label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Typography variant="subtitle2">Deal Status :</Typography>
					<FormControl variant="outlined">
						<Select
							value={dealStatus}
							onChange={handleChange}
							input={
								<OutlinedInput
									name="dealStatus"
									color="secondary"
									labelWidth={0}
									className={classes.select}
									classes={{ input: classes.selectInput }}
								/>
							}
							MenuProps={{ disableScrollLock: true }}
						>
							{dealStatusOptions.map(({ value, label }) => (
								<MenuItem value={value} key={label}>
									{label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
			</Box>

			<Box display="flex" justifyContent="space-between" alignItems="center">
				<Typography variant="h6" component="h6">
					Drafts
				</Typography>
				<Button variant="contained" color="secondary">
					Grab obligor for editing
				</Button>
			</Box>

			<Box mt={2} mb={1}>
				<Paper square variant="outlined" elevation={0}>
					<VmTable data={tableData} />
				</Paper>
			</Box>
		</>
	)
}

export default withRouter(DealDashboard)

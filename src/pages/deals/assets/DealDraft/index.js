import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from '../../../../constants/axios'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import MLink from '@material-ui/core/Link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import SaveIcon from '@material-ui/icons/Save'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import SubTabs from './SubTabs'
import Property from './Property'
import Expenses from './Expenses'
import SingleProjections from './SingleProjections'
import Forecast from './Forecast'
import RiskAnalysis from './RiskAnalysis'

const DealDraft = props => {
	// const oId = props.match.params.id
	const draftId = props.match.params.draftId

	const [loading, setLoading] = useState(false)
	const [draftData, setDraftData] = useState(null)

	useEffect(() => {
		if (!draftId) return
		let ignore = false
		const getDraft = async () => {
			setLoading(true)
			try {
				const result = await axios.get(`jpa/enquiries/getbyid/${draftId}`)
				if (result.data) {
					if (!ignore) {
						setDraftData(result.data)
						setLoading(false)
						console.log('data:', result.data)
					}
				} else {
					throw new Error('Invalid response')
				}
			} catch (err) {
				console.log('getDraft catch:', err)
				if (!ignore) {
					setLoading(false)
				}
			}
		}
		getDraft()

		return () => {
			ignore = true
		}
	}, [draftId])

	const labels = ['Property', 'Expenses', 'Forecast', 'Risk Analysis', 'Single Projections']

	const [subTabValue, setSubTabValue] = useState(0)
	const handleSubTabChange = (e, value) => setSubTabValue(value)

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
					<MLink
						component="button"
						variant="subtitle1"
						onClick={() => props.history.push('/c/deals/assets')}
						color="textPrimary"
					>
						RWInflationTest345
					</MLink>
					<Typography variant="subtitle1" color="textPrimary">
						{`Draft-${draftId}`}
					</Typography>
				</Breadcrumbs>
				<IconButton
					aria-label="new"
					color="primary"
					onClick={() => {
						props.history.push('/c/deals/assets')
					}}
				>
					<Tooltip placement="bottom" title="Save">
						<SaveIcon />
					</Tooltip>
				</IconButton>
			</Box>

			<SubTabs labels={labels} value={subTabValue} handleChange={handleSubTabChange} />
			<Box mt={2} mb={1}>
				{subTabValue === 0 && <Property />}
				{subTabValue === 1 && <Expenses />}
				{subTabValue === 2 && <Forecast />}
				{subTabValue === 3 && <RiskAnalysis />}
				{subTabValue === 4 && <SingleProjections />}
			</Box>
		</>
	)
}

export default withRouter(DealDraft)

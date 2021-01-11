import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Route, Switch } from 'react-router-dom'
import ObligorSearch from './ObligorSearch'
import ImportAsset from './ImportAsset'
import NewAsset from './NewAsset'
import DealDashboard from './Dashboard'
import DealDraft from './DealDraft'

function Assets() {
	return (
		<>
			<Typography variant="h5" className="vm-fw-bold">
				DEALS / Assets
			</Typography>
			<Switch>
				<Route path="/c/deals/assets/new" component={NewAsset} />
				<Route path="/c/deals/assets/import" component={ImportAsset} />
				<Route path="/c/deals/assets/:id/:draftId" component={DealDraft} />
				<Route path="/c/deals/assets/:id" component={DealDashboard} />
				<Route path="/c/deals/assets" component={ObligorSearch} />
			</Switch>
		</>
	)
}

export default Assets

import React, { lazy } from 'react'
import { MuiThemeProvider, CssBaseline } from '@material-ui/core'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './theme'
import GlobalStyles from './GlobalStyles'
// import * as serviceWorker from "./serviceWorker";
import Pace from './shared/components/Pace'

import Loading from './shared/components/Loading'
const LoggedInMain = lazy(() => import('./containers/logged_in/Main'))
const LoggedOutMain = lazy(() => import('./containers/logged_out/Main'))

function App() {
	return (
		<BrowserRouter>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles />
				<Pace color={theme.palette.primary.light} />
				<React.Suspense fallback={<Loading />}>
					<Switch>
						<Route path="/c">
							<LoggedInMain />
						</Route>
						<Route>
							<LoggedOutMain />
						</Route>
					</Switch>
					{/* <PROMS2POCApp/> */}
				</React.Suspense>
			</MuiThemeProvider>
		</BrowserRouter>
	)
}

// serviceWorker.register();

export default App

import React from 'react'
import Typography from '@material-ui/core/Typography'
import FlexDiv from './FlexDiv'
import LoadingIcon from '../Icons/MainLoadingIcon'

const Loading = () => {
	return (
		<FlexDiv
			container
			fullWidth
			fullHeight
			mainAlign="center"
			crossAlign="center"
			column
			style={{ minHeight: '100vh' }}
		>
			<LoadingIcon style={{ fontSize: '4rem' }} />
			<Typography variant="h4">Loading...</Typography>
		</FlexDiv>
	)
}

export default Loading

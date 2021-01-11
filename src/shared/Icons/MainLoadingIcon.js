import React from 'react'
import SvgIcon from '@material-ui/core/SvgIcon'

const Loading = props => {
	return (
		<SvgIcon {...props}>
			<svg viewBox="0 0 100 100">
				<circle fill="none" stroke="#b3294e" strokeWidth="4" cx="50" cy="50" r="44" style={{ opacity: 0.5 }} />
				<circle fill="#fff" stroke="#b3294e" strokeWidth="3" cx="8" cy="54" r="6">
					<animateTransform
						attributeName="transform"
						dur="2s"
						type="rotate"
						from="0 50 48"
						to="360 50 52"
						repeatCount="indefinite"
					/>
				</circle>
			</svg>
		</SvgIcon>
	)
}

export default Loading

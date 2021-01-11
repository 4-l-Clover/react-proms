import React, { useState, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { withRouter } from 'react-router-dom'
import { TextField, Button, Checkbox, Typography, FormControlLabel, withStyles } from '@material-ui/core'
import FormDialog from '../../../shared/components/FormDialog'
import HighlightedInformation from '../../../shared/components/HighlightedInformation'
import ButtonCircularProgress from '../../../shared/components/ButtonCircularProgress'
import VisibilityPasswordTextField from '../../../shared/components/VisibilityPasswordTextField'
import { setLocalStorage } from '../../../shared/functions/utils'
import axios from '../../../constants/axios'

const styles = theme => ({
	forgotPassword: {
		marginTop: theme.spacing(2),
		color: theme.palette.primary.main,
		cursor: 'pointer',
		'&:enabled:hover': {
			color: theme.palette.primary.dark
		},
		'&:enabled:focus': {
			color: theme.palette.primary.dark
		}
	},
	disabledText: {
		cursor: 'auto',
		color: theme.palette.text.disabled
	},
	formControlLabel: {
		marginRight: 0
	}
})

function LoginDialog(props) {
	const { setStatus, history, classes, onClose, openChangePasswordDialog, status } = props
	const [isLoading, setIsLoading] = useState(false)
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)
	const loginEmail = useRef()
	const loginPassword = useRef()

	const login = useCallback(async () => {
		setIsLoading(true)
		setStatus(null)
		try {
			const result = await axios.post('authenticate', {
				username: loginEmail.current.value,
				password: loginPassword.current.value
			})
			if (result?.data?.token) {
				setLocalStorage('token', result.data.token)
				history.push('/c/deals/assets')
			} else {
				throw new Error('Invalid result')
			}
		} catch (err) {
			console.error('login failure:', err)
			setStatus(err.message || 'Wrong')
			setIsLoading(false)
		}
	}, [setIsLoading, loginEmail, loginPassword, history, setStatus])

	return (
		<>
			<FormDialog
				open
				onClose={onClose}
				loading={isLoading}
				onFormSubmit={e => {
					e.preventDefault()
					login()
				}}
				hideBackdrop
				headline="Login"
				content={
					<>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							label="Customer"
							autoFocus
							autoComplete="off"
							type="text"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							error={status === 'invalidEmail'}
							required
							fullWidth
							label="Username"
							inputRef={loginEmail}
							autoFocus
							autoComplete="off"
							type="text"
							onChange={() => {
								if (status === 'invalidEmail') {
									setStatus(null)
								}
							}}
							helperText={status === 'invalidEmail' && "This username isn't associated with an account."}
							FormHelperTextProps={{ error: true }}
						/>
						<VisibilityPasswordTextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							error={status === 'invalidPassword'}
							label="Password"
							inputRef={loginPassword}
							autoComplete="off"
							onChange={() => {
								if (status === 'invalidPassword') {
									setStatus(null)
								}
							}}
							helperText={
								status === 'invalidPassword' ? (
									<span>
										Incorrect password. Try again, or click on <b>&quot;Forgot Password?&quot;</b> to reset it.
									</span>
								) : (
									status === 'Wrong' && 'Something went wrong, retry!'
								)
							}
							FormHelperTextProps={{ error: true }}
							onVisibilityChange={setIsPasswordVisible}
							isVisible={isPasswordVisible}
						/>
						<FormControlLabel
							className={classes.formControlLabel}
							control={<Checkbox color="primary" />}
							label={<Typography variant="body1">Remember me</Typography>}
						/>
						{status === 'verificationEmailSend' && (
							<HighlightedInformation>
								We have send instructions on how to reset your password to your email address
							</HighlightedInformation>
						)}
					</>
				}
				actions={
					<>
						<Button type="submit" fullWidth variant="contained" color="secondary" disabled={isLoading} size="large">
							Login
							{isLoading && <ButtonCircularProgress />}
						</Button>
						<Typography
							align="center"
							className={clsx(classes.forgotPassword, isLoading ? classes.disabledText : null)}
							color="primary"
							onClick={isLoading ? null : openChangePasswordDialog}
							tabIndex={0}
							role="button"
							onKeyDown={event => {
								// For screenreaders listen to space and enter events
								if ((!isLoading && event.key === 'Enter') || event.key === 'Space') {
									openChangePasswordDialog()
								}
							}}
						>
							Forgot Password?
						</Typography>
					</>
				}
			/>
		</>
	)
}

LoginDialog.propTypes = {
	classes: PropTypes.object.isRequired,
	onClose: PropTypes.func.isRequired,
	setStatus: PropTypes.func.isRequired,
	openChangePasswordDialog: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired,
	status: PropTypes.string
}

export default withRouter(withStyles(styles)(LoginDialog))

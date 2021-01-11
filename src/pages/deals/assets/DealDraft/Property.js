import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { makeStyles } from '@material-ui/core/styles'
import { InputAdornment } from '@material-ui/core'

const options = [
	{
		label: 'Option1',
		value: 'option1'
	},
	{
		label: 'Option2',
		value: 'option2'
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
const Property = () => {
	const classes = useStyles()

	const [exposureType, setExposureType] = useState(options[0].value)
	const handleChange = e => {
		setExposureType(e.target.value)
	}

	return (
		<>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">Exposure Type</Typography>
				<FormControl variant="outlined">
					<Select
						value={exposureType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="exposureType"
								color="secondary"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{options.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">High-level Asset Data</Typography>
				<FormControl variant="outlined">
					<Select
						value={exposureType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="exposureType"
								color="secondary"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{options.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">Loan class</Typography>
				<FormControl variant="outlined">
					<Select
						value={exposureType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="exposureType"
								color="secondary"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{options.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">Country</Typography>
				<FormControl variant="outlined">
					<Select
						value={exposureType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="exposureType"
								color="secondary"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{options.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">Fund</Typography>
				<FormControl variant="outlined">
					<Select
						value={exposureType}
						onChange={handleChange}
						input={
							<OutlinedInput
								name="exposureType"
								color="secondary"
								labelWidth={0}
								className={classes.select}
								classes={{ input: classes.selectInput }}
							/>
						}
						MenuProps={{ disableScrollLock: true }}
					>
						{options.map(({ value, label }) => (
							<MenuItem value={value} key={label}>
								{label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box display="flex" justifyContent="space-between" alignItems="center" style={{ width: '50%' }}>
				<Typography variant="subtitle2">
					Ownership Percentage <small>(0 if n/a)</small>
				</Typography>
				<OutlinedInput
					name="exposureType"
					color="secondary"
					labelWidth={0}
					className={classes.select}
					classes={{ input: classes.selectInput }}
					endAdornment={<InputAdornment position="end">%</InputAdornment>}
				/>
			</Box>
		</>
	)
}

export default Property

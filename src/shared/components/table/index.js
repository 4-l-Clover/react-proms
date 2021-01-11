import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FlexDiv from '../FlexDiv'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import EnhancedTableHead from './Head'
import Cell from './Cell'
import { Checkbox, Radio } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2)
	}
}))

const VmTable = props => {
	const { data, tableStyle, columnSelectMode } = props
	const { rows, columnSettings } = data

	const classes = useStyles()

	const tableBody = rows.map((row, index) => (
		<React.Fragment key={row.id}>
			<TableRow
				className={classes.tableRow}
				classes={{ selected: classes.selected }}
				role="checkbox"
				tabIndex={-1}
				key={row.id}
				hover
			>
				{columnSelectMode === 'checkbox' && (
					<Cell padding="checkbox">
						<Checkbox color="secondary" />
					</Cell>
				)}
				{columnSelectMode === 'radio' && (
					<Cell padding="checkbox">
						<Radio color="secondary" />
					</Cell>
				)}
				{columnSettings.map(item => (
					<Cell key={item.key} align={item.align} {...item.bodyCellProps}>
						{item.renderElement ? item.renderElement(row) : row[item.key]}
					</Cell>
				))}
			</TableRow>
		</React.Fragment>
	))
	return (
		<FlexDiv column fullHeight fullWidth style={{ minHeight: 'unset' }}>
			<TableContainer>
				<Table style={tableStyle}>
					<EnhancedTableHead
						classes={classes}
						onRequestSort={() => {}}
						headers={columnSettings}
						onSelectAllClick={() => {}}
						rowCount={rows.length}
					/>
					<TableBody>{tableBody}</TableBody>
				</Table>
			</TableContainer>
		</FlexDiv>
	)
}

export default VmTable

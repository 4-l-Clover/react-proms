import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TableHead from '@material-ui/core/TableHead'
import clsx from 'clsx'
import TableRow from '@material-ui/core/TableRow'
import { Checkbox, TableSortLabel } from '@material-ui/core'
import Cell from './Cell'

const useStyles = makeStyles({
	headerCell: {
		fontWeight: 'bold'
	}
})

const EnhancedTableHead = props => {
	const {
		headers,
		classes: classNames,
		onSelectAllClick,
		columnSelectMode,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props
	const createSortHandler = property => e => {
		onRequestSort(e, property)
	}

	const classes = useStyles()

	return (
		<TableHead>
			<TableRow className={clsx(classes.headerCell, classNames.header)}>
				{columnSelectMode === 'checkbox' && (
					<Cell padding="checkbox">
						<Checkbox
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							color="secondary"
							// icon={<SqureUnchecked/>}
							// checkedIcon={<SqureChecked/>}
						/>
					</Cell>
				)}
				{columnSelectMode === 'radio' && <Cell padding="checkbox" />}
				{headers.map(headCell => (
					<Cell
						className={classes.headerCell}
						key={headCell.key}
						align={headCell.align}
						padding={headCell.disablePadding ? 'none' : 'default'}
						sortDirection={orderBy === headCell.key ? order : false}
						style={headCell.style}
					>
						{headCell.sortable ? (
							<TableSortLabel
								active={orderBy === headCell.key}
								direction={orderBy === headCell.key ? order : 'asc'}
								onClick={createSortHandler(headCell.key)}
							>
								{headCell.label}
							</TableSortLabel>
						) : (
							headCell.label
						)}
					</Cell>
				))}
			</TableRow>
		</TableHead>
	)
}

export default EnhancedTableHead

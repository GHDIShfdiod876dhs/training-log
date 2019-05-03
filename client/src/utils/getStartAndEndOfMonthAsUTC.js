import moment from 'moment'

export default ({ month, year }) => {
  const startDate = moment([year, month, 1])
    .valueOf()
    .toString()
  const endDate = moment([
    year,
    month,
    moment([year, month]).daysInMonth(),
    23,
    59,
    59,
    999,
  ])
    .valueOf()
    .toString()

  return [startDate, endDate]
}

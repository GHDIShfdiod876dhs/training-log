import React from 'react'
import moment from 'moment'


export const calInitState = { month: moment().month(), year: moment().year() }

export const calReducer = (state, action) => {
  switch(action) {
    case 'inc_month':
      if (state.month === 11) return { month: 0, year: state.year + 1 }
      else return { ...state, month: state.month + 1 }
    case 'dec_month':
      if (state.month === 0) return { month: 11, year: state.year - 1}
      else return { ...state, month: state.month - 1 }
    case 'inc_year':
      return { ...state, year: state.year + 1 }
    case 'dec_year':
      return { ...state, year: state.year - 1 }
    case 'reset':
      return calInitState
    default:
      return state
  }
}

export default ({ state: { month, year }, dispatch }) => (
  <>   
    <div
      className="valign-wrapper"
      style={{ padding: '1rem 1rem 0 1rem' }}
    >
      <i className="material-icons" onClick={ () => dispatch('dec_year') } style={{flex: '10%'}}>
        keyboard_arrow_left
      </i>
      <span style={{ flex: '10%' }}></span>
      <h6 style={{flex: '60%'}}>{year}</h6>
      <span style={{ flex: '10%' }}>{
        month === calInitState.month && year === calInitState.year ? 
          null : 
          <i
            className="material-icons white-text"
            
            onClick={ () => dispatch('reset') }
          >
            refresh
          </i>
      }</span>
      <i
        className="material-icons" onClick={ () => dispatch('inc_year') } style={{flex: '10%'}}>
        keyboard_arrow_right
      </i>
    </div>

    <div
      className="valign-wrapper"
      style={{ padding: '1rem', position: 'relative' }}
    >
      <i
        className="material-icons"
        onClick={ () => dispatch('dec_month') }
        style={{ flex: '10%' }}
      >
        keyboard_arrow_left
      </i>
      <h4 style={{ flex: '80%' }}>{ moment().month(month).format('MMMM') }</h4>
      <i
        className="material-icons"
        onClick={ () => dispatch('inc_month') }
        style={{ flex: '10%' }}
      >
        keyboard_arrow_right
      </i>
    </div>
  </>
)
import React, { useEffect } from 'react'
//import Collection from '../components/Collection';
import Checkbox from './execute_workout/execute_set/Checkbox'
import Loader from '../components/Loader'

const divStyles = {
  margin: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: '#424242',
  padding: '1rem',
  width: '8rem',
  // height: '8rem'
  transform: 'scale(1)',
  transition: 'transform 0.25s, box-shadow 0.25s',
}

const labelStyles = {
  color: '#eee',
  fontSize: '0.9rem',
  fontStyle: 'italic',
}

const inputStyles = {
  border: 'none',
  color: 'white',
  fontSize: '1.85rem',
  textAlign: 'center',
  marginTop: '0.25rem',
}

export default () => {
  //<Collection collapsible header={'header'} />
  const id = 'test'
  let input

  useEffect(() => {
    input = document.getElementById(id)
    const [label] = Array.from(document.querySelectorAll('label')).filter(
      el => el.htmlFor === id
    )
    const container = document.getElementById(`${id}-container`)
    input.addEventListener('focus', () => {
      highlightLabel(label)
      makePop(container)
    })
    input.addEventListener('blur', () => {
      unHighlightLabel(label)
      unPop(container)
    })
    return () => {
      input.removeEventListener('focus', () => {
        highlightLabel(label)
        makePop(container)
      })
      input.removeEventListener('blur', () => {
        unHighlightLabel(label)
        unPop(container)
      })
    }
  }, [input])

  function highlightLabel(label) {
    label.style.color = 'white'
    label.style.fontWeight = 'bold'
  }

  function unHighlightLabel(label) {
    label.style.color = '#bdbdbd'
    label.style.fontWeight = 'normal'
  }

  function makePop(container) {
    container.style.boxShadow = '-2px 2px 24px 0px #212121'
    //container.style.border = '2px solid gray'
    // container.style.height = (parseInt(container.clientHeight) * (9/8)) + 'px'
    // console.log(parseInt(container.style.height))
    // container.style.width = (parseInt(container.style.width) + 1) + 'rem'
    container.style.transform = 'scale(1.1)'
  }

  function unPop(container) {
    container.style.boxShadow = 'none'
    container.style.border = 'none'
    // container.style.height = (parseInt(container.clientHeight) * (8/9)) + 'px'
    // container.style.width = (parseInt(container.style.width) - 1) + 'rem'
    container.style.transform = 'scale(1)'
  }

  const set = { completed: false, id: 3 }

  return (
    <>
      <Loader />
      <Checkbox set={set} />
      <form>
        <div id={`${id}-container`} style={divStyles}>
          <label htmlFor={id} style={labelStyles}>
            Label for the things
          </label>
          <input id={id} type='number' style={inputStyles} />
        </div>
      </form>
    </>
  )
}

import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@nextui-org/react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button color={'success'} auto ghost onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div ref={ref} style={showWhenVisible}>
        {props.children}
        <Button color={'error'} auto ghost onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
})

export default Togglable

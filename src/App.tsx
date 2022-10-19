import { useState } from 'react';
import useEventEmitter from "./emit";
function App() {
  const [visible, setVisible] = useState(false)
  const event$ = useEventEmitter({global: true})
  event$.useSubscription('change', () => {
    setVisible(!visible)
  })
  return (
    <div>
      <Child1 />
      {visible ? <span>1</span> : null}
    </div>
  );
}

function Child1() {
  const event$ = useEventEmitter({global: true})
  const handleOnClick = () => {
    event$.emit('change')
  }
  return (
    <button onClick={handleOnClick}>button</button>
  )
}

export default App;

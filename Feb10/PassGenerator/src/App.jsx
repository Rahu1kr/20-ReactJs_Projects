import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(charAllowed) str += "[]{}\|;:'.><,/?()*&^%$#@!~+=";

    for(let i = 1; i<= count; i++)
    {
      let char = Math.floor(Math.random()*str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [count, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {passwordRef.current?.select(); window.navigator.clipboard.writeText(password)}, [password])

  useEffect(() => {passwordGenerator()}, [count, numberAllowed, charAllowed, passwordGenerator])

  return (
   <>
    <div className='main'>
      <div className='container'>
        <div className='pass'>
          <input type="text" placeholder='Password' readOnly value={password} ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard}>Copy</button>
        </div>
        <div className='length'>
          <div className='one'>
          <input type="range" min={6} max={30} value={count} onChange={(e)  =>  {setCount(e.target.value)}}/>
          <h3>Length({count})</h3>
          </div>
          <div className='one'>
          <input type="checkbox" defaultChecked={numberAllowed}  onChange= {() => {setNumberAllowed((prev) => !prev)}} />
          <h3>Numbers</h3>
          </div>
          <div className='one'>
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => {setCharAllowed((prev) => !prev)}}/>
          <h3>Characters</h3>
          </div>
        </div>

      </div>
    </div>
   </>
  )
}

export default App

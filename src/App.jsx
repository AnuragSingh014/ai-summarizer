import './App.css'
import Hero from './components/Hero'
import Demo from './components/Demo'

function App() {

  return (
    <>
      <div className="main">
        <div className="gradient" />
      </div>

      <div className='app'>
        <Hero />
        <Demo />
      </div>
    </>
  )
}

export default App

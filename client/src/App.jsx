import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home, CreatePost } from './pages/index';
import {mainLogo} from './assets'
function App() {
  return (
    <BrowserRouter>
      <header className='flex justify-between w-full items-center bg-slate-950 sm:px-8 px-4 py-4 border-b border-b-[#fdde30]'>
        <Link to='/'>
          <img src={mainLogo} className='w-16 object-contain invert' alt='logo' />
        </Link>
        <Link to='/create-post' className='font-inter font-medium bg-[#fdde30] text- px-4 py-2 rounded-md animate-pulse'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#000000] min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter >
  )
}

export default App

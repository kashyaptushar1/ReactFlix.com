
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store.jsx'
import { Provider } from 'react-redux'
import { ThemeProvider } from './components/ThemeContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <Provider store={store} >
    <BrowserRouter>
   
    <ThemeProvider>
    <App />
  </ThemeProvider>
   
   </BrowserRouter>
  </Provider>
   
  ,
)

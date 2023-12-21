import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './context/AuthContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)

// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<BrowserRouter>
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// </BrowserRouter>);

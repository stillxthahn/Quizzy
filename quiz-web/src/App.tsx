import { Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './_auth/AuthLayout'
import SignIn from './_auth/forms/SignIn'
import SignUp from './_auth/forms/SignUp'
import RootLayout from './_root/RootLayout'
import Home from './_root/pages/Home'
import Topic from './_root/pages/Topic'
import Answers from './_root/pages/Answers'
import Quiz from './_root/pages/Quiz'
import AnswerDetails from './_root/pages/AnswerDetails'


function App() {
  return (
    <main>
      <Routes>
        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        {/* private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/topic" element={<Topic />} />
          <Route path="/answers" element={<Answers />} />
          <Route path="/topic/:id" element={<Quiz />} />
          <Route path="/answers/:id" element={<AnswerDetails />} />
        </Route>
      </Routes >
    </main>
  )
}

export default App

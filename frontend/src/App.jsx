import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import NewApplicant from "./pages/NewApplicant"
import ApplicantList from "./pages/ApplicantList"
import CVPage from "./pages/CVPage"

function App() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <div className="ml-[300px] p-8">
        <Routes>
          <Route path="/" element={<NewApplicant />} />
          <Route path="/list" element={<ApplicantList />} />
          <Route path="/cv/:id" element={<CVPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
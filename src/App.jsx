import { useRoutes, useLocation } from "react-router-dom"
import { BrowserRouter } from "react-router-dom"
import NavBar from "./components/navbar/index.jsx"
import Footer from "./components/footer/index.jsx"
import { ModalProvider } from "./contexts/ModalContext.jsx"
import Modal from "./components/modal/index.jsx"
import { routes } from "./routes/index.jsx"
import "./App.css"

function AppRoutes() {
  const location = useLocation()
  const routeElements = useRoutes(routes)

  return (
    <div className="app">
      <NavBar currentPath={location.pathname} />
      <main className="main-content">{routeElements}</main>
      <Footer />
      <Modal />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ModalProvider>
        <AppRoutes />
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App

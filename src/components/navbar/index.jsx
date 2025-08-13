import React, { useState } from "react"
import { Link } from "react-router-dom"
import logoFitForge from "../../assets/images/logos/logo.png"
import { Headset } from "lucide-react"
import "./style.css"

const NavBar = ({ currentPath }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isActive = (path) => {
    if (path === "/" && currentPath === "/") return true
    if (path !== "/" && currentPath.startsWith(path)) return true
    return false
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <img id="imgLogo" src={logoFitForge} alt="Logo do sistema" />
          </div>
          <span className="brand-text">FitForge</span>
        </Link>

        {/* Botão Hambúrguer para telas pequenas */}
        <button
          className={`mobile-menu-btn d-lg-none ${isMobileMenuOpen ? "active" : ""}`}
          type="button"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen} 
          aria-controls="navbarNav" 
        >
          <span className="hamburger"></span>
          <span className="hamburger"></span>
          <span className="hamburger"></span>
        </button>

        {/* Conteúdo do Menu de Navegação */}
        <div className={`navbar-collapse ${isMobileMenuOpen ? "show-mobile-menu" : ""} d-lg-flex`} id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} onClick={closeMobileMenu}>
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/users" className={`nav-link ${isActive("/users") ? "active" : ""}`} onClick={closeMobileMenu}>
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/workouts"
                className={`nav-link ${isActive("/workouts") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                Treinos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/exercises"
                className={`nav-link ${isActive("/exercises") ? "active" : ""}`}
                onClick={closeMobileMenu}
              >
                Exercícios
              </Link>
            </li>
          </ul>
          <div className="navbar-nav">
            <Link to="/#contactSection" className="btn btn-primary d-flex align-items-center" onClick={closeMobileMenu}>
              <Headset className="me-2" />
              Contato
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
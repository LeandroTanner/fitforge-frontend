import "./style.css"
import logoFitForge from '../../assets//images/logos/logo.png'
import { Link } from "react-router-dom"
import { Globe } from "lucide-react"
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-brand d-flex align-items-center mb-3">
              <div className="brand-icon">
                <img className="w-100" src={logoFitForge} alt="Logo do sistema" />
              </div>
              <span className="brand-text">FitForge</span>
            </div>
            <p className="footer-description">A plataforma para montar treinos simples e eficaz.</p>
          </div>

          <div className="col-md-2">
            <h6 className="footer-title">Produto</h6>
            <ul className="footer-links">
              <li>
                <a href="/#heroSection">Sobre</a>
              </li>
              <li>
                <Link to="/users">Usuários</Link>
              </li>
              <li>
                <Link to="/workouts">Treinos</Link>
              </li>
              <li>
                <Link to="/exercises">Exercícios</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-2">
            <h6 className="footer-title">Dúvidas</h6>
            <ul className="footer-links">
              <li>
                <a href="mailto:leandrotanner2@gmail.com">Email</a>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="footer-title">Criador por</h6>
            <p>Leandro Arantes Tanner</p>
            <div className="social-links">
              <a href="https://ltdev.site" target="_blank" className="social-link">
                <Globe /> { /* Icone de globo para representar o portifólio */ }
              </a>
              <a href="https://github.com/LeandroTanner" target="_blank" className="social-link">
                <FaGithub size={24} />
              </a>
              <a href="https://bit.ly/instagramltanner" target="_blank" className="social-link">
                <FaInstagram size={24} />
              </a>
              <a href="https://bit.ly/linkedinltanner" target="_blank" className="social-link">
                <FaLinkedinIn size={24} />
              </a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row">
          <div className="col-12 text-center">
            <p className="footer-copyright">&copy; 2025 FitForge. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

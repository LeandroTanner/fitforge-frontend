import { Link } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useLocation } from "react-router-dom"
import TreinoAbdominal from "../../assets/images/examples/treinoAbdominal.png"
import { Dumbbell, UsersRound, BicepsFlexed, Rocket } from "lucide-react"
import FeatureCard from "../../components/cards/feature-cards/index.jsx"
import "./style.css"
import ContactForm from "../../components/contact-form/index.jsx"

const Home = () => {

  const location = useLocation();
  const sectionRefs = useRef({});

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); 
      const element = sectionRefs.current[id]; 

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
      }
    }
  }, [location]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="heroSection" className="hero-section">
        <div className="container">
          <div className="row align-items-center justify-content-space">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Crie seus treinos de forma <span className="text-primary">simples</span> e{" "}
                <span className="text-primary">eficaz</span>
              </h1>
              <p className="hero-description">
                O FitForge é a plataforma completa para personal trainers e academias criarem, gerenciarem e
                acompanharem treinos personalizados para seus alunos.
              </p>
              <div className="hero-buttons links-para-telas">
                <a href="#featuresSection" className="hero-links-local"> 
                  <UsersRound className="me-2" strokeWidth={1.5} />
                  Usuários 
                </a>
                <a href="#featuresSection" className="hero-links-local"> 
                  <Dumbbell className="me-2" strokeWidth={1.5} />
                  Treinos 
                </a>
                <a href="#featuresSection" className="hero-links-local"> 
                <BicepsFlexed className="me-2" strokeWidth={1.5} />
                  Exercícios 
                </a>
              </div>
            </div>
            <div className="col-lg-6 image-container">
              <div className="hero-image">
                <img
                  src={TreinoAbdominal}
                  alt="Mulher treinando abdominal"
                  className="img-fluid rounded-3 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="featuresSection" className="features-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="section-title">Funcionalidades Principais</h2>
              <p className="section-subtitle">Tudo que você precisa para gerenciar seus treinos em um só lugar</p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Usuários */}
            <FeatureCard
              IconComponent={UsersRound}
              iconClass="users-icon"
              title="Usuários"
              description="Gerencie todos os seus alunos em um só lugar. Cadastre informações pessoais, acompanhe o progresso e mantenha um histórico completo."
              linkTo="/users"
              linkText="Acessar"
            />

            {/* Treinos */}
            <FeatureCard
              IconComponent={Dumbbell}
              iconClass="workouts-icon"
              title="Treinos"
              description="Crie treinos personalizados com exercícios específicos, séries e repetições. Organize por grupos musculares e objetivos."
              linkTo="/workouts"
              linkText="Acessar"
            />

            {/* Exercícios */}
            <FeatureCard
              IconComponent={BicepsFlexed}
              iconClass="exercises-icon"
              title="Exercícios"
              description="Biblioteca completa de exercícios com descrições detalhadas, imagens e instruções para execução correta."
              linkTo="/exercises"
              linkText="Acessar"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <h2 className="cta-title">Pronto para começar?</h2>
              <p className="cta-description">Comece a criar treinos incríveis para seus alunos hoje mesmo</p>
              <Link to="/users" className="btn btn-light btn-lg">
                <Rocket className="me-3" />
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section 
        id="contactSection"
        ref={el => sectionRefs.current['contactSection'] = el} 
        className="contact-section py-5 min-vh-100 justify-content-center d-flex align-items-center" 
        style={{ backgroundColor: '#235DE6'}} 
      >
        <div className="container">
          <h2 className="text-center mb-4 text-light  fs-1">Fale Conosco!</h2>
          <p className="text-center text-light fs-6">Estamos prontos para tirar suas dúvidas.</p>
          
          <ContactForm onSuccess={() => setShowModal(true)} />
        </div>
      </section>


      {/* 4. O componente do modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content text-center">
            <h3>Mensagem Enviada!</h3>
            <p>Sua mensagem foi enviada com sucesso. Em breve entraremos em contato!</p>
            <button className="btn btn-success" onClick={() => setShowModal(false)}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home

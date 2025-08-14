import { PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import './style.css'

const HeaderAdm = ( { title, description, buttonText, icon, route = '/users/new' } ) => {
    return (
        <div className="page-header">
        <div className="container-header-adm">
          <div className="row align-items-center content-header-adm">
            <div className="col-md-8 header-title-adm">
              <h1 className="page-title">
                {icon}
                Painel administrativo {title ? `- ${title}` : ''}
              </h1>
              <p className="page-subtitle">{ description ? description : '' }</p>
            </div>
            <div className="col-md-4 text-end footer-header-adm">
              {buttonText ? 
                <Link to={route} className="btn btn-light btn-lg d-flex align-items-center justify-content-center btn-add-header-adm" style={{ maxWidth: '300px' }}>
                  <PlusCircle className='me-2' size={28} />
                  Adicionar { buttonText ? buttonText : '' }
                </Link>  
                :
                ''            
              }
            </div>
          </div>
        </div>
      </div>
    )
}

export default HeaderAdm
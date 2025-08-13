import { Link } from "react-router-dom"
import { MoveRight } from "lucide-react"

const FeatureCard = ({ IconComponent, iconClass, title, description, linkTo, linkText }) => {
  return (
    <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
      <div className="feature-card h-100 d-flex flex-column justify-content-between p-4 shadow-sm">
        <div className={`feature-icon ${iconClass}`}>
          {IconComponent && <IconComponent size={48} strokeWidth={1.5} />}
        </div>
        <div className="feature-content">
          <h4>{title}</h4>
          <p>{description}</p>
        </div>
        <div className="feature-footer">
          <Link to={linkTo} className="btn btn-outline-primary mt-3">
            <MoveRight className="me-3" size={20} />
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeatureCard

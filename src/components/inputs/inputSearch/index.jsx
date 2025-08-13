const InputSearch = ({ value, onChange, placeholder }) => {
  return (
    <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder={ placeholder || "Buscar..."}
                value={value}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default InputSearch;
const Progress = ({label, value}) => {
    return(
        <div className="progress-row">
            <div className="progress-label">
                <p>{label}</p>
                <p>{value}%</p>
            </div>
            <div className="progress-bar">
                <div style={{width: `${value}%`}} className="progress-value">

                </div>
            </div>
        </div>
    )
}

export default Progress;
import './tasks.scss'
import edit from '../../assets/img/edit.svg'

function Tasks(){
    return(
        <div className="tasks">
            <h2 className="tasks__title">
                ibubizm
                <img src={edit} alt="edit" />
            </h2>
            <div className="cheackbox">
                <input id="check" type="checkbox" />
                <label htmlFor="check">
                    <svg
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        
                        <path
                            d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                            stroke="#000"
                            strokeWidth="1.5"
                            // strokeStrokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </label>
                <p className="task__name">do dod </p>
            </div>
        </div>
    )
}

export default Tasks
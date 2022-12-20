import "./app-info.css";

const AppInfo = ({employeesForRise, employees, employeesForPromotion}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N: {employeesForRise}</h1>
            <h2>Общее число сотрудников: {employees}</h2>
            <h2>Премию получат: {employeesForPromotion}</h2>
        </div>
    )
}

export default AppInfo;
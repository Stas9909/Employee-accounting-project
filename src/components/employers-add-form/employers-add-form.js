import {Component} from "react"
import "./employers-add-form.css";

class employersAddForm extends Component {
    constructor (props){
        super(props)
        this.state={
            name: "",
            salary: ""
        }
    }

    onValueChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onAddEmploee=(e)=>{
        e.preventDefault();
        if(!this.state.name || !this.state.salary) return
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: "",
            salary: ""
        })
        if(this.id){this.id++};
    }

    static onLog = () => {
        console.log("Hello");
    }

    static logged = "on";

    render(){
        const {name, salary}=this.state

        return(
            <div className="app-add-form">

                <h3>Добавьте нового сотрудника</h3>
                <form className="add-form d-flex"
                    onSubmit = {this.onAddEmploee}>
                    <input type="text" 
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"
                        value={name}
                        onChange={this.onValueChange}/>
                    <input type="number" 
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}
                        onChange={this.onValueChange}/>
    
                    <button type="submit"
                            className="btn btn-outline-light">Добавить</button>
                </form>
            </div>
        )
    }    
}

employersAddForm.onLog();
console.log(employersAddForm.logged);

export default employersAddForm
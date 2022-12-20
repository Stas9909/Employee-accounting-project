import {Component} from "react";
import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployersList from "../employers-list/employers-list";
import EmployersAddForm from "../employers-add-form/employers-add-form";

import "./app.css";

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            data: [
                {name: "John C.", salary: 800, increase: false, promotion: true, id: 1},
                {name: "Alex M.", salary: 3000, increase: true, promotion: false, id: 2},
                {name: "Carl W.", salary: 6000, increase: false, promotion: false, id: 3}
            ],
            term:'',
            filter: "allEmploees"
        }
        this.id = 4;
    }

    deleteItem = (id) => {
        this.setState(({data})=>{
            // const index = data.findIndex(elem => elem.id === id);

            // const before = data.slice(0, index);
            // const after = data.slice(index +1);

            // const newArr = [...before, ...after];

            // return{
            //     data: newArr
            // }

            return{
                data: data.filter(item=>item.id !== id)
            }  
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            promotion: false,
            id: this.id++
        }
        this.setState(({data}) =>{
            const newArr = [...data, newItem];
            return{
                data: newArr
            }  
        });
    }

    // onToggleIncrease = (id) => {
        // this.setState(({data}) => {
            // const index = data.findIndex(elem=>elem.id === id);

            // const oldObj = data[index];
            // const newObj = {...oldObj, increase: !oldObj.increase};
            // const newArr = [...data.slice(0, index), newObj, ...data.slice(index +1)];

            // return {
            //     data: newArr
            // }
        // })
    onToggleIncrease = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return{...item, increase: !item.increase}
                }
                return item;
            })
        }))
    }

    onToggleRise = (id) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return{...item, promotion: !item.promotion}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if(term.length===0){
            return items
        }

        return items.filter(item=>{
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }
 
    filterEmp = (items, filter) =>{
        switch (filter){
            case "promotion":
                return items.filter(item => item.promotion);
                break;
            case "salaryFrom1000":
                return items.filter(item=>item.salary > 1000);
                break;
            default: 
                return items;
        }
    }

    render() {
        const {data, term, filter} = this.state
        const employees = this.state.data.length; 
        const employeesForPromotion = this.state.data.filter(item=>item.increase).length;
        const employeesForRise = this.state.data.filter(item=>item.promotion).length;
        const visibleData = this.filterEmp(this.searchEmp(data, term), filter);

        //ИЛИ

        // const employeesForPromotion = this.state.data.filter(item=>{
        //     if(item.increase===true)
        //         return(item)
        // }).length
        
        return(
            <div className="app">
                <AppInfo
                    employees = {employees}
                    employeesForPromotion = {employeesForPromotion}
                    employeesForRise = {employeesForRise}/>
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <EmployersList 
                    data={visibleData}
                    onDelete={this.deleteItem}
                    onToggleIncrease={this.onToggleIncrease}
                    onToggleRise={this.onToggleRise}/>
                <EmployersAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}

export default App;
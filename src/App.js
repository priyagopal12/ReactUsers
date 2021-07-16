import React,{useEffect, useState} from "react";
import Navbar from "./Components/Navbar";
import MaterialTable from 'material-table';
import './App.css';

function App() {
  const [data, setData] = useState([])
  useEffect(() => {
    getUsers()
  },[])

  const getUsers = () =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(response => setData(response))
  }
  const columns = [
    {title: "Name" , field: "name",validate:rowData => rowData.name===undefined || rowData.name===""?"Required":true},
    {title: "Username" , field: "username",validate:rowData => rowData.username===undefined || rowData.username===""?"Required":true},
    {title: "Email" , field: "email",validate:rowData => rowData.email===undefined || rowData.email===""?"Required":true},
    {title: "Phone" , field: "phone",validate:rowData => rowData.phone===undefined || rowData.phone===""?"Required":true},
    {title: "Website" , field: "website",validate:rowData => rowData.website===undefined || rowData.website===""?"Required":true}
  ]
  return (
    <div className="App">
      <Navbar />
      <h1 align="center">React Application</h1>
      <MaterialTable
        title="User Details"
        columns={columns}
        data={data}
        options={{actionsColumnIndex:-1,addRowPosition:"first"}}
        editable={{
          onRowAdd:(newData) => new Promise((resolve,reject) => {
            fetch('https://jsonplaceholder.typicode.com/users',{
              method:"POST",
              headers:{
                'Content-type':"application/json"
              },
              body:JSON.stringify(newData)
            }).then(response=>response.json())
            .then(response=>{getUsers()
            resolve()})
          }),
          onRowUpdate:(newData,oldData) => new Promise((resolve,reject) => {
            fetch('https://jsonplaceholder.typicode.com/users/'+oldData.id,{
              method:"PUT",
              headers:{
                'Content-type':"application/json"
              },
              body:JSON.stringify(newData)
            }).then(response=>response.json())
            .then(response=>{getUsers()
            resolve()})
          }),
          onRowDelete:(oldData) => new Promise((resolve,reject) => {
            fetch('https://jsonplaceholder.typicode.com/users/'+oldData.id,{
              method:"DELETE",
              headers:{
                'Content-type':"application/json"
              }
            }).then(response=>response.json())
            .then(response=>{getUsers()
            resolve()})
          })
        }}
      />
    </div>   
  );
}

export default App;
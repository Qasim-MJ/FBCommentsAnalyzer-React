import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Landing from './app/screens/landing'
import Dashboard from './app/screens/dashboard';
import Context from './app/components/Context'


class App extends Component {
    constructor(){
          super() 
          this.state={
              isLogedin : false
          }
    }

    componentWillMount() {
       
        let userFacebookData = JSON.parse(localStorage.getItem("userFacebookData"))
       if (userFacebookData == null) {
           this.setState({isLogedin : false})
       } else {
        let url = `https://graph.facebook.com/v3.2/me?access_token=${userFacebookData.accessToken}`
        fetch(url , {
            method : 'GET'
             })
             .then((res)=>{
                 return res.json()
             }) 
             .then((data)=>{
                 if (data.id) {
                     this.setState({isLogedin : true})
                 } else {
                    localStorage.removeItem("userFacebookData")

                 }
 
             })
       }

       
    }

    _checklogin(){
        if (this.state.isLogedin) {
            return (
               <Dashboard />
            )
        } else {
            return (
                <Landing/>
            )
        }
    }

    render() {
         return ( 
             <Context.Provider value={{
                 state : this.state ,
                 actions : {
                     login : (response)=>{
                        if (response.error) {
                            this.setState({isLogedin : false})
                            alert('An Error Occured')
                        } else {
                            localStorage.setItem("userFacebookData" , JSON.stringify(response))
                        this.setState({isLogedin : true})
                        }
                     },
                     logout : ()=>{
                        localStorage.removeItem("userFacebookData")
                        this.setState({isLogedin : false})
                        window.open('/' , '_self')
                     }
                 }
             }}>
                {this._checklogin()}
                
             </Context.Provider>
         )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
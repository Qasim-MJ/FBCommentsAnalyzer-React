import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'

let Container = styled.div`
    width : 100%;
    padding:0;
    margin:0;
    display : flex;
    flex-direction : column ;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;

`
let HeaderDiv = styled.div`
    padding : 10px;
    display : flex; 
    justify-content : center;
    width:100%;
`

let Header = styled.h1`
    color: #4C6AB5 ;
    font-size: 2rem;
`
let PagesContainer = styled.div`
    width:100%;
    display : flex ;
    justify-content: center;
    margin:0;
    padding:0;
    flex-wrap : wrap;
`

let PageCard = styled.div`
    display : flex ;
    justify-content: center;    
    width:15%;
    flex-direction : column;
    align-items: center;
    margin : 50px;
    border-color : #e1e1e1 ;
    border-width : 1px;
    border-style : solid;
`
let PageImage = styled.img`
    width : 100%;
`

let PageInfoDiv = styled.div`
    background-color : #ffffff;
    display:flex;
    flex-direction : column ;
    align-items : center ;
    justify-content : center;
    padding : 10px;

`

let PageTitle = styled.h4`
    opacity : 0.8;
    padding:0;
    margin:0;
`
let PageCategory = styled.h5`
    opacity : 0.5;
    padding:0;
    margin:0;
    
`

export default class Pages extends Component {
    constructor(){
        super()
        this.state = {
            pages : [{name : ''}] 
        }
    }
    componentWillMount(){
       let userFacebookData = JSON.parse(localStorage.getItem("userFacebookData"))
        let url = `https://graph.facebook.com/v3.2/me/accounts?access_token=${userFacebookData.accessToken}`
       fetch(url , {
           method : 'GET'
            })
            .then((res)=>{
                return res.json()
            }) 
            .then((data)=>{
                this.setState({pages : data.data , accessToken : userFacebookData.accessToken})

            })
        }
    render(){
        return(
           <Container>
                <HeaderDiv>
                <Header>
                    Select A Page
                </Header>
                </HeaderDiv>
                <PagesContainer>
                    {this.state.pages.map((page,i)=>{
                        return (
                            <PageCard key={i}>
                            <Link style={{color : '#000000' , textDecoration: 'none'}} key={i} to={`/posts/${page.id}`} >
                                <div>
                                <PageImage src={`https://graph.facebook.com/v3.2/${page.id}/picture?type=large&access_token=${this.state.accessToken}`} />
                                </div>
                                <PageInfoDiv>
                                <PageTitle>{page.name}</PageTitle>
                                <PageCategory>{page.category}</PageCategory>
                                </PageInfoDiv>
                            </Link>
                            </PageCard>
                        )
                    })}
                </PagesContainer>
           </Container>
        )
    }
} 
import React, {Component} from 'react'
import styled from 'styled-components'
import Pages from '../components/pages'
import Posts from '../components/posts'
import Comments from '../components/comments'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import Context from '../components/Context'

let Container = styled.div`
    width : 100%;
    padding:0;
    margin:0;
    display : flex;
    justify-content:center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;

`
let LeftDiv = styled.div`
    width : 20%;
    height : 100vh;
    display : flex;
    flex-direction : column ;
    align-items : center ;
    padding:10px;

`
let DashboardTitle = styled.h1`
    color : #4C6AB5 ;
    font-size: 2rem;
`
let UserDataDiv = styled.div`
    width : 80%;
    display : flex;
    align-items : center;
    justify-content : space-evenly;
`
let UserImage = styled.img`
    border-radius : 25px;
`
let UserName = styled.p`
    font-size : 1rem;
    opacity : 0.8;
    font-weight : bold;
    margin : 0;
`
let UserId = styled.p`
    font-size : 0.7rem;
    opacity : 0.5;
    font-weight : bold;
    margin : 0;
`

let RightDiv = styled.div`
    width : 79%;
    min-height : 100vh;
    border-left-style: solid;
    border-left-color : #eaeaea;
    border-left-width: 3px;
`

let RouterDiv = styled.div`
`
export default class Dashboard extends Component {
    render(){
        console.log(JSON.parse(localStorage.getItem('userFacebookData')))
        return (
            <Context.Consumer>
                {
                    (ctx)=>{
                        let userFacebookData = JSON.parse(localStorage.getItem('userFacebookData'))
                        return (
                            <Container>
                                <LeftDiv>
                                    <DashboardTitle>Dashboard</DashboardTitle>
                                    <UserDataDiv>
                                        <UserImage src={userFacebookData.picture.data.url} />
                                        <div>
                                        <UserName>{userFacebookData.name}</UserName>
                                        <UserId>{userFacebookData.userID}</UserId>
                                        </div>
                                    </UserDataDiv>
                                <button onClick={()=>{ctx.actions.logout()}}>Log out</button>
                                </LeftDiv>
                                <RightDiv>
                                    <RouterDiv>
                                        <Router>
                                            <div>
                                            <Route exact path="/" component={Pages} />
                                            <Route path="/posts/:id" component={Posts} />
                                            <Route path="/comments/:id" component={Comments} />
                                            </div>
                                        </Router>
                                    </RouterDiv>
                                </RightDiv>
                                    
                            </Container>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}
import React, {Component} from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import styled from 'styled-components'
import Loading from '../assets/loading.gif'

let LoadingContainer = styled.div`
    width : 100%;
    height : 90vh;
    display : flex;
    align-items : center;
    justify-content:center;
`

let LoadingImage = styled.img`
    width : 100px;
`
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
let PostsContainer = styled.div`
    width:100%;
    display : flex ;
    justify-content: center;
    margin:0;
    padding:0;
    flex-wrap : wrap;
`

let PostCard = styled.div`
    display : flex ;
    /* justify-content: center;     */
    width:25%;
    flex-direction : column;
    align-items: center;
    margin : 50px;
    border-color : #e1e1e1 ;
    border-width : 1px;
    border-style : solid;
`
let PostImage = styled.img`
    width : 100%;
    height : 300px;
    object-fit : cover;
`

let PostInfoDiv = styled.div`
    background-color : #ffffff;
    display:flex;
    flex-direction : column ;
    align-items : center ;
    justify-content : center;
    padding : 10px;
    text-align:right;

`

let PostTitle = styled.h4`
    opacity : 0.8;
    padding:0;
    margin:0;
    width: 250px;
    height : 100px;
     white-space: pre-wrap;
     overflow: hidden;
     text-overflow: ellipsis;
`


export default class Posts extends Component {
    constructor(){
        super()
        this.state = {
            posts : [],
            isLodaingComplete : false
        }
    }
    componentWillMount(){
        let userFacebookData = JSON.parse(localStorage.getItem("userFacebookData"))
         let postsURL = `https://graph.facebook.com/v3.2/${this.props.match.params.id}/posts?fields=full_picture,message&access_token=${userFacebookData.accessToken}`
        fetch(postsURL , {
            method : 'GET'
             })
             .then((res)=>{
                 return res.json()
             }) 
             .then((data)=>{
                this.setState({posts : data.data , isLodaingComplete : true})
               console.log(data.data)
             })
         }

         
    render(){
       if (this.state.isLodaingComplete) {
            return(
                <Container>
                        <HeaderDiv>
                        <Header>
                            Select A Post
                        </Header>
                        </HeaderDiv>
                        <PostsContainer>
                            {this.state.posts.map((post,i)=>{
                                return (
                                    <PostCard key={i}>
                                    <Link style={{color : '#000000' , textDecoration: 'none'}} key={i} to={{ 
                                                                                                            pathname: `/comments/${post.id}`, 
                                                                                                            imageURL: this.state.postsImages[i].full_picture,
                                                                                                            postMessage : post.message,
                                                                                                            created_time : post.created_time }} >
                                        <div>
                                        <PostImage src={post.full_picture} />
                                        </div>
                                        <PostInfoDiv>
                                        <PostTitle>{post.message}</PostTitle>
                                        </PostInfoDiv>
                                    </Link>
                                    </PostCard>
                                )
                            })}
                        </PostsContainer>
                </Container>
            )
       } else  {
           return (
               <LoadingContainer>
                   <LoadingImage src={Loading} />
               </LoadingContainer>
           )
       }
    }
}
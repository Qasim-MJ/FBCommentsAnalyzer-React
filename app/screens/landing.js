import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import FacebookLogin from 'react-facebook-login';
import Context from '../components/Context'
import LandingSVG from '../assets/art.svg'


  let Container = styled.div`
    width : 100% ;
    height : 100vh ;
    display : 'flex';
  `
  let ProjectNameDiv = styled.div`
    padding: 10px;
    margin-top : -20px;
    margin-left: 20px;
  `
  let ProjectName = styled.h1`
    color : #4C6AB5 ;
    font-size: 4rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif ;
  `
  let FBLoginDiv = styled.div`
    padding: 10px;
    margin-left: 20px;
  `
  let ImageDiv = styled.div`
    display : flex;
    justify-content:flex-end;
    margin-top : -120px;
  `
  let LandingImage = styled.img`
    width : 50%;
    height : 50%;
  `
  
export default class Landing extends Component {
    render(){
        return (
            <Context.Consumer>
                {
                    (ctx)=>{
                        return (
                            <Container>
                                <ProjectNameDiv>
                                    <ProjectName>
                                        Facebook Comments Sentiment <br/> Analyzer
                                    </ProjectName>
                                </ProjectNameDiv>
                                <FBLoginDiv>
                                    <FacebookLogin
                                        appId="782827242067456"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={ctx.actions.login}
                                        scope="pages_show_list,manage_pages"
                                        icon="fa-facebook"
                                    />
                                </FBLoginDiv>
                                <ImageDiv>
                                    <LandingImage src={LandingSVG} />
                                </ImageDiv>
                            </Container>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}
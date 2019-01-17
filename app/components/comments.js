import React, {Component} from 'react'
import styled from "styled-components"
import Loading from '../assets/loading.gif'

let LoadingContainer = styled.div`
    width : 100%;
    height : 90vh;
    display : flex;
    align-items : center;
    justify-content:center;
    flex-direction : column;
`

let LoadingImage = styled.img`
    width : 100px;
`
let Container = styled.div`
    width:100%;
    display : flex;
    flex-direction:column;
    justify-content : center;
    align-items:center;
    background-color : #E9EBEE;

`
let PostDiv = styled.div`
    border-color : #e1e1e1 ;
    border-width : 1px;
    border-style : solid;
    width:50%;
    background-color : #FFFFFF;
`
let PostDate = styled.p`
    padding : 10px;
    opacity : 0.5;
    font-weight : bold;
`
let PostMessage = styled.p`
    text-align : right;
    padding : 10px;
    font-size : 1.2rem;
    opacity : 0.8;

`
let PostImage = styled.img`
    width:100%;
`

let CommentsDiv = styled.div`
    width:50%;
    display:flex;
    flex-direction : column ;
    align-items : center;
    background-color : #FFFFFF;
`

let CommentDiv = styled.div`
    width: 95%;
    display:flex;
    border-radius : 20px;
    flex-wrap : nowrap;
    justify-content : flex-end;
    margin-top : 20px;
    background-color: #f1f1f1;
`

let CommentText = styled.p`
    padding : 12px;
    margin : 0;
    width:95%;
    text-align : right;
`
let CommentScoreRed = styled.p`
    padding : 15px;
    margin : 0;
    border-bottom-right-radius : 20px;
    border-top-right-radius : 20px;
    background-color : #fc5e55;
    width : 5%;
    text-align : center;
    color:#FFFFFF;
`
let CommentScoreGreen = styled.p`
    padding : 15px;
    margin : 0;
    border-bottom-right-radius : 20px;
    border-top-right-radius : 20px;
    background-color : #2aa800;
    width : 5%;
    text-align : center;
    color:#FFFFFF;
`
let CommentScoreGray = styled.p`
    padding : 15px;
    margin : 0;
    border-bottom-right-radius : 20px;
    border-top-right-radius : 20px;
    background-color : #cecece;
    width : 5%;
    text-align : center;
    color:#FFFFFF;
`
let TotalRatingDiv = styled.div`
    width : 100%;
    display : flex ; 
    justify-content : center ;
    align-items : center;
`
let TotalRating = styled.p`
    opacity : 0.8;
    font-size : 1.2rem;
    font-weight : bold;
`
let TotalRatingGreen = styled.p`
    opacity : 0.8;
    font-size : 1.3rem;
    color: green;
    margin-left : 5px;
    font-weight : bold;
`
let TotalRatingRed = styled.p`
    opacity : 0.8;
    font-size : 1.3rem;
    color: red;
    margin-left : 5px;
    font-weight : bold;
`
let TotalRatingGray = styled.p`
    opacity : 0.8;
    font-size : 1.3rem;
    color: black;
    margin-left : 5px;
    font-weight : bold;
`

export default class Posts extends Component {
    constructor(){
        super()
        this.state = {
            comments : [{"text" : ''}],
            isLoadingComplete : false,
            totalRating : 0 
        }
    }

    _analyzeComments(commentsToAnalyze){
        const analyzeURL = 'https://app-abf2544b-39a8-46ee-bb1d-6556b78e4a7b.cleverapps.io/analyze'
        fetch( analyzeURL , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type' : 'application/json'

            },
            body: JSON.stringify({
                text : commentsToAnalyze
            })
        })
        .then( (res) => {
            return res.json()

        }).then((data)=>{
            let totalRating = 0
            for (let i = 0; i < data.length; i++) {
                const element = data[i];
                totalRating = totalRating + element.score
                
            }
            this.setState({comments : data , isLoadingComplete : true , totalRating : totalRating})
        })
    }
    componentWillMount(){
        let commentsToAnalyze = []
        let userFacebookData = JSON.parse(localStorage.getItem("userFacebookData"))
         let url = `https://graph.facebook.com/v3.2/${this.props.match.params.id}/comments?limit=1000&access_token=${userFacebookData.accessToken}`
        fetch(url , {
            method : 'GET'
             })
             .then((res)=>{
                 return res.json()
             }) 
             .then((data)=>{
                this.setState({comments : data.data})
                
                for (let i = 0; i < data.data.length; i++) {
                    let comment = data.data[i];
                    commentsToAnalyze.push({'comment' : comment.message})
                    
                }
                this._analyzeComments(commentsToAnalyze)
              
             })
         }

         _checkScore(commentScore){
            if (commentScore > 0) {
                return (
                    <CommentScoreGreen>
                        {commentScore}
                    </CommentScoreGreen>
                )
            } else if (commentScore < 0) {
                return (
                    <CommentScoreRed>
                        {commentScore}
                    </CommentScoreRed>
                )
            } else {
                return (
                    <CommentScoreGray>
                        {commentScore}
                    </CommentScoreGray>
                )
            }
        
         }
         _totalRating(totalRating){
             if (totalRating > 0 ) {
                 return (
                     <TotalRatingGreen>
                         {totalRating}
                     </TotalRatingGreen>
                 )
             } else if (totalRating < 0 ) {
                return (
                    <TotalRatingRed>
                        {totalRating}
                    </TotalRatingRed>
                ) } else {
                    return (
                        <TotalRatingGray>
                            {totalRating}
                        </TotalRatingGray>
                    )
                }
            }
         
    render(){
        if (this.state.isLoadingComplete) {
            return (
                <Container>
                    <PostDiv>
                        <PostDate>{this.props.location.created_time}</PostDate>
                        <PostMessage>{this.props.location.postMessage}</PostMessage>
                        <PostImage src={this.props.location.imageURL} />
                        <TotalRatingDiv>
                            <TotalRating>Total Post Rating Index :</TotalRating>
                            {this._totalRating(this.state.totalRating)}
                        </TotalRatingDiv>
                    </PostDiv>
                    <CommentsDiv>
                         {this.state.comments.map((comment , i)=>{
                        return (
                            <CommentDiv key={i}>
                                <CommentText>
                                    {comment.text}
                                </CommentText>
                                {
                                    this._checkScore(comment.score)
                                        
                                }
                            </CommentDiv>
                        )
                    })}
                    </CommentsDiv>
                   
                </Container>
            )
        } else {
            return (
                <LoadingContainer>
                    <p>Analyzing</p>
                <LoadingImage src={Loading} />
                </LoadingContainer>
            )
        }
                
           
    }
}
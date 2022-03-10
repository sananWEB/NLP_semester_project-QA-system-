import React, {useRef, useEffect, useState} from 'react';
import './App.css';
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";



const App = () => {

  
  const passageRef = useRef(null); 
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState(""); 
  const [model, setModel] = useState(null); 

  
  const loadModel = async ()=>{
    const loadedModel = await qna.load()
    setModel(loadedModel); 
  //  console.log('Model loaded.')
  } 


  const answerQuestion = async (e) =>{
    
    if (e.which === 13 && model !== null ){
      console.log('Question submitted.')
      const passage = passageRef.current.value
      const question = questionRef.current.value

      const answers = await model.findAnswers(question, passage)
      setAnswer(answers[0]); 
      console.log(answers[0])

    }   
  }

  useEffect(()=>{loadModel()}, [])

  return (
    <div className="App">
      <header className="App-header">
        {model ==null ? 
          <div>
            <div>Model Loading</div>      
            <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}/>
          </div> 
          :  
          <React.Fragment>
            paragraph
            <textarea ref={passageRef} rows="20" cols="80"></textarea>
            Ask a Question
            <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
            <br /> 
            Answers

            {/* {answer ? <div><b>Answer {1} - </b> {answer[0].text} </div> : ""} */}

            {answer ?<div>{answer.text}</div> :answer==undefined?<div>no answer</div>: ""}

            </React.Fragment>
        } 
      </header>
    </div>
  );
}

export default App
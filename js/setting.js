/// <reference path="../typings/globals/jquery/index.d.ts" />
import { Quiz } from './quiz.js'
export class Setting{
    constructor(){
        document.getElementById('startBtn').addEventListener('click', ()=>{
            this.startQuestion()
        })
    }

    async startQuestion(){
        const cat = document.getElementById("category").value 
        // const diff =Array.from(document.getElementsByName("difficulty")).find((item)=>{
        //     return item.checked
        // })
        const diff = document.querySelector('[name="difficulty"]:checked').value
        const questionsNumber = document.getElementById('numberOfQuestions').value
        // console.log(questionsNumber);
        if(questionsNumber > 0){
            const respose = await this.getApi(questionsNumber ,cat, diff)
            console.log(respose);
            $('#setting').fadeOut(300, ()=>{
                $("#quiz").fadeIn(300)
            })

            let quiz = new Quiz(respose );
            
            
        }
     
        else
        {
            $("#alert1").fadeIn(300)
        }
        
    }
    async getApi(questionsNumber ,cat, diff){
        const apiRespons =await fetch(`https://opentdb.com/api.php?amount=${questionsNumber}&category=${cat}&difficulty=${diff}`)
        const response = await apiRespons.json(apiRespons)
        return response;
    }
}
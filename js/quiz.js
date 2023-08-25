export class Quiz{
    constructor(response){
        this.currentIndex = 0;
        this.response = response
    
        this.currentQuestion= document.getElementById('currentQuestion')
        this.totalNumberOfQuestions = document.getElementById('totalNumberOfQuestions').innerHTML = response.results.length;
        this.question = document.getElementById('question');
        this.rowAswers= document.getElementById("rowAnswer")
        document.getElementById('next').addEventListener('click', ()=>
        {
            this.nextQuestions()
        })
        this.showQuestion()
        this.correctAnswer;
        this.score=0
        document.getElementById('tryBtn').addEventListener('click', function(){
            location.reload();
        })
    
        
    }

    showQuestion(){
        
        this.currentQuestion.innerHTML = this.currentIndex+1;
        this.question.innerHTML = this.response.results[this.currentIndex].question;
        const answers =[...this.response.results[this.currentIndex].incorrect_answers] ;
         this.correctAnswer= this.response.results[this.currentIndex].correct_answer
        let random = Math.ceil(Math.random() * answers.length)
        answers.splice(random, 0, this.correctAnswer)
        let questionsContainer= ``
        for (let i = 0; i < answers.length; i++) {
           questionsContainer+=` 
           <label class="form-check-label ">
           <input type="radio" class="form-check-input" name="answer"  value="${answers[i]}">
           ${answers[i]}
       </label> 
       <br/>`
            
        }
        this.rowAswers.innerHTML = questionsContainer

    }

    nextQuestions(){
        const choice = document.querySelector('[name="answer"]:checked')?.value

        if(choice != undefined){
            this.currentIndex++
            $('#alert').fadeOut(300)
            if(this.currentIndex > this.response.results.length-1){

                $("#quiz").fadeOut(300)
                $("#finish").fadeIn(300)
                document.getElementById("score").innerHTML = this.score
            }
            else
            {
                if(choice == this.correctAnswer){
                    $("#Correct").fadeIn(0)
                    setTimeout(() => {
                        $("#Correct").fadeOut(0)
                    }, 300);
                    this.score++;
                }
                else{
                    $("#inCorrect").fadeIn(0)
                    setTimeout(() => {
                        $("#inCorrect").fadeOut(0)
                    }, 300);
                }
                this.showQuestion()
            }
           
        }
        else
        {
            
            $('#alert').fadeIn(300)
            
        }
    }
}
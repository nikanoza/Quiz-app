import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Quiz } from '../adition/quiz.model';
import { QuizService } from '../adition/quiz.service';
import { ServerService } from '../adition/server.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})

export class ContentComponent implements OnInit {
  category: String;
  difficality: String;
  quizzes: Quiz[];
  quiz: Quiz[];
  data: any;
  error: string;
  gameIsOn: boolean = false;
  timer: number;
  startTimer: any;
  countQuestion: number = 0;
  correctAnswer: string;
  userAnswer: string;
  score: number = 0;
  insertAnswers: any;
  answerChoosen: boolean = false;


  constructor(private quizService: QuizService, private serverService: ServerService){}

  ngOnInit(){
    this.quizzes = this.quizService.getQuizzes();
  }

  getData(){
    this.quiz = this.quizzes.filter(e=> e['quizCategory'] === this.category && e['quizDifficality'] === this.difficality);
    this.serverService.getApiData(this.quiz[0]['quizLink']).subscribe(
      (d:any[]) => {
        this.data = d;
      },
      (error: Error) => {
        this.error = error.message;
        console.error('There was an error!', error)
      }
    );
  }

  chooseCategory(element,index){
    this.category = element.innerHTML;
    if(this.difficality){
      this.getData();
    }
    let active = setTimeout(()=>{
      let allCategories = document.querySelector("ul").children;
      for(let i = 0; i < 6; i++){
        if(i === index){
          allCategories[i].removeAttribute("style");
          allCategories[i].setAttribute("style", "background: #fff;");
        }else{
          allCategories[i].removeAttribute("style");
          allCategories[i].setAttribute("style", " background: lightseagreen;");
        }
      }
    },0)
  }

  chooseDifficality(element,index){
    this.difficality = element.innerHTML;
    if(this.category){
      this.getData();
    }
    let active = setTimeout(()=>{
      let difficalities = document.querySelector(".difficality").children[0].children;
      for(let i = 0; i < 3; i++){
        if(i === index){
          difficalities[i].removeAttribute("style");
          difficalities[i].setAttribute("style", "background: #fff;");
        }else{
          difficalities[i].removeAttribute("style");
          difficalities[i].setAttribute("style", " background: lightseagreen;");
        }
      }
    },0)
  }

  gameStart(){
    if(!this.difficality || !this.category){
      alert("choose category and difficality first");
    }else{
      this.getData();
      this.gameIsOn = true;
      this.changeTime()
      this.onLoadQuestion();
    }
  }
  changeTime(){
    this.timer = 30;
    this.startTimer = setInterval(()=>{
      if(!this.gameIsOn){
        clearInterval(this.startTimer);
      }
      this.timer = this.timer-1;
      if(this.timer === 0){
        alert("time is up, move to next question");
        clearInterval(this.startTimer);
        if(this.countQuestion < 9){
          this.nextQuestion();
          this.changeTime();
        }else{
          this.submutAnswer();
        }
      }
      let timeElement = document.querySelector(".timer");
      timeElement.innerHTML = 'Time Left: '+ this.timer; 
    },1000)
  }
  onLoadQuestion(){
    let quiz = this.data.results[this.countQuestion];
    let question = quiz.question;
    this.correctAnswer = quiz.correct_answer;
    let array = quiz.incorrect_answers;
    let coreectAnswerIndex = Math.floor(Math.random()*4);
    let answers = [];
    if(coreectAnswerIndex === 0){
      answers = [this.correctAnswer,...array];
    }else if(coreectAnswerIndex === 3){
      answers = [...array,this.correctAnswer];
    }else{
      answers = array.slice(0,coreectAnswerIndex+1);
      answers.push(this.correctAnswer,...array.slice(coreectAnswerIndex+1));
    }
    this.insertAnswers = setTimeout(()=>{
      let liElements = document.querySelector(".quiz").children;
      liElements[0].innerHTML = question;
      for(let i = 1; i< 5; i++){
        liElements[i].innerHTML = answers[i-1];
      }
    },0)
  }
  yourAnswer(element,index){
    this.userAnswer = element.innerHTML;
    let active = setTimeout(()=>{
      let answers = document.querySelector(".quiz").children;
      for(let i = 1; i < 5; i++){
        if(i === index){
          answers[i].removeAttribute("style");
          answers[i].setAttribute("style", "background: #fff;");
        }else{
          answers[i].removeAttribute("style");
          answers[i].setAttribute("style", " background: lightseagreen;");
        }
      }
    },0)
  }
  submutAnswer(){
    if(this.userAnswer){
      this.answerChoosen = true;
      if(this.userAnswer === this.correctAnswer){
        this.score = this.score + 1;
      }
      if(this.countQuestion === 9){
        alert('your score: ' + this.score);
        this.restart();
      }
    }else{
      alert('choose answer!');
    }
  }
  nextQuestion(){
    if(this.countQuestion < 9){
      this.countQuestion += 1;
      this.onLoadQuestion()
      this.answerChoosen = false;
      this.timer = 30;
      this.userAnswer = "";
    }  
    let active = setTimeout(()=>{
      let answers = document.querySelector(".quiz").children;
      for(let i = 1; i < 5; i++){
        answers[i].removeAttribute("style");
        answers[i].setAttribute("style", " background: lightseagreen;");
      }
    },0)
  }
  restart(){
    this.gameIsOn = false;
    this.score = 0;
    this.category = "";
    this.difficality = "";
    this.countQuestion = 0;
    this.answerChoosen = false;
  }
}

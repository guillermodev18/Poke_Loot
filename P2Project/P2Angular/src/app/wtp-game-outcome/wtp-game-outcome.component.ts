import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game-service';

@Component({
  selector: 'app-wtp-game-outcome',
  templateUrl: './wtp-game-outcome.component.html',
  styleUrls: ['./wtp-game-outcome.component.css']
})
export class WtpGameOutcomeComponent implements OnInit {
  @Input() result?: {result:string, picture?:string, win?:boolean};
  @Output() playAgainEmitter = new EventEmitter();
  outcomeText?:string;
  pictureUrl?:string;
  win?:boolean;
  numCoinsToAdd: number = 50;
  currentUserCoinBalance = {} as any;

  constructor(private _gameService: GameService) {}

  ngOnInit(): void {
    console.log("Initialized");
    this.determineResult();
  }

  determineResult():void{
    console.log('result ' + this.result);
    this.outcomeText = this.result?.result;
    this.pictureUrl = this.result?.picture;
    this.win = this.result?.win;
    if(this.win == true)
    {
      this._gameService.AddCoins(this.numCoinsToAdd).subscribe();
      this._gameService.GetBalance().subscribe(
        result => {
          let coinBalance   = result;
          this.currentUserCoinBalance = coinBalance;
        });
    }
  }

  playAgain(){
    this.playAgainEmitter.emit();
  }
}
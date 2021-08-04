import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService, WtpGame } from '../games.service';

@Component({
  selector: 'app-wtp-game-selection',
  templateUrl: './wtp-game-selection.component.html',
  styleUrls: ['./wtp-game-selection.component.css']
})
export class WtpGameSelectionComponent implements OnInit {
  @Output() resultEmitter = new EventEmitter<{result:string, picture?:string, win?:boolean}>();
  pictureUrl?:string;
  correctPokemon?:string;
  options?:string[];

  constructor(private _gameService:GamesService) { }

  ngOnInit(): void {
    this._gameService.GetWtpGame().subscribe(
      result => {
        this.pictureUrl = result.pictureUrl;
        this.correctPokemon = result.correctPokemon;
        this.options = result.options;
      });
  }

  PokemonSelected(userSelection : string): void{
    if(userSelection == this.correctPokemon)
    {
      console.log('win');
      this.resultEmitter.emit({result:"Correct! It's "+ this.correctPokemon+"!", picture:this.pictureUrl, win:true});
    }
    else{
      console.log('lose');
      this.resultEmitter.emit({result:"Sorry, It's " + this.correctPokemon + "! You lose.", picture:this.pictureUrl, win:false});
    }
  }
}
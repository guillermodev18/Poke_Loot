import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { DisplayServiceService } from '../display-service.service';
import { IBuy } from '../Models/IBuy';
import { IPost } from '../Models/IPost';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() search!: string;
  fullDisplayBoard!: IPost[];
  displayBoard!: IPost[];
  oldSearch: string = "null";
  attemptToBuy: boolean = false;
  broughtCard?: IBuy;
  private userId: any = localStorage.getItem('userId');
  pageOfItems!: IPost[];
  //@Input() changePage = EventEmitter<any>(true);
  currentIndex : number = 0;
  currentPage: number = 1;
  lastpage!: number;
  bublapedia: string = 'https://bulbapedia.bulbagarden.net/wiki/';

  constructor(private _displayService: DisplayServiceService, private cdr: ChangeDetectorRef) {
    this.displayBoard = [];
    this.fullDisplayBoard = [];
  }

  //we should edit the api to also recieve the original username of poster
  ngOnInit(): void {
    this.attemptToBuy = false;
    //this.changePage.emit(this.pageOfItems);
    this._displayService.DisplayBoard().subscribe(
      result => {
        for (let i = 0; i < result.length; i++) {
          let PostId = result[i].postId;
          let PokemonId = result[i].pokemonId;
          let PostTime = result[i].postTime;
          let PostDescription = result[i].postDescription;
          let Price = result[i].price;
          let StillAvailable = result[i].stillAvailable;
          let IsShiny = result[i].isShiny;
          let UserId = result[i].userId;
          let type = result[i].postType;
          let UserName = result[i].userName;
          let SpriteLink = result[i].spriteLink;
          let PostType = '';
          if (type == 1) {
            PostType = 'Discussion';
          }
          else if (type == 2) {
            PostType = 'Sale';
          }
          else {
            PostType = 'Display';
          }
          let PokemonName = result[i].pokemonName;
          let RarityId = result[i].rarityId;

          let Post: IPost = { PostId, PokemonId, PostTime, PostDescription, Price, StillAvailable, IsShiny, UserId, UserName, SpriteLink, PostType, PokemonName, RarityId }
          this.fullDisplayBoard.push(Post);
        }
        //this.displayBoard = this.fullDisplayBoard.filter( x => x.PokemonName?.includes(this.search) || x.PokemonName == null);

        this.displayBoard = this.filterPost(this.fullDisplayBoard);
        
      }
    )
  }
  //ngAfterContentInit() {
    //this.currentPage = 1;
    //this.lastpage = 1 + Math.floor(this.displayBoard.length / 5);
    //this.cdr.detectChanges();
  //}

  filterPost(board : IPost[]):IPost[]{
    let oldLength = this.lastpage;
    this.displayBoard = this.fullDisplayBoard.filter( x => x.PokemonName?.includes(this.search) || x.PokemonName == null);
    console.log(this.displayBoard.length);
    //this.currentPage = 1;
    this.lastpage = 1 + Math.floor(this.displayBoard.length / 5);
    this.pageOfItems = this.displayBoard.slice(this.currentIndex, this.currentIndex + 5);
    //this.cdr.detectChanges();
    if(this.search != this.oldSearch){
      console.log("old search: " + this.oldSearch);
      console.log("old search: " + this.search);
      this.onChangePagePrev();
      
      
  }
    this.oldSearch = this.search;
    return this.pageOfItems;
  }

  buy(post: IPost): void {
    this.attemptToBuy = true;
    //Ouput: string,
    //Result: boolean,
    let Price = post.Price;
    let UserName = post.UserName;
    let SpriteLink = post.SpriteLink;
    let PokemonName = post.PokemonName;
    let RarityId = post.RarityId;
    let IsShiny = post.IsShiny;

    this._displayService.getBuyCard(post.PostId, this.userId).subscribe(
      result => {
        let Output = result[0].Key;
        let Result = result[0].Value;
        if (Result == false) {
          RarityId = 6;
        }

        this.broughtCard = { Output, Result, Price, UserName, SpriteLink, PokemonName, RarityId, IsShiny };
      }
    )
  }

  GetCardColor(rarityId: any): string {
    switch (rarityId) {
      case 1:
        return 'card1'
        break;
      case 2:
        return 'card2'
        break;
      case 3:
        return 'card3'
        break;
      case 4:
        return 'card4'
        break;
      case 5:
        return 'card5'
        break;
      case 6:
        return 'card6'
        break
      default:
        return ''
        break;
    }
  }

  GetRarityDisplay(rarityId: any): string {
    switch (rarityId) {
      case 1:
        return 'Common'
        break;
      case 2:
        return 'Uncommon'
        break;
      case 3:
        return 'Rare'
        break;
      case 4:
        return 'Mythic'
        break;
      case 5:
        return 'Legendary'
        break;
      default:
        return 'No Card Attached'
        break;
    }
  }

  ngAfterViewInit() {
    
    this.cdr.detectChanges();
  }

  onChangePageNext() {
    // update current page of items
    this.currentIndex += 5;
    if(this.currentIndex >= this.displayBoard.length - 5){
      this.currentIndex = this.displayBoard.length - 5;
      this.currentPage = this.lastpage - 1;
    }
    this.currentPage++;
    console.log(this.currentIndex);
    this.pageOfItems = this.displayBoard.slice(this.currentIndex, this.currentIndex + 5);
    //this.pageOfItems = pageOfItems;
}
  onChangePagePrev() {
    // update current page of items
    this.currentIndex -= 5;
    this.currentPage--;
    if(this.currentIndex <= 0){
      this.currentIndex = 0;
      this.currentPage = 1;
    }
    console.log(this.currentIndex);
    this.pageOfItems = this.displayBoard.slice(this.currentIndex, this.currentIndex + 5);
    //this.pageOfItems = pageOfItems;
  }
}

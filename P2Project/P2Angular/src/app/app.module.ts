// 

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { JwPaginationComponent } from 'jw-angular-pagination';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { CreatePostComponent } from './create-post-page/create-post.component';
import { TradeCardPageComponent } from './trade-card-page/trade-card-page.component';
import { UnlockCardPageComponent } from './unlock-card-page/unlock-card-page.component';
import { ViewInformationPageComponent } from './view-information-page/view-information-page.component';
import { ViewBalancePageComponent } from './view-balance-page/view-balance-page.component';
import { AppRoutingModule } from './app-routing.module';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { PostsComponent } from './posts/posts.component';
import { CardCollectComponent } from './cardcollect/cardcollect.component';
import { CardServiceService } from './card-service.service';
import { AccountService } from './account.service';
import { AddCardComponent } from './add-card/add-card.component';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './Pipes/filter.pipe';
import { RpsGameOutcomeComponent } from './rps-game-outcome/rps-game-outcome.component';
import { RpsGameComponent } from './rps-game/rps-game.component';
import { RpsGamePokemonSelectionComponent } from './rps-game-pokemon-selection/rps-game-pokemon-selection.component';
import { WtpGameComponent } from './wtp-game/wtp-game.component';
import { WtpGameSelectionComponent } from './wtp-game-selection/wtp-game-selection.component';
import { WtpGameOutcomeComponent } from './wtp-game-outcome/wtp-game-outcome.component';
import { CapGameComponent } from './cap-game/cap-game.component';
import { CapGameCatchComponent } from './cap-game-catch/cap-game-catch.component';
import { CapGameResultComponent } from './cap-game-result/cap-game-result.component';
import { PokemonCardMatchComponent } from './pokemon-card-match/pokemon-card-match.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FriendsComponent } from './friends/friends.component';
import { WamGameComponent } from './wam-game/wam-game.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    SignupPageComponent,
    ProfilePageComponent,
    GamePageComponent,
    CreatePostComponent,
    TradeCardPageComponent,
    UnlockCardPageComponent,
    ViewInformationPageComponent,
    ViewBalancePageComponent,
    TopNavBarComponent,
    PostsComponent,
    CardCollectComponent, 
    AddCardComponent, 
    FilterPipe, RpsGameOutcomeComponent,
    FilterPipe, RpsGamePokemonSelectionComponent,
    //Games-Angular-Service,
    RpsGameComponent,
    FilterPipe, 
    RpsGamePokemonSelectionComponent, WtpGameComponent, WtpGameSelectionComponent, WtpGameOutcomeComponent, CapGameComponent, CapGameCatchComponent, CapGameResultComponent,
    RpsGamePokemonSelectionComponent, 
    WtpGameComponent, 
    WtpGameSelectionComponent, 
    WtpGameOutcomeComponent, 
    FriendsComponent,
    EditPostComponent,
    PokemonCardMatchComponent,
    //JwPaginationComponent,
    WamGameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [CardServiceService,AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }

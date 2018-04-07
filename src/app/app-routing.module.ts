import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { GameComponent } from './game/game.component';
import { ProfilComponent } from './profil/profil.component';
/* import { MatchmakingComponent } from './matchmaking/matchmaking.component';
 */
const routes: Routes = [
    { path: '', redirectTo: 'landing-page', pathMatch: 'full' },
    { path: 'landing-page', component: LandingPageComponent },
    { path: 'connexion', component: ConnexionComponent },
/*     { path: 'matchmaking', component: MatchmakingComponent },
 */    { path: 'game', component: GameComponent },
    { path: 'profil', component: ProfilComponent },
    { path: '**', redirectTo: 'landing-page', pathMatch: 'full' },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

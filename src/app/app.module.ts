import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule, MatIconRegistry} from "@angular/material/icon";
import {MainPageComponent} from './main-page/main-page.component';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {AboutComponent} from './about/about.component';
import {EducationComponent} from './education/education.component';
import {SkillsComponent} from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import {HttpClientModule} from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatCardModule} from "@angular/material/card";
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeGamePreviewComponent } from './snake-game-preview/snake-game-preview.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainPageComponent,
    AboutComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    SnakeGameComponent,
    SnakeGamePreviewComponent,


  ],
  imports: [
    RouterModule.forRoot([

        {path: '', component: MainPageComponent},
      ],
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(
      domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')
    );
  }
}

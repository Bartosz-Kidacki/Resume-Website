/*
 * Copyright (c) 2021, Bartosz Kidacki. All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SnakeGameComponent} from "../snake-game/snake-game.component";
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(SnakeGameComponent);
  }

  ngOnInit(): void {
  }

}

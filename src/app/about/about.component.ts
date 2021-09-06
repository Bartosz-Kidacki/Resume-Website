import { Component, OnInit } from '@angular/core';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  linkedInIcon=faLinkedin;
  gitHubIcon=faGithub;
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import {
  SimpleTutorial,
  Tutorial,
} from '../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss'],
})
export class TutorialsComponent {
  simpleTutorials: any[] = [];
}

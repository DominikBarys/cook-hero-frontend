import { Component, Input } from '@angular/core';
import { SimpleTutorial } from '../../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
})
export class TutorialComponent {
  @Input() simpleTutorial!: SimpleTutorial;
}

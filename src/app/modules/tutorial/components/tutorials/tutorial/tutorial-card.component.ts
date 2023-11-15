import { Component, Input } from '@angular/core';
import { SimpleTutorial } from '../../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.scss'],
})
export class TutorialCardComponent {
  @Input() simpleTutorial!: SimpleTutorial;
}

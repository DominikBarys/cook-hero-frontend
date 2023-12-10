import { Component, Input, OnInit } from '@angular/core';
import { SimpleTutorial } from '../../../../core/models/tutorial/tutorial.models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-tutorial-card',
  templateUrl: './tutorial-card.component.html',
  styleUrls: ['./tutorial-card.component.scss'],
})
export class TutorialCardComponent implements OnInit {
  @Input() simpleTutorial!: SimpleTutorial;

  meat = false;
  vegan = false;
  spicy = false;
  sweet = false;

  getTutorialDetailsUrl() {
    return `/poradniki/${this.simpleTutorial.shortId}`;
  }

  protected readonly takeUntil = takeUntil;

  ngOnInit(): void {
    this.meat = this.simpleTutorial.hasMeat;
    this.vegan = this.simpleTutorial.veganRecipe;
    this.spicy = this.simpleTutorial.spicyRecipe;
    this.sweet = this.simpleTutorial.sweetRecipe;

    console.log(this.meat);
    console.log(this.vegan);
    console.log(this.spicy);
    console.log(this.sweet);
  }
}

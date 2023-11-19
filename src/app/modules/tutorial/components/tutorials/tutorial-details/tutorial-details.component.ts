import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TutorialsService } from '../../../../core/services/tutorials.service';
import { Tutorial } from '../../../../core/models/tutorial/tutorial.models';

@Component({
  selector: 'app-tutorial-card-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.scss'],
})
export class TutorialDetailsComponent implements OnInit {
  tutorial: Tutorial | null = null;
  parameters: { [key: string]: string } | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tutorialsService: TutorialsService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        switchMap((paramMap) => {
          return this.tutorialsService.getTutorial(
            paramMap.get('shortId') as string,
          );
        }),
      )
      .subscribe({
        next: (tutorial) => {
          console.log(tutorial);
          this.tutorial = { ...tutorial };
          try {
            this.parameters = JSON.parse(tutorial.parameters);
          } catch (err) {
            this.parameters = null;
          }
          console.log(this.parameters);
        },
      });
  }
}

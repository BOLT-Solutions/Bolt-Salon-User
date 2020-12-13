import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  animations:
    [
      trigger('myAnimation', [
        transition('* => *', [
          query(
            ':enter',
            [style({ opacity: 0.3 })]
          ),
          //query(
          //  ':leave',
          //  [style({ opacity: 0.7 }), animate('0.3s', style({opacity: 0 }))]
          //),
          query(
            ':enter',
            [style({ opacity: 0.5 }), animate('0.3s', style({ opacity: 0.8 }))]
          )
        ])
      ])
    ]
})
export class AppLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

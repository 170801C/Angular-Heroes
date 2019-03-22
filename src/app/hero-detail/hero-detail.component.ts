import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';  
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero; 

  constructor(
    // Holds information (route's params from URL) about the route to this instance of HeroDetailComponent
    private route: ActivatedRoute,
    // Gets hero data (hero to display) from the server 
    private heroService: HeroService,
    // Use this to navigate back to the view that navigated to the routed component
    private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    // route.snapshot is the route information shortly after the component was created
    // The paramMap is a dictionary of route parameter values extracted from the URL (e.g. "id" key returns the id of the hero)
    // JavaScript + operator converts the string to a number which is what the id should be
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

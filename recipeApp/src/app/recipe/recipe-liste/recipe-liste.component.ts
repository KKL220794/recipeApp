import { Recipe } from './../recipe.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-liste',
  templateUrl: './recipe-liste.component.html',
  styleUrls: ['./recipe-liste.component.css']
})
export class RecipeListeComponent implements OnInit {
  recipes: Recipe[];
  // id: number;
  constructor(private recipeservice: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeservice.recipeUpdated.subscribe(
      (recipe) => {
        this.recipes = recipe;
      }
    ) ;
    this.recipes = this.recipeservice.getRecipes();

  }
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route} );

  }


}

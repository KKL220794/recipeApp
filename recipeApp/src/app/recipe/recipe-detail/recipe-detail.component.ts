import { ShoppingListComponent } from './../../shopping-list/shopping-list.component';
import { ShoppingListService } from './../../shopping-list/shoppingList.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private recipeservice: RecipeService, private route: ActivatedRoute,
    private router: Router,
    private shoppingListService: ShoppingListService ) { }

  ngOnInit() {
    this.route.params.
    subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeservice.getRecipesById(this.id);
      }
    );
  }
  onEditRecipe() {
    this.router.navigate(['recipe', this.id, 'edit']);
  }

  onShoppingList() {
    for ( const i of this.recipe.ingredient) {
      // console.log(i);
      this.shoppingListService.addIngredients(i);
      this.router.navigate(['/shopping-list']);

    }

  }
  onDelete() {
    this.recipeservice.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

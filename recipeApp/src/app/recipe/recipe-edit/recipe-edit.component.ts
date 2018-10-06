import { RecipeService } from './../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  editedindex: number;
  editedMode = false;
  recipeForm: FormGroup;




  constructor(private route: ActivatedRoute, private rservice: RecipeService , private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        this.editedindex = +param['id'];
        this.editedMode = param['id'] != null;
        this.initForm();

      }
    );

  }
  onAdd() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup(
        {
          'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required , Validators.pattern(/^[1-9]+[0-9]*$/)])}
      )
    );
  }

  onDelete(i) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onSubmit() {
    if (this.editedMode) {
      this.rservice.updateRecipe(this.editedindex, this.recipeForm.value) ;
    } else {
      this.rservice.addRecipe(this.recipeForm.value) ;
    }

  }
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipename = '';
    let imagepath = '';
    let description = '';
    const recipe_ingredient = new FormArray([]);
    if (this.editedMode ) {
      const recipe = this.rservice.getRecipesById(this.editedindex);
      recipename = recipe.name;
      imagepath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredient']) {
        for (const indx of recipe.ingredient) {
          recipe_ingredient.push(
            new FormGroup(
              {'name': new FormControl(indx.name, Validators.required),
              'amount' : new FormControl(indx.amount, [Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)])}
            ));
        }
      }

    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipename, Validators.required),
        'imagepath': new FormControl(imagepath, Validators.required),
        'Description': new FormControl(description, Validators.required),
        'ingredients': recipe_ingredient,

      }
    );
    // console.log(this.recipeForm.value['ingredients']) ;

  }
}

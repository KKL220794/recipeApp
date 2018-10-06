import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/shared.component';
import { ShoppingListService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') slForm: NgForm;
  name: string;
  editMode = false;
  editedIndex: number;
  editedItem: Ingredient;


  constructor(private slservice: ShoppingListService) { }

  ngOnInit() {
    this.slservice.itemEdited.subscribe(
      (index: number) => {
        this.editedIndex = index;
        this.editMode = true;
        this.editedItem = this.slservice.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount : this.editedItem.amount
        });
      }
    );
  }

  onSubmit(f: NgForm) {
    const value = f.value ;
    const ing = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slservice.onEditItem(this.editedIndex , ing);
    } else {
      this.slservice.addIngredients(ing);
    }
    this.editMode = false;
    f.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slservice.onDeleteItem(this.editedIndex);
    this.onClear();
  }

}

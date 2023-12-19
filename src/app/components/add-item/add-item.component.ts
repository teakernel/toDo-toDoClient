import { Component } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent {
  item: Item = {
    name: '',
    description: '',
    status: false
  };
  submitted = false;

  constructor(private itemService: ItemService) {}

  saveItem(): void {
    const data = {
      name: this.item.name,
      description: this.item.description
    };

    this.itemService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newItem(): void {
    this.submitted = false;
    this.item = {
      name: '',
      description: '',
      status: false
    };
  }
}

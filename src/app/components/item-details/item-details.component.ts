import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})

export class ItemDetailsComponent {
  @Input() viewMode = false;

  @Input() currentItem: Item = {
    name: '',
    description: '',
    status: false,
  };

  message = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getItem(this.route.snapshot.params['id']);
    }
  }

  getItem(id: string): void {
    this.itemService.get(id).subscribe({
      next: (data) => {
        this.currentItem = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentItem.name,
      description: this.currentItem.description
    };

    this.message = '';

    this.itemService.update(this.currentItem.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }

  updateItem(): void {
    this.message = '';

    this.itemService
      .update(this.currentItem.id, this.currentItem)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This item was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteItem(): void {
    this.itemService.delete(this.currentItem.id).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/items']);
      },
      error: (e) => console.error(e)
    });
  }
}

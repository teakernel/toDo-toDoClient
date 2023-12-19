import { RouterModule, Routes } from '@angular/router';
import { ItemDetailsComponent } from './components/item-details/item-details.component';   
import { ItemListComponent } from './components/item-list/item-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: '', redirectTo: 'items', pathMatch: 'full' },
    { path: 'items', component: ItemListComponent },
    { path: 'items/:id', component: ItemDetailsComponent },
    { path: 'add', component: AddItemComponent }
];

@NgModule({
    imports:[ RouterModule.forRoot(routes)],
    exports:[ RouterModule]
})
export class AppRouteModule{}

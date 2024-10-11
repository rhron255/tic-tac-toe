import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { RoomSelectorComponent } from './room-selector/room-selector.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'board/:roomId',
    component: BoardComponent,
  },
  {
    path: 'rooms',
    component: RoomSelectorComponent,
  },
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

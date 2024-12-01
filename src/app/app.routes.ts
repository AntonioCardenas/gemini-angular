import { Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MultimodalComponent } from './multimodal/multimodal.component';
import { ImagesComponent } from './images/images.component';

export const routes: Routes = [
  {
    path: '',
    data: { title: 'Images' },
    redirectTo: 'chat',
    pathMatch: 'full',
  },
  {
    path: 'chat',
    data: { title: 'Chat' },
    component: ChatComponent,
  },
  {
    path: 'multimodal',
    data: { title: 'Multimodal' },
    component: MultimodalComponent,
  },
  { path: 'images', data: { title: 'Images' }, component: ImagesComponent },
];

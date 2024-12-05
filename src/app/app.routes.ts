import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { MultimodalComponent } from './pages/multimodal/multimodal.component';
import { ImagesComponent } from './pages/images/images.component';

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

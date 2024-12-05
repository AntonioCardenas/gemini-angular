import { Component, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() mobileOrientation: 'start' | 'end';
  styles: {
    start: string;
    end: string;
  };
  constructor(private dashboard: DashboardService) {
    this.mobileOrientation = 'end';
    this.styles = {
      start: 'left-0',
      end: 'right-0 lg:left-0',
    };
  }

  sidebarOpen() {
    return this.dashboard.sidebarOpen;
  }
}

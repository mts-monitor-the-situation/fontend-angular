import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SelectionService } from '../../../core/services/selection/selection';

@Component({
  selector: 'app-layout-shell',
  standalone: false,
  templateUrl: './layout-shell.html',
  styleUrl: './layout-shell.scss',
})
export class LayoutShell implements OnInit, OnDestroy {
  sidebarOpen = true;
  private sub?: Subscription;

  constructor(private sel: SelectionService) {}

  ngOnInit(): void {
    // Default based on screen size
    this.sidebarOpen = window.innerWidth >= 1024; // desktop breakpoint
    this.sub = this.sel.coord$.subscribe((c) => {
      if (c && (c.lat !== 0 || c.lng !== 0)) {
        this.sidebarOpen = true; // <— auto-open on selection
      }
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}

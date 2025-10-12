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
  sidebarOpenDesktop = false;
  sidebarOpenMobile = false;
  private sub?: Subscription;

  constructor(private sel: SelectionService) {}

  ngOnInit(): void {
    // Default: open only on desktop
    this.sidebarOpenDesktop = window.innerWidth >= 1024;

    this.sub = this.sel.coord$.subscribe((c) => {
      if (c && (c.lat !== 0 || c.lng !== 0)) {
        if (window.innerWidth >= 1024) {
          this.sidebarOpenDesktop = true;  // auto-open on selection
        } else {
          this.sidebarOpenMobile = true;   // open overlay on mobile
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleSidebar() {
    if (window.innerWidth >= 1024) {
      this.sidebarOpenDesktop = !this.sidebarOpenDesktop;
    } else {
      this.sidebarOpenMobile = !this.sidebarOpenMobile;
    }
  }
}


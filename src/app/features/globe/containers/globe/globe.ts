import {
  AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, HostBinding
} from '@angular/core';
import { ApiService } from '../../../../core/services/api/api';
import { SelectionService } from '../../../../core/services/selection/selection';
import { environment } from '../../../../../environments/environment';
import Globe from 'globe.gl';
import { MOUSE, TOUCH } from 'three';
import { DEMO_COORDS } from '../../../../core/mocks/mock-data';

type Pt = { lat: number; lng: number; weight: number };

@Component({
  selector: 'app-globe',
  templateUrl: './globe.html',
  styleUrls: ['./globe.scss'],
  standalone: false
})
export class GlobeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('globe', { static: true }) globeEl!: ElementRef<HTMLDivElement>;
  @HostBinding('class.point-hover') hoveringPoint = false; // flips cursor to pointer

  private globe!: any;
  private ro?: ResizeObserver;
  private raf?: number;
  private pov = { lat: 20, lng: 0, altitude: 2.5 };

  constructor(private api: ApiService, private selection: SelectionService) {}

  ngAfterViewInit(): void {
    // --- Base globe (dark) ---
    this.globe = new Globe(this.globeEl.nativeElement)
      .showAtmosphere(true)
      .atmosphereColor('#a7c5ff')
      .atmosphereAltitude(0.25)
      .backgroundColor('#121826')
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-day.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png');

    // --- OrbitControls (safe cross-version mapping; no DOLLY_PAN requirement) ---
    const controls = this.globe.controls();
    controls.enabled = true;            // we toggle this on hover/click
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;

    controls.mouseButtons = {
      LEFT:   MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT:  MOUSE.PAN
    };

    // Some three versions don't expose TOUCH.DOLLY. Choose best available at runtime.
    const TouchEnum: any = TOUCH as any;
    const TWO_GESTURE =
      TouchEnum.DOLLY ??           // prefer pure pinch-dolly if present
      TouchEnum.DOLLY_PAN ??       // next best; pan ignored since enablePan=false
      TouchEnum.PAN;               // fallback (no pinch zoom; wheel/+/– still work)

    controls.touches = { ONE: TOUCH.ROTATE, TWO: TWO_GESTURE };

    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI;
    controls.minAzimuthAngle = -Infinity;
    controls.maxAzimuthAngle =  Infinity;
    controls.rotateSpeed = 0.8;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    // Smooth updates (some globe.gl builds don’t have onRender)
    const tick = () => { if (controls.enabled) controls.update(); this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);

    // --- Responsive sizing ---
    this.fitToContainer();
    this.ro = new ResizeObserver(() => this.fitToContainer());
    this.ro.observe(this.globeEl.nativeElement);

    // --- Better pin UX ---
    // Hover a pin: show pointer, freeze controls, pause autorotate
    this.globe.onPointHover((p: Pt | null) => {
      this.hoveringPoint = !!p;
      if (p) { controls.enabled = false; controls.autoRotate = false; }
      else   { controls.enabled = true;  controls.autoRotate = true;  }
    });

    // Click a pin: select & briefly freeze to avoid camera nudge
    this.globe.onPointClick((p: Pt | null) => {
      if (!p) return;
      const prevAR = controls.autoRotate;
      controls.enabled = false;
      controls.autoRotate = false;

      // Send selection (Layout listens and opens sidebar)
      this.selection.setCoord(p.lat, p.lng);

      setTimeout(() => { controls.enabled = true; controls.autoRotate = prevAR; }, 250);
    });

    // Optional: click bare globe to select too
    this.globe.onGlobeClick?.(({ lat, lng }: any) => this.selection.setCoord(lat, lng));

    // --- Data → dot heatmap ---
    if (environment.mock) {
      this.drawDotHeat(this.mapCoords(DEMO_COORDS));
    } else {
      this.api.getCoordinates().subscribe({
        next: coords => this.drawDotHeat(this.mapCoords(coords)),
        error: ()    => this.drawDotHeat(this.mapCoords([]))
      });
    }
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  private fitToContainer() {
    const el = this.globeEl.nativeElement;
    const w = el.clientWidth || 0, h = el.clientHeight || 0;
    if (w && h) this.globe.width(w).height(h);
  }

  private mapCoords(coords: any[]): Pt[] {
    const arr = (coords ?? []).map(c => ({
      lat: +c.latitude, lng: +c.longitude, weight: +(c.weight ?? 1)
    }));
    return arr.length ? arr : DEMO_COORDS.map(c => ({
      lat: c.latitude, lng: c.longitude, weight: c.weight ?? 1
    }));
  }

  private drawDotHeat(points: Pt[]) {
    const colorOf = (w: number) =>
      w > 60 ? 'rgba(255,45,46,0.92)' :
      w > 25 ? 'rgba(255,180,0,0.88)' :
               'rgba(34,197,94,0.85)';

    this.globe
      .pointsData(points)
      .pointLat((d: Pt) => d.lat)
      .pointLng((d: Pt) => d.lng)
      .pointColor((d: Pt) => colorOf(d.weight))
      .pointAltitude((d: Pt) => 0.009 + d.weight * 0.00035) // tall enough for easy tapping
      .pointRadius(0.55)          // larger hit area
      .pointResolution(12)        // smoother round dots
      .pointsMerge(false)         // separate meshes => better picking
      .pointsTransitionDuration(300);
  }

  // UI controls
  resetView() { this.globe.pointOfView(this.pov, 800); }
  zoomIn()  { const c = this.globe.pointOfView(); this.globe.pointOfView({ altitude: Math.max(0.8, (c?.altitude ?? 2.5) * 0.8) }, 300); }
  zoomOut() { const c = this.globe.pointOfView(); this.globe.pointOfView({ altitude: Math.min(5.0, (c?.altitude ?? 2.5) / 0.8) }, 300); }
}

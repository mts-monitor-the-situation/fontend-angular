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
  @HostBinding('class.point-hover') hoveringPoint = false;

  private globe!: any;
  private ro?: ResizeObserver;
  private raf?: number;
  private pov = { lat: 20, lng: 0, altitude: 2.5 };

  constructor(private api: ApiService, private selection: SelectionService) {}

  ngAfterViewInit(): void {
    this.globe = new Globe(this.globeEl.nativeElement)
      .showAtmosphere(true)
      .atmosphereColor('#a7c5ff')
      .atmosphereAltitude(0.25)
      .backgroundColor('#0a0c1b')
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png');

    const controls = this.globe.controls();
    controls.enabled = true;
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = false;

    controls.mouseButtons = {
      LEFT:   MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT:  MOUSE.PAN
    };

    const TouchEnum: any = TOUCH as any;
    const TWO_GESTURE =
      TouchEnum.DOLLY ??
      TouchEnum.DOLLY_PAN ??
      TouchEnum.PAN;
    controls.touches = { ONE: TOUCH.ROTATE, TWO: TWO_GESTURE };

    controls.rotateSpeed = 0.8;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;

    const tick = () => { if (controls.enabled) controls.update(); this.raf = requestAnimationFrame(tick); };
    this.raf = requestAnimationFrame(tick);

    this.fitToContainer();
    this.ro = new ResizeObserver(() => this.fitToContainer());
    this.ro.observe(this.globeEl.nativeElement);

    this.globe.onPointHover((p: Pt | null) => {
      this.hoveringPoint = !!p;
      if (p) { controls.enabled = false; controls.autoRotate = false; }
      else   { controls.enabled = true;  controls.autoRotate = true;  }
    });

    this.globe.onPointClick((p: Pt | null) => {
      if (!p) return;
      const prevAR = controls.autoRotate;
      controls.enabled = false;
      controls.autoRotate = false;
      this.selection.setCoord(p.lat, p.lng);
      setTimeout(() => { controls.enabled = true; controls.autoRotate = prevAR; }, 250);
    });

    this.globe.onGlobeClick?.(({ lat, lng }: any) => this.selection.setCoord(lat, lng));

    if (environment.mock) {
      this.drawRingsWithHitboxes(this.mapCoords(DEMO_COORDS));
    } else {
      this.api.getCoordinates().subscribe({
        next: coords => this.drawRingsWithHitboxes(this.mapCoords(coords)),
        error: ()    => this.drawRingsWithHitboxes(this.mapCoords([]))
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

  private drawRingsWithHitboxes(points: Pt[]) {
    const colorOf = (w: number) =>
      w > 60 ? 'rgba(255,45,46,0.92)' :
      w > 25 ? 'rgba(255,180,0,0.88)' :
               'rgba(34,197,94,0.85)';

    this.globe
      .ringsData(points)
      .ringLat((d: Pt) => d.lat)
      .ringLng((d: Pt) => d.lng)
      .ringColor((d: Pt) => colorOf(d.weight))
      .ringResolution(24)
      .ringMaxRadius((d: Pt) => 0.8 + d.weight * 0.02)
      .ringPropagationSpeed((d: Pt) => 0.8 + d.weight * 0.02)
      .ringRepeatPeriod((d: Pt) => 900 - Math.min(600, d.weight * 6));

    // invisible “hitbox” points sized to match rings
    this.globe
      .pointsData(points)
      .pointLat((d: Pt) => d.lat)
      .pointLng((d: Pt) => d.lng)
      .pointColor(() => 'rgba(0,0,0,0)')
      .pointAltitude(() => 0.02)
      .pointRadius((d: Pt) => 0.3 + d.weight * 0.02) // larger, matches ring feel
      .pointResolution(8)
      .pointsMerge(false)
      .pointsTransitionDuration(0);
  }

  resetView() { this.globe.pointOfView(this.pov, 800); }
  zoomIn()  {
    const c = this.globe.pointOfView();
    this.globe.pointOfView({ altitude: Math.max(0.8, (c?.altitude ?? 2.5) * 0.8) }, 300);
  }
  zoomOut() {
    const c = this.globe.pointOfView();
    this.globe.pointOfView({ altitude: Math.min(5.0, (c?.altitude ?? 2.5) / 0.8) }, 300);
  }
}

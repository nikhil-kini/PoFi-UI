import {
  CdkConnectedOverlay,
  ConnectedPosition,
  ScrollStrategy,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EMPTY, Observable, iif, merge } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Card, MetaCard } from 'src/app/model/cards.model';

@Component({
  selector: 'pofri-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent implements OnInit {
  @Output() selctedCard = new EventEmitter<Card>();

  cardHolder$!: MetaCard;
  showCardSelectionPanel$!: Observable<boolean>;
  scrollStratagy!: ScrollStrategy;
  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      panelClass: 'enough-space-at-left',
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      panelClass: 'enough-space-at-center',
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      panelClass: 'enough-space-at-right',
    },
  ];

  @ViewChild('cardInput', { read: ElementRef, static: true })
  private inputEl!: ElementRef;

  @ViewChild(CdkConnectedOverlay, { static: true })
  private connectedOverlay!: CdkConnectedOverlay;

  private isCardSelectionPanelVisible$!: Observable<boolean>;
  private isCardSelectionPanelHidden$!: Observable<boolean>;
  private isOverlayDetached$!: Observable<void>;

  constructor(
    private focusMonitor: FocusMonitor,
    private scrollStratagies: ScrollStrategyOptions
  ) {}

  setfocus() {
    setTimeout(() => {
      this.inputEl.nativeElement.focus();
    }, 0);
  }

  ngOnInit(): void {
    this.scrollStratagy = this.scrollStratagies.reposition();
    this.isCardSelectionPanelVisible$ = this.focusMonitor
      .monitor(this.inputEl)
      .pipe(
        filter((focused) => !!focused),
        map(() => true)
      );

    this.isOverlayDetached$ = this.isCardSelectionPanelVisible$.pipe(
      delay(0),
      switchMap(() =>
        iif(
          () => !!this.connectedOverlay.overlayRef,
          this.connectedOverlay.overlayRef.detachments(),
          EMPTY
        )
      )
    );
    this.isCardSelectionPanelHidden$ = merge(
      this.isOverlayDetached$,
      this.connectedOverlay.backdropClick
    ).pipe(map(() => false));

    this.showCardSelectionPanel$ = merge(
      this.isCardSelectionPanelHidden$,
      this.isCardSelectionPanelVisible$
    );
  }

  selectCard(card: MetaCard) {
    this.cardHolder$ = card;
    this.selctedCard.emit(card.card);
  }
}

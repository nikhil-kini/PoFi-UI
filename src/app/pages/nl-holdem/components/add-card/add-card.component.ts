import { CdkOverlayOrigin, ConnectedPosition, FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardSelectionWindowComponent } from '../card-selection-window/card-selection-window.component';

@Component({
  selector: 'pofri-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss']
})
export class AddCardComponent {

  constructor(private matDialog: MatDialog, private overlay: Overlay){

  }

toggleAddCardWindow(){

//   var _dialog = this.matDialog.open(CardSelectionWindowComponent, {
    
//     hasBackdrop: false,
//     data: {
//       title: 'User Information',
//     }
//   });

//   // change userPosition to Total Players
//   _dialog.afterClosed().subscribe(item => {
//     console.log(item);
// });

}
}
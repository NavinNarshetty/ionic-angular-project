import { NgModule } from "@angular/core";
import { LocationPickerComponent } from './picker/location-picker/location-picker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MapModalComponent } from './map-modal/map-modal.component';





@NgModule({
    declarations:[LocationPickerComponent,MapModalComponent],
    imports:[CommonModule,IonicModule],
    entryComponents:[MapModalComponent],
    exports:[LocationPickerComponent,MapModalComponent]
})

export class SharedModule {
    
}
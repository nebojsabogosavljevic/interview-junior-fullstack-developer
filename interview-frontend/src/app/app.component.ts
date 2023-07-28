import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Message, MessageService } from 'primeng/api';

interface City {
  uuid: string;
  cityName: string;
  count: number;
  imgCode: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'interview-frontend';
  inputCityName: string = '';
  errorMessage: Message[] | undefined;
  foundCities: City[] = [];

  constructor(
    private _appService: AppService, 
    private messageService: MessageService) { }

  searchByCityName() {
    if (this.inputCityName === '') {
      this.messageService.add({severity:'error', summary:'Error', detail:'City name is required!'})
      return;
    } else if (this.inputCityName.length < 3) {
      this.messageService.add({severity:'error', summary:'Error', detail:'Required minimum for search is 3 characters!'})
      return;
    }
    this._appService.getCitiesByCityName(this.inputCityName).subscribe((data: any) => {
      if (Array.isArray(data) && data.length > 0) {
        this.messageService.add({severity:'success', summary:'Success', detail:'Successfully retrieved city data!'})
        this.foundCities = data;
      }
    });
  }

}

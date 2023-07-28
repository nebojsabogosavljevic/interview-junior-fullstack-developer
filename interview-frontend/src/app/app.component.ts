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
      this.messageService.add({severity:'error', summary:'Error', detail:'City name is required'})
      return;
    }
    this._appService.getCitiesByCityName(this.inputCityName).subscribe((data: any) => {
      console.log(data);
      this.foundCities = data;
    });
  }

}

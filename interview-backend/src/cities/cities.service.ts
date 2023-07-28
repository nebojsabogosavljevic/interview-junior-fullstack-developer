import { Injectable } from '@nestjs/common';
import * as CITIES from '../../../cities.json';

@Injectable()
export class CitiesService {
  findAll() {
    return CITIES;
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  findByUUID(uuid: string) {
    return CITIES.find(city => city.uuid === uuid);
  }

  findByCityName(cityName: string) {
    return CITIES.filter((city) => {
      return city.cityName.toLowerCase().includes(cityName.toLowerCase());
    });
  }
}

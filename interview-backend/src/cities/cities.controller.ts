import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll() {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citiesService.findOne(+id);
  }

  @Get('uuid/:uuid')
  findByUUID(@Param('uuid') uuid: string) {
    if (!uuid) throw new HttpException("UUID is required", 400);
    if (uuid.length !== 36) throw new HttpException("UUID must be 36 characters", 400);

    const foundCity = this.citiesService.findByUUID(uuid);
    if (!foundCity) throw new HttpException("No city found by given uuid", 400);
    return foundCity;
  }

  @Get('cityName/:cityName')
  findByCityName(@Param('cityName') cityName: string) {
    if (!cityName) throw new HttpException("City name is required", 400)
    if (cityName.length < 3) throw new HttpException("City name must be at least 3 characters", 400);

    const foundCities = this.citiesService.findByCityName(cityName);

    if (foundCities.length === 0) throw new HttpException("No cities found by this string", 400);
    return foundCities;
  }
}

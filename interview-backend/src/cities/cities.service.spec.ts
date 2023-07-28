import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import * as CITIES from '../../../cities.json';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all cities', () => {
    const cities = service.findAll();
    expect(cities).toEqual(CITIES);
  });

  it('should return a city by ID', () => {
    const cityId = 1; // Replace this with a valid ID from your data
    const city = service.findOne(cityId);
    expect(city).toBe(`This action returns a #${cityId} city`);
  });

  it('should return a city by UUID', () => {
    const cityUUID = '4a7f5c2d-3a10-4a02-a9b3-450839929e43'; 
    const city = service.findByUUID(cityUUID);
    expect(city).toEqual(expect.objectContaining({ uuid: cityUUID }));
  });

  it('should return cities by city name (case-insensitive)', () => {
    const cityName = 'Berlin';
    const matchedCities = service.findByCityName(cityName);
    expect(matchedCities).toHaveLength(1);
    expect(matchedCities[0].cityName.toLowerCase()).toContain(cityName.toLowerCase());
  });

  it('should return an empty array if no city name is matched', () => {
    const cityName = 'NonExistentCityName';
    const matchedCities = service.findByCityName(cityName);
    expect(matchedCities).toEqual([]);
  });
});

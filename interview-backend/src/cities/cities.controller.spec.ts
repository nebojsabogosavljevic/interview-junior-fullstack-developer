import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    citiesController = moduleRef.get<CitiesController>(CitiesController);
    citiesService = moduleRef.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(citiesController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cities from the service', () => {
      const mockCities = [
        { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: 'Berlin', count: 523, imgCode: "de-be_c" }, 
        { uuid: "49c01e96-2a36-47bc-862f-803de4e8bdae", cityName: 'Dresden', count: 198, imgCode: "de-sn-dd" }
      ];
      jest.spyOn(citiesService, 'findAll').mockReturnValue(mockCities);

      expect(citiesController.findAll()).toEqual(mockCities);
    });
  });

  describe('findByUUID', () => {
    it('should throw a HttpException when UUID is not provided', () => {
      expect(() => citiesController.findByUUID(undefined)).toThrow(HttpException);
    });

    it('should throw a HttpException when UUID length is not 36 characters', () => {
      const invalidUUID = '7e8a29e2-62d1-4ec1-ae15-';
      expect(() => citiesController.findByUUID(invalidUUID)).toThrow(HttpException);
    });

    it('should return the city with the specified UUID from the service', () => {
      const mockUUID = '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f';
      const mockCity = { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: 'Berlin', count: 523, imgCode: "de-be_c" };
      jest.spyOn(citiesService, 'findByUUID').mockReturnValue(mockCity);

      expect(citiesController.findByUUID(mockUUID)).toEqual(mockCity);
    });

    it('should throw a HttpException when no city is found with the given UUID', () => {
      const nonExistentUUID = undefined;
      jest.spyOn(citiesService, 'findByUUID').mockReturnValue(undefined);

      expect(() => citiesController.findByUUID(nonExistentUUID)).toThrow(HttpException);
    });
  });

  describe('findByCityName', () => {
    it('should throw a HttpException when city name is not provided', () => {
      expect(() => citiesController.findByCityName(undefined)).toThrow(HttpException);
    });

    it('should throw a HttpException when city name length is less than 3 characters', () => {
      const shortCityName = 'AB';
      expect(() => citiesController.findByCityName(shortCityName)).toThrow(HttpException);
    });

    it('should return cities with the specified city name from the service', () => {
      const mockCityName = 'Berlin';
      const mockCities = [
        { uuid: "7e8a29e2-62d1-4ec1-ae15-8ff2f777318f", cityName: 'Berlin', count: 523, imgCode: "de-be_c" }, 
        { uuid: "49c01e96-2a36-47bc-862f-803de4e8bdae", cityName: 'Dresden', count: 198, imgCode: "de-sn-dd" }
      ];
      jest.spyOn(citiesService, 'findByCityName').mockReturnValue(mockCities);

      expect(citiesController.findByCityName(mockCityName)).toEqual(mockCities);
    });

    it('should throw a HttpException when no cities are found with the given city name', () => {
      const nonExistentCityName = 'NonExistentCity';
      jest.spyOn(citiesService, 'findByCityName').mockReturnValue([]);

      expect(() => citiesController.findByCityName(nonExistentCityName)).toThrow(HttpException);
    });
  });
});

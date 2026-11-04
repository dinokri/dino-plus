import test from 'node:test';
import assert from 'node:assert/strict';
import { filterProperties, sortProperties, formatPriceKM } from './filterProperties';
import { Property } from '../types/property';

const mockProperties: Property[] = [
  {
    id: 'prop-1',
    title: 'Moderan stan u Novom Sarajevu',
    slug: 'moderan-stan-u-novom-sarajevu',
    offerType: 'prodaja',
    propertyType: 'stan',
    price: 295000,
    city: 'Sarajevo',
    neighborhood: 'Novo Sarajevo',
    coordinates: { lat: 43.852, lng: 18.387 },
    area: 75,
    rooms: 3,
    bathrooms: 1,
    hasParking: true,
    hasBalcony: true,
    hasElevator: true,
    isFurnished: true,
    isFeatured: true,
    isNew: true,
    images: ['/images/1.jpg'],
    description: 'Prostran i osvijetljen trosoban stan.',
    features: ['Parking', 'Lift'],
    agent: {
      name: 'Kenan Hodžić',
      agency: 'DINO PLUS Partner Agencija',
      phone: '+387 33 123 456',
      email: 'kenan@dinoplus.ba',
      rating: 4.9,
      experienceYears: 8
    },
    createdAt: '2026-03-01T10:00:00Z',
    isDemo: true
  },
  {
    id: 'prop-2',
    title: 'Stan u centru Banje Luke',
    slug: 'stan-u-centru-banje-luke',
    offerType: 'iznajmljivanje',
    propertyType: 'stan',
    price: 1000,
    priceSuffix: '/mjesečno',
    city: 'Banja Luka',
    neighborhood: 'Centar',
    coordinates: { lat: 44.773, lng: 17.191 },
    area: 62,
    rooms: 2,
    bathrooms: 1,
    hasParking: false,
    hasBalcony: true,
    hasElevator: false,
    isFurnished: true,
    isFeatured: false,
    isNew: false,
    images: ['/images/2.jpg'],
    description: 'Dvosoban namješten stan u strogom centru.',
    features: ['Balkon'],
    agent: {
      name: 'Marija Jovanović',
      agency: 'BL Nekretnine',
      phone: '+387 51 987 654',
      email: 'marija@dinoplus.ba',
      rating: 4.8,
      experienceYears: 5
    },
    createdAt: '2026-02-15T10:00:00Z',
    isDemo: true
  },
  {
    id: 'prop-3',
    title: 'Porodična kuća u Mostaru',
    slug: 'porodicna-kuca-u-mostaru',
    offerType: 'prodaja',
    propertyType: 'kuca',
    price: 420000,
    city: 'Mostar',
    neighborhood: 'Rondo',
    coordinates: { lat: 43.342, lng: 17.800 },
    area: 180,
    landArea: 450,
    rooms: 5,
    bathrooms: 2,
    hasParking: true,
    hasBalcony: true,
    hasElevator: false,
    isFurnished: false,
    isFeatured: true,
    isNew: false,
    images: ['/images/3.jpg'],
    description: 'Predivna kuća u mirnom naselju Mostara sa dvorištem.',
    features: ['Parking', 'Dvorište'],
    agent: {
      name: 'Adnan Vilić',
      agency: 'Hercegovina Real Estate',
      phone: '+387 36 555 777',
      email: 'adnan@dinoplus.ba',
      rating: 5.0,
      experienceYears: 12
    },
    createdAt: '2026-01-20T10:00:00Z',
    isDemo: true
  }
];

test('filterProperties filters by offerType correctly', () => {
  const rentOnly = filterProperties(mockProperties, { offerType: 'iznajmljivanje' });
  assert.equal(rentOnly.length, 1);
  assert.equal(rentOnly[0].id, 'prop-2');

  const saleOnly = filterProperties(mockProperties, { offerType: 'prodaja' });
  assert.equal(saleOnly.length, 2);
});

test('filterProperties filters by city and propertyType', () => {
  const sarajevo = filterProperties(mockProperties, { city: 'Sarajevo' });
  assert.equal(sarajevo.length, 1);
  assert.equal(sarajevo[0].city, 'Sarajevo');

  const houses = filterProperties(mockProperties, { propertyType: 'kuca' });
  assert.equal(houses.length, 1);
  assert.equal(houses[0].id, 'prop-3');
});

test('filterProperties filters by price range', () => {
  const budget = filterProperties(mockProperties, { minPrice: 200000, maxPrice: 350000 });
  assert.equal(budget.length, 1);
  assert.equal(budget[0].id, 'prop-1');
});

test('filterProperties filters by amenities', () => {
  const withElevator = filterProperties(mockProperties, { hasElevator: true });
  assert.equal(withElevator.length, 1);
  assert.equal(withElevator[0].id, 'prop-1');
});

test('sortProperties sorts by price ascending and descending', () => {
  const asc = sortProperties(mockProperties, 'cijena-rastuce');
  assert.equal(asc[0].price, 1000);
  assert.equal(asc[2].price, 420000);

  const desc = sortProperties(mockProperties, 'cijena-opadajuce');
  assert.equal(desc[0].price, 420000);
  assert.equal(desc[2].price, 1000);
});

test('filterProperties strictly isolates sale and rent categories', () => {
  const rentOnly = filterProperties(mockProperties, { offerType: 'iznajmljivanje' });
  assert.ok(rentOnly.length > 0);
  assert.ok(rentOnly.every((p) => p.offerType === 'iznajmljivanje'));
  assert.ok(!rentOnly.some((p) => p.offerType === 'prodaja'));

  const saleOnly = filterProperties(mockProperties, { offerType: 'prodaja' });
  assert.ok(saleOnly.length > 0);
  assert.ok(saleOnly.every((p) => p.offerType === 'prodaja'));
  assert.ok(!saleOnly.some((p) => p.offerType === 'iznajmljivanje'));
});

test('filterProperties handles combined filters without cross-contamination', () => {
  // Filtering for sale in Sarajevo
  const res = filterProperties(mockProperties, { offerType: 'prodaja', city: 'Sarajevo' });
  assert.equal(res.length, 1);
  assert.equal(res[0].id, 'prop-1');

  // Filtering for rent in Sarajevo (none in mockProperties)
  const emptyRes = filterProperties(mockProperties, { offerType: 'iznajmljivanje', city: 'Sarajevo' });
  assert.equal(emptyRes.length, 0);

  // Filtering for rent in Banja Luka
  const blRent = filterProperties(mockProperties, { offerType: 'iznajmljivanje', city: 'Banja Luka' });
  assert.equal(blRent.length, 1);
  assert.equal(blRent[0].id, 'prop-2');
});



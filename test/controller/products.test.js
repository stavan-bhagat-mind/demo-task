const chai = require('chai');
const request = require('supertest');
const { server } = require('../../app');

const { expect } = chai;

const product1 = {
  id: 1,
  name: '4K Ultra HD TV',
  price: 800.00,
  details: JSON.stringify({
    description: 'A stunning 4K Ultra HD TV with vibrant colors and deep blacks.',
    features: ['4K Resolution', 'Smart TV', 'HDR Support']
  }),
  created_by: 1,
  updated_by: null,
  created_at: '2024-11-25T10:00:00.000Z',
  updated_at: '2024-11-25T10:00:00.000Z',
  deleted_at: null,
};

const product2 = {
  id: 2,
  name: 'Bluetooth Speaker',
  price: 150.00,
  details: JSON.stringify({
    description: 'Portable Bluetooth speaker with rich sound quality.',
    features: ['Water Resistant', '10-hour battery life', 'Built-in microphone']
  }),
  created_by: 2,
  updated_by: null,
  created_at: '2024-11-25T11:00:00.000Z',
  updated_at: '2024-11-25T11:00:00.000Z',
  deleted_at: null,
};

const product3 = {
  id: 3,
  name: 'Gaming Laptop',
  price: 1500.00,
  details: JSON.stringify({
    description: 'High-performance gaming laptop with advanced cooling.',
    features: ['NVIDIA GeForce RTX 3060', '32GB RAM', '1TB SSD']
  }),
  created_by: 1,
  updated_by: null,
  created_at: '2024-11-25T12:00:00.000Z',
  updated_at: '2024-11-25T12:00:00.000Z',
  deleted_at: null,
};

describe('Fetch Products API Test', () => {
  it('should fetch all products and verify their details', async () => {
    const { body, status } = await request(server).get('/products');
    const { data } = body;

    expect(status).to.equal(200);
    expect(data).to.deep.include(product1);
    expect(data).to.deep.include(product2);
    expect(data).to.deep.include(product3);
  });
});
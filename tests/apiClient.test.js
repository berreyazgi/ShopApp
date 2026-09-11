import test from 'node:test';
import assert from 'node:assert/strict';

import { apiClient } from '../src/Frontend/ShopApp.Web/src/shared/services/apiClient.js';

test('apiClient normalizes a fetch() failure into a NETWORK_ERROR shape instead of leaking "Failed to fetch"', async () => {
  const originalFetch = global.fetch;
  const originalConsoleError = console.error;

  let loggedTechnicalError = null;
  console.error = (...args) => { loggedTechnicalError = args; };
  global.fetch = () => Promise.reject(new TypeError('Failed to fetch'));

  try {
    await assert.rejects(
      () => apiClient.get('/api/urun'),
      (error) => {
        assert.equal(error.status, 0, 'Network failures must be normalized to status 0');
        assert.equal(error.code, 'NETWORK_ERROR');
        assert.equal(error.message, 'Sunucuya ulaşılamıyor.');
        assert.ok(!error.message.includes('Failed to fetch'), 'The raw browser fetch error text must never reach callers');
        return true;
      },
    );

    assert.ok(loggedTechnicalError, 'The real network error must still be logged for debugging');
    assert.ok(
      loggedTechnicalError.some((arg) => arg instanceof TypeError),
      'console.error must retain the original TypeError for developers to inspect',
    );
  } finally {
    global.fetch = originalFetch;
    console.error = originalConsoleError;
  }
});

test('apiClient still normalizes a non-OK HTTP response into { status, message, body } as before', async () => {
  const originalFetch = global.fetch;
  global.fetch = () => Promise.resolve({
    ok: false,
    status: 400,
    statusText: 'Bad Request',
    json: () => Promise.resolve({ message: 'Kategori bulunamadı.', errors: [{ field: 'KategoriId', message: 'Kategori bulunamadı.' }] }),
  });

  try {
    await assert.rejects(
      () => apiClient.post('/api/admin/urun', { name: 'x' }),
      (error) => {
        assert.equal(error.status, 400);
        assert.equal(error.message, 'Kategori bulunamadı.');
        assert.deepEqual(error.body.errors, [{ field: 'KategoriId', message: 'Kategori bulunamadı.' }]);
        return true;
      },
    );
  } finally {
    global.fetch = originalFetch;
  }
});

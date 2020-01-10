import Api from '../../app/lib/api';

jest.mock('@react-native-community/geolocation', () => 'Geolocation')
jest.mock('@react-native-community/google-signin', () => ({
  'SIGN_IN_CANCELLED': jest.fn()
}))
jest.mock('../../app/lib/support')
jest.mock("../../app/config/constants", () => ({
  host: 'http://host.com'
}))

describe('class Api {}', () => {
  var api
  global.fetch = jest.fn()
  const warn = jest.spyOn(global.console, 'warn');
  const data = Symbol('data')
  const query = 'test query'
  const page = 1
  const per_page = 3
  beforeEach(function() {
    api = new Api()  
    jest.clearAllMocks()
  });
  
  describe('#getConfig()', () => {
    var body
    beforeEach(function() {
      body = jest.fn()
      JSON.stringify = jest.fn().mockImplementationOnce(() => {
        return body
      });
    });
    
    it('returns the complete config object', async () => {
      const method = jest.fn()
      const result  = await api.getConfig(method, body)
      expect(result.method).toBe(method)
      expect(result.body).toBe(body)
    })
  })

  describe('#perform()', () => {
    it('triggers a console.warn if fetch fails', function() {
      global.fetch.mockImplementationOnce(() => {
        throw 'error triggered'
      })
      api.perform()
      expect(warn).toHaveBeenCalledTimes(1);
      expect(warn).toBeCalledWith("api call failed with error: ", "error triggered")
    });

    it('calls fetch function', function() {
      const url = jest.fn()
      const config = jest.fn()
      api.url = url
      api.config = config
      api.perform()
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toBeCalledWith(url, config)
      expect(warn).toHaveBeenCalledTimes(0)
    });

    it('returns the response from the api request', async function() {
      const response = jest.fn()
      global.fetch.mockImplementationOnce(() => {
        return response
      })
      const result = await api.perform()
      expect(result).toBe(response)
    });
  })

  describe('#getLocations()', function() {
    it('fetches with params url and config', async function() {
      api.page = page
      api.per_page = per_page
      const config = jest.fn()
      api.getConfig = jest.fn(x => config)
      await api.getLocations({})  
      const url = `http://host.com/locations.json?page=${page}&per_page=${per_page}&`
      expect(global.fetch).toHaveBeenCalledWith(url, config)
    });

    it('passes custom flags', async function() {
      const flags = { join: function() {}}
      const spy = jest.spyOn(flags, 'join')
      await api.getLocations({ flags })
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith("")
    });
  });

  describe('#getLocationsNearby()', function() {
    it('calls the perform method', async function() {
      const perform_spy = jest.spyOn(api, 'perform')
      const query_spy = jest.spyOn(api, 'query', 'get')
      api.params = { latitude: 1, longitude: 1 }
      await api.getLocationsNearby()
      expect(perform_spy).toHaveBeenCalledTimes(1)
      expect(query_spy).toHaveBeenCalledTimes(1)
    });
  });

  describe('#getLocationsBoundary()', function() {
    it('calls the fetch method with parameters', async function() {
      const config = await api.getConfig('GET')
      const url = `http://host.com/locations.json?${query}`
      await api.getLocationsBoundary({ query })
      expect(global.fetch).toHaveBeenCalledWith(url, config)
    });
  });

  describe('#createPost()', function() {
    it('saves data in this.config', function() {
      const spy = jest.spyOn(api, 'getConfig')   
      api.createPost(data)
      expect(spy).toHaveBeenCalledWith("POST", data)
    });
  });

  describe('#updatePost()', function() {
    it('saves the data in this.config', async function() {
      const id = 1
      const spy = jest.spyOn(api, 'getConfig')   
      await api.updatePost(id, data)
      expect(spy).toHaveBeenCalledWith("PATCH", data)
    });
  });
})


describe('function createResource()', () => {
})

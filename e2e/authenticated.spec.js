describe('authenticated', () => {
  beforeEach(async () => {
    // await device.reloadReactNative();
    // await device.launchApp()
    console.disableYellowBox = true;
  });

  it('authenticates the test user', async () => {
    await element(by.type('RCTUITextField')).atIndex(1).typeText('testing@torino1')
    await element(by.type('RCTUITextField')).atIndex(0).typeText('fabrizio')
    await element(by.text('Sign In')).tap();
    await expect(element(by.text('Sign In'))).toBeNotVisible();
  });

  it('scroll down to next page', async () => {
    var headers1 = element(by.id("postHeader")).atIndex(0)
    await element(by.id("flatlist")).swipe('up')
    var headers2 = element(by.id("postHeader")).atIndex(2)
    await expect(headers2).toBeVisible();
    await expect(headers1).toBeNotVisible();
  });

  it('displays the map page', async () => {
    var flatlist = await element(by.id("flatlist"))
    await element(by.id("mapButton")).tap()
    await expect(flatlist).toBeNotVisible()
  })

  it('displays the profile page', async () => {
    await element(by.traits(['button'])).atIndex(0).tap();
    var flatlist = await element(by.id("flatlist"))
    await element(by.id("profileButton")).tap()
    await expect(flatlist).toBeNotVisible()
  })
  
  it('displays the forecast page', async () => {
    await element(by.traits(['button'])).atIndex(0).tap();
    var flatlist = await element(by.id("flatlist"))
    await element(by.id("profileButton")).tap()
    await expect(flatlist).toBeNotVisible()
  })
});

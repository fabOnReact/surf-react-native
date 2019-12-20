describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('finds the Email input', async () => {
    await expect(element(by.text('Email'))).toBeVisible();
  });

  it('shows error message with invalid credentials', async () => {
    await element(by.text('Sign In')).tap();
    await expect(element(by.id("errorMessage"))).toBeVisible();
  });

  it.only('authenticates the test user', async () => {
    await element(by.type('RCTUITextField').and(by.text('email'))).typeText('testing@torino1')
    // <UIAccessibilityTextFieldElement:0x6000027355c0; AX=Y; AX.id='RNE__Input__text-input'; AX.value='Email'; AX.frame={{10, 111}, {394, 40}}; AX.acti
    // vationPoint={207, 131}; AX.traits='UIAccessibilityTraitNone'; AX.focused='N'>
    // await element(by.text('Password')).replaceText('fabrizio')
    // await element(by.text('Sign In')).tap();
    // await expect(element(by.text('World!!!'))).toBeVisible();
  });
});

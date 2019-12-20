describe('public', () => {
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
});

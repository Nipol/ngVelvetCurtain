import { StaredModule } from './stared.module';

describe('StaredModule', () => {
  let staredModule: StaredModule;

  beforeEach(() => {
    staredModule = new StaredModule();
  });

  it('should create an instance', () => {
    expect(staredModule).toBeTruthy();
  });
});

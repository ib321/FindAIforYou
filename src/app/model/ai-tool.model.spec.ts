import { AiTool } from './ai-tool.model';

describe('AiTool', () => {
  it('should create an instance', () => {
    expect(new AiTool('pricingModel', 'imageLink', 'name', 'shortDesc', 'redirectLink', ['tag1', 'tag2'], 'description')).toBeTruthy();
  });
});

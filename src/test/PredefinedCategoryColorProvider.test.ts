import { PredefinedCategoryColorProvider } from '../services/PredefinedCategoryColorProvider';

describe('PredefinedCategoryColorProvider', () => {
  const colorProvider = new PredefinedCategoryColorProvider();
  const defaultColor = '#808080';

  it.each([['anyCategory'], ['water']])(
    'should return the color in the format #RRGGBB for category %s',
    (category) => {
      const result = colorProvider.provideColor(category);
      expect(result).toMatch(/^#[0-9A-Fa-f]{6}$/);
    }
  );

  it('should return the default color for a random category', () => {
    const result = colorProvider.provideColor('randomCategory');
    expect(result).toBe(defaultColor);
  });

  it.each([
    ['#0285f7', 'water'],
    ['#8f8b1a', 'bug'],
    ['#7ee0d8', 'flying'],
    ['#8b1ab8', 'poison'],
    ['#454d4c', 'normal'],
  ])(
    'should return the color %s for category %s',
    (expectedColor, category) => {
      const result = colorProvider.provideColor(category);
      expect(expectedColor).toBe(result);
    }
  );

  it.each([null, '', undefined, '   '])(
    'should return the default color for input %s',
    (input) => {
      const result = colorProvider.provideColor(input!);
      expect(result).toBe(defaultColor);
    }
  );
});

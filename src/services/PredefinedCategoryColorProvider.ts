import { ICategoryColorProvider } from './abstractions/ICategoryColorProvider';

export class PredefinedCategoryColorProvider implements ICategoryColorProvider {
  private readonly categoryColors = new Map<string, string>();

  constructor() {
    this.categoryColors.set('water', '#0285f7');
    this.categoryColors.set('bug', '#8f8b1a');
    this.categoryColors.set('flying', '#7ee0d8');
    this.categoryColors.set('poison', '#8b1ab8');
    this.categoryColors.set('normal', '#454d4c');
    this.categoryColors.set('default', '#808080');
  }

  public provideColor(category: string): string {
    const color = this.categoryColors.get(category);
    if (color === null || color === undefined) {
      return this.categoryColors.get('default')!;
    }
    return color;
  }
}

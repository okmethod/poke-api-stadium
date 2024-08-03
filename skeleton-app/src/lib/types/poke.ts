export interface ResponsePokeJson {
  name: string;
  id: number;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  height: number;
  weight: number;
}

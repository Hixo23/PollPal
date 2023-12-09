export {};

declare global {
  type TPoll = {
    title: string;
    options: TOption[];
    id: string;
    userName: string;
  };

  type TOption = {
    name: string;
    votes: number;
    id: string;
  };
}

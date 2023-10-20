export type TPoll = {
  title: string;
  options: TOptions[];
};

export type TOptions = {
  name: string;
  votes: number;
};

export type TPoll = {
  title: string;
  options: TOptions[];
  id: string;
  userName: string;
};

export type TOptions = {
  name: string;
  votes: number;
  id: string;
};

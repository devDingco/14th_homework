export interface User {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
    login: {
      uuid: string;
    };
  }
  
  export interface UserResponse {
    results: User[];
    info: {
      seed: string;
      results: number;
      page: number;
      version: string;
    };
  }
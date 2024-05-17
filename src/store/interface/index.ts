export interface UserState {
    token: string | null;
}
export interface AuthState {
    routeName: string;
    authButtonList: {
      [key: string]: string[];
    };
    authMenuList: Menu.MenuOptions[];
  }
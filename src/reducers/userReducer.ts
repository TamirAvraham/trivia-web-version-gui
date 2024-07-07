import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export class User {
  private userId: number;
  private username: string;

  constructor(userId: number, username: string) {
    this.userId = userId;
    this.username = username;
  }
  static fromJson(json: any, username: string): User {
    return new User(json['id'] as number, username);
  }

  public getUserId() { return this.userId }
  public getUsername() { return this.username }
}



interface AuthState {
  user: User | null,
  isAuthenticated: boolean
  requestStatus: 'not started' | 'completed' | 'error' | 'loading'
  error: string
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  requestStatus: 'not started',
  error: ''
}

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials: { username: string; password: string }) => {
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
    }

    const userJson = await response.json();
    const user = User.fromJson(userJson['user'], credentials.username);
    return user;
  }
);

export const signupAsync = createAsyncThunk(
  'auth/signupAsync',
  async (credentials: { username: string; password: string, email: string }) => {
    const response = await fetch('http://localhost:8080/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
    }

    const userJson = await response.json();
    const user = User.fromJson(userJson, credentials.username);
    return user;
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.requestStatus = 'completed';
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error.message!;
      state.requestStatus = 'error'
    });
    builder.addCase(loginAsync.pending, (state) => { state.requestStatus = 'loading' });
    builder.addCase(signupAsync.pending, (state) => { state.requestStatus = 'loading' });
    builder.addCase(signupAsync.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.requestStatus = 'completed'
    });
    builder.addCase(signupAsync.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.error.message!;
      state.requestStatus = 'error';
    });
  },
})

export const { setUser: login, logout } = authSlice.actions;
export default authSlice.reducer;
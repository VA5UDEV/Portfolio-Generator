import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Signup error:", error.message);
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Login error:", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("AuthService :: getCurrentUser :: error", error.message);
      return null;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  }
}

const authService = new AuthService();
export default authService;

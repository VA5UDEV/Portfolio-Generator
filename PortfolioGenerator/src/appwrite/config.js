import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async savePortfolio(
    userid,
    { name, role, profile, skills, experience, education, contact }
  ) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          userid,
          name,
          role, // Example: "Creative Designer"
          profile, // Short profile description
          skills, // Array of skills
          experience, // Array of experience entries
          education, // Array of education entries
          contact: JSON.stringify(contact), // Object containing phone, email, address
        }
      );
    } catch (error) {
      console.error("Error saving portfolio:", error.message);
      return false;
    }
  }

  async uploadProfileImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
      return false;
    }
  }

  async getPortfolio(userid) {
    try {
      const response = await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        [`equal("userid", "${userid}")`]
      );

      if (response.documents.length > 0) {
        let portfolio = response.documents[0];

        return {
          ...portfolio,
          contact: JSON.parse(portfolio.contact), // Convert back to object
        };
      } else {
        return null; // No portfolio found
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error.message);
      return null;
    }
  }
}

const service = new Service();
export default service;

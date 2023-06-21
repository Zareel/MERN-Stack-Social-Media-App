import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://zareelbwd:NIGnONGtJgfbrfS5@ecommerce.oeahohd.mongodb.net/socialMediaApp",
};

export default config;

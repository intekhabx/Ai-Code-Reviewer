import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";


// db configuration for nextjs because in nextjs - kyuki nextjs edge server pe work krta hai to component mount hone ke waqt db connection baar baar hoga to pool full ho jayega
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined; 
}; 


function createPrismaClient(){
  const DB_URI = process.env.DATABASE_URL;
  if(!DB_URI){
    throw new Error("DATABASE_URL is missing in the env")
  }

  const adapter = new PrismaPg({connectionString: DB_URI})
  const prisma = new PrismaClient({adapter});
  return prisma;
}



export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production"){
  globalForPrisma.prisma = prisma; 
}
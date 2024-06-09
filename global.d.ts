// global.d.ts
declare namespace NodeJS {
  interface global {
    _mongoClientPromise: Promise<MongoClient>;
  }
}

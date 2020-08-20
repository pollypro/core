import { MongoClient } from 'mongodb';

let connection: MongoClient = null;

export const getConnection = async (): Promise<MongoClient> => {
  if (connection instanceof MongoClient) {
    return connection;
  }

  const mongoClient = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true });

  try {
    connection = await mongoClient.connect();
    console.log('MongoDB connection established');
  } catch (e) {
    // TODO: catch it
    console.log(e);
  }
  return connection;
};

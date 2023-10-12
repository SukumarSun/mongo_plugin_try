import { GSContext,  GSDataSource, GSStatus, PlainObject} from "@godspeedsystems/core";
import { MongoClient, MongoClientOptions } from 'mongodb';
// import mailchimp from "@mailchimp/mailchimp_marketing"
// import { GSContext, GSDataSource, GSStatus, PlainObject } from "@godspeedsystems/core";
// import { MongoClient, MongoClientOptions } from 'mongodb';

export default class DataSource extends GSDataSource {
    
    private databaseName: string;
    private collectionName: string;

    constructor(config: PlainObject) {
        super(config);
      
        this.databaseName = 'Cluster0'; // Replace with your actual database name
        this.collectionName = 'Post'; // Replace with your actual collection name
    }

    protected async initClient(): Promise<MongoClient> {
        const url="mongodb+srv://Sukumar:Apple123@cluster0.s1ejpmn.mongodb.net/test?retryWrites=true"
        const options = {
            useUnifiedTopology: true,
        } as MongoClientOptions;
        const client = new MongoClient(url, options);
        client.connect().then(() => this.client);
        return client
    }

    async execute(ctx: GSContext, args: PlainObject): Promise<any> {
        try {
            // Ensure the MongoDB client is initialized
            if (!this.client) {
                throw new Error('MongoDB client not initialized.');
            }

            // Access the specific database and collection
            const database = this.client.db(this.databaseName);
            const collection = database.collection(this.collectionName);

            // Example: Insert a document
            const insertResult = await collection.insertOne({ name: 'John', age: 30 });

            // Example: Find documents
            const findResult = await collection.find({ name: 'John' }).toArray();

            // Example: Update a document
            const updateResult = await collection.updateOne({ name: 'John' }, { $set: { age: 31 } });

            // Example: Delete a document
            const deleteResult = await collection.deleteOne({ name: 'John' });
            console.log(insertResult)
            console.log(findResult)
            console.log(updateResult)
            console.log(deleteResult)

            // You can return the results or handle them as needed
            return {
                insertResult,
                findResult,
                updateResult,
                deleteResult,
            };
        } catch (error) {
            throw error;
        }
    }
}



// export default class DataSource extends GSDataSource {

//     private client: MongoClient;
//     private databaseName: string;
//     private collectionName: string;

//     constructor() {
//         super();
//         this.client = client;
//         this.databaseName = 'Cluster0'; // Replace with your actual database name
//         this.collectionName = ''; // Replace with your actual collection name
//     }


//     protected async initClient(): Promise<MongoClient> {
//         const url="mongodb+srv://Sukumar:Apple123@cluster0.s1ejpmn.mongodb.net/test?retryWrites=true"
//         const options = {
//             useUnifiedTopology: true,
//         } as MongoClientOptions;
//        const client = new MongoClient(url, options);   
//        this.client = client;
//        return client.connect()
//        .then(() => client);
//     }     
//     // await client.connect();

//     //     // Access a specific database (replace with your database name)
//     //     const database = client.db();

//     //     // Perform database operations here
//     //     const collection = database.collection('Post');

//     //     // Example: Insert a document
//     //     const insertResult = await collection.insertOne({ name: 'John', age: 30 });

//         // console.log(`Inserted document with _id: ${insertResult.insertedId}`);
  

// async execute(ctx: GSContext, args: PlainObject): Promise<any> {  
//     try {
//         if (!this.client) {
//             throw new Error('MongoDB client not initialized.');
//         }

//         // Access the specific database and collection
//         const database = this.client.db(this.Cluster0);
//         const collection = database.collection(this.collectionName);

//         // Example: Insert a document
//         const insertResult = await collection.insertOne({ name: 'John', age: 30 });

//         // Example: Find documents
//         const findResult = await collection.find({ name: 'John' }).toArray();

//         // Example: Update a document
//         const updateResult = await collection.updateOne({ name: 'John' }, { $set: { age: 31 } });

  
//     } catch (error) {
//       throw error;
//     }
// }
// }

// export {
//   DataSource
// }


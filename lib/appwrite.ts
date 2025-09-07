import { Account, Avatars, Client, Databases,ID, Query, Storage } from "react-native-appwrite"
import { CreateUserParams, SignInParams, GetMenuParams } from "@/type";

export const appwriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    platform: "com.FastFoodApp",
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: '68a72196002f7d5ae3e0',
    bucketId: '68b57c72001a4576097b',
    userCollectionId: '68a721f0001b27e76818',
    categoriesCollectionId: '68adb68c00391ebee2c2',
    menuCollectionId: '68adb72e001431949bd8',
    customizationCollectionId: 'cust12A987310',
    menuCustomizationCollectionId: 'men_custAQ1234F0',
}

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
const avatars = new Avatars(client);

export const createUser = async ({email, password, name}: CreateUserParams) => {
    try{
        const newAccount = await account.create(ID.unique(), email, password, name);

        if(!newAccount) throw Error;

        await signIn({email, password});

        const avatarUrl = avatars.getInitialsURL(name);

        return await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            // data:
            {
                accountId: newAccount.$id,
                email, name, avatar: avatarUrl
            }
        );
        
    }catch(e){
        throw new Error(e as string);
    }
}

export const signIn = async({email, password}: SignInParams) => {
    try{
        
        const session = await account.createEmailPasswordSession(email, password);

    }catch(e){
        throw new Error(e as string)
    }
}

export const getCurrentUser = async () => {
    try{
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    }catch(e){
        console.log(e);
        throw new Error(e as string);
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try{
        const queries: string[] = [];

        if(category) queries.push(Query.equal('categories', category));
        if(query) queries.push(Query.search('name', query));

        const menus = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.menuCollectionId,
            queries,
        )
        return menus.documents;
    }catch(e){
        throw new Error(e as string);
    }
}

export const getCategories = async () => {
    try{
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.categoriesCollectionId,
        )
        return categories.documents;
    }catch (e) {
        throw new Error(e as string);
    }
}
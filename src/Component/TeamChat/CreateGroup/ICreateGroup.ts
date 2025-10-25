export default interface ICreateGroup {
    open: boolean;
    closeCreateGroup: () => void;
    submitHandlerFunc: (groupName: string, userIDs: Array<string>, groupAbout: string, file: any) => Promise<{success : boolean , data : any}>;
}
export default class CommonConfig {
    static readonly days = ["Sun", "Mon", "Tues", "Web", "Thu", "Fri", "Sat"];
    static readonly loadingMessage = { duration: 0, content: "Loading..." };
    static readonly successAddDataMessage = { duration: 2, content: "Successfully Added" };
    static readonly errorMessage = { duration: 2, content: "Something Went Wrong" };
    static readonly successUpdateDataMessage = { duration: 2, content: "Successfully Updated" };
    static readonly companyName: string = "Shop Management";
    static readonly monthConfig: Record<string, string> = {
        "January": "Jan",
        "February": "Feb",
        "March": "Mar",
        "April": "Apr",
        "May": "May",
        "June": "Jun",
        "July": "Jul",
        "August": "Aug",
        "September": "Sep",
        "October": "Oct",
        "November": "Nov",
        "December": "Dec"
    };
    static readonly shortMonthConfig: Array<string> = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    static readonly reloadFunc = () => {
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };
    static readonly blankUserImage: string = "http://localhost:8000/image/BlankUserProfileImage.jpg";
    static readonly socketBaseURL: string = "http://localhost:8000";
}
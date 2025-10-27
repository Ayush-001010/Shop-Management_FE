import type { IProfileSideBarInterface } from "../Interface/NavbarInterface";
import type INavbarInterface from "../Interface/NavbarInterface";

export default class NavbarConfig {
    static readonly config : Array<INavbarInterface> = [
        {
            title : "Home",
            link : "/Home"
        },
        {
            title : "Inventory",
            link : "/Inventory"
        },
        {
            title:"Team Connect",
            link:"/TeamConnect"
        },
        {
            title:"ECommerce",
            link:"/E-Com"
        }
    ];
    static readonly profileSideBarConfig : Array<IProfileSideBarInterface> = [
        {
            title : "Profile",
            icon:"bi bi-person-circle"
        },
        {
            title:"Log Out",
            icon:"bi bi-box-arrow-in-left"
        },
    ]
}
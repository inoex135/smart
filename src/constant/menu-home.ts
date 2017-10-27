import { SuratPage } from "../pages/surat/surat";
import { AptPage } from "../pages/apt/apt";
import { PersonalPage } from "../pages/personal/personal";

export class MenuHomeConstant {
  public static getMenus(): Array<any> {
    const menus = [
      {
        title: "PERSURATAN",
        subtitle: "Pemberitahuan Persuratan",
        iconSmall: "mail_sm",
        iconLarge: "mail_lg",
        component: SuratPage,
        color: "blue-light"
      },
      {
        title: "PERSONAL",
        subtitle: "Pemberitahuan Kalender Kegiatan",
        iconSmall: "calendar_sm",
        iconLarge: "calendar_lg",
        component: PersonalPage,
        color: "orange"
      },
      {
        title: "APT",
        subtitle: "Pemberitahuan Supervisi",
        iconSmall: "checkmark-circle-outline",
        iconLarge: "checkmark-circle-outline",
        component: AptPage,
        color: "green"
      }
    ];

    return menus;
  }
}

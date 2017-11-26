import * as _ from "lodash";

export class NaskahAction {
  public static getAction() {
    const actions = [
      { type: "disposisi", color: "danger", icon: "open" },
      { type: "teruskan", color: "orange", icon: "fastforward" },
      { type: "selesai", color: "primary", icon: "flag" },
      { type: "riwayat", color: "silver", icon: "refresh-circle" }
    ];

    return _.chunk(actions, 2);
  }
}

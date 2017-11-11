export class TimelineDummy {
  static items() {
    const items = [
      {
        title: "6 Maret 2017 - Disposisi",
        content:
          "Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.",
        icon: "calendar",
        time: { subtitle: "4/16/2013", title: "21:30" }
      },
      {
        title: "6 Maret 2017 - Disposisi",
        content:
          "Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.",
        icon: "calendar",
        time: { subtitle: "January", title: "29" }
      },
      {
        title: "6 Maret 2017 - Disposisi",
        content:
          "Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.",
        icon: "calendar",
        time: { title: "Short Text" }
      }
    ];
    return items;
  }

  static agenda() {
    const items = [
      {
        title: "Presentasi",
        content: [
          {
            title: "Kegiatan 1"
          },
          { title: "Kegiatan 2" }
        ],
        time: { subtitle: "4/16/2013", title: "21:30" }
      },
      {
        title: "Presentasi 2",
        content: [
          {
            title: "Kegiatan 3"
          },
          { title: "Kegiatan 4" },
          { title: "Kegiatan 5" }
        ],
        time: { subtitle: "4/16/2013", title: "21:30" }
      }
    ];
    return items;
  }
}

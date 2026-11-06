// Fiyat ve cümle değişecekse aşağıdaki listelere bak.
// Sipariş, sepet, ödeme yok. Yazdığın not telefonda kalır, bir yere gitmez.

const pumpkin = {
  id: "pumpkin",
  ad: "Pumpkin Spice Latte",
  fiyat: "220TL",
  aciklama: "Balkabağı ve tarçın önde. Süt, kahveyi yumuşak bırakır.",
  gorsel: "assets/pumpkin.png",
  alerjen: ["Süt"]
};

const latte = {
  id: "latte",
  ad: "Espresso Latte",
  fiyat: "200TL",
  aciklama: "Süt ve espresso dengesiyle yumuşak, içimi kolay bir kahve.",
  gorsel: "assets/latte.png",
  alerjen: ["Süt"]
};

const macchiato = {
  id: "macchiato",
  ad: "Caramel Macchiato",
  fiyat: "220TL",
  aciklama: "Karamel sosu ve sütlü espresso ile tatlı ve dengeli bir lezzet.",
  gorsel: "assets/macchiato.png",
  alerjen: ["Süt"]
};

const cheesecake = {
  id: "cheesecake",
  ad: "San Sebastian Cheesecake",
  fiyat: "250TL",
  aciklama: "Dışı kıtır, içi kremamsı. Karamel tadı belirgin.",
  gorsel: "assets/cheesecake.png",
  alerjen: ["Süt", "Gluten", "Yumurta"]
};

const oneCikanlar = [pumpkin, cheesecake, latte];

const alerjenSimge = {
  "Süt": "assets/milk.svg",
  "Gluten": "assets/gluten.svg",
  "Yumurta": "assets/yumurta.svg",
  "Fındık": "assets/findik.svg",
  "Soya": "assets/soya.svg"
};

const kategoriler = [
  {
    id: "sicak",
    ad: "Sıcak Kahveler",
    urunler: [
      {
        id: "espresso",
        ad: "Espresso",
        fiyat: "140TL",
        aciklama: "Kısa, yoğun, acımsı. Kahvenin kendisi.",
        gorsel: "assets/espresso.png",
        alerjen: []
      },
      {
        id: "americano",
        ad: "Americano",
        fiyat: "160TL",
        aciklama: "Sıcak suyla açılmış espresso. Daha uzun, daha sade.",
        gorsel: "assets/americano.png",
        alerjen: []
      },
      latte,
      macchiato
    ]
  },
  {
    id: "soguk",
    ad: "Soğuk Kahveler",
    urunler: [
      {
        id: "iced-americano",
        ad: "Iced Americano",
        fiyat: "170TL",
        aciklama: "Buz üstünde espresso. Ferah, kahve tadı önde.",
        gorsel: "assets/iced-americano.png",
        alerjen: []
      },
      {
        id: "iced-latte",
        ad: "Iced Latte",
        fiyat: "210TL",
        aciklama: "Soğuk süt kahveyi yumuşatır. Serin ve kıvamlı.",
        gorsel: "assets/iced-latte.png",
        alerjen: ["Süt"]
      },
      {
        id: "cold-brew",
        ad: "Cold Brew",
        fiyat: "190TL",
        aciklama: "Uzun demleme. Az acı, yuvarlak, soğuk.",
        gorsel: "assets/cold-brew.png",
        alerjen: []
      }
    ]
  },
  {
    id: "diger",
    ad: "Diğer İçecekler",
    urunler: [
      {
        id: "cay",
        ad: "Çay",
        fiyat: "100TL",
        aciklama: "Taze demlenmiş siyah çay. Sade ve sıcak.",
        gorsel: "assets/cay.png",
        alerjen: []
      },
      {
        id: "cikolata",
        ad: "Sıcak Çikolata",
        fiyat: "190TL",
        aciklama: "Yoğun kakao, sıcak süt. Tatlı ve kıvamlı.",
        gorsel: "assets/cikolata.png",
        alerjen: ["Süt", "Soya"]
      },
      {
        id: "limonata",
        ad: "Limonata",
        fiyat: "140TL",
        aciklama: "Ekşi, ferah, az tatlı.",
        gorsel: "assets/limonata.png",
        alerjen: []
      },
      {
        id: "soda",
        ad: "Soda",
        fiyat: "95TL",
        aciklama: "",
        gorsel: "",
        alerjen: []
      },
      {
        id: "su",
        ad: "Su",
        fiyat: "80TL",
        aciklama: "",
        gorsel: "",
        alerjen: []
      }
    ]
  },
  {
    id: "tatli",
    ad: "Tatlılar",
    urunler: [
      cheesecake,
      {
        id: "brownie",
        ad: "Brownie",
        fiyat: "210TL",
        aciklama: "Nemli, yoğun kakaolu, hafif acımsı.",
        gorsel: "assets/brownie.png",
        alerjen: ["Süt", "Gluten", "Yumurta"]
      },
      {
        id: "cookie",
        ad: "Cookie",
        fiyat: "160TL",
        aciklama: "Kenarı çıtır, içi yumuşak. Tereyağı, vanilya ve fındık.",
        gorsel: "assets/cookie.png",
        alerjen: ["Süt", "Gluten", "Yumurta", "Fındık"]
      }
    ]
  }
];

const vitrinEl = document.querySelector("#vitrin");
const noktalarEl = document.querySelector("#noktalar");
const kategorilerEl = document.querySelector("#kategoriler");
const listeEl = document.querySelector("#liste");
const perde = document.querySelector("#perde");
const bilgi = document.querySelector("#bilgi");
const bilgiIc = document.querySelector("#bilgi-ic");
const kapatButonu = document.querySelector("#kapat");
const menuButonu = document.querySelector("#menu-buton");

let faz = 0;
let fazKilit = false;
let kategoriIndex = 0;
let acanButon = null;
let kapanis = null;
let listeTur = 0;
let sheetNesil = 0;

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function simgeler(urun) {
  const kutu = el("div", "simgeler");
  urun.alerjen.forEach((ad) => {
    const buton = el("button", "alerjen-ikon");
    buton.type = "button";
    buton.dataset.id = urun.id;
    buton.setAttribute("aria-label", ad + ": " + urun.ad);
    const ikon = document.createElement("img");
    ikon.src = alerjenSimge[ad];
    ikon.alt = "";
    buton.append(ikon);
    kutu.append(buton);
  });
  return kutu;
}

function fiyatRozeti(fiyat, buyuk) {
  return el("span", buyuk ? "fiyat buyuk" : "fiyat", fiyat);
}

function vitrinKarti(urun) {
  const kart = el("article", "vitrin-kart");
  kart.append(el("h3", "vitrin-ad", urun.ad));
  const gorsel = el("div", "vitrin-gorsel");
  const img = document.createElement("img");
  img.src = urun.gorsel;
  img.alt = "";
  img.draggable = false;
  gorsel.append(img);
  const alt = el("div", "vitrin-alt");
  if (urun.alerjen.length) alt.append(simgeler(urun));
  alt.append(fiyatRozeti(urun.fiyat, false));
  kart.append(gorsel, alt);
  return kart;
}

function cizKartlar() {
  const adet = oneCikanlar.length;
  vitrinEl.replaceChildren();
  vitrinEl.append(
    vitrinKarti(oneCikanlar[faz % adet]),
    vitrinKarti(oneCikanlar[(faz + 1) % adet])
  );
}

function noktaGuncelle() {
  [...noktalarEl.children].forEach((nokta, i) => {
    nokta.classList.toggle("aktif", i === faz);
    if (i === faz) nokta.setAttribute("aria-current", "true");
    else nokta.removeAttribute("aria-current");
  });
}

function cizVitrin() {
  cizKartlar();
  noktalarEl.replaceChildren();
  oneCikanlar.forEach((urun, index) => {
    const nokta = el("button", index === faz ? "nokta aktif" : "nokta");
    nokta.type = "button";
    nokta.setAttribute("aria-label", urun.ad);
    nokta.addEventListener("click", () => fazGit(index));
    noktalarEl.append(nokta);
  });
}

function fazGit(hedef) {
  if (fazKilit || hedef === faz) return;
  const ileri = (hedef - faz + oneCikanlar.length) % oneCikanlar.length === 1;
  fazKilit = true;
  vitrinEl.classList.remove("gel");
  vitrinEl.classList.add("cik");
  window.setTimeout(() => {
    faz = hedef;
    cizKartlar();
    noktaGuncelle();
    vitrinEl.classList.remove("cik");
    void vitrinEl.offsetWidth;
    vitrinEl.classList.add(ileri ? "gel" : "gel geri");
    fazKilit = false;
  }, 160);
}

function kaydir(yon) {
  const adet = oneCikanlar.length;
  fazGit((faz + yon + adet) % adet);
}

function urunKarti(urun) {
  const kart = el("article", urun.gorsel ? "urun" : "urun yalin");
  if (urun.gorsel) {
    const gorsel = el("div", "urun-gorsel");
    const img = document.createElement("img");
    img.src = urun.gorsel;
    img.alt = "";
    gorsel.append(img);
    kart.append(gorsel);
  }

  const yazi = el("div", "urun-yazi");
  yazi.append(el("h3", "urun-ad", urun.ad));
  if (urun.aciklama) yazi.append(el("p", "urun-aciklama", urun.aciklama));

  const alt = el("div", "urun-alt");
  if (urun.alerjen.length) alt.append(simgeler(urun));
  alt.append(fiyatRozeti(urun.fiyat, true));
  yazi.append(alt);
  kart.append(yazi);
  return kart;
}

function doldurListe() {
  const kategori = kategoriler[kategoriIndex];
  listeEl.replaceChildren();
  listeEl.setAttribute("aria-label", kategori.ad);
  kategori.urunler.forEach((urun) => listeEl.append(urunKarti(urun)));
}

function cizKategoriler() {
  kategorilerEl.replaceChildren();
  kategoriler.forEach((kategori, index) => {
    const buton = el("button", index === kategoriIndex ? "kategori secili" : "kategori", kategori.ad);
    buton.type = "button";
    buton.role = "tab";
    buton.setAttribute("aria-selected", index === kategoriIndex ? "true" : "false");
    buton.addEventListener("click", () => {
      if (index === kategoriIndex) return;
      kategoriIndex = index;
      cizKategoriler();
      const tur = ++listeTur;
      listeEl.classList.remove("gel");
      listeEl.classList.add("gidiyor");
      window.setTimeout(() => {
        if (tur !== listeTur) return;
        listeEl.classList.remove("gidiyor");
        doldurListe();
        void listeEl.offsetWidth;
        listeEl.classList.add("gel");
      }, 160);
    });
    kategorilerEl.append(buton);
  });
}

function urunBul(id) {
  const vitrin = oneCikanlar.find((urun) => urun.id === id);
  if (vitrin) return vitrin;
  for (const kategori of kategoriler) {
    const bulunan = kategori.urunler.find((urun) => urun.id === id);
    if (bulunan) return bulunan;
  }
  return null;
}

function sheetAc(ciz, buton) {
  const zatenAcik = !perde.hidden && !perde.classList.contains("gidiyor");
  sheetNesil += 1;
  if (kapanis) {
    window.clearTimeout(kapanis);
    kapanis = null;
  }
  bilgiIc.replaceChildren();
  ciz(bilgiIc);
  if (zatenAcik) {
    bilgiIc.classList.remove("gel");
    void bilgiIc.offsetWidth;
    bilgiIc.classList.add("gel");
  }
  acanButon = buton || null;
  perde.classList.remove("gidiyor");
  perde.hidden = false;
  document.body.classList.add("kilit");
  if (buton === menuButonu) menuButonu.setAttribute("aria-expanded", "true");
  kapatButonu.focus();
}

function sheetKapat() {
  if (perde.hidden) return;
  const nesil = ++sheetNesil;
  perde.classList.add("gidiyor");
  const bitir = (event) => {
    if (event && event.target !== perde) return;
    perde.removeEventListener("animationend", bitir);
    if (nesil !== sheetNesil || perde.hidden) return;
    perde.hidden = true;
    perde.classList.remove("gidiyor");
    document.body.classList.remove("kilit");
    menuButonu.setAttribute("aria-expanded", "false");
    if (acanButon) acanButon.focus();
    acanButon = null;
  };
  perde.addEventListener("animationend", bitir);
  kapanis = window.setTimeout(() => bitir(), 280);
}

function baslik(metin) {
  const h = el("h2", "", metin);
  h.id = "bilgi-baslik";
  bilgi.setAttribute("aria-labelledby", "bilgi-baslik");
  return h;
}

function urunSheet(urun) {
  return (kutu) => {
    kutu.append(baslik(urun.ad));
    if (urun.aciklama) kutu.append(el("p", "bilgi-metin", urun.aciklama));
    kutu.append(fiyatRozeti(urun.fiyat, true));
    if (urun.alerjen.length) {
      const kutuAlerjen = el("div", "alerjen");
      kutuAlerjen.append(el("p", "alerjen-baslik", "Alerjen"));
      urun.alerjen.forEach((ad) => {
        const satir = el("div", "alerjen-satir");
        const ikon = document.createElement("img");
        ikon.src = alerjenSimge[ad];
        ikon.alt = "";
        satir.append(ikon, el("span", "", ad + " içerir."));
        kutuAlerjen.append(satir);
      });
      kutu.append(kutuAlerjen);
    }
  };
}

function menuSatiri(ad, ac) {
  const buton = el("button", "satir", ad);
  buton.type = "button";
  buton.addEventListener("click", ac);
  return buton;
}

function geriSatiri(hedef) {
  const buton = el("button", "geri", "Geri");
  buton.type = "button";
  buton.addEventListener("click", () => sheetAc(hedef, menuButonu));
  return buton;
}

function menuSheet(kutu) {
  bilgi.setAttribute("aria-label", "Menü");
  bilgi.removeAttribute("aria-labelledby");
  const liste = el("div", "satirlar");
  liste.append(
    menuSatiri("Bize oy ver", () => sheetAc(oySheet, menuButonu)),
    menuSatiri("İstek ve şikayetler", () => sheetAc(sikayetSheet, menuButonu)),
    menuSatiri("Bizi takip et", () => sheetAc(takipSheet, menuButonu))
  );
  kutu.append(liste);
}

function oySheet(kutu) {
  kutu.append(geriSatiri(menuSheet));
  kutu.append(baslik("Bize oy ver"));
  kutu.append(el("p", "bilgi-metin", "Bugünkü kahven nasıldı?"));
  const yildizlar = el("div", "yildizlar");
  const tesekkur = el("p", "bilgi-metin", "");
  for (let puan = 1; puan <= 5; puan += 1) {
    const yildiz = el("button", "yildiz", "★");
    yildiz.type = "button";
    yildiz.setAttribute("aria-label", puan + " yıldız");
    yildiz.addEventListener("click", () => {
      [...yildizlar.children].forEach((dugme, index) => {
        dugme.classList.toggle("dolu", index < puan);
      });
      tesekkur.textContent = "Teşekkürler.";
    });
    yildizlar.append(yildiz);
  }
  kutu.append(yildizlar, tesekkur);
}

function sikayetSheet(kutu) {
  kutu.append(geriSatiri(menuSheet));
  kutu.append(baslik("İstek ve şikayetler"));
  const alan = document.createElement("textarea");
  alan.className = "not";
  alan.placeholder = "Yazmak istediğin";
  alan.maxLength = 400;
  const gonder = el("button", "gonder", "Gönder");
  gonder.type = "button";
  gonder.addEventListener("click", () => {
    const metin = alan.value.trim();
    if (!metin) return;
    alan.remove();
    gonder.remove();
    kutu.append(el("p", "bilgi-metin", "İletin alındı."));
  });
  kutu.append(alan, gonder);
}

function takipSheet(kutu) {
  kutu.append(geriSatiri(menuSheet));
  kutu.append(baslik("Bizi takip et"));
  kutu.append(el("p", "bilgi-metin", "Instagram"));
  kutu.append(el("p", "hesap", "@kahveciniz"));
}

function sutTiklandi(event) {
  const buton = event.target.closest(".alerjen-ikon");
  if (!buton) return;
  const urun = urunBul(buton.dataset.id);
  if (urun) sheetAc(urunSheet(urun), buton);
}

document.querySelector("#onceki").addEventListener("click", () => kaydir(-1));
document.querySelector("#sonraki").addEventListener("click", () => kaydir(1));
vitrinEl.addEventListener("click", sutTiklandi);

let parmak = null;

function parmakBirak(x, y) {
  if (!parmak) return;
  const dx = x - parmak.x;
  const dy = y - parmak.y;
  parmak = null;
  if (Math.abs(dx) < 24 || Math.abs(dx) < Math.abs(dy)) return;
  kaydir(dx < 0 ? 1 : -1);
}

vitrinEl.addEventListener("touchstart", (event) => {
  if (event.target.closest("button")) return;
  const dokunus = event.changedTouches[0];
  parmak = { x: dokunus.clientX, y: dokunus.clientY, sonX: dokunus.clientX, sonY: dokunus.clientY };
}, { passive: true });

vitrinEl.addEventListener("touchmove", (event) => {
  if (!parmak) return;
  const dokunus = event.touches[0];
  parmak.sonX = dokunus.clientX;
  parmak.sonY = dokunus.clientY;
  const dx = dokunus.clientX - parmak.x;
  const dy = dokunus.clientY - parmak.y;
  if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy)) event.preventDefault();
}, { passive: false });

vitrinEl.addEventListener("touchend", (event) => {
  const dokunus = event.changedTouches[0];
  parmakBirak(dokunus.clientX, dokunus.clientY);
}, { passive: true });

vitrinEl.addEventListener("touchcancel", () => {
  if (!parmak) return;
  parmakBirak(parmak.sonX, parmak.sonY);
});

vitrinEl.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse" || event.button !== 0) return;
  if (event.target.closest("button")) return;
  parmak = { x: event.clientX, y: event.clientY, sonX: event.clientX, sonY: event.clientY };
});

vitrinEl.addEventListener("pointerup", (event) => {
  if (event.pointerType !== "mouse") return;
  parmakBirak(event.clientX, event.clientY);
});
listeEl.addEventListener("click", sutTiklandi);
menuButonu.addEventListener("click", () => sheetAc(menuSheet, menuButonu));
kapatButonu.addEventListener("click", sheetKapat);
perde.addEventListener("click", (event) => {
  if (event.target === perde) sheetKapat();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !perde.hidden) sheetKapat();
});

cizVitrin();
cizKategoriler();
doldurListe();

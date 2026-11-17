/* =========================================================
   SEALO · 小海豹基地
   Vanilla JS + WebGL SDF seal. No dependencies, no assets.
   ========================================================= */
(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. The complete Phocidae family (SMM July 2025)
     20 species / 19 extant + 1 extinct
     --------------------------------------------------------- */
  const SPECIES = [
    {
      id: "harbor-seal",
      scientific: "Phoca vitulina",
      habitat: "temperate",
      pattern: "fine-spots",
      bodyHex: "#9A968B",
      bellyHex: "#D3CFC3",
      accentHex: "#59544A",
      bodyShape: "compact",
      extinct: false,
      length: "1.4–1.9 m",
      weight: "60–170 kg",
      iucn: "LC",
      names: { "zh-Hant": "港海豹", "zh-Hans": "港海豹", en: "Harbor seal", ja: "ゼニガタアザラシ" },
      info: {
        "zh-Hant": { region: "北大西洋與北太平洋沿岸（溫帶至亞寒帶）。", blurb: "港灣裡的圓圓臉小可愛，常在礁石上慵懶曬太陽。", fact: "每隻海豹的斑點圖案都獨一無二，就像指紋一樣。", diet: "魚類、頭足類、甲殼類。", dive: "通常在100公尺以淺，最深約300公尺。", life: "20–30年" },
        "zh-Hans": { region: "北大西洋与北太平洋沿岸（温带至亚寒带）。", blurb: "港湾里的圆圆脸小可爱，常在礁石上慵懒晒太阳。", fact: "每只海豹的斑点图案都独一无二，就像指纹一样。", diet: "鱼类、头足类、甲壳类。", dive: "通常在100米以浅，最深约300米。", life: "20–30年" },
        en: { region: "North Atlantic and North Pacific coasts, temperate to subarctic.", blurb: "A round-faced charmer that hauls out on rocks and beaches.", fact: "Each seal's spot pattern is unique, much like a human fingerprint.", diet: "fish, squid and crustaceans", dive: "usually <100 m, recorded to ~300 m", life: "20–30 years" },
        ja: { region: "北大西洋と北太平洋の沿岸（温帯〜亜寒帯）。", blurb: "港や岩場で日向ぼっこをする、まるまるとした愛らしいアザラシ。", fact: "個体ごとの斑点模様は指紋のようにひとつずつ異なります。", diet: "魚類、イカ・タコ類、甲殻類。", dive: "ふだんは100 m以浅、最深約300 m。", life: "20–30年" }
      }
    },
    {
      id: "spotted-seal",
      scientific: "Phoca largha",
      habitat: "arctic",
      pattern: "spots",
      bodyHex: "#A8A599",
      bellyHex: "#D9D6CB",
      accentHex: "#47443B",
      bodyShape: "compact",
      extinct: false,
      length: "1.4–1.8 m",
      weight: "65–120 kg",
      iucn: "LC",
      names: { "zh-Hant": "斑海豹", "zh-Hans": "斑海豹", en: "Spotted seal", ja: "ゴマフアザラシ" },
      info: {
        "zh-Hant": { region: "北太平洋；在鄂霍次克海與白令海的浮冰上繁殖。", blurb: "一身星點斑紋的浮冰小精靈，好奇心滿滿。", fact: "幼崽出生時披著雪白胎毛，在浮冰上哺育。", diet: "魚類、甲殼類、頭足類。", dive: "通常在50–100公尺，最深約300公尺。", life: "25–35年" },
        "zh-Hans": { region: "北太平洋；在鄂霍次克海与白令海的浮冰上繁殖。", blurb: "一身星点斑纹的浮冰小精灵，好奇心满满。", fact: "幼崽出生时披着雪白胎毛，在浮冰上哺育。", diet: "鱼类、甲壳类、头足类。", dive: "通常在50–100米，最深约300米。", life: "25–35年" },
        en: { region: "North Pacific; breeds on sea ice in the Bering and Okhotsk seas.", blurb: "A star-spotted ice dweller with a curious nature.", fact: "Pups are born in a fluffy white coat and nursed on sea ice.", diet: "fish, crustaceans and squid", dive: "usually 50–100 m, recorded to ~300 m", life: "25–35 years" },
        ja: { region: "北太平洋、ベーリング海やオホーツク海の流氷で繁殖。", blurb: "星を散らしたような斑点がかわいい、流氷の小さな住人。", fact: "生まれたばかりの子は真っ白な産毛をまとって流氷の上で育ちます。", diet: "魚類、甲殻類、イカ・タコ類。", dive: "ふだんは50–100 m、最深約300 m。", life: "25–35年" }
      }
    },
    {
      id: "ringed-seal",
      scientific: "Pusa hispida",
      habitat: "arctic",
      pattern: "rings",
      bodyHex: "#A4A8AA",
      bellyHex: "#D8DBDD",
      accentHex: "#3B4044",
      bodyShape: "compact",
      extinct: false,
      length: "1.1–1.6 m",
      weight: "50–100 kg",
      iucn: "LC",
      names: { "zh-Hant": "環斑海豹", "zh-Hans": "环斑海豹", en: "Ringed seal", ja: "ワモンアザラシ" },
      info: {
        "zh-Hant": { region: "環北極海域，以及波羅的海、拉多加湖與塞馬湖。", blurb: "圓滾滾的環斑小海豹，是北極海冰上的堅毅住客。", fact: "用前鰭的爪子在海冰上挖出呼吸孔，冰層再厚也難不倒牠。", diet: "魚類、磷蝦、甲殼類。", dive: "通常在100公尺以淺，最深約500公尺。", life: "25–30年" },
        "zh-Hans": { region: "环北极海域，以及波罗的海、拉多加湖与塞马湖。", blurb: "圆滚滚的环斑小海豹，是北极海冰上的坚毅住客。", fact: "用前鳍的爪子在海冰上挖出呼吸孔，冰层再厚也难不倒它。", diet: "鱼类、磷虾、甲壳类。", dive: "通常在100米以浅，最深约500米。", life: "25–30年" },
        en: { region: "Circumpolar Arctic, plus the Baltic Sea and Lakes Ladoga and Saimaa.", blurb: "A plump Arctic resident marked with pale rings.", fact: "It claws breathing holes through thick sea ice with its front flippers.", diet: "fish, krill and crustaceans", dive: "usually <100 m, recorded to ~500 m", life: "25–30 years" },
        ja: { region: "北極海の周極域、バルト海、ラドガ湖・サイマー湖。", blurb: "まるまるとした体に環模様がある、北極の海氷のたくましい住人。", fact: "前肢の爪で厚い海氷に呼吸用の穴を掘り続けます。", diet: "魚類、オキアミ、甲殻類。", dive: "ふだんは100 m以浅、最深約500 m。", life: "25–30年" }
      }
    },
    {
      id: "saimaa-ringed-seal",
      scientific: "Pusa saimensis",
      habitat: "temperate",
      pattern: "rings",
      bodyHex: "#6E7275",
      bellyHex: "#AAAEB0",
      accentHex: "#393D40",
      bodyShape: "compact",
      extinct: false,
      length: "1.3–1.45 m",
      weight: "50–90 kg",
      iucn: "EN",
      names: { "zh-Hant": "塞馬環斑海豹", "zh-Hans": "塞马环斑海豹", en: "Saimaa ringed seal", ja: "サイマーワモンアザラシ" },
      info: {
        "zh-Hant": { region: "芬蘭塞馬湖（淡水湖泊）。", blurb: "隱居芬蘭湖中的珍稀小圓臉，全世界只有數百隻。", fact: "自末次冰期以來就被困在淡水湖中，是極度瀕危的珍稀海豹。", diet: "白鮭、河鱸等小魚。", dive: "通常在40公尺以淺的湖中。", life: "20–30年" },
        "zh-Hans": { region: "芬兰塞马湖（淡水湖泊）。", blurb: "隐居芬兰湖中的珍稀小圆脸，全世界只有数百只。", fact: "自末次冰期以来就被困在淡水湖中，是极度濒危的珍稀海豹。", diet: "白鲑、河鲈等小鱼。", dive: "通常在40米以浅的湖中。", life: "20–30年" },
        en: { region: "Lake Saimaa, Finland (freshwater).", blurb: "A rare lake dweller found only in Finland.", fact: "Landlocked since the last ice age, only a few hundred remain.", diet: "small fish such as vendace, perch and roach", dive: "usually <40 m within the lake", life: "20–30 years" },
        ja: { region: "フィンランドのサイマー湖のみ（淡水）。", blurb: "フィンランドの湖にだけ棲む、世界でも数少ない貴重なアザラシ。", fact: "最終氷期から湖に取り残された、数百頭しかいない希少種です。", diet: "小魚（ワカサギ、スズキ、ローチなど）。", dive: "ふだんは40 m以浅の湖内。", life: "20–30年" }
      }
    },
    {
      id: "baikal-seal",
      scientific: "Pusa sibirica",
      habitat: "temperate",
      pattern: "plain",
      bodyHex: "#6A6D6F",
      bellyHex: "#B4B7B9",
      accentHex: "#3D4043",
      bodyShape: "compact",
      extinct: false,
      length: "1.2–1.4 m",
      weight: "60–120 kg",
      iucn: "LC",
      names: { "zh-Hant": "貝加爾海豹", "zh-Hans": "贝加尔海豹", en: "Baikal seal", ja: "バイカルアザラシ" },
      info: {
        "zh-Hant": { region: "俄羅斯貝加爾湖（淡水湖泊）。", blurb: "住在世界最深淡水湖裡的小海豹，可愛又神秘。", fact: "貝加爾湖是世界最深、最古老的湖泊，正是牠們唯一的家園。", diet: "以油魚（貝湖魚科）為主。", dive: "通常在10–50公尺，最深約300公尺。", life: "最長約50年" },
        "zh-Hans": { region: "俄罗斯贝加尔湖（淡水湖泊）。", blurb: "住在世界最深淡水湖里的小海豹，可爱又神秘。", fact: "贝加尔湖是世界最深、最古老的湖泊，正是它们唯一的家园。", diet: "以油鱼（贝湖鱼科）为主。", dive: "通常在10–50米，最深约300米。", life: "最长约50年" },
        en: { region: "Lake Baikal, Siberia (freshwater).", blurb: "A little seal of the world's deepest lake.", fact: "Endemic to Lake Baikal, the world's deepest and oldest lake.", diet: "mainly golomyanka oilfish", dive: "usually 10–50 m, recorded to ~300 m", life: "up to ~50 years" },
        ja: { region: "シベリアのバイカル湖のみ（淡水）。", blurb: "世界で最も深い湖に棲む、謎めいた小さなアザラシ。", fact: "世界で最も深く、最も古いバイカル湖だけに暮らすアザラシです。", diet: "主に油魚のゴロミャンカ。", dive: "ふだんは10–50 m、最深約300 m。", life: "最長約50年" }
      }
    },
    {
      id: "caspian-seal",
      scientific: "Pusa caspica",
      habitat: "temperate",
      pattern: "spots",
      bodyHex: "#9CA2A5",
      bellyHex: "#D0D5D7",
      accentHex: "#4C5255",
      bodyShape: "compact",
      extinct: false,
      length: "1.2–1.5 m",
      weight: "50–90 kg",
      iucn: "EN",
      names: { "zh-Hant": "裏海海豹", "zh-Hans": "里海海豹", en: "Caspian seal", ja: "カスピカイアザラシ" },
      info: {
        "zh-Hant": { region: "裏海（內陸鹹水湖）。", blurb: "裏海的獨有居民，圓圓眼睛惹人憐愛。", fact: "在裏海北部的冬季浮冰上產仔，是裏海唯一的「海」豹。", diet: "小魚（黍鯡、鰕虎魚）與甲殼類。", dive: "通常在50公尺以淺，最深約200公尺。", life: "25–35年" },
        "zh-Hans": { region: "里海（内陆咸水湖）。", blurb: "里海的独有居民，圆圆眼睛惹人怜爱。", fact: "在里海北部的冬季浮冰上产仔，是里海唯一的「海」豹。", diet: "小鱼（黍鲱、虾虎鱼）与甲壳类。", dive: "通常在50米以浅，最深约200米。", life: "25–35年" },
        en: { region: "Caspian Sea only.", blurb: "The Caspian Sea's own round-eyed resident.", fact: "It pups on winter ice in the northern Caspian, the sea's only seal.", diet: "small fish (sprats, gobies) and crustaceans", dive: "usually <50 m, recorded to ~200 m", life: "25–35 years" },
        ja: { region: "カスピ海のみ。", blurb: "カスピ海だけに棲む、つぶらな瞳が愛らしいアザラシ。", fact: "カスピ海北部の冬の流氷で出産する、この海唯一のアザラシです。", diet: "小魚（スプラット、ハゼなど）、甲殻類。", dive: "ふだんは50 m以浅、最深約200 m。", life: "25–35年" }
      }
    },
    {
      id: "ribbon-seal",
      scientific: "Histriophoca fasciata",
      habitat: "arctic",
      pattern: "ribbons",
      bodyHex: "#453D36",
      bellyHex: "#C8BEA9",
      accentHex: "#E9E0C9",
      bodyShape: "slender",
      extinct: false,
      length: "1.5–1.8 m",
      weight: "70–110 kg",
      iucn: "LC",
      names: { "zh-Hant": "帶紋海豹", "zh-Hans": "带纹海豹", en: "Ribbon seal", ja: "クラカケアザラシ" },
      info: {
        "zh-Hant": { region: "白令海與鄂霍次克海。", blurb: "身上繫著緞帶般白環的優雅海豹，十分罕見。", fact: "成體暗色的身軀上，環繞著四道寬闊的白環。", diet: "魚類、頭足類、甲殼類。", dive: "通常在100–300公尺，最深約600公尺。", life: "20–30年" },
        "zh-Hans": { region: "白令海与鄂霍次克海。", blurb: "身上系着缎带般白环的优雅海豹，十分罕见。", fact: "成体暗色的身躯上，环绕着四道宽阔的白环。", diet: "鱼类、头足类、甲壳类。", dive: "通常在100–300米，最深约600米。", life: "20–30年" },
        en: { region: "Bering Sea and Sea of Okhotsk.", blurb: "An elegant, rarely seen seal wrapped in white bands.", fact: "Adults sport four broad white bands circling a dark body.", diet: "fish, squid and crustaceans", dive: "usually 100–300 m, recorded to ~600 m", life: "20–30 years" },
        ja: { region: "ベーリング海とオホーツク海。", blurb: "リボンのような白い帯をまとった、とても珍しい優雅なアザラシ。", fact: "成獣の暗い体には、はっきりした白い帯が4本めぐっています。", diet: "魚類、イカ・タコ類、甲殻類。", dive: "ふだんは100–300 m、最深約600 m。", life: "20–30年" }
      }
    },
    {
      id: "harp-seal",
      scientific: "Pagophilus groenlandicus",
      habitat: "arctic",
      pattern: "harp",
      bodyHex: "#B9BEC2",
      bellyHex: "#E5E8EA",
      accentHex: "#282D32",
      bodyShape: "slender",
      extinct: false,
      length: "1.5–1.9 m",
      weight: "100–180 kg",
      iucn: "NT",
      names: { "zh-Hant": "豎琴海豹", "zh-Hans": "竖琴海豹", en: "Harp seal", ja: "タテゴトアザラシ" },
      info: {
        "zh-Hant": { region: "北大西洋浮冰（西北大西洋、格陵蘭海、白海）。", blurb: "小時候雪白圓潤，長大後背上長出豎琴花紋。", fact: "新生幼崽披著雪白的胎毛，長大換毛後才出現豎琴狀斑紋。", diet: "魚類（毛鱗魚、北極鱈）、磷蝦與甲殼類。", dive: "通常在150公尺以淺，最深約500公尺。", life: "25–30年" },
        "zh-Hans": { region: "北大西洋浮冰（西北大西洋、格陵兰海、白海）。", blurb: "小时候雪白圆润，长大后背上长出竖琴花纹。", fact: "新生幼崽披着雪白的胎毛，长大换毛后才出现竖琴状斑纹。", diet: "鱼类（毛鳞鱼、北极鳕）、磷虾与甲壳类。", dive: "通常在150米以浅，最深约500米。", life: "25–30年" },
        en: { region: "North Atlantic pack ice: NW Atlantic, Greenland Sea, White Sea.", blurb: "Snow-white as a pup, harp-marked as an adult.", fact: "Newborns wear a pure-white 'whitecoat' before moulting.", diet: "fish (capelin, polar cod), krill and crustaceans", dive: "usually <150 m, recorded to ~500 m", life: "25–30 years" },
        ja: { region: "北大西洋の流氷（ニューファンドランド沖、グリーンランド海、白海）。", blurb: "赤ちゃんは真っ白、成長すると背中に竪琴の模様が現れるアザラシ。", fact: "生まれた子は「ホワイトコート」と呼ばれる白い産毛をまとっています。", diet: "魚類（カラフトシシャモなど）、オキアミ、甲殻類。", dive: "ふだんは150 m以浅、最深約500 m。", life: "25–30年" }
      }
    },
    {
      id: "hooded-seal",
      scientific: "Cystophora cristata",
      habitat: "arctic",
      pattern: "mottled",
      bodyHex: "#A9B2B8",
      bellyHex: "#DCE1E4",
      accentHex: "#232A31",
      bodyShape: "robust",
      extinct: false,
      length: "2.0–3.0 m",
      weight: "150–400 kg",
      iucn: "EN",
      names: { "zh-Hant": "冠海豹", "zh-Hans": "冠海豹", en: "Hooded seal", ja: "ズキンアザラシ" },
      info: {
        "zh-Hant": { region: "北大西洋（格陵蘭、揚馬延島、紐芬蘭一帶）。", blurb: "頭頂會吹出紅色「氣球」的搞笑潛水高手。", fact: "雄海豹能把鼻腔裡的紅色氣囊充氣，鼓起像頭罩一樣。", diet: "魚類、魷魚、甲殼類。", dive: "通常在100–600公尺，最深約1000公尺。", life: "25–35年" },
        "zh-Hans": { region: "北大西洋（格陵兰、扬马延岛、纽芬兰一带）。", blurb: "头顶会吹出红色「气球」的搞笑潜水高手。", fact: "雄海豹能把鼻腔里的红色气囊充气，鼓起像头罩一样。", diet: "鱼类、鱿鱼、甲壳类。", dive: "通常在100–600米，最深约1000米。", life: "25–35年" },
        en: { region: "North Atlantic: Greenland, Jan Mayen, Newfoundland.", blurb: "A deep-diving oddball that blows up a red balloon.", fact: "Adult males inflate a red nasal sac into a balloon-like hood.", diet: "fish, squid and crustaceans", dive: "usually 100–600 m, recorded to ~1000 m", life: "25–35 years" },
        ja: { region: "北大西洋（グリーンランド、ヤンマイエン島、ニューファンドランド沖）。", blurb: "頭に赤い「風船」をふくらませる、ユニークな深海ダイバー。", fact: "オスは鼻の中の赤い袋をふくらませて、頭巾のような冠を作ります。", diet: "魚類、イカ類、甲殻類。", dive: "ふだんは100–600 m、最深約1000 m。", life: "25–35年" }
      }
    },
    {
      id: "bearded-seal",
      scientific: "Erignathus barbatus",
      habitat: "arctic",
      pattern: "plain",
      bodyHex: "#8B8478",
      bellyHex: "#BDB6A8",
      accentHex: "#565044",
      bodyShape: "robust",
      extinct: false,
      length: "2.0–2.5 m",
      weight: "200–400 kg",
      iucn: "NT",
      names: { "zh-Hant": "髯海豹", "zh-Hans": "髯海豹", en: "Bearded seal", ja: "アゴヒゲアザラシ" },
      info: {
        "zh-Hant": { region: "環北極的淺海海域。", blurb: "留著濃密鬍鬚、性格悠閒的北極大個子。", fact: "長而密的觸鬚能「摸索」海底，找出藏身的貝類與蝦蟹。", diet: "蛤蜊、螃蟹、蝦等底棲生物。", dive: "通常在100公尺以淺，最深約300公尺。", life: "25–30年" },
        "zh-Hans": { region: "环北极的浅海海域。", blurb: "留着浓密胡须、性格悠闲的北极大个子。", fact: "长而密的触须能「摸索」海底，找出藏身的贝类与虾蟹。", diet: "蛤蜊、螃蟹、虾等底栖生物。", dive: "通常在100米以浅，最深约300米。", life: "25–30年" },
        en: { region: "Circumpolar Arctic, shallow seas.", blurb: "An easy-going Arctic giant with a bushy moustache.", fact: "Its long, dense whiskers feel out prey on the seafloor.", diet: "clams, crabs and shrimp on the seabed", dive: "usually <100 m, recorded to ~300 m", life: "25–30 years" },
        ja: { region: "北極海の周極域の浅い海域。", blurb: "立派なひげを蓄えた、のんびり屋の北極の大きなアザラシ。", fact: "長く密生したひげ（触毛）で海底の獲物を探り当てます。", diet: "二枚貝、カニ、エビなど底生生物。", dive: "ふだんは100 m以浅、最深約300 m。", life: "25–30年" }
      }
    },
    {
      id: "grey-seal",
      scientific: "Halichoerus grypus",
      habitat: "temperate",
      pattern: "blotches",
      bodyHex: "#9BA1A4",
      bellyHex: "#CBCFD1",
      accentHex: "#454C52",
      bodyShape: "long-snout",
      extinct: false,
      length: "1.8–2.6 m",
      weight: "150–350 kg",
      iucn: "LC",
      names: { "zh-Hant": "灰海豹", "zh-Hans": "灰海豹", en: "Grey seal", ja: "ハイイロアザラシ" },
      info: {
        "zh-Hant": { region: "北大西洋（波羅的海、英國、冰島、挪威、加拿大東岸）。", blurb: "長著「羅馬鼻」的灰海豹，眼神溫柔又有點呆萌。", fact: "屬名 Halichoerus 的意思是「鉤鼻海豬」。", diet: "魚類、頭足類、甲殼類。", dive: "通常在30–70公尺，最深約300公尺。", life: "25–35年" },
        "zh-Hans": { region: "北大西洋（波罗的海、英国、冰岛、挪威、加拿大东岸）。", blurb: "长着「罗马鼻」的灰海豹，眼神温柔又有点呆萌。", fact: "属名 Halichoerus 的意思是「钩鼻海猪」。", diet: "鱼类、头足类、甲壳类。", dive: "通常在30–70米，最深约300米。", life: "25–35年" },
        en: { region: "North Atlantic: Baltic, UK, Iceland, Norway, eastern Canada.", blurb: "A gentle grey seal with a distinct 'Roman nose'.", fact: "Its genus name Halichoerus means 'hook-nosed sea pig'.", diet: "fish, squid and crustaceans", dive: "usually 30–70 m, recorded to ~300 m", life: "25–35 years" },
        ja: { region: "北大西洋（バルト海、英国、アイスランド、ノルウェー、カナダ東岸）。", blurb: "「ローマ人のような鼻」が特徴的な、おっとりした灰色のアザラシ。", fact: "属名 Halichoerus は「鉤鼻の海のブタ」を意味します。", diet: "魚類、イカ・タコ類、甲殻類。", dive: "ふだんは30–70 m、最深約300 m。", life: "25–35年" }
      }
    },
    {
      id: "mediterranean-monk-seal",
      scientific: "Monachus monachus",
      habitat: "temperate",
      pattern: "plain",
      bodyHex: "#4A4238",
      bellyHex: "#6F6659",
      accentHex: "#2C2621",
      bodyShape: "robust",
      extinct: false,
      length: "2.0–2.5 m",
      weight: "200–300 kg",
      iucn: "VU",
      names: { "zh-Hant": "地中海僧海豹", "zh-Hans": "地中海僧海豹", en: "Mediterranean monk seal", ja: "チチュウカイモンクアザラシ" },
      info: {
        "zh-Hant": { region: "地中海、愛琴海與東大西洋（馬德拉島、布朗角）。", blurb: "像隱士一樣棲身海蝕洞的珍稀僧海豹。", fact: "在海蝕洞穴裡繁殖，是世上最瀕危的海洋哺乳動物之一。", diet: "魚類、章魚。", dive: "通常在100公尺以淺，最深約200公尺。", life: "20–30年" },
        "zh-Hans": { region: "地中海、爱琴海与东大西洋（马德拉岛、布朗角）。", blurb: "像隐士一样栖身海蚀洞的珍稀僧海豹。", fact: "在海蚀洞穴里繁殖，是世上最濒危的海洋哺乳动物之一。", diet: "鱼类、章鱼。", dive: "通常在100米以浅，最深约200米。", life: "20–30年" },
        en: { region: "Mediterranean Sea and NE Atlantic (Madeira, Cape Blanc).", blurb: "A rare monk-like seal that hides in sea caves.", fact: "It breeds in wave-battered sea caves, one of the rarest pinnipeds.", diet: "fish and octopus", dive: "usually <100 m, recorded to ~200 m", life: "20–30 years" },
        ja: { region: "地中海・エーゲ海と東大西洋（マデイラ島、ブラン岬）。", blurb: "海蝕洞に隠れ住む、世界でも希少な「僧侶」のようなアザラシ。", fact: "波打ち際の洞窟で繁殖する、最も絶滅が危惧される海獣のひとつです。", diet: "魚類、タコ類。", dive: "ふだんは100 m以浅、最深約200 m。", life: "20–30年" }
      }
    },
    {
      id: "hawaiian-monk-seal",
      scientific: "Neomonachus schauinslandi",
      habitat: "tropical",
      pattern: "plain",
      bodyHex: "#8D8678",
      bellyHex: "#C3BCAD",
      accentHex: "#585146",
      bodyShape: "compact",
      extinct: false,
      length: "2.1–2.4 m",
      weight: "150–270 kg",
      iucn: "VU",
      names: { "zh-Hant": "夏威夷僧海豹", "zh-Hans": "夏威夷僧海豹", en: "Hawaiian monk seal", ja: "ハワイモンクアザラシ" },
      info: {
        "zh-Hant": { region: "夏威夷群島（西北群島與主要島嶼）。", blurb: "夏威夷沙灘上愛睡懶覺的珍稀僧海豹。", fact: "大多時候獨來獨往，常在沙灘上長時間休息。", diet: "魚類、頭足類、甲殼類。", dive: "通常在60–100公尺，最深約500公尺。", life: "25–30年" },
        "zh-Hans": { region: "夏威夷群岛（西北群岛与主要岛屿）。", blurb: "夏威夷沙滩上爱睡懒觉的珍稀僧海豹。", fact: "大多时候独来独往，常在沙滩上长时间休息。", diet: "鱼类、头足类、甲壳类。", dive: "通常在60–100米，最深约500米。", life: "25–30年" },
        en: { region: "Hawaiian Islands (NW and main islands).", blurb: "A beach-loving, mostly solitary Hawaiian native.", fact: "It hauls out to rest on sandy beaches, largely alone.", diet: "fish, squid and crustaceans", dive: "usually 60–100 m, recorded to ~500 m", life: "25–30 years" },
        ja: { region: "ハワイ諸島（北西ハワイ諸島と主要8島）。", blurb: "ハワイの砂浜でひなたぼっこが大好きな、珍しい僧アザラシ。", fact: "ふだんは単独で暮らし、砂浜で長い時間休息します。", diet: "魚類、イカ・タコ類、甲殻類。", dive: "ふだんは60–100 m、最深約500 m。", life: "25–30年" }
      }
    },
    {
      id: "caribbean-monk-seal",
      scientific: "Neomonachus tropicalis",
      habitat: "tropical",
      pattern: "plain",
      bodyHex: "#7A6E5D",
      bellyHex: "#AFA38E",
      accentHex: "#4C4336",
      bodyShape: "compact",
      extinct: true,
      length: "2.0–2.4 m",
      weight: "170–270 kg",
      iucn: "EX",
      names: { "zh-Hant": "加勒比僧海豹", "zh-Hans": "加勒比僧海豹", en: "Caribbean monk seal", ja: "カリブモンクアザラシ" },
      info: {
        "zh-Hant": { region: "昔日加勒比海與墨西哥灣（已滅絕，最後確認於1952年）。", blurb: "曾悠遊加勒比海的僧海豹，如今只能緬懷。", fact: "人類獵捕致其滅絕，是最早絕跡的海豹，最後確認於1952年。", diet: "魚類、頭足類、甲殼類（歷史紀錄）。", dive: "記錄甚少。", life: "估計約20年" },
        "zh-Hans": { region: "昔日加勒比海与墨西哥湾（已灭绝，最后确认于1952年）。", blurb: "曾悠游加勒比海的僧海豹，如今只能缅怀。", fact: "人类猎捕致其灭绝，是最早绝迹的海豹，最后确认于1952年。", diet: "鱼类、头足类、甲壳类（历史记录）。", dive: "记录甚少。", life: "估计约20年" },
        en: { region: "Formerly Caribbean Sea and Gulf of Mexico; extinct (last confirmed 1952).", blurb: "Once a Caribbean swimmer, now gone forever.", fact: "The first seal driven extinct by humans; last confirmed in 1952.", diet: "fish, squid and crustaceans (historical)", dive: "little documented", life: "estimated ~20 years" },
        ja: { region: "かつてカリブ海・メキシコ湾（絶滅、最後の確認は1952年）。", blurb: "かつてカリブ海を泳いでいた僧アザラシ。今はもう会えません。", fact: "人間の狩猟で最初に絶滅したアザラシで、最後の確認は1952年です。", diet: "魚類、イカ・タコ類、甲殻類（歴史的記録）。", dive: "詳しい記録はほとんどありません。", life: "推定約20年" }
      }
    },
    {
      id: "northern-elephant-seal",
      scientific: "Mirounga angustirostris",
      habitat: "temperate",
      pattern: "plain",
      bodyHex: "#7B6B59",
      bellyHex: "#A9977F",
      accentHex: "#4C4033",
      bodyShape: "huge",
      extinct: false,
      length: "2.5–5.0 m",
      weight: "400–2300 kg",
      iucn: "LC",
      names: { "zh-Hant": "北象海豹", "zh-Hans": "北象海豹", en: "Northern elephant seal", ja: "キタゾウアザラシ" },
      info: {
        "zh-Hant": { region: "北太平洋；在加州與墨西哥島嶼繁殖，洄游至阿拉斯加。", blurb: "鼻子像象鼻的巨大海豹，潛水深不可測。", fact: "雄海豹體重可逾兩噸，是雌性的數倍重，性別差異極大。", diet: "深海魚類與魷魚。", dive: "通常在300–800公尺，最深約1700公尺。", life: "雌約20年，雄約14年" },
        "zh-Hans": { region: "北太平洋；在加州与墨西哥岛屿繁殖，洄游至阿拉斯加。", blurb: "鼻子像象鼻的巨大海豹，潜水深不可测。", fact: "雄海豹体重可逾两吨，是雌性的数倍重，性别差异极大。", diet: "深海鱼类与鱿鱼。", dive: "通常在300–800米，最深约1700米。", life: "雌约20年，雄约14年" },
        en: { region: "North Pacific; breeds on Californian and Mexican islands, ranges to Alaska.", blurb: "A huge, elephant-trunked deep diver.", fact: "Males can exceed 2 tonnes — several times a female's weight.", diet: "deep-sea fish and squid", dive: "usually 300–800 m, recorded to ~1700 m", life: "females ~20, males ~14 years" },
        ja: { region: "北太平洋（カリフォルニア・メキシコの島々で繁殖、アラスカまで回遊）。", blurb: "象のような大きな鼻を持つ巨大アザラシ、潜水の達人。", fact: "オスは2トンを超え、メスの数倍もの体重になります。", diet: "深海の魚類、イカ類。", dive: "ふだんは300–800 m、最深約1700 m。", life: "メス約20年、オス約14年" }
      }
    },
    {
      id: "southern-elephant-seal",
      scientific: "Mirounga leonina",
      habitat: "antarctic",
      pattern: "plain",
      bodyHex: "#6A5D4F",
      bellyHex: "#9B8C79",
      accentHex: "#42382E",
      bodyShape: "huge",
      extinct: false,
      length: "2.5–5.8 m",
      weight: "400–3700 kg",
      iucn: "LC",
      names: { "zh-Hant": "南象海豹", "zh-Hans": "南象海豹", en: "Southern elephant seal", ja: "ミナミゾウアザラシ" },
      info: {
        "zh-Hant": { region: "亞南極與南極周邊島嶼。", blurb: "地球上最大的海豹，名副其實的海中巨無霸。", fact: "是所有鰭足類中體型最大的，雄性能超過三噸半。", diet: "魷魚、魚類。", dive: "通常在300–800公尺，最深約2000公尺。", life: "約20年" },
        "zh-Hans": { region: "亚南极与南极周边岛屿。", blurb: "地球上最大的海豹，名副其实的海中巨无霸。", fact: "是所有鳍足类中体型最大的，雄性能超过三吨半。", diet: "鱿鱼、鱼类。", dive: "通常在300–800米，最深约2000米。", life: "约20年" },
        en: { region: "Subantarctic and Antarctic islands.", blurb: "The largest seal on Earth, a true ocean giant.", fact: "The biggest of all pinnipeds; males can exceed 3.5 tonnes.", diet: "squid and fish", dive: "usually 300–800 m, recorded to ~2000 m", life: "~20 years" },
        ja: { region: "亜南極・南極周辺の島々。", blurb: "地球上で最大のアザラシ、まさに海のジャイアント。", fact: "すべての鰭脚類の中で最大で、オスは3.5トンを超えます。", diet: "イカ類、魚類。", dive: "ふだんは300–800 m、最深約2000 m。", life: "約20年" }
      }
    },
    {
      id: "leopard-seal",
      scientific: "Hydrurga leptonyx",
      habitat: "antarctic",
      pattern: "leopard",
      bodyHex: "#C7CCD1",
      bellyHex: "#E7EAEC",
      accentHex: "#363B41",
      bodyShape: "slender",
      extinct: false,
      length: "2.4–3.6 m",
      weight: "300–500 kg",
      iucn: "LC",
      names: { "zh-Hant": "豹海豹", "zh-Hans": "豹海豹", en: "Leopard seal", ja: "ヒョウアザラシ" },
      info: {
        "zh-Hant": { region: "南極與亞南極海域。", blurb: "身手矯健的南極掠食者，身上披著豹紋大衣。", fact: "是南極的頂級掠食者，會獵食企鵝，甚至其他海豹。", diet: "磷蝦、魚類、企鵝與其他海豹。", dive: "通常在100公尺以淺，最深約300公尺。", life: "20–26年" },
        "zh-Hans": { region: "南极与亚南极海域。", blurb: "身手矫健的南极掠食者，身上披着豹纹大衣。", fact: "是南极的顶级掠食者，会猎食企鹅，甚至其他海豹。", diet: "磷虾、鱼类、企鹅与其他海豹。", dive: "通常在100米以浅，最深约300米。", life: "20–26年" },
        en: { region: "Antarctic and subantarctic waters.", blurb: "A sleek Antarctic hunter in a spotted coat.", fact: "An Antarctic apex predator that hunts penguins and even other seals.", diet: "krill, fish, penguins and other seals", dive: "usually <100 m, recorded to ~300 m", life: "20–26 years" },
        ja: { region: "南極および亜南極の海域。", blurb: "ヒョウ柄のコートをまとった、南極のしなやかなハンター。", fact: "ペンギンや他のアザラシを積極的に狩る、南極の頂点捕食者です。", diet: "オキアミ、魚類、ペンギン、他のアザラシ。", dive: "ふだんは100 m以浅、最深約300 m。", life: "20–26年" }
      }
    },
    {
      id: "weddell-seal",
      scientific: "Leptonychotes weddellii",
      habitat: "antarctic",
      pattern: "mottled",
      bodyHex: "#5F6764",
      bellyHex: "#B8BEBB",
      accentHex: "#878F8C",
      bodyShape: "robust",
      extinct: false,
      length: "2.5–3.5 m",
      weight: "400–600 kg",
      iucn: "LC",
      names: { "zh-Hant": "威德爾海豹", "zh-Hans": "威德尔海豹", en: "Weddell seal", ja: "ウェッデルアザラシ" },
      info: {
        "zh-Hant": { region: "南極沿岸與固定冰。", blurb: "在南極冰下哼著歌的悠哉潛水好手。", fact: "用牙齒在冰層上磨出並維持呼吸孔，是分布最南的哺乳動物。", diet: "魚類、魷魚。", dive: "通常在100–400公尺，最深約600公尺。", life: "20–30年" },
        "zh-Hans": { region: "南极沿岸与固定冰。", blurb: "在南极冰下哼着歌的悠哉潜水好手。", fact: "用牙齿在冰层上磨出并维持呼吸孔，是分布最南的哺乳动物。", diet: "鱼类、鱿鱼。", dive: "通常在100–400米，最深约600米。", life: "20–30年" },
        en: { region: "Antarctic coast and fast ice.", blurb: "A laid-back diver that sings under Antarctic ice.", fact: "It rasps breathing holes in the ice with its teeth; the southernmost mammal.", diet: "fish and squid", dive: "usually 100–400 m, recorded to ~600 m", life: "20–30 years" },
        ja: { region: "南極の沿岸と定着氷。", blurb: "南極の氷の下で歌う、のんびり屋の潜水名手。", fact: "歯で氷に呼吸孔を開け続ける、最も南に分布する哺乳類です。", diet: "魚類、イカ類。", dive: "ふだんは100–400 m、最深約600 m。", life: "20–30年" }
      }
    },
    {
      id: "crabeater-seal",
      scientific: "Lobodon carcinophaga",
      habitat: "antarctic",
      pattern: "scars",
      bodyHex: "#B7B1A4",
      bellyHex: "#E3DED3",
      accentHex: "#746C5E",
      bodyShape: "slender",
      extinct: false,
      length: "2.2–2.6 m",
      weight: "200–300 kg",
      iucn: "LC",
      names: { "zh-Hant": "食蟹海豹", "zh-Hans": "食蟹海豹", en: "Crabeater seal", ja: "カニクイアザラシ" },
      info: {
        "zh-Hant": { region: "南極浮冰區。", blurb: "名字叫「食蟹」卻只吃磷蝦，是地球上數量最多的海豹。", fact: "名字雖叫「食蟹」，其實幾乎只吃磷蝦，用葉狀牙齒當濾網。", diet: "幾乎全為南極磷蝦。", dive: "通常在100公尺以淺，最深約400公尺。", life: "20–40年" },
        "zh-Hans": { region: "南极浮冰区。", blurb: "名字叫「食蟹」却只吃磷虾，是地球上数量最多的海豹。", fact: "名字虽叫「食蟹」，其实几乎只吃磷虾，用叶状牙齿当滤网。", diet: "几乎全为南极磷虾。", dive: "通常在100米以浅，最深约400米。", life: "20–40年" },
        en: { region: "Antarctic pack ice.", blurb: "Despite its name, it dines on krill — the most abundant seal.", fact: "It eats krill, not crabs, sieving them with lobed teeth.", diet: "almost entirely Antarctic krill", dive: "usually <100 m, recorded to ~400 m", life: "20–40 years" },
        ja: { region: "南極の流氷域。", blurb: "カニを食べずにオキアミを食べる、地球上で最も数の多いアザラシ。", fact: "名前のわりに主食はオキアミで、葉状の歯で濾し取って食べます。", diet: "ほぼ南極オキアミのみ。", dive: "ふだんは100 m以浅、最深約400 m。", life: "20–40年" }
      }
    },
    {
      id: "ross-seal",
      scientific: "Ommatophoca rossii",
      habitat: "antarctic",
      pattern: "plain",
      bodyHex: "#5B5651",
      bellyHex: "#D9D4CA",
      accentHex: "#8C867D",
      bodyShape: "big-eyes",
      extinct: false,
      length: "1.7–2.1 m",
      weight: "130–200 kg",
      iucn: "LC",
      names: { "zh-Hant": "羅斯海豹", "zh-Hans": "罗斯海豹", en: "Ross seal", ja: "ロスアザラシ" },
      info: {
        "zh-Hant": { region: "南極浮冰區。", blurb: "大眼汪汪的南極神秘客，難得一見。", fact: "擁有所有海豹中相對體型最大的眼睛，適合幽暗深海。", diet: "魷魚、魚類。", dive: "通常在100–300公尺，最深約800公尺。", life: "約20年" },
        "zh-Hans": { region: "南极浮冰区。", blurb: "大眼汪汪的南极神秘客，难得一见。", fact: "拥有所有海豹中相对体型最大的眼睛，适合幽暗深海。", diet: "鱿鱼、鱼类。", dive: "通常在100–300米，最深约800米。", life: "约20年" },
        en: { region: "Antarctic pack ice.", blurb: "A big-eyed, seldom-seen Antarctic mystery.", fact: "It has the largest eyes relative to body size of any seal.", diet: "squid and fish", dive: "usually 100–300 m, recorded to ~800 m", life: "~20 years" },
        ja: { region: "南極の流氷域。", blurb: "大きな瞳が愛らしい、めったに姿を見せない南極のミステリー。", fact: "すべてのアザラシの中で、体のわりに最も大きな目を持ちます。", diet: "イカ類、魚類。", dive: "ふだんは100–300 m、最深約800 m。", life: "約20年" }
      }
    }
  ];

  const SPECIES_BY_ID = new Map(SPECIES.map((s) => [s.id, s]));
  const PATTERN_IDS = {
    plain: 0,
    'fine-spots': 1,
    spots: 2,
    rings: 3,
    ribbons: 4,
    harp: 5,
    leopard: 6,
    blotches: 7,
    mottled: 8,
    scars: 9
  };
  const SHAPES = {
    compact: { girth: 1.02, snout: 0.94, eye: 1.0 },
    slender: { girth: 0.94, snout: 1.04, eye: 0.99 },
    robust: { girth: 1.10, snout: 0.98, eye: 0.97 },
    'long-snout': { girth: 1.03, snout: 1.20, eye: 0.95 },
    huge: { girth: 1.16, snout: 1.15, eye: 0.92 },
    'big-eyes': { girth: 0.94, snout: 0.88, eye: 1.28 }
  };
  const STATUS = {
    LC: { label: '無危', color: '#58a98f', labels: { 'zh-Hant': '無危', 'zh-Hans': '无危', en: 'Least Concern', ja: '低懸念' } },
    NT: { label: '近危', color: '#c79a35', labels: { 'zh-Hant': '近危', 'zh-Hans': '近危', en: 'Near Threatened', ja: '準絶滅危惧' } },
    VU: { label: '易危', color: '#dd8a3c', labels: { 'zh-Hant': '易危', 'zh-Hans': '易危', en: 'Vulnerable', ja: '危急' } },
    EN: { label: '瀕危', color: '#dd6553', labels: { 'zh-Hant': '瀕危', 'zh-Hans': '濒危', en: 'Endangered', ja: '絶滅危惧' } },
    CR: { label: '極危', color: '#a93d4a', labels: { 'zh-Hant': '極危', 'zh-Hans': '极危', en: 'Critically Endangered', ja: '近絶滅' } },
    EX: { label: '已滅絕', color: '#858b88', labels: { 'zh-Hant': '已滅絕', 'zh-Hans': '已灭绝', en: 'Extinct', ja: '絶滅' } }
  };
  const ZONES = {
    arctic: { 'zh-Hant': '北極', 'zh-Hans': '北极', en: 'Arctic', ja: '北極' },
    antarctic: { 'zh-Hant': '南極', 'zh-Hans': '南极', en: 'Antarctic', ja: '南極' },
    temperate: { 'zh-Hant': '溫帶', 'zh-Hans': '温带', en: 'Temperate', ja: '温帯' },
    tropical: { 'zh-Hant': '熱帶', 'zh-Hans': '热带', en: 'Tropical', ja: '熱帯' }
  };

  function zoneLabel(habitat) {
    return (ZONES[habitat] && ZONES[habitat][state.lang]) || habitat || '';
  }

  /* ---------------------------------------------------------
     2. Utilities
     --------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    return [
      parseInt(h.slice(0, 2), 16) / 255,
      parseInt(h.slice(2, 4), 16) / 255,
      parseInt(h.slice(4, 6), 16) / 255
    ];
  }

  function rgbToCss(rgb) {
    return `rgb(${Math.round(rgb[0] * 255)}, ${Math.round(rgb[1] * 255)}, ${Math.round(rgb[2] * 255)})`;
  }

  function formatName(sp) {
    return spName(sp);
  }

  /* ---------------------------------------------------------
     2b. Localization
     --------------------------------------------------------- */
  const LOCALES = {
    'zh-Hant': '繁體中文',
    'zh-Hans': '简体中文',
    'en': 'English',
    'ja': '日本語'
  };
  const LOCALE_ORDER = ['zh-Hant', 'zh-Hans', 'en', 'ja'];

  function detectLang() {
    const nav = String(navigator.language || '').toLowerCase();
    if (nav.indexOf('zh') === 0) {
      if (/hans|cn|sg|my/.test(nav)) return 'zh-Hans';
      return 'zh-Hant';
    }
    if (nav.indexOf('ja') === 0) return 'ja';
    if (nav.indexOf('en') === 0) return 'en';
    return 'zh-Hant';
  }

  const I18N = {
    'zh-Hant': {
      'app.title': 'SEALO · 小海豹基地',
      'brand.sub': '小海豹基地',
      'brand.aria': 'SEALO 小海豹基地首頁',
      'brand.petname': '麻糬',
      'live': '海豹在線',
      'sound.on': '音效開',
      'sound.off': '音效關',
      'sound.aria.on': '切換音效（目前開啟）',
      'sound.aria.off': '切換音效（目前關閉）',
      'desktop.mode': '桌寵模式',
      'desktop.aria': '進入桌寵模式',
      'about.aria': '關於 SEALO 與資料來源',
      'about.close': '關閉',
      'lang.aria': '切換語言',
      'canvas.aria': '一隻可以互動的立體海豹，坐在漂浮的冰塊上',
      'fallback.note': '你的瀏覽器沒有開啟 WebGL，先讓 2D 海豹陪你玩。',
      'fallback.loading': '3D 海豹睡著了，先請 2D 海豹出場。',
      'badge.rt3d': '即時 3D',
      'badge.2d': '2D 模式',
      'loading.text': '正在把海豹捏胖一點…',
      'hint.desktop': '點一下摸摸 · 拖曳旋轉 · 滾輪遠近',
      'hint.mobile': '點一下摸摸 · 上下滑動看圖鑑',
      'exit.desktop': '← 離開桌寵模式',
      'vitals.aria': '麻糬的狀態',
      'vital.mood': '心情',
      'vital.full': '飽足',
      'vital.energy': '活力',
      'actions.aria': '和海豹互動',
      'action.pet': '摸摸',
      'action.pet.sub': '摸摸頭',
      'action.feed': '餵小魚',
      'action.feed.sub': '補充飽足',
      'action.play': '丟雪球',
      'action.play.sub': '一起玩耍',
      'action.dance': '轉圈圈',
      'action.dance.sub': '開心一下',
      'action.belly': '拍肚皮',
      'action.belly.sub': '咕嘟咕嘟',
      'action.follow': '跟隨手指',
      'follow.on': '已開啟',
      'follow.off': '已關閉',
      'expr.label': '表情',
      'expr.aria': '切換表情',
      'expr.neutral': '淡定',
      'expr.happy': '開心',
      'expr.sleepy': '想睡',
      'expr.surprised': '驚喜',
      'expr.wink': '眨眼',
      'expr.grumpy': '不開心',
      'expr.blush': '害羞',
      'dex.aria': '世界海豹圖鑑',
      'dex.title': '世界海豹圖鑑',
      'dex.sub': '海豹科 20 種 · 19 現生 + 1 已滅絕 · SMM 2025',
      'dex.progress.title': '已遇見的海豹',
      'filter.aria': '依棲地篩選',
      'filter.all': '全部',
      'filter.arctic': '北極',
      'filter.antarctic': '南極',
      'filter.temperate': '溫帶',
      'filter.tropical': '熱帶',
      'filter.extinct': '已滅絕',
      'detail.stat.region': '分佈',
      'detail.stat.length': '體長',
      'detail.stat.weight': '體重',
      'detail.stat.diet': '食性',
      'detail.stat.dive': '潛水',
      'detail.stat.life': '壽命',
      'detail.fact': 'SEAL FACT',
      'detail.pet': '摸摸 {name}',
      'detail.random': '隨機海豹',
      'extinct.note': '已滅絕 · 只餘標本',
      'extinct.label': '紀念牠',
      'dex.empty': '這個棲地暫時沒有海豹，換個篩選看看吧。',
      'found.aria': '已遇見',
      'footer.line1': '用即時光線步進（SDF）捏出的一體成形海豹 · 沒有任何外部圖片或音檔',
      'footer.meta': '分類依 Society for Marine Mammalogy 2025 · 保育狀態依 IUCN Red List',
      'noscript': '請開啟 JavaScript，麻糬才能從冰上爬起來。',
      'toast.newfriend': '遇見新朋友：{name}！',
      'toast.all20': '全部 20 種海豹都遇見了！你得到一枚海豹博士徽章 🏅',
      'toast.desktop': '按 Esc 或右上角按鈕離開桌寵模式',
      'about.title': '一隻一體成形的胖海豹',
      'about.lede': '麻糬不是預錄動畫，也不是拼接的 3D 模型。牠是用 signed distance field（SDF）即時捏出來的一體成形小海豹：身體、頭、鳍與尾巴以平滑融合連接，所以怎麼動都不會有接縫或破洞。',
      'about.how.title': '怎麼玩',
      'about.how.li1': '點擊海豹：摸摸牠，會眨眼、愛心爆擊。',
      'about.how.li2': '拖曳舞台：旋轉 3D 視角；滾輪可拉近拉遠。',
      'about.how.li3': '餵小魚、丟雪球、轉圈圈、拍肚皮：各有不同反應與音效。',
      'about.how.li4': '下方可切換表情；右側圖鑑切換全世界 20 種海豹科動物。',
      'about.how.li5': '桌寵模式：把整頁變成一個跟著你互動的海豹視窗。',
      'about.know.title': '小知識',
      'about.know.li1': '本作收錄海豹科（Phocidae）2025 年 7 月最新分類的 20 種，其中加勒比僧海豹已滅絕。',
      'about.know.li2': '塞馬環斑海豹於 2025 年升格為獨立物種 Pusa saimensis；拉多加環斑海豹仍是亞種，因此不另立一種。',
      'about.know.li3': '音效全部由 Web Audio 即時合成，是可愛的「撒嬌聲」，不是真實海豹錄音。',
      'about.know.li4': '保育狀態為 IUCN Red List 2025 年 10 月資料，可能隨最新評估變動。',
      'about.sources': '資料來源'
    },
    'zh-Hans': {
      'app.title': 'SEALO · 小海豹基地',
      'brand.sub': '小海豹基地',
      'brand.aria': 'SEALO 小海豹基地首页',
      'brand.petname': '麻薯',
      'live': '海豹在线',
      'sound.on': '音效开',
      'sound.off': '音效关',
      'sound.aria.on': '切换音效（目前开启）',
      'sound.aria.off': '切换音效（目前关闭）',
      'desktop.mode': '桌宠模式',
      'desktop.aria': '进入桌宠模式',
      'about.aria': '关于 SEALO 与资料来源',
      'about.close': '关闭',
      'lang.aria': '切换语言',
      'canvas.aria': '一只可以互动的立体海豹，坐在漂浮的冰块上',
      'fallback.note': '你的浏览器没有开启 WebGL，先让 2D 海豹陪你玩。',
      'fallback.loading': '3D 海豹睡着了，先请 2D 海豹出场。',
      'badge.rt3d': '实时 3D',
      'badge.2d': '2D 模式',
      'loading.text': '正在把海豹捏胖一点…',
      'hint.desktop': '点一下摸摸 · 拖拽旋转 · 滚轮远近',
      'hint.mobile': '点一下摸摸 · 上下滑动看图鉴',
      'exit.desktop': '← 离开桌宠模式',
      'vitals.aria': '麻薯的状态',
      'vital.mood': '心情',
      'vital.full': '饱足',
      'vital.energy': '活力',
      'actions.aria': '和海豹互动',
      'action.pet': '摸摸',
      'action.pet.sub': '摸摸头',
      'action.feed': '喂小鱼',
      'action.feed.sub': '补充饱足',
      'action.play': '丢雪球',
      'action.play.sub': '一起玩耍',
      'action.dance': '转圈圈',
      'action.dance.sub': '开心一下',
      'action.belly': '拍肚皮',
      'action.belly.sub': '咕嘟咕嘟',
      'action.follow': '跟随手指',
      'follow.on': '已开启',
      'follow.off': '已关闭',
      'expr.label': '表情',
      'expr.aria': '切换表情',
      'expr.neutral': '淡定',
      'expr.happy': '开心',
      'expr.sleepy': '想睡',
      'expr.surprised': '惊喜',
      'expr.wink': '眨眼',
      'expr.grumpy': '不开心',
      'expr.blush': '害羞',
      'dex.aria': '世界海豹图鉴',
      'dex.title': '世界海豹图鉴',
      'dex.sub': '海豹科 20 种 · 19 现存 + 1 已灭绝 · SMM 2025',
      'dex.progress.title': '已遇见的海豹',
      'filter.aria': '依栖息地筛选',
      'filter.all': '全部',
      'filter.arctic': '北极',
      'filter.antarctic': '南极',
      'filter.temperate': '温带',
      'filter.tropical': '热带',
      'filter.extinct': '已灭绝',
      'detail.stat.region': '分布',
      'detail.stat.length': '体长',
      'detail.stat.weight': '体重',
      'detail.stat.diet': '食性',
      'detail.stat.dive': '潜水',
      'detail.stat.life': '寿命',
      'detail.fact': 'SEAL FACT',
      'detail.pet': '摸摸 {name}',
      'detail.random': '随机海豹',
      'extinct.note': '已灭绝 · 仅余标本',
      'extinct.label': '纪念它',
      'dex.empty': '这个栖息地暂时没有海豹，换个筛选看看吧。',
      'found.aria': '已遇见',
      'footer.line1': '用即时光线步进（SDF）捏出的一体成形海豹 · 没有任何外部图片或音档',
      'footer.meta': '分类依 Society for Marine Mammalogy 2025 · 保育状态依 IUCN Red List',
      'noscript': '请开启 JavaScript，麻薯才能从冰上爬起来。',
      'toast.newfriend': '遇见新朋友：{name}！',
      'toast.all20': '全部 20 种海豹都遇见了！你得到一枚海豹博士徽章 🏅',
      'toast.desktop': '按 Esc 或右上角按钮离开桌宠模式',
      'about.title': '一只一体成形的胖海豹',
      'about.lede': '麻薯不是预录动画，也不是拼接的 3D 模型。它是用 signed distance field（SDF）实时捏出来的一体成形小海豹：身体、头、鳍与尾巴以平滑融合连接，所以怎么动都不会有接缝或破洞。',
      'about.how.title': '怎么玩',
      'about.how.li1': '点击海豹：摸摸它，会眨眼、爱心爆击。',
      'about.how.li2': '拖拽舞台：旋转 3D 视角；滚轮可拉近拉远。',
      'about.how.li3': '喂小鱼、丢雪球、转圈圈、拍肚皮：各有不同反应与音效。',
      'about.how.li4': '下方可切换表情；右侧图鉴切换全世界 20 种海豹科动物。',
      'about.how.li5': '桌宠模式：把整页变成一个跟着你互动的海豹窗口。',
      'about.know.title': '小知识',
      'about.know.li1': '本作收录海豹科（Phocidae）2025 年 7 月最新分类的 20 种，其中加勒比僧海豹已灭绝。',
      'about.know.li2': '塞马环斑海豹于 2025 年升格为独立物种 Pusa saimensis；拉多加环斑海豹仍是亚种，因此不另立一种。',
      'about.know.li3': '音效全部由 Web Audio 实时合成，是可爱的「撒娇声」，不是真实海豹录音。',
      'about.know.li4': '保育状态为 IUCN Red List 2025 年 10 月资料，可能随最新评估变动。',
      'about.sources': '资料来源'
    },
    'en': {
      'app.title': 'SEALO · Seal Sanctuary',
      'brand.sub': 'Seal Sanctuary',
      'brand.aria': 'SEALO home',
      'brand.petname': 'Mochi',
      'live': 'Seal online',
      'sound.on': 'Sound on',
      'sound.off': 'Sound off',
      'sound.aria.on': 'Toggle sound (currently on)',
      'sound.aria.off': 'Toggle sound (currently off)',
      'desktop.mode': 'Desktop pet',
      'desktop.aria': 'Enter desktop pet mode',
      'about.aria': 'About SEALO and sources',
      'about.close': 'Close',
      'lang.aria': 'Switch language',
      'canvas.aria': 'An interactive 3D seal sitting on a floating ice floe',
      'fallback.note': 'WebGL is not enabled, so a 2D seal will keep you company.',
      'fallback.loading': 'The 3D seal is asleep — here comes the 2D seal.',
      'badge.rt3d': 'Real-time 3D',
      'badge.2d': '2D mode',
      'loading.text': 'Puffing up the seal…',
      'hint.desktop': 'Click to pet · drag to rotate · scroll to zoom',
      'hint.mobile': 'Tap to pet · swipe to see the encyclopedia',
      'exit.desktop': '← Leave desktop pet',
      'vitals.aria': 'Mochi status',
      'vital.mood': 'Mood',
      'vital.full': 'Fullness',
      'vital.energy': 'Energy',
      'actions.aria': 'Interact with the seal',
      'action.pet': 'Pet',
      'action.pet.sub': 'Pat head',
      'action.feed': 'Feed fish',
      'action.feed.sub': 'Fill up',
      'action.play': 'Snowball',
      'action.play.sub': 'Play',
      'action.dance': 'Spin',
      'action.dance.sub': 'Cheer up',
      'action.belly': 'Belly pat',
      'action.belly.sub': 'Pat pat',
      'action.follow': 'Follow finger',
      'follow.on': 'On',
      'follow.off': 'Off',
      'expr.label': 'Expression',
      'expr.aria': 'Choose expression',
      'expr.neutral': 'Calm',
      'expr.happy': 'Happy',
      'expr.sleepy': 'Sleepy',
      'expr.surprised': 'Surprised',
      'expr.wink': 'Wink',
      'expr.grumpy': 'Grumpy',
      'expr.blush': 'Shy',
      'dex.aria': 'World seal encyclopedia',
      'dex.title': 'World Seal Dex',
      'dex.sub': '20 true seals · 19 extant + 1 extinct · SMM 2025',
      'dex.progress.title': 'Seals met',
      'filter.aria': 'Filter by habitat',
      'filter.all': 'All',
      'filter.arctic': 'Arctic',
      'filter.antarctic': 'Antarctic',
      'filter.temperate': 'Temperate',
      'filter.tropical': 'Tropical',
      'filter.extinct': 'Extinct',
      'detail.stat.region': 'Range',
      'detail.stat.length': 'Length',
      'detail.stat.weight': 'Weight',
      'detail.stat.diet': 'Diet',
      'detail.stat.dive': 'Diving',
      'detail.stat.life': 'Lifespan',
      'detail.fact': 'SEAL FACT',
      'detail.pet': 'Pet {name}',
      'detail.random': 'Random seal',
      'extinct.note': 'Extinct · known only from specimens',
      'extinct.label': 'Remember',
      'dex.empty': 'No seals in this habitat — try another filter.',
      'found.aria': 'Met',
      'footer.line1': 'A one-piece seal sculpted live with signed distance fields · no external images or audio',
      'footer.meta': 'Taxonomy: Society for Marine Mammalogy 2025 · Status: IUCN Red List',
      'noscript': 'Enable JavaScript so Mochi can climb off the ice.',
      'toast.newfriend': 'You met a new friend: {name}!',
      'toast.all20': 'You met all 20 seals! Here is your Seal Doctor badge 🏅',
      'toast.desktop': 'Press Esc or the top-right button to leave desktop pet mode',
      'about.title': 'A plump one-piece seal',
      'about.lede': 'Mochi is not a pre-rendered animation or a stitched 3D model. It is sculpted live from signed distance fields (SDF): the body, head, flippers and tail are smoothly blended into one seamless shape, so however it moves there are no seams or holes.',
      'about.how.title': 'How to play',
      'about.how.li1': 'Click the seal to pet it — it blinks and bursts with hearts.',
      'about.how.li2': 'Drag the stage to orbit the 3D view; scroll to zoom.',
      'about.how.li3': 'Feed fish, throw snowballs, spin, and pat the belly — each has its own reaction and sound.',
      'about.how.li4': 'Choose an expression below; the encyclopedia on the right switches between all 20 true seals.',
      'about.how.li5': 'Desktop-pet mode turns the whole page into an interactive seal window.',
      'about.know.title': 'Good to know',
      'about.know.li1': 'It covers all 20 Phocidae species in the July 2025 taxonomy; the Caribbean monk seal is extinct.',
      'about.know.li2': 'The Saimaa ringed seal was elevated to a full species (Pusa saimensis) in 2025; the Ladoga ringed seal remains a subspecies.',
      'about.know.li3': 'All sounds are synthesized live with Web Audio — cute coos, not real seal recordings.',
      'about.know.li4': 'Conservation status follows the IUCN Red List (October 2025) and may change with new assessments.',
      'about.sources': 'Sources'
    },
    'ja': {
      'app.title': 'SEALO · アザラシベース',
      'brand.sub': 'アザラシベース',
      'brand.aria': 'SEALO ホーム',
      'brand.petname': 'もち',
      'live': 'アザラシ オンライン',
      'sound.on': 'サウンド オン',
      'sound.off': 'サウンド オフ',
      'sound.aria.on': 'サウンド切り替え（現在オン）',
      'sound.aria.off': 'サウンド切り替え（現在オフ）',
      'desktop.mode': 'デスクトップペット',
      'desktop.aria': 'デスクトップペットモードへ',
      'about.aria': 'SEALO と出典について',
      'about.close': '閉じる',
      'lang.aria': '言語を切り替え',
      'canvas.aria': '浮かぶ氷の上に座る、ふれあえる立体アザラシ',
      'fallback.note': 'WebGL が無効のため、2D のアザラシがお相手します。',
      'fallback.loading': '3D アザラシはお休み中。2D のアザラシに交代します。',
      'badge.rt3d': 'リアルタイム3D',
      'badge.2d': '2D モード',
      'loading.text': 'アザラシをぷっくりさせています…',
      'hint.desktop': 'クリックでなでる・ドラッグで回転・ホイールで拡大',
      'hint.mobile': 'タップでなでる・スワイプで図鑑へ',
      'exit.desktop': '← デスクトップペット終了',
      'vitals.aria': 'もちの状態',
      'vital.mood': 'ごきげん',
      'vital.full': '満腹',
      'vital.energy': '元気',
      'actions.aria': 'アザラシと遊ぶ',
      'action.pet': 'なでる',
      'action.pet.sub': '頭をなでる',
      'action.feed': '魚をあげる',
      'action.feed.sub': '満腹に',
      'action.play': '雪玉を投げる',
      'action.play.sub': '一緒に遊ぶ',
      'action.dance': 'くるくる',
      'action.dance.sub': 'ごきげんに',
      'action.belly': 'おなかポン',
      'action.belly.sub': 'ポンポン',
      'action.follow': '指を追う',
      'follow.on': 'オン',
      'follow.off': 'オフ',
      'expr.label': '表情',
      'expr.aria': '表情を選ぶ',
      'expr.neutral': 'ふつう',
      'expr.happy': 'にこにこ',
      'expr.sleepy': 'ねむい',
      'expr.surprised': 'びっくり',
      'expr.wink': 'ウインク',
      'expr.grumpy': 'ぷんぷん',
      'expr.blush': 'てれ',
      'dex.aria': '世界アザラシ図鑑',
      'dex.title': '世界アザラシ図鑑',
      'dex.sub': 'アザラシ科 20 種 · 現生 19 + 絶滅 1 · SMM 2025',
      'dex.progress.title': '出会ったアザラシ',
      'filter.aria': '生息地で絞り込む',
      'filter.all': 'すべて',
      'filter.arctic': '北極',
      'filter.antarctic': '南極',
      'filter.temperate': '温帯',
      'filter.tropical': '熱帯',
      'filter.extinct': '絶滅',
      'detail.stat.region': '分布',
      'detail.stat.length': '体長',
      'detail.stat.weight': '体重',
      'detail.stat.diet': '食べもの',
      'detail.stat.dive': '潜水',
      'detail.stat.life': '寿命',
      'detail.fact': 'SEAL FACT',
      'detail.pet': '{name}をなでる',
      'detail.random': 'ランダム',
      'extinct.note': '絶滅 · 標本のみ',
      'extinct.label': 'しのぶ',
      'dex.empty': 'この生息地にアザラシはいません。絞り込みを変えてみて。',
      'found.aria': '出会い済み',
      'footer.line1': '符号付き距離場（SDF）でリアルタイムに造形した一体型アザラシ · 外部画像・音源なし',
      'footer.meta': '分類: Society for Marine Mammalogy 2025 · 保全状況: IUCN Red List',
      'noscript': 'JavaScript を有効にすると、もちが氷から起き上がります。',
      'toast.newfriend': '新しい友だちに出会った：{name}！',
      'toast.all20': '20 種すべてのアザラシに出会った！アザラシ博士バッジ 🏅',
      'toast.desktop': 'Esc か右上のボタンでデスクトップペットを終了',
      'about.title': '一体成形のぷっくりアザラシ',
      'about.lede': 'もちは録画アニメでも、部品を貼り合わせた 3D モデルでもありません。符号付き距離場（SDF）でリアルタイムに形作られた一体型のアザラシで、胴体・頭・ヒレ・尾はなめらかにつながっているため、どう動いても継ぎ目や穴ができません。',
      'about.how.title': '遊び方',
      'about.how.li1': 'アザラシをクリックするとなでられ、まばたきしてハートが飛びます。',
      'about.how.li2': 'ステージをドラッグして 3D 視点を回転、ホイールで拡大縮小できます。',
      'about.how.li3': '魚をあげる・雪玉・くるくる・おなかポンは、それぞれ違う反応と音があります。',
      'about.how.li4': '下で表情を選べ、右の図鑑で世界のアザラシ科 20 種を切り替えられます。',
      'about.how.li5': 'デスクトップペットモードでは、ページ全体がふれあえるアザラシ画面になります。',
      'about.know.title': '豆知識',
      'about.know.li1': '2025 年 7 月の最新分類によるアザラシ科（Phocidae）20 種を収録。カリブモンクアザラシは絶滅しています。',
      'about.know.li2': 'サイマーアザラシは 2025 年に独立種 Pusa saimensis に昇格。ラドガアザラシは亜種のため別種にしません。',
      'about.know.li3': '音はすべて Web Audio で合成した「甘え声」で、実際のアザラシの録音ではありません。',
      'about.know.li4': '保全状況は IUCN Red List（2025 年 10 月）に基づき、最新の評価で変わることがあります。',
      'about.sources': '出典'
    }
  };

  const LINES = {
    'zh-Hant': {
      pet: ['咕嚕咕嚕～再多摸一下。', '舒服到眼睛都瞇起來了。', '今天的麻糬，是幸福口味。', '再摸下去會變成海豹麻糬喔。', '你的手好溫暖，像曬過太陽的冰。', '啵！收到一個摸摸補給。'],
      feed: ['是小魚！啊——', '一口吞！飽足感 +100。', '這條魚有海的味道。', '謝謝招待，尾巴都開心了。', '再來一條也不是不行。'],
      play: ['雪球！接住——', '嘿咻！這是我的滑冰時間。', '冰冰的，好好玩。', '再丟一顆，我還要！', '看我的海豹式翻滾。'],
      dance: ['轉～圈～圈～', '海豹圓舞曲，預備——起！', '一圈、兩圈，頭有點暈。', '掌聲在哪裡？'],
      belly: ['咕嘟咕嘟～肚子最舒服了。', '拍肚皮！再多拍幾下。', '胖肚肚發出蓬蓬聲。', '這是海豹界的頂級享受。'],
      switch: ['嗨！我現在是{name}。', '換裝完成，{name}限定版麻糬。', '你看，我的{name}花紋好看嗎？', '從冰原來的{name}，向你報到。'],
      followOn: '我會跟著你的手指看喔。',
      followOff: '好，我先專心當一顆海豹麻糬。',
      soundOn: '音效回來啦，啵！',
      desktop: '桌寵模式啟動！我會在這裡陪你。',
      hello: '嗨！我是麻糬。今天想被摸幾下？',
      all20: '今天有 20 種海豹來拜訪，冰塊快擠不下啦。'
    },
    'zh-Hans': {
      pet: ['咕噜咕噜～再多摸一下。', '舒服到眼睛都眯起来了。', '今天的麻薯，是幸福口味。', '再摸下去会变成海豹麻薯喔。', '你的手好温暖，像晒过太阳的冰。', '啵！收到一个摸摸补给。'],
      feed: ['是小鱼！啊——', '一口吞！饱足感 +100。', '这条鱼有海的味道。', '谢谢招待，尾巴都开心了。', '再来一条也不是不行。'],
      play: ['雪球！接住——', '嘿咻！这是我的滑冰时间。', '冰冰的，好好玩。', '再丢一颗，我还要！', '看我的海豹式翻滚。'],
      dance: ['转～圈～圈～', '海豹圆舞曲，预备——起！', '一圈、两圈，头有点晕。', '掌声在哪里？'],
      belly: ['咕嘟咕嘟～肚子最舒服了。', '拍肚皮！再多拍几下。', '胖肚肚发出蓬蓬声。', '这是海豹界的顶级享受。'],
      switch: ['嗨！我现在是{name}。', '换装完成，{name}限定版麻薯。', '你看，我的{name}花纹好看吗？', '从冰原来的{name}，向你报到。'],
      followOn: '我会跟着你的手指看喔。',
      followOff: '好，我先专心当一颗海豹麻薯。',
      soundOn: '音效回来啦，啵！',
      desktop: '桌宠模式启动！我会在这里陪你。',
      hello: '嗨！我是麻薯。今天想被摸几下？',
      all20: '今天有 20 种海豹来拜访，冰块快挤不下啦。'
    },
    'en': {
      pet: ['Purr purr — a little more, please.', 'That feels so good my eyes are closing.', 'Mochi is happiness-flavoured today.', 'Keep it up and I will become seal mochi.', 'Your hand is warm, like sun on ice.', 'Pop! One head-pat received.'],
      feed: ['A fish! Ahh—', 'One gulp! Fullness +100.', 'This fish tastes like the sea.', 'Thank you — even my tail is happy.', 'I would not say no to one more.'],
      play: ['Snowball! Catch—', 'Hup! It is skating time.', 'So cold, so fun.', 'Throw another one, I want more!', 'Watch my seal-style roll.'],
      dance: ['Spin-n-n-n!', 'The seal waltz — and, begin!', 'One, two — I am a little dizzy.', 'Where is my applause?'],
      belly: ['Rub-a-dub — belly is the best.', 'Belly pats! A few more, please.', 'My round tummy goes thump-thump.', 'This is peak seal luxury.'],
      switch: ['Hi! I am a {name} now.', 'Transformed — {name} edition Mochi.', 'How do you like my {name} markings?', 'A {name} reporting in from the ice.'],
      followOn: 'I will keep an eye on your finger.',
      followOff: 'Okay, I will just be a calm seal mochi.',
      soundOn: 'Sound is back — pop!',
      desktop: 'Desktop pet on! I will stay with you.',
      hello: 'Hi! I am Mochi. Would you pet me?',
      all20: 'Twenty seals came to visit today — the ice is nearly full!'
    },
    'ja': {
      pet: ['ぐるぐる～もっとなでて。', '気持ちよくて目が細くなっちゃう。', '今日のもちは幸せ味です。', 'このままだとアザラシ餅になっちゃうよ。', 'あなたの手、日向の氷みたいにあったかい。', 'ぽん！なでなで 1 回分もらった。'],
      feed: ['お魚だ！あーん——', 'ひと口！満腹度 +100。', 'この魚、海の味がする。', 'ごちそうさま。しっぽまで喜んでる。', 'もう 1 匹だって悪くないかも。'],
      play: ['雪玉！キャッチ——', 'えいっ！スケートの時間です。', 'つめたくて、たのしい。', 'もう 1 個投げて！もっと！', '見て、アザラシ流ころころ。'],
      dance: ['くる～くる～', 'アザラシのワルツ、はじめ！', '1 周、2 周、ちょっと目が回る。', '拍手はどこかな？'],
      belly: ['ぽんぽん～おなかが一番きもちいい。', 'おなかポン！もっとして。', 'ぷにぷにのおなかがポンポン鳴る。', 'これぞアザラシ界の最高のぜいたく。'],
      switch: ['やあ！今は{name}だよ。', '変身完了、{name}限定のもちです。', '私の{name}模様、どうかな？', '氷原から来た{name}、ただいま到着。'],
      followOn: 'あなたの指を目で追うね。',
      followOff: 'うん、まずはおとなしくアザラシ餅になるね。',
      soundOn: '音が戻ったよ、ぽん！',
      desktop: 'デスクトップペット起動！ここにいるよ。',
      hello: 'やあ！もちだよ。なでてくれる？',
      all20: '今日は 20 種のアザラシが遊びに来た。氷がもう満員！'
    }
  };

  function t(key) {
    return (I18N[state.lang] && I18N[state.lang][key]) || I18N['zh-Hant'][key] || key;
  }

  function fmt(key, vars) {
    let s = t(key);
    if (vars) {
      for (const k of Object.keys(vars)) s = s.split('{' + k + '}').join(vars[k]);
    }
    return s;
  }

  function lines(key) {
    return (LINES[state.lang] && LINES[state.lang][key]) || LINES['zh-Hant'][key] || [];
  }

  function spName(sp) {
    return (sp.names && sp.names[state.lang]) || (sp.names && sp.names.en) || sp.en || sp.zh || '';
  }

  function spEn(sp) {
    return (sp.names && sp.names.en) || sp.en || '';
  }

  function spInfo(sp) {
    return (sp.info && sp.info[state.lang]) || (sp.info && sp.info['zh-Hant']) || {};
  }

  function applyI18n() {
    document.documentElement.lang = state.lang;
    document.title = t('app.title');
    $$('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    $$('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    $$('[data-i18n-title]').forEach((el) => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
    $$('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  /* ---------------------------------------------------------
     3. State
     --------------------------------------------------------- */
  const STORAGE_KEY = 'sealo.pet.v1';
  const DEFAULT_STATE = {
    speciesId: 'harbor-seal',
    sound: true,
    follow: true,
    expression: 'happy',
    lang: detectLang(),
    collected: ['harbor-seal'],
    stats: { mood: 82, full: 64, energy: 88 }
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return structuredCloneSafe(DEFAULT_STATE);
      const parsed = JSON.parse(raw);
      const merged = structuredCloneSafe(DEFAULT_STATE);
      if (parsed && typeof parsed === 'object') {
        if (SPECIES_BY_ID.has(parsed.speciesId)) merged.speciesId = parsed.speciesId;
        if (typeof parsed.sound === 'boolean') merged.sound = parsed.sound;
        if (typeof parsed.follow === 'boolean') merged.follow = parsed.follow;
        if (['neutral', 'happy', 'sleepy', 'surprised', 'wink', 'grumpy', 'blush'].includes(parsed.expression)) merged.expression = parsed.expression;
        if (LOCALES[parsed.lang]) merged.lang = parsed.lang;
        if (Array.isArray(parsed.collected)) {
          merged.collected = [...new Set(parsed.collected.filter((id) => SPECIES_BY_ID.has(id)))];
        }
        if (parsed.stats && typeof parsed.stats === 'object') {
          ['mood', 'full', 'energy'].forEach((key) => {
            const n = Number(parsed.stats[key]);
            if (Number.isFinite(n)) merged.stats[key] = clamp(n, 0, 100);
          });
        }
      }
      if (!merged.collected.includes(merged.speciesId)) merged.collected.push(merged.speciesId);
      return merged;
    } catch (err) {
      return structuredCloneSafe(DEFAULT_STATE);
    }
  }

  function structuredCloneSafe(value) {
    return JSON.parse(JSON.stringify(value));
  }

  const state = loadState();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      /* Private mode / blocked storage is fine. */
    }
  }

  function currentSpecies() {
    return SPECIES_BY_ID.get(state.speciesId) || SPECIES[0];
  }

  /* ---------------------------------------------------------
     4. Audio: tiny synthesized seal chirps
     --------------------------------------------------------- */
  class SealAudio {
    constructor() {
      this.ctx = null;
      this.master = null;
      this.noiseBuffer = null;
      this.enabled = state.sound;
      this.flashTimer = 0;
    }

    ensure() {
      if (!this.enabled) return false;
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return false;
        try {
          this.ctx = new AC();
          this.master = this.ctx.createGain();
          this.master.gain.value = 0.34;
          this.master.connect(this.ctx.destination);
          this.makeNoise();
        } catch (err) {
          return false;
        }
      }
      if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
      return true;
    }

    makeNoise() {
      if (!this.ctx) return;
      const frames = Math.floor(this.ctx.sampleRate * 1.1);
      const buffer = this.ctx.createBuffer(1, frames, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < frames; i += 1) data[i] = Math.random() * 2 - 1;
      this.noiseBuffer = buffer;
    }

    tone(freq, dur = 0.12, opts = {}) {
      if (!this.ensure()) return;
      const {
        type = 'sine',
        gain = 0.1,
        slide = null,
        delay = 0,
        attack = 0.008
      } = opts;
      const t0 = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(40, freq), t0);
      if (slide) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(40, slide), t0 + dur * 0.92);
      }
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(gain, t0 + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      osc.connect(g);
      g.connect(this.master);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    }

    noise(dur = 0.15, freq = 1200, gain = 0.05, delay = 0) {
      if (!this.ensure() || !this.noiseBuffer) return;
      const t0 = this.ctx.currentTime + delay;
      const src = this.ctx.createBufferSource();
      src.buffer = this.noiseBuffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, t0);
      filter.Q.value = 0.9;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.linearRampToValueAtTime(gain, t0 + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(filter);
      filter.connect(g);
      g.connect(this.master);
      src.start(t0);
      src.stop(t0 + dur + 0.02);
    }

    play(name) {
      if (!this.enabled || !this.ensure()) return;
      switch (name) {
        case 'pet':
          this.tone(rand(610, 760), 0.14, { type: 'sine', gain: 0.13, slide: rand(880, 1040) });
          this.tone(rand(980, 1160), 0.09, { type: 'triangle', gain: 0.045, slide: 820, delay: 0.06 });
          break;
        case 'feed':
          this.noise(0.12, 1500, 0.055);
          this.tone(180, 0.13, { type: 'triangle', gain: 0.075, slide: 120, delay: 0.04 });
          this.tone(520, 0.1, { type: 'sine', gain: 0.06, slide: 780, delay: 0.16 });
          break;
        case 'play':
          this.tone(520, 0.1, { type: 'sine', gain: 0.1, slide: 840 });
          this.noise(0.2, 900, 0.04, 0.13);
          this.tone(760, 0.12, { type: 'triangle', gain: 0.055, slide: 940, delay: 0.25 });
          break;
        case 'dance': {
          const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
          notes.forEach((n, i) => {
            this.tone(n, 0.16, { type: i % 2 ? 'triangle' : 'sine', gain: 0.075, delay: i * 0.085 });
          });
          this.tone(1568, 0.22, { type: 'sine', gain: 0.04, delay: 0.48 });
          break;
        }
        case 'select':
          this.tone(560, 0.07, { type: 'triangle', gain: 0.055, slide: 700 });
          this.tone(840, 0.08, { type: 'sine', gain: 0.035, slide: 980, delay: 0.055 });
          break;
        case 'sparkle':
          this.tone(1480, 0.1, { type: 'sine', gain: 0.04, slide: 1900 });
          this.tone(2100, 0.13, { type: 'sine', gain: 0.026, delay: 0.05 });
          break;
        case 'pop':
          this.tone(220, 0.08, { type: 'sine', gain: 0.065, slide: 480 });
          this.noise(0.05, 2400, 0.022);
          break;
        case 'nom':
          this.noise(0.07, 1250, 0.045);
          this.noise(0.08, 950, 0.04, 0.1);
          this.tone(160, 0.1, { type: 'triangle', gain: 0.05, slide: 110, delay: 0.09 });
          break;
        case 'splash':
          this.noise(0.28, 700, 0.055);
          this.tone(420, 0.25, { type: 'sine', gain: 0.045, slide: 180 });
          break;
        case 'pat':
          this.tone(300, 0.08, { type: 'triangle', gain: 0.08, slide: 150 });
          this.tone(340, 0.08, { type: 'triangle', gain: 0.08, slide: 160, delay: 0.12 });
          this.tone(240, 0.12, { type: 'sine', gain: 0.07, slide: 120, delay: 0.24 });
          this.noise(0.08, 500, 0.03, 0.1);
          break;
        case 'yawn':
          this.tone(260, 0.42, { type: 'sine', gain: 0.055, slide: 170 });
          break;
        default:
          break;
      }
      this.flash();
    }

    flash() {
      document.body.classList.add('sfx-live');
      window.clearTimeout(this.flashTimer);
      this.flashTimer = window.setTimeout(() => {
        document.body.classList.remove('sfx-live');
      }, 520);
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
      if (this.enabled) {
        this.ensure();
        this.play('select');
      }
    }
  }

  const audio = new SealAudio();

  /* ---------------------------------------------------------
     5. DOM references
     --------------------------------------------------------- */
  const dom = {
    stage: $('#stage'),
    canvas: $('#sealCanvas'),
    fallback: $('#fallbackSeal'),
    loading: $('#loading'),
    loadingText: $('#loadingText'),
    speech: $('#speech'),
    speechText: $('#speechText'),
    fx: $('#fxLayer'),
    stageStars: $('#stageStars'),
    snowField: $('#snowField'),
    bubbleField: $('#bubbleField'),
    petName: $('#petName'),
    petSpecies: $('#petSpecies'),
    zeroClipBadge: $('#zeroClipBadge'),
    stageHint: $('#stageHint'),
    soundBtn: $('#soundBtn'),
    soundLabel: $('#soundLabel'),
    desktopBtn: $('#desktopBtn'),
    exitDesktop: $('#exitDesktop'),
    aboutBtn: $('#aboutBtn'),
    aboutDialog: $('#aboutDialog'),
    dialogClose: $('#dialogClose'),
    speciesGrid: $('#speciesGrid'),
    filterRow: $('#filterRow'),
    detailCard: $('#detailCard'),
    foundCount: $('#foundCount'),
    moodBar: $('#moodBar'),
    fullBar: $('#fullBar'),
    energyBar: $('#energyBar'),
    moodValue: $('#moodValue'),
    fullValue: $('#fullValue'),
    energyValue: $('#energyValue'),
    followBtn: $('#followBtn'),
    followState: $('#followState'),
    langSelect: $('#langSelect'),
    exprRow: $('#exprRow'),
    toast: $('#toast')
  };

  /* ---------------------------------------------------------
     6. Visual state shared with WebGL
     --------------------------------------------------------- */
  const visual = {
    pattern: PATTERN_IDS[currentSpecies().pattern] || 0,
    current: {
      fur: hexToRgb(currentSpecies().bodyHex),
      belly: hexToRgb(currentSpecies().bellyHex),
      accent: hexToRgb(currentSpecies().accentHex),
      girth: 1.02,
      snout: 0.94,
      eye: 1,
      whisker: 1,
      trunk: 0,
      hood: 0,
      faceDark: 0.08
    },
    target: null
  };
  visual.target = structuredCloneSafe(visual.current);

  const motion = {
    petPulse: 0,
    excite: 0,
    wave: 0,
    mouth: 0,
    bounceStart: 0,
    squash: 0,
    danceStart: 0,
    bellyPatStart: 0,
    blinkStart: 0,
    nextBlink: performance.now() + 4200,
    lastPet: 0,
    lastFeed: 0,
    lastPlay: 0,
    lastDance: 0,
    lastBelly: 0,
    spinAngle: 0
  };

  /* Expression presets (floats tweened and pushed to the shader). */
  const EXPRESSIONS = {
    neutral: { smile: 0.0, blush: 0.08, eyesWide: 0.0, browRaise: 0.0, angry: 0.0, wink: 0.0, mouthOpen: 0.0, eyeFactor: 1.0 },
    happy: { smile: 1.0, blush: 0.45, eyesWide: 0.0, browRaise: 0.15, angry: 0.0, wink: 0.0, mouthOpen: 0.1, eyeFactor: 0.88 },
    sleepy: { smile: 0.1, blush: 0.1, eyesWide: -0.08, browRaise: -0.35, angry: 0.0, wink: 0.0, mouthOpen: 0.14, eyeFactor: 0.5 },
    surprised: { smile: 0.0, blush: 0.0, eyesWide: 0.3, browRaise: 0.7, angry: 0.0, wink: 0.0, mouthOpen: 0.85, eyeFactor: 1.0 },
    wink: { smile: 0.75, blush: 0.35, eyesWide: 0.0, browRaise: 0.1, angry: 0.0, wink: 1.0, mouthOpen: 0.05, eyeFactor: 0.9 },
    grumpy: { smile: -0.85, blush: 0.0, eyesWide: -0.05, browRaise: -0.05, angry: 1.0, wink: 0.0, mouthOpen: 0.08, eyeFactor: 0.85 },
    blush: { smile: 0.85, blush: 1.0, eyesWide: 0.0, browRaise: 0.12, angry: 0.0, wink: 0.0, mouthOpen: 0.22, eyeFactor: 0.85 }
  };
  const EXPRESSION_ORDER = ['neutral', 'happy', 'sleepy', 'surprised', 'wink', 'grumpy', 'blush'];
  const exprState = { smile: 0.0, blush: 0.08, eyesWide: 0.0, browRaise: 0.0, angry: 0.0, wink: 0.0, mouthOpen: 0.0, eyeFactor: 1.0 };

  let filter = 'all';
  let speechTimer = 0;
  let toastTimer = 0;
  let pointerTarget = { x: 0, y: 0 };
  let pointerSmooth = { x: 0, y: 0 };
  let orbit = { x: 0, y: 0 };
  let orbitTarget = { x: 0, y: 0 };
  let zoom = 1;
  let zoomTarget = 1;

  /* ---------------------------------------------------------
     7. UI render
     --------------------------------------------------------- */
  function statusInfo(code) {
    return STATUS[code] || STATUS.LC;
  }

  function statusLabel(code) {
    const st = STATUS[code] || STATUS.LC;
    return (st.labels && st.labels[state.lang]) || st.label || code;
  }

  function miniSealMarkup(sp) {
    const fur = sp.bodyHex;
    const belly = sp.bellyHex;
    return `<svg viewBox="0 0 40 34" aria-hidden="true" focusable="false">
      <ellipse cx="18.5" cy="22.4" rx="14" ry="8.3" fill="${fur}"/>
      <ellipse cx="18.5" cy="25.2" rx="9.2" ry="4.7" fill="${belly}" opacity=".9"/>
      <path d="M5.7 20.8C2 20 0 22.8 1.1 25.1c.8 1.8 2.7 2.1 4.1.9l3.5-3.1" fill="${fur}"/>
      <path d="M12.3 27.4c2.3 1.5 5.1 1.7 7.7 1" fill="none" stroke="${belly}" stroke-width="1.5" stroke-linecap="round" opacity=".85"/>
      <circle cx="29.2" cy="14.1" r="7.7" fill="${fur}"/>
      <ellipse cx="29.2" cy="17.5" rx="4.6" ry="3.2" fill="${belly}" opacity=".9"/>
      <circle cx="27.1" cy="12.9" r="1.15" fill="#1b2b2d"/>
      <circle cx="31.8" cy="12.9" r="1.15" fill="#1b2b2d"/>
      <ellipse cx="29.4" cy="16.2" rx="1.35" ry=".9" fill="#343233"/>
      <path d="M28.4 17.2c.5.5 1.2.5 1.7 0" fill="none" stroke="#5b4b43" stroke-width=".7" stroke-linecap="round"/>
    </svg>`;
  }

  function renderSpeciesGrid() {
    const items = SPECIES.filter((sp) => {
      if (filter === 'all') return true;
      if (filter === 'extinct') return sp.extinct;
      return sp.habitat === filter;
    });
    dom.speciesGrid.innerHTML = items.map((sp) => {
      const st = statusInfo(sp.iucn);
      const active = sp.id === state.speciesId;
      const found = state.collected.includes(sp.id);
      const name = spName(sp);
      return `<button class="species-card${active ? ' active' : ''}${sp.extinct ? ' is-extinct' : ''}"
        type="button" data-species="${sp.id}" title="${name} · ${spEn(sp)}"
        aria-pressed="${active}">
        <span class="seal-mini">${miniSealMarkup(sp)}</span>
        <span class="card-text">
          <b>${name}${found ? ` <span class="found-tick" aria-label="${t('found.aria')}">✓</span>` : ''}</b>
          <small>${sp.scientific}</small>
        </span>
        <span class="status-dot" style="--status:${st.color}" title="${sp.iucn} ${statusLabel(sp.iucn)}"></span>
      </button>`;
    }).join('');

    if (!items.length) {
      dom.speciesGrid.innerHTML = `<p class="empty-dex">${t('dex.empty')}</p>`;
    }
  }

  function renderDetail() {
    const sp = currentSpecies();
    const st = statusInfo(sp.iucn);
    const info = spInfo(sp);
    const name = spName(sp);
    const zone = zoneLabel(sp.habitat);
    const label = sp.extinct ? t('extinct.label') : fmt('detail.pet', { name });
    dom.detailCard.classList.toggle('is-extinct', Boolean(sp.extinct));
    dom.detailCard.innerHTML = `
      <div class="detail-top">
        <span class="detail-seal">${miniSealMarkup(sp)}</span>
        <div class="detail-titles">
          <h2>${name}<span class="iucn-pill" style="--status:${st.color}" title="IUCN：${sp.iucn} ${statusLabel(sp.iucn)}">${sp.iucn}</span></h2>
          <span class="latin">${sp.scientific}</span>
          <span class="en">${spEn(sp)} · ${zone}${sp.extinct ? ` · ${t('filter.extinct')}` : ''}</span>
        </div>
      </div>
      <p class="detail-blurb">${info.blurb || ''}</p>
      <div class="detail-stats">
        <div class="detail-stat"><span>${t('detail.stat.region')}</span><b title="${info.region || ''}">${info.region || ''}</b></div>
        <div class="detail-stat"><span>${t('detail.stat.length')}</span><b>${sp.length}</b></div>
        <div class="detail-stat"><span>${t('detail.stat.weight')}</span><b>${sp.weight}</b></div>
        <div class="detail-stat"><span>${t('detail.stat.diet')}</span><b title="${info.diet || ''}">${info.diet || ''}</b></div>
        <div class="detail-stat"><span>${t('detail.stat.dive')}</span><b title="${info.dive || ''}">${info.dive || ''}</b></div>
        <div class="detail-stat"><span>${t('detail.stat.life')}</span><b title="${info.life || ''}">${info.life || ''}</b></div>
      </div>
      <p class="detail-fact"><b>${t('detail.fact')}</b><br>${info.fact || ''}</p>
      <div class="detail-actions">
        <button class="detail-btn" type="button" data-detail-action="pet">${label}</button>
        <button class="detail-btn light" type="button" data-detail-action="random">${t('detail.random')}</button>
        ${sp.extinct ? `<span class="extinct-note">${t('extinct.note')}</span>` : ''}
      </div>`;
  }

  function renderAll() {
    renderSpeciesGrid();
    renderDetail();
    updateNameplate();
    updateVitals();
    updateProgress();
    syncSoundUI();
    syncFollowUI();
  }

  function renderLangOptions() {
    if (!dom.langSelect) return;
    dom.langSelect.innerHTML = LOCALE_ORDER.map((code) => {
      return `<option value="${code}"${code === state.lang ? ' selected' : ''}>${LOCALES[code]}</option>`;
    }).join('');
    dom.langSelect.setAttribute('aria-label', t('lang.aria'));
  }

  function renderExpressions() {
    if (!dom.exprRow) return;
    const label = `<span class="expr-label" data-i18n="expr.label">${t('expr.label')}</span>`;
    const buttons = EXPRESSION_ORDER.map((key) => {
      const active = state.expression === key ? ' active' : '';
      const labelText = t('expr.' + key);
      const emoji = { neutral: '😐', happy: '😊', sleepy: '😴', surprised: '😲', wink: '😉', grumpy: '😠', blush: '🥰' }[key] || '😊';
      return `<button class="expr-btn${active}" type="button" data-expr="${key}" aria-pressed="${state.expression === key}" title="${labelText}">
        <span class="expr-emoji" aria-hidden="true">${emoji}</span>
        <span class="expr-label-text">${labelText}</span>
      </button>`;
    }).join('');
    dom.exprRow.innerHTML = label + buttons;
  }

  function syncExpressionUI() {
    if (!dom.exprRow) return;
    $$('.expr-btn', dom.exprRow).forEach((btn) => {
      const active = btn.getAttribute('data-expr') === state.expression;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  function setExpression(key) {
    if (!EXPRESSIONS[key]) return;
    state.expression = key;
    saveState();
    syncExpressionUI();
    audio.play('select');
  }

  function setLanguage(code) {
    if (!LOCALES[code]) return;
    state.lang = code;
    saveState();
    applyI18n();
    renderLangOptions();
    renderSpeciesGrid();
    renderDetail();
    updateNameplate();
    updateProgress();
    syncSoundUI();
    syncFollowUI();
    renderExpressions();
    syncExpressionUI();
    if (window.innerWidth <= 720 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      dom.stageHint.textContent = t('hint.mobile');
    } else {
      dom.stageHint.textContent = t('hint.desktop');
    }
    audio.play('select');
  }

  function updateNameplate() {
    const sp = currentSpecies();
    dom.petSpecies.textContent = spName(sp);
    dom.petName.textContent = sp.extinct ? `${t('brand.petname')} · ${t('extinct.label')}` : t('brand.petname');
    dom.zeroClipBadge.textContent = sp.extinct ? t('extinct.label') : t('badge.rt3d');
  }

  function updateProgress() {
    const found = state.collected.length;
    dom.foundCount.textContent = String(found);
    dom.foundCount.parentElement.title = found === SPECIES.length
      ? t('toast.all20')
      : `${t('dex.progress.title')} ${found} / ${SPECIES.length}`;
  }

  function updateVitals() {
    const s = state.stats;
    dom.moodBar.style.width = `${clamp(s.mood, 0, 100)}%`;
    dom.fullBar.style.width = `${clamp(s.full, 0, 100)}%`;
    dom.energyBar.style.width = `${clamp(s.energy, 0, 100)}%`;
    dom.moodValue.textContent = String(Math.round(s.mood));
    dom.fullValue.textContent = String(Math.round(s.full));
    dom.energyValue.textContent = String(Math.round(s.energy));
  }

  function syncSoundUI() {
    document.body.classList.toggle('muted', !state.sound);
    dom.soundBtn.setAttribute('aria-pressed', String(state.sound));
    dom.soundBtn.setAttribute('aria-label', state.sound ? t('sound.aria.on') : t('sound.aria.off'));
    dom.soundLabel.textContent = state.sound ? t('sound.on') : t('sound.off');
    audio.enabled = state.sound;
  }

  function syncFollowUI() {
    dom.followBtn.classList.toggle('is-active', state.follow);
    dom.followBtn.setAttribute('aria-pressed', String(state.follow));
    dom.followState.textContent = state.follow ? t('follow.on') : t('follow.off');
  }

  function showToast(text, duration = 2500) {
    dom.toast.textContent = text;
    dom.toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => dom.toast.classList.remove('show'), duration);
  }

  function say(text, hold = 3800) {
    dom.speechText.textContent = text;
    dom.speech.classList.remove('hidden');
    dom.speech.classList.remove('pop');
    void dom.speech.offsetWidth;
    dom.speech.classList.add('pop');
    window.clearTimeout(speechTimer);
    speechTimer = window.setTimeout(() => dom.speech.classList.add('hidden'), hold);
  }

  /* ---------------------------------------------------------
     8. Species selection
     --------------------------------------------------------- */
  function applySpeciesVisual(sp, instant = false) {
    const shape = SHAPES[sp.bodyShape] || SHAPES.compact;
    const isElephant = sp.id.includes('elephant-seal');
    const target = {
      fur: hexToRgb(sp.bodyHex),
      belly: hexToRgb(sp.bellyHex),
      accent: hexToRgb(sp.accentHex),
      girth: shape.girth,
      snout: shape.snout,
      eye: sp.id === 'ross-seal' ? 1.30 : shape.eye,
      whisker: sp.id === 'bearded-seal' ? 1.55 : 1,
      trunk: isElephant ? 1 : 0,
      hood: sp.id === 'hooded-seal' ? 1 : 0,
      faceDark: sp.id === 'harp-seal' ? 0.80 : sp.id === 'mediterranean-monk-seal' ? 0.26 : 0.06
    };
    visual.target = target;
    visual.pattern = PATTERN_IDS[sp.pattern] || 0;
    if (instant) {
      visual.current = structuredCloneSafe(target);
    }
  }

  function selectSpecies(id, options = {}) {
    const sp = SPECIES_BY_ID.get(id);
    if (!sp) return;
    const changed = state.speciesId !== id;
    state.speciesId = id;
    const name = spName(sp);
    if (!state.collected.includes(id)) {
      state.collected.push(id);
      showToast(fmt('toast.newfriend', { name }), 2600);
      audio.play('sparkle');
      spawnSparkles(12, true);
    }
    saveState();
    applySpeciesVisual(sp, false);
    renderSpeciesGrid();
    renderDetail();
    updateNameplate();
    updateProgress();
    if (changed && !options.silent) {
      audio.play('select');
      spawnPoof();
      const line = pick(lines('switch')).replace('{name}', name);
      say(line);
      if (state.collected.length === SPECIES.length) {
        window.setTimeout(() => showToast(t('toast.all20'), 4200), 500);
      }
    }
    if (options.say) say(options.say);
  }

  function randomSpecies() {
    const others = SPECIES.filter((s) => s.id !== state.speciesId);
    selectSpecies(pick(others).id);
  }

  /* ---------------------------------------------------------
     9. Stats & actions
     --------------------------------------------------------- */
  function addStat(key, amount, label, showFloat = true) {
    const before = state.stats[key];
    state.stats[key] = clamp(before + amount, 0, 100);
    updateVitals();
    saveState();
    const delta = Math.round(state.stats[key] - before);
    if (delta > 0 && showFloat) {
      floatPlus(`${label} +${delta}`);
    }
  }

  function petSeal() {
    const now = performance.now();
    if (now - motion.lastPet < 180) return;
    motion.lastPet = now;
    motion.petPulse = 1;
    motion.wave = Math.max(motion.wave, 0.55);
    motion.mouth = Math.max(motion.mouth, 0.65);
    motion.bounceStart = now;
    motion.squash = 0.06;
    audio.play('pet');
    spawnHearts(rand(3, 6));
    spawnSparkles(5);
    addStat('mood', 7, t('vital.mood'));
    addStat('energy', 2, t('vital.energy'), false);
    say(pick(lines('pet')));
  }

  function feedSeal() {
    const now = performance.now();
    if (now - motion.lastFeed < 800) return;
    motion.lastFeed = now;
    spawnFish();
  }

  function playSeal() {
    const now = performance.now();
    if (now - motion.lastPlay < 1000) return;
    motion.lastPlay = now;
    audio.play('play');
    spawnSnowball();
  }

  function danceSeal() {
    const now = performance.now();
    if (now - motion.lastDance < 1500) return;
    motion.lastDance = now;
    motion.danceStart = now;
    motion.excite = 1;
    motion.wave = 1;
    audio.play('dance');
    spawnSparkles(18, true);
    spawnHearts(2);
    addStat('mood', 8, t('vital.mood'));
    addStat('energy', 3, t('vital.energy'), false);
    say(pick(lines('dance')));
  }

  function bellyPatSeal() {
    const now = performance.now();
    if (now - motion.lastBelly < 1300) return;
    motion.lastBelly = now;
    motion.bellyPatStart = now;
    motion.bounceStart = now;
    motion.squash = 0.05;
    motion.excite = Math.max(motion.excite, 0.7);
    audio.play('pat');
    spawnPats();
    spawnHearts(2);
    addStat('mood', 7, t('vital.mood'));
    addStat('energy', 1, t('vital.energy'), false);
    say(pick(lines('belly')));
  }

  function toggleFollow() {
    state.follow = !state.follow;
    if (!state.follow) {
      pointerTarget.x = 0;
      pointerTarget.y = 0;
    }
    syncFollowUI();
    saveState();
    audio.play('select');
    say(state.follow ? lines('followOn')[0] : lines('followOff')[0]);
  }

  function toggleSound() {
    state.sound = !state.sound;
    syncSoundUI();
    saveState();
    audio.setEnabled(state.sound);
    if (state.sound) {
      say(lines('soundOn')[0]);
    }
  }

  /* ---------------------------------------------------------
     10. Particle feedback
     --------------------------------------------------------- */
  function anchorPoint() {
    const w = dom.stage.clientWidth;
    const h = dom.stage.clientHeight;
    return { x: w * 0.52, y: h * 0.43, w, h };
  }

  function spawnHearts(count = 4) {
    const a = anchorPoint();
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('span');
      el.className = `fx-heart${Math.random() > 0.72 ? ' soft' : ''}`;
      el.textContent = '♥';
      el.style.left = `${a.x + rand(-70, 70)}px`;
      el.style.top = `${a.y + rand(-22, 22)}px`;
      el.style.setProperty('--heart-size', `${rand(16, 29)}px`);
      el.style.setProperty('--heart-drift', `${rand(-26, 26)}px`);
      el.style.setProperty('--heart-rise', `${rand(70, 150)}px`);
      el.style.setProperty('--heart-time', `${rand(1.1, 1.7)}s`);
      dom.fx.appendChild(el);
      window.setTimeout(() => el.remove(), 1900);
    }
  }

  function spawnSparkles(count = 8, wide = false) {
    const a = anchorPoint();
    for (let i = 0; i < count; i += 1) {
      const el = document.createElement('span');
      el.className = 'fx-spark';
      const x = wide ? a.x + rand(-a.w * 0.33, a.w * 0.33) : a.x + rand(-90, 90);
      const y = wide ? a.y + rand(-a.h * 0.28, a.h * 0.25) : a.y + rand(-55, 55);
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.setProperty('--spark-size', `${rand(5, 11)}px`);
      el.style.setProperty('--spark-time', `${rand(0.7, 1.2)}s`);
      dom.fx.appendChild(el);
      window.setTimeout(() => el.remove(), 1400);
    }
  }

  function spawnPoof() {
    const a = anchorPoint();
    const ring = document.createElement('span');
    ring.className = 'fx-ring';
    ring.style.left = `${a.x}px`;
    ring.style.top = `${a.y}px`;
    dom.fx.appendChild(ring);
    window.setTimeout(() => ring.remove(), 900);
    spawnSparkles(9, true);
  }

  function floatPlus(text) {
    const a = anchorPoint();
    const el = document.createElement('span');
    el.className = 'fx-plus';
    el.textContent = text;
    el.style.left = `${a.x + rand(-30, 60)}px`;
    el.style.top = `${a.y + rand(-5, 30)}px`;
    dom.fx.appendChild(el);
    window.setTimeout(() => el.remove(), 1400);
  }

  const PAW_SVG = `<svg viewBox="0 0 32 32" aria-hidden="true">
    <g fill="#fffdf6" stroke="rgba(18,59,71,.14)" stroke-width=".8">
      <ellipse cx="16" cy="19" rx="8" ry="6.6"/>
      <circle cx="8" cy="11.5" r="2.7"/>
      <circle cx="16" cy="9" r="2.9"/>
      <circle cx="24" cy="11.5" r="2.7"/>
    </g>
  </svg>`;

  function spawnPats() {
    const a = anchorPoint();
    const baseX = a.x;
    const baseY = a.y + a.h * 0.17;
    for (let i = 0; i < 4; i += 1) {
      const el = document.createElement('span');
      el.className = 'fx-pat';
      el.innerHTML = PAW_SVG;
      el.style.left = `${baseX + rand(-46, 46)}px`;
      el.style.top = `${baseY + rand(-10, 12)}px`;
      el.style.setProperty('--pat-delay', `${i * 0.09}s`);
      dom.fx.appendChild(el);
      window.setTimeout(() => el.remove(), 1500);
    }
  }

  const FISH_SVG = `<svg viewBox="0 0 90 52" role="img" aria-label="小魚">
    <path d="M68 25c-8-12-22-17-38-12-8 2-14 7-17 13 3 7 10 12 19 14 15 4 28-2 36-15Z" fill="#ff9a68"/>
    <path d="M69 25c7-5 14-7 17-4 2 3-2 7-6 10 5 5 8 10 5 12-4 2-10-2-16-8Z" fill="#ff7b5c"/>
    <path d="M22 17c-1-8 3-12 9-12-1 5 1 9 5 12Z" fill="#ffc47c"/>
    <path d="M23 34c-4 6-2 11 3 13 1-5 4-8 8-9Z" fill="#ffc47c"/>
    <path d="M31 25c8 6 19 7 29 2-8 11-22 13-31 5Z" fill="#ffd3a4" opacity=".8"/>
    <circle cx="62" cy="21" r="2.6" fill="#343130"/>
    <circle cx="61.2" cy="20.2" r=".9" fill="#fff"/>
    <path d="M54 30c4 1 7 1 10 0" fill="none" stroke="#d95f49" stroke-width="1.4" stroke-linecap="round" opacity=".65"/>
    <circle cx="77" cy="11" r="3.2" fill="none" stroke="#fff" stroke-width="1.4" opacity=".55"/>
    <circle cx="83" cy="5" r="1.8" fill="none" stroke="#fff" stroke-width="1.2" opacity=".4"/>
  </svg>`;

  function spawnFish() {
    const a = anchorPoint();
    const fromLeft = Math.random() > 0.5;
    const fish = document.createElement('div');
    fish.className = 'fx-fish';
    fish.innerHTML = FISH_SVG;
    const startX = fromLeft ? -110 : a.w + 10;
    const startY = a.h * rand(0.14, 0.30);
    fish.style.left = `${startX}px`;
    fish.style.top = `${startY}px`;
    fish.style.transform = `rotate(${fromLeft ? -14 : 14}deg) scale(.72)`;
    dom.fx.appendChild(fish);
    const endX = a.x - (fromLeft ? -10 : 18);
    const endY = a.y + 12;
    const dx = endX - startX;
    const dy = endY - startY;

    if (fish.animate) {
      const animation = fish.animate([
        { transform: `translate(0, 0) rotate(${fromLeft ? -14 : 14}deg) scale(.72)`, opacity: 0, offset: 0 },
        { transform: `translate(${dx * 0.18}px, ${dy * 0.45 - 42}px) rotate(${fromLeft ? 4 : -4}deg) scale(.88)`, opacity: 1, offset: 0.24 },
        { transform: `translate(${dx * 0.64}px, ${dy * 0.7 - 14}px) rotate(${fromLeft ? -8 : 8}deg) scale(1)`, opacity: 1, offset: 0.7 },
        { transform: `translate(${dx}px, ${dy}px) rotate(8deg) scale(.18)`, opacity: 0, offset: 1 }
      ], {
        duration: 820,
        easing: 'cubic-bezier(.36,.02,.26,1)'
      });
      animation.onfinish = () => {
        fish.remove();
        fishCaught();
      };
      animation.oncancel = () => fish.remove();
    } else {
      window.setTimeout(() => {
        fish.remove();
        fishCaught();
      }, 820);
    }
  }

  function fishCaught() {
    motion.mouth = 1;
    motion.excite = Math.max(motion.excite, 0.9);
    motion.wave = Math.max(motion.wave, 0.55);
    motion.bounceStart = performance.now();
    audio.play('nom');
    spawnHearts(3);
    addStat('full', 16, t('vital.full'));
    addStat('mood', 3, t('vital.mood'), false);
    say(pick(lines('feed')));
    const a = anchorPoint();
    const pile = document.createElement('span');
    pile.className = 'fx-snowpile';
    pile.style.left = `${a.x - 40}px`;
    pile.style.top = `${a.y + 45}px`;
    dom.fx.appendChild(pile);
    window.setTimeout(() => pile.remove(), 1000);
  }

  function spawnSnowball() {
    const a = anchorPoint();
    const ball = document.createElement('span');
    ball.className = 'fx-snowball';
    const startX = a.w * 0.14;
    const startY = a.h * 0.76;
    const endX = a.x + 30;
    const endY = a.y + 25;
    ball.style.left = `${startX}px`;
    ball.style.top = `${startY}px`;
    dom.fx.appendChild(ball);
    const dx = endX - startX;
    const dy = endY - startY;

    if (ball.animate) {
      const anim = ball.animate([
        { transform: 'translate(0,0) scale(.7) rotate(0deg)', opacity: 0, offset: 0 },
        { transform: `translate(${dx * 0.45}px, ${dy * 0.5 - 90}px) scale(.95) rotate(140deg)`, opacity: 1, offset: 0.55 },
        { transform: `translate(${dx}px, ${dy}px) scale(.82) rotate(280deg)`, opacity: 1, offset: 1 }
      ], {
        duration: 650,
        easing: 'cubic-bezier(.22,.8,.36,1)'
      });
      anim.onfinish = () => {
        ball.remove();
        snowballHit();
      };
      anim.oncancel = () => ball.remove();
    } else {
      window.setTimeout(() => {
        ball.remove();
        snowballHit();
      }, 650);
    }
  }

  function snowballHit() {
    motion.wave = 1;
    motion.excite = 1;
    motion.bounceStart = performance.now();
    motion.squash = 0.08;
    audio.play('splash');
    spawnSparkles(12);
    spawnHearts(2);
    addStat('energy', 6, t('vital.energy'));
    addStat('mood', 5, t('vital.mood'), false);
    say(pick(lines('play')));
    const a = anchorPoint();
    const pile = document.createElement('span');
    pile.className = 'fx-snowpile';
    pile.style.left = `${a.x - 45}px`;
    pile.style.top = `${a.y + 48}px`;
    dom.fx.appendChild(pile);
    window.setTimeout(() => pile.remove(), 1000);
  }

  /* ---------------------------------------------------------
     11. Stage decoration
     --------------------------------------------------------- */
  function buildStageDecor() {
    const stars = [];
    for (let i = 0; i < 20; i += 1) {
      stars.push(`<span class="stage-star" style="left:${rand(6, 94)}%;top:${rand(4, 80)}%;animation-delay:${rand(-4, 0)}s"></span>`);
    }
    dom.stageStars.innerHTML = stars.join('');

    const snow = [];
    for (let i = 0; i < 30; i += 1) {
      snow.push(`<span class="snow-dot" style="left:${rand(2, 98)}%;--snow-size:${rand(2.5, 7)}px;--snow-duration:${rand(9, 18)}s;--snow-delay:${rand(-18, 0)}s;--snow-drift:${rand(-40, 50)}px"></span>`);
    }
    dom.snowField.innerHTML = snow.join('');

    const bubbles = [];
    for (let i = 0; i < 11; i += 1) {
      bubbles.push(`<span class="bubble" style="left:${rand(4, 96)}%;--bubble-size:${rand(5, 16)}px;--bubble-duration:${rand(11, 22)}s;--bubble-delay:${rand(-20, 0)}s"></span>`);
    }
    dom.bubbleField.innerHTML = bubbles.join('');
  }

  /* ---------------------------------------------------------
     12. WebGL renderer
     --------------------------------------------------------- */
  const VERTEX_SHADER = `
    attribute vec2 aPosition;
    void main() {
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const FRAGMENT_SHADER = `
    precision highp float;

    uniform vec2 uRes;
    uniform float uTime;
    uniform vec2 uPointer;
    uniform vec2 uOrbit;
    uniform float uZoom;
    uniform float uPet;
    uniform float uExcite;
    uniform float uWave;
    uniform float uSpinC;
    uniform float uSpinS;
    uniform float uBounce;
    uniform float uSquash;
    uniform float uEyeOpen;
    uniform float uMouth;
    uniform float uFollow;
    uniform vec3 uFur;
    uniform vec3 uBelly;
    uniform vec3 uAccent;
    uniform int uPattern;
    uniform float uGirth;
    uniform float uSnout;
    uniform float uEye;
    uniform float uWhisker;
    uniform float uTrunk;
    uniform float uHood;
    uniform float uFaceDark;
    uniform float uSmile;
    uniform float uBlushAmt;
    uniform float uBrowAngry;
    uniform float uBrowRaise;
    uniform float uWink;
    uniform float uRockC;
    uniform float uRockS;
    uniform float uBreath;
    uniform float uHeadYC;
    uniform float uHeadYS;
    uniform float uHeadZC;
    uniform float uHeadZS;
    uniform float uHeadBob;
    uniform float uTailC;
    uniform float uTailS;
    uniform float uWaveC;
    uniform float uWaveS;
    uniform float uWaveC2;
    uniform float uWaveS2;

    const float PI = 3.14159265359;
    const vec3 HEAD_PIVOT = vec3(0.0, 0.74, 0.42);

    /* -------- little helpers -------- */
    vec2 rot2(vec2 v, float c, float s) {
      return vec2(c * v.x + s * v.y, -s * v.x + c * v.y);
    }

    float smin(float a, float b, float k) {
      float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
      return mix(b, a, h) - k * h * (1.0 - h);
    }

    float sdEllipsoid(vec3 p, vec3 r) {
      float k0 = length(p / r);
      float k1 = length(p / (r * r));
      return k0 * (k0 - 1.0) / max(k1, 0.00001);
    }

    float sdCapsule(vec3 p, vec3 a, vec3 b, float r) {
      vec3 pa = p - a;
      vec3 ba = b - a;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.00001), 0.0, 1.0);
      return length(pa - ba * h) - r;
    }

    float sdRoundBox(vec3 p, vec3 b, float r) {
      vec3 q = abs(p) - b + r;
      return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
    }

    float segDist2(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 0.00001), 0.0, 1.0);
      return length(pa - ba * h);
    }

    float hash21(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash21(i);
      float b = hash21(i + vec2(1.0, 0.0));
      float c = hash21(i + vec2(0.0, 1.0));
      float d = hash21(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float s = 0.0;
      float a = 0.5;
      for (int i = 0; i < 4; i++) {
        s += a * vnoise(p);
        p = p * 2.03 + vec2(12.4, 7.2);
        a *= 0.5;
      }
      return s;
    }

    float spots2(vec2 uv, float density, float radius, float cut) {
      vec2 g = floor(uv * density);
      vec2 f = fract(uv * density);
      float m = 0.0;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 o = vec2(float(i), float(j));
          float h = hash21(g + o + 1.7);
          if (h > cut) {
            vec2 c = o + vec2(hash21(g + o + 4.1), hash21(g + o + 9.3));
            float d = length(f - c);
            m = max(m, 1.0 - smoothstep(radius, radius + 0.085, d));
          }
        }
      }
      return m;
    }

    float rings2(vec2 uv, float density, float cut) {
      vec2 g = floor(uv * density);
      vec2 f = fract(uv * density);
      float m = 0.0;
      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 o = vec2(float(i), float(j));
          float h = hash21(g + o + 7.1);
          if (h > cut) {
            vec2 c = o + vec2(hash21(g + o + 2.2), hash21(g + o + 5.7));
            float d = length(f - c);
            float ring = 1.0 - smoothstep(0.010, 0.030, abs(d - 0.19));
            m = max(m, ring);
          }
        }
      }
      return m;
    }

    /* -------- transforms -------- */
    vec3 rootInv(vec3 p) {
      vec3 q = p;
      q.y -= uBounce;
      q.xz = rot2(q.xz, uSpinC, uSpinS);
      q.xz = rot2(q.xz, uRockC, uRockS);
      q.y = 0.08 + (q.y - 0.08) / max(0.72, 1.0 - uSquash);
      q.xz /= (1.0 + 0.35 * uSquash);
      return q;
    }

    vec3 headInv(vec3 p) {
      vec3 q = p - HEAD_PIVOT - vec3(0.0, uHeadBob, 0.0);
      q.xz = rot2(q.xz, uHeadYC, uHeadYS);
      q.xy = rot2(q.xy, uHeadZC, uHeadZS);
      return q + HEAD_PIVOT;
    }

    float whiskerSet(vec3 p, float side) {
      float tipX = (0.30 + 0.09 * uWhisker) * side;
      float d = 1e5;
      d = min(d, sdCapsule(p, vec3(0.095 * side, 0.700, 1.125), vec3(tipX, 0.775, 1.150), 0.0032));
      d = min(d, sdCapsule(p, vec3(0.095 * side, 0.690, 1.130), vec3(tipX * 1.02, 0.705, 1.175), 0.0030));
      d = min(d, sdCapsule(p, vec3(0.095 * side, 0.680, 1.125), vec3(tipX * 0.94, 0.630, 1.155), 0.0028));
      if (uWhisker > 1.2) {
        d = min(d, sdCapsule(p, vec3(0.095 * side, 0.672, 1.115), vec3(tipX * 1.08, 0.570, 1.105), 0.0026));
      }
      return d;
    }

    /* -------- scene -------- */
    vec2 map(vec3 pw) {
      vec3 q = rootInv(pw);
      vec3 hq = headInv(q);

      float dBody = sdEllipsoid(q - vec3(0.0, 0.54, -0.08), vec3(0.52 * uGirth, 0.44 * uBreath, 0.92));
      float dChest = sdEllipsoid(q - vec3(0.0, 0.54, 0.30), vec3(0.46 * uGirth, 0.40 * uBreath, 0.44));
      float dHead = sdEllipsoid(hq - vec3(0.0, 0.81, 0.60), vec3(0.400, 0.380, 0.390));

      float d = smin(dBody, dChest, 0.15);
      d = smin(d, dHead, 0.12);

      float dMuzzle = sdEllipsoid(hq - vec3(0.0, 0.69, 0.97), vec3(0.215, 0.155, 0.215 * uSnout));
      d = smin(d, dMuzzle, 0.065);

      /* front flippers */
      {
        vec3 pivotR = vec3(0.43, 0.45, 0.30);
        vec3 fpR = q - pivotR;
        fpR.xy = rot2(fpR.xy, uWaveC, uWaveS);
        fpR.xz = rot2(fpR.xz, 0.984, 0.181);
        float dFR = sdEllipsoid(fpR - vec3(0.15, -0.075, 0.01), vec3(0.155, 0.050, 0.255));
        d = smin(d, dFR, 0.055);

        vec3 pivotL = vec3(-0.43, 0.45, 0.30);
        vec3 fpL = q - pivotL;
        fpL.xy = rot2(fpL.xy, uWaveC2, uWaveS2);
        fpL.xz = rot2(fpL.xz, 0.984, -0.181);
        float dFL = sdEllipsoid(fpL - vec3(-0.15, -0.075, 0.01), vec3(0.155, 0.050, 0.255));
        d = smin(d, dFL, 0.055);
      }

      /* tail flukes */
      {
        vec3 tp = q - vec3(0.0, 0.40, -1.02);
        tp.xz = rot2(tp.xz, uTailC, uTailS);
        float dTailBase = sdEllipsoid(q - vec3(0.0, 0.42, -0.99), vec3(0.30 * uGirth, 0.075, 0.24));
        d = smin(d, dTailBase, 0.06);
        float dFlukeL = sdEllipsoid(tp - vec3(-0.17, -0.015, -0.17), vec3(0.255, 0.043, 0.30));
        float dFlukeR = sdEllipsoid(tp - vec3(0.17, -0.015, -0.17), vec3(0.255, 0.043, 0.30));
        d = smin(d, smin(dFlukeL, dFlukeR, 0.03), 0.055);
      }

      vec2 res = vec2(d, 0.0);

      /* nose + optional elephant trunk + hood
         The muzzle's forward reach scales with uSnout, so the nose must
         ride on the front of it — otherwise long-snouted species bury it. */
      float muzzleZ = 0.215 * uSnout;
      float noseZ = 0.97 + muzzleZ - 0.026;
      vec3 noseP = hq - vec3(0.0, 0.724, noseZ);
      float dNose = sdEllipsoid(noseP, vec3(0.062, 0.040, 0.036));
      if (uTrunk > 0.01) {
        float trunkR = 0.046 + 0.008 * uTrunk;
        vec3 trA = vec3(0.0, 0.716, 1.158);
        vec3 trB = vec3(0.0, 0.655 - 0.012 * uTrunk, 1.220);
        float dTrunk = sdCapsule(hq, trA, trB, trunkR);
        float dTip = length(hq - vec3(0.0, 0.644 - 0.012 * uTrunk, 1.232)) - (0.050 + 0.006 * uTrunk);
        dTrunk = smin(dTrunk, dTip, 0.012);
        dNose = smin(dNose, dTrunk, 0.020);
      }
      if (uHood > 0.01) {
        float inflate = 0.64 + 0.36 * max(0.0, sin(uTime * 7.0)) * (0.35 + 0.65 * uExcite);
        float dHood = sdEllipsoid(hq - vec3(0.0, 0.792, 1.105), vec3(0.082, 0.076 * inflate + 0.020, 0.080));
        dNose = smin(dNose, dHood, 0.021);
      }
      if (dNose < res.x) res = vec2(dNose, 2.0);

      /* eyes: big glossy beads, with a vertical squash for blinks */
      vec2 eyeShift = vec2(uPointer.x * 0.014, uPointer.y * 0.010) * uFollow;
      float eyeOpenL = max(0.06, uEyeOpen * (1.0 - 0.94 * uWink));
      float eyeOpenR = max(0.06, uEyeOpen);
      vec3 eyeRadL = vec3(0.073 * uEye, 0.079 * uEye * eyeOpenL, 0.058 * uEye);
      vec3 eyeRadR = vec3(0.073 * uEye, 0.079 * uEye * eyeOpenR, 0.058 * uEye);
      vec3 eyeL = hq - vec3(-0.170 + eyeShift.x, 0.855 + eyeShift.y, 0.955);
      vec3 eyeR = hq - vec3(0.170 + eyeShift.x, 0.855 + eyeShift.y, 0.955);
      float dEye = min(sdEllipsoid(eyeL, eyeRadL), sdEllipsoid(eyeR, eyeRadR));
      if (dEye < res.x) res = vec2(dEye, 1.0);

      /* whiskers */
      float dWhisk = min(whiskerSet(hq, -1.0), whiskerSet(hq, 1.0));
      if (dWhisk < res.x) res = vec2(dWhisk, 3.0);

      /* ice floe & snow cap */
      float dIce = sdRoundBox(pw - vec3(0.0, -0.15, 0.0), vec3(1.12, 0.15, 0.94), 0.12);
      float dSnow = sdEllipsoid(pw - vec3(0.0, 0.018, 0.0), vec3(1.04, 0.075, 0.86));
      if (dIce < res.x) res = vec2(dIce, 4.0);
      if (dSnow < res.x) res = vec2(dSnow, 5.0);

      return res;
    }

    vec3 calcNormal(vec3 p) {
      float e = 0.0014;
      vec2 k = vec2(1.0, -1.0);
      return normalize(
        k.xyy * map(p + k.xyy * e).x +
        k.yyx * map(p + k.yyx * e).x +
        k.yxy * map(p + k.yxy * e).x +
        k.xxx * map(p + k.xxx * e).x
      );
    }

    float calcAO(vec3 p, vec3 n) {
      float occ = 0.0;
      float sca = 1.0;
      for (int i = 0; i < 4; i++) {
        float h = 0.018 + 0.115 * float(i) / 3.0;
        float d = map(p + n * h).x;
        occ += (h - d) * sca;
        sca *= 0.70;
      }
      return clamp(1.0 - 2.35 * occ, 0.0, 1.0);
    }

    vec2 trace(vec3 ro, vec3 rd) {
      /* Skip the empty air before the scene with a cheap bounding sphere. */
      vec3 oc = ro - vec3(0.0, 0.45, 0.0);
      float b = dot(oc, rd);
      float c = dot(oc, oc) - 2.45 * 2.45;
      float disc = b * b - c;
      if (disc < 0.0) return vec2(-1.0, 0.0);
      float t = max(0.02, -b - sqrt(disc));
      for (int i = 0; i < 96; i++) {
        vec3 p = ro + rd * t;
        vec2 h = map(p);
        if (h.x < 0.0006 + t * 0.00035) return vec2(t, h.y);
        t += max(h.x * 0.92, 0.002);
        if (t > 6.6) break;
      }
      return vec2(-1.0, 0.0);
    }

    /* -------- patterns -------- */
    float patternMask(vec3 q, vec3 n, float belly) {
      if (uPattern == 0) return 0.0;

      vec3 tw = pow(abs(n), vec3(3.0));
      tw /= max(0.0001, tw.x + tw.y + tw.z);

      if (uPattern == 1) {
        float a = spots2(q.zy, 17.0, 0.075, 0.46);
        float b = spots2(q.xz, 17.0, 0.075, 0.46);
        float c = spots2(q.xy, 17.0, 0.075, 0.46);
        return (a * tw.x + b * tw.y + c * tw.z) * (1.0 - belly * 0.84) * 0.62;
      }
      if (uPattern == 2) {
        float a = spots2(q.zy, 12.0, 0.100, 0.42);
        float b = spots2(q.xz, 12.0, 0.100, 0.42);
        float c = spots2(q.xy, 12.0, 0.100, 0.42);
        return (a * tw.x + b * tw.y + c * tw.z) * (1.0 - belly * 0.84) * 0.72;
      }
      if (uPattern == 3) {
        float a = rings2(q.zy, 14.0, 0.34);
        float b = rings2(q.xz, 14.0, 0.34);
        float c = rings2(q.xy, 14.0, 0.34);
        return (a * tw.x + b * tw.y + c * tw.z) * (1.0 - belly * 0.88) * 0.92;
      }
      if (uPattern == 4) {
        float zz = q.z + 0.055 * sin(q.y * 7.0 + q.x * 4.0);
        float band = max(
          smoothstep(0.085, 0.0, abs(zz - 0.16)),
          smoothstep(0.075, 0.0, abs(zz + 0.34))
        );
        float band2 = smoothstep(0.042, 0.0, abs(zz - 0.64));
        band = max(band, band2 * 0.75);
        return band * (1.0 - belly * 0.9) * 0.78;
      }
      if (uPattern == 5) {
        float width = 0.37 + 0.09 * sin(q.z * 3.4 + 0.7);
        float harp = smoothstep(width, 0.05, abs(q.x));
        harp *= smoothstep(0.95, 0.22, q.z);
        harp *= smoothstep(-1.0, -0.78, q.z);
        harp *= smoothstep(0.34, 0.54, q.y);
        return harp * 0.94;
      }
      if (uPattern == 6) {
        float a = spots2(q.zy + fbm(q.xy * 3.0) * 0.16, 9.2, 0.145, 0.36);
        float b = spots2(q.xz + fbm(q.zy * 3.0) * 0.16, 9.2, 0.145, 0.36);
        return max(a, b) * (1.0 - belly * 0.72) * 0.82;
      }
      if (uPattern == 7) {
        float f = fbm(q.xz * 4.2 + q.y * 2.4);
        return smoothstep(0.50, 0.58, f) * smoothstep(0.30, 0.55, q.y) * (1.0 - belly * 0.8) * 0.70;
      }
      if (uPattern == 8) {
        float f = fbm(q.zy * 8.5) * 0.65 + fbm(q.xz * 18.0) * 0.35;
        return smoothstep(0.48, 0.56, f) * (1.0 - belly * 0.82) * 0.64;
      }
      if (uPattern == 9) {
        float scar = smoothstep(0.024, 0.0, abs(sin(q.z * 14.0 + q.y * 8.0 + fbm(q.xy * 2.0) * 2.0)));
        return scar * smoothstep(0.38, 0.62, q.y) * (1.0 - belly * 0.85) * 0.42;
      }
      return 0.0;
    }

    /* -------- shading -------- */
    vec3 shadeFur(vec3 p, vec3 n, vec3 rd) {
      vec3 q = rootInv(p);
      vec3 hq = headInv(q);

      float bellyBody = smoothstep(0.06, -0.30, q.y - 0.54) * smoothstep(-0.88, 0.30, q.z);
      float bellyHead = smoothstep(0.05, -0.17, hq.y - 0.69) * smoothstep(0.60, 0.96, hq.z);
      float belly = clamp(max(bellyBody, bellyHead * 0.96), 0.0, 1.0);

      vec3 base = mix(uFur, uBelly, belly);
      float pat = patternMask(q, n, belly);
      float headPatternFade = 1.0 - 0.52 * smoothstep(0.60, 0.97, hq.z) * smoothstep(0.52, 0.80, hq.y);
      pat *= headPatternFade;
      base = mix(base, uAccent, pat * 0.88);

      float faceMask = smoothstep(0.60, 0.97, hq.z) * smoothstep(0.50, 0.82, hq.y);
      base = mix(base, uAccent, uFaceDark * faceMask * 0.62);

      /* plushy, slightly uneven fur color */
      float furNoise = fbm(q.xy * 7.0 + q.z * 3.1);
      base *= 0.965 + 0.07 * furNoise;

      /* rosy cheeks */
      float cheeks = 1.0 - smoothstep(0.055, 0.115, length(vec2(abs(hq.x) - 0.255, (hq.y - 0.725) * 1.42)));
      cheeks *= smoothstep(0.74, 0.97, hq.z) * (1.0 - belly * 0.3);
      float cheekStrength = 0.10 + 0.35 * clamp(uBlushAmt, 0.0, 1.0);
      base = mix(base, vec3(1.0, 0.59, 0.55), cheeks * cheekStrength);

      /* the smile / open mouth / little philtrum */
      float front = smoothstep(1.04, 1.14, hq.z);
      float smileCurve = mix(-1.1, 1.45, clamp(uSmile * 0.5 + 0.5, 0.0, 1.0));
      float smile = smoothstep(0.014, 0.0, abs(hq.y - (0.646 + smileCurve * hq.x * hq.x))) * smoothstep(0.100, 0.025, abs(hq.x));
      float open = (1.0 - smoothstep(0.55, 1.0, length((hq.xy - vec2(0.0, 0.642)) / vec2(0.060, 0.040)))) * smoothstep(0.12, 0.35, uMouth);
      float philtrum = smoothstep(0.005, 0.0, abs(hq.x)) * smoothstep(0.640, 0.655, hq.y) * (1.0 - smoothstep(0.680, 0.695, hq.y));
      float mouth = max(max(smile * 0.95, open), philtrum * 0.52) * front * smoothstep(0.775, 0.675, hq.y);
      base = mix(base, vec3(0.135, 0.055, 0.065), mouth * 0.95);

      float tongue = open * smoothstep(0.642, 0.610, hq.y) * 0.35;
      base = mix(base, vec3(0.88, 0.42, 0.43), tongue);

      /* expressive eyebrows */
      float browVisible = step(0.02, abs(uBrowRaise) + uBrowAngry);
      if (browVisible > 0.5) {
        float browBaseY = 0.925 + uBrowRaise * 0.035;
        for (int s = -1; s <= 1; s += 2) {
          float side = float(s);
          float innerY = browBaseY - uBrowAngry * 0.05;
          float outerY = browBaseY + uBrowAngry * 0.05;
          float d = segDist2(hq.xy, vec2(0.30 * side, outerY), vec2(0.065 * side, innerY));
          float brow = (1.0 - smoothstep(0.013, 0.022, d)) * smoothstep(0.85, 1.0, hq.z);
          base = mix(base, vec3(0.12, 0.08, 0.09), brow * 0.75);
        }
      }

      vec3 key = normalize(vec3(-0.48, 0.82, 0.56));
      vec3 fill = normalize(vec3(0.80, 0.18, 0.48));
      float ndl = clamp(dot(n, key), 0.0, 1.0);
      float ndf = clamp(dot(n, fill), 0.0, 1.0);
      float ao = calcAO(p, n);

      vec3 col = base * (0.38 + 0.80 * ndl + 0.12 * ndf);
      col += base * vec3(0.10, 0.16, 0.15) * (1.0 - n.y) * 0.34;
      col *= mix(0.46, 1.0, ao);

      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 2.7);
      col += vec3(0.58, 0.86, 1.0) * fres * 0.21;

      float spec = pow(max(dot(reflect(rd, n), key), 0.0), 26.0) * 0.055;
      col += vec3(1.0, 0.96, 0.86) * spec;

      return col;
    }

    vec3 shadeEye(vec3 p, vec3 n, vec3 rd) {
      vec3 base = vec3(0.032, 0.028, 0.032);
      float spec = pow(max(dot(reflect(rd, n), normalize(vec3(-0.48, 0.82, 0.56))), 0.0), 80.0);
      base += vec3(1.0, 0.93, 0.82) * spec * 1.15;
      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 2.0);
      base += vec3(0.28, 0.38, 0.42) * fres * 0.34;

      /* Painted catchlights: they live on the eye surface, not as floating beads. */
      vec3 hq = headInv(rootInv(p));
      float side = hq.x < 0.0 ? -1.0 : 1.0;
      vec2 es = vec2(uPointer.x * 0.014, uPointer.y * 0.010) * uFollow;
      vec3 gp1 = vec3(0.152 * side + es.x, 0.884 + es.y, 1.012);
      vec3 gp2 = vec3(0.190 * side + es.x, 0.842 + es.y, 1.018);
      float openHere = uEyeOpen * (side < 0.0 ? mix(1.0, 0.06, uWink) : 1.0);
      float open = smoothstep(0.38, 0.62, openHere);
      float g1 = (1.0 - smoothstep(0.008, 0.016, length(hq - gp1))) * open;
      float g2 = (1.0 - smoothstep(0.003, 0.008, length(hq - gp2))) * open;
      base = mix(base, vec3(1.0, 0.995, 0.94), clamp(g1 + g2 * 0.85, 0.0, 1.0));
      return base;
    }

    vec3 shadeDark(vec3 p, vec3 n, vec3 rd, float faceMask) {
      vec3 hq = headInv(rootInv(p));
      float hoodMask = uHood * smoothstep(0.765, 0.820, hq.y) * smoothstep(1.035, 1.095, hq.z);
      vec3 base = mix(vec3(0.095, 0.085, 0.095), vec3(0.20, 0.10, 0.12), faceMask);
      base = mix(base, vec3(0.48, 0.14, 0.17), hoodMask * (0.20 + 0.50 * uExcite));
      float spec = pow(max(dot(reflect(rd, n), normalize(vec3(-0.48, 0.82, 0.56))), 0.0), 42.0);
      base += vec3(1.0, 0.86, 0.74) * spec * 0.55;
      return base;
    }

    vec3 shadeWhisker(vec3 p, vec3 n) {
      float ndl = clamp(dot(n, normalize(vec3(-0.48, 0.82, 0.56))), 0.0, 1.0);
      return vec3(0.95, 0.985, 1.0) * (0.70 + 0.30 * ndl);
    }

    vec3 shadeIce(vec3 p, vec3 n, vec3 rd, float snow) {
      vec3 base = mix(vec3(0.47, 0.77, 0.82), vec3(0.83, 0.96, 0.97), smoothstep(-0.1, 0.12, p.y));
      float n1 = fbm(p.xz * 5.0);
      float n2 = fbm(p.xy * 9.0 + p.zz * 3.0);
      base = mix(base, vec3(0.86, 0.985, 0.99), snow * 0.82);
      base = mix(base, base * vec3(0.90, 0.96, 1.02), n1 * 0.18);

      float crack = smoothstep(0.017, 0.0, abs(sin(p.x * 8.0 + p.z * 3.2 + n2 * 2.2))) * 0.12;
      base = mix(base, vec3(0.35, 0.65, 0.73), crack * (1.0 - snow * 0.6));

      vec3 key = normalize(vec3(-0.48, 0.82, 0.56));
      float ndl = clamp(dot(n, key), 0.0, 1.0);
      vec3 col = base * (0.72 + 0.32 * ndl);

      float contact = exp(-2.8 * length((p.xz - vec2(0.0, -0.05)) * vec2(1.0, 0.82)));
      col *= 1.0 - 0.24 * contact;

      float sparkle = pow(max(0.0, sin(p.x * 31.0) * sin(p.z * 37.0)), 18.0);
      col += vec3(1.0, 1.0, 0.92) * sparkle * 0.55;

      float fres = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);
      col += vec3(0.80, 0.97, 1.0) * fres * 0.20;
      return col;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
      float aspect = uRes.x / max(1.0, uRes.y);
      float fit = clamp(1.0 + max(0.0, 1.08 - aspect) * 1.40, 1.0, 1.46);
      vec3 target = vec3(0.0, 0.58, 0.0);
      float yaw = -0.56 + uOrbit.x + uPointer.x * 0.030 * uFollow;
      float pitch = 0.16 + uOrbit.y + uPointer.y * 0.015 * uFollow;
      float dist = 3.52 * fit / uZoom;

      vec3 ro = target + dist * vec3(sin(yaw) * cos(pitch), sin(pitch), cos(yaw) * cos(pitch));
      vec3 ww = normalize(target - ro);
      vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0), ww));
      vec3 vv = cross(ww, uu);
      vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.75 * ww);

      vec2 hit = trace(ro, rd);
      if (hit.x < 0.0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return;
      }

      vec3 p = ro + rd * hit.x;
      vec3 n = calcNormal(p);
      vec3 col;

      if (hit.y < 0.5) {
        col = shadeFur(p, n, rd);
      } else if (hit.y < 1.5) {
        col = shadeEye(p, n, rd);
      } else if (hit.y < 2.5) {
        col = shadeDark(p, n, rd, smoothstep(0.78, 1.02, p.z));
      } else if (hit.y < 3.5) {
        col = shadeWhisker(p, n);
      } else if (hit.y < 4.5) {
        col = shadeIce(p, n, rd, 0.0);
      } else if (hit.y < 5.5) {
        col = shadeIce(p, n, rd, 1.0);
      } else {
        col = vec3(1.0, 0.99, 0.94);
      }

      col = pow(clamp(col, 0.0, 1.0), vec3(0.95));
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const glState = {
    gl: null,
    program: null,
    uniforms: {},
    dpr: (() => {
      const coarse = window.innerWidth <= 720 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      return Math.min(window.devicePixelRatio || 1, coarse ? 1.4 : 1.55);
    })(),
    maxDpr: (() => {
      const coarse = window.innerWidth <= 720 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      return Math.min(window.devicePixelRatio || 1, coarse ? 1.4 : 1.55);
    })(),
    started: false,
    raf: 0,
    lastTime: 0,
    frames: 0,
    fpsClock: 0,
    lastQualityCheck: 0,
    width: 0,
    height: 0,
    visible: true
  };

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(`Shader compile failed: ${log}`);
    }
    return shader;
  }

  function finishLoading(delay = 0) {
    window.setTimeout(() => {
      dom.loading.classList.add('is-done');
      window.setTimeout(() => {
        if (!dom.loading) return;
        dom.loading.style.display = 'none';
        if (dom.loading.parentNode) dom.loading.remove();
      }, 650);
    }, delay);
  }

  function fallbackTo2D(message) {
    if (message) console.warn(message);
    dom.fallback.hidden = false;
    dom.canvas.style.display = 'none';
    dom.zeroClipBadge.textContent = t('badge.2d');
    dom.loadingText.textContent = t('fallback.loading');
    finishLoading(500);
  }

  function initGL() {
    const canvas = dom.canvas;
    let gl = null;
    try {
      gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        premultipliedAlpha: false,
        powerPreference: 'high-performance'
      }) || canvas.getContext('experimental-webgl');
    } catch (err) {
      gl = null;
    }
    if (!gl) {
      fallbackTo2D('WebGL unavailable');
      return;
    }

    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`Program link failed: ${gl.getProgramInfoLog(program)}`);
      }
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,
        3, -1,
        -1, 3
      ]), gl.STATIC_DRAW);
      const pos = gl.getAttribLocation(program, 'aPosition');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      const names = [
        'uRes', 'uTime', 'uPointer', 'uOrbit', 'uZoom', 'uPet', 'uExcite',
        'uWave', 'uSpinC', 'uSpinS', 'uBounce', 'uSquash', 'uEyeOpen',
        'uMouth', 'uFollow', 'uFur', 'uBelly', 'uAccent', 'uPattern',
        'uGirth', 'uSnout', 'uEye', 'uWhisker', 'uTrunk', 'uHood',
        'uFaceDark', 'uSmile', 'uBlushAmt', 'uBrowAngry', 'uBrowRaise', 'uWink',
        'uRockC', 'uRockS', 'uBreath', 'uHeadYC', 'uHeadYS', 'uHeadZC', 'uHeadZS',
        'uHeadBob', 'uTailC', 'uTailS', 'uWaveC', 'uWaveS', 'uWaveC2', 'uWaveS2'
      ];
      const uniforms = {};
      names.forEach((name) => {
        uniforms[name] = gl.getUniformLocation(program, name);
      });

      glState.gl = gl;
      glState.program = program;
      glState.uniforms = uniforms;
      glState.started = true;
      resizeGL();
      glState.raf = requestAnimationFrame(renderFrame);
      finishLoading(850);
    } catch (err) {
      console.error(err);
      fallbackTo2D('Unable to initialise the seal shader.');
    }
  }

  function resizeGL() {
    const gl = glState.gl;
    if (!gl) return;
    const w = Math.max(1, dom.stage.clientWidth);
    const h = Math.max(1, dom.stage.clientHeight);
    const nextDpr = Math.max(0.82, Math.min(glState.maxDpr, glState.dpr || glState.maxDpr));
    const pixelW = Math.max(1, Math.round(w * nextDpr));
    const pixelH = Math.max(1, Math.round(h * nextDpr));
    if (glState.width === pixelW && glState.height === pixelH) return;
    glState.width = pixelW;
    glState.height = pixelH;
    dom.canvas.width = pixelW;
    dom.canvas.height = pixelH;
    gl.viewport(0, 0, pixelW, pixelH);
  }

  function setUniform1f(name, value) {
    const gl = glState.gl;
    const loc = glState.uniforms[name];
    if (gl && loc) gl.uniform1f(loc, value);
  }

  function setUniform2f(name, a, b) {
    const gl = glState.gl;
    const loc = glState.uniforms[name];
    if (gl && loc) gl.uniform2f(loc, a, b);
  }

  function setUniform3f(name, v) {
    const gl = glState.gl;
    const loc = glState.uniforms[name];
    if (gl && loc) gl.uniform3f(loc, v[0], v[1], v[2]);
  }

  function setUniform1i(name, value) {
    const gl = glState.gl;
    const loc = glState.uniforms[name];
    if (gl && loc) gl.uniform1i(loc, value);
  }

  function updateMotion(now, dt) {
    const seconds = now * 0.001;

    motion.petPulse *= Math.exp(-dt * 2.1);
    motion.excite *= Math.exp(-dt * 1.5);
    motion.wave *= Math.exp(-dt * 2.0);
    motion.mouth *= Math.exp(-dt * 3.4);
    motion.squash *= Math.exp(-dt * 6.0);

    if (now > motion.nextBlink && now - motion.blinkStart > 320) {
      motion.blinkStart = now;
      motion.nextBlink = now + rand(3200, 6200);
    }
    let blinkOpen = 1;
    const blinkAge = now - motion.blinkStart;
    if (blinkAge < 190) {
      const p = blinkAge / 190;
      blinkOpen = 1 - Math.sin(p * Math.PI) * 0.94;
    }

    let bounce = 0;
    if (motion.bounceStart) {
      const age = (now - motion.bounceStart) / 1000;
      if (age < 0.78) {
        bounce = Math.abs(Math.sin(age / 0.78 * Math.PI * 1.5)) * 0.085 * (1 - age / 0.78);
      } else {
        motion.bounceStart = 0;
      }
    }

    let spinAngle = 0;
    if (motion.danceStart) {
      const age = (now - motion.danceStart) / 1000;
      if (age < 1.35) {
        spinAngle = easeOutCubic(age / 1.35) * Math.PI * 2;
      } else {
        motion.danceStart = 0;
      }
    }

    const pointerEase = 1 - Math.exp(-dt * 7);
    pointerSmooth.x = lerp(pointerSmooth.x, pointerTarget.x, pointerEase);
    pointerSmooth.y = lerp(pointerSmooth.y, pointerTarget.y, pointerEase);
    orbit.x = lerp(orbit.x, orbitTarget.x, 1 - Math.exp(-dt * 10));
    orbit.y = lerp(orbit.y, orbitTarget.y, 1 - Math.exp(-dt * 10));
    zoom = lerp(zoom, zoomTarget, 1 - Math.exp(-dt * 9));

    /* Tween expression floats toward the selected preset. */
    const exprTarget = EXPRESSIONS[state.expression] || EXPRESSIONS.happy;
    const exprEase = 1 - Math.exp(-dt * 6);
    for (const key of Object.keys(exprState)) {
      exprState[key] = lerp(exprState[key], exprTarget[key], exprEase);
    }

    /* Belly pat: a gentle, happy rock back and forth. */
    let rockAngle = 0;
    if (motion.bellyPatStart) {
      const age = (now - motion.bellyPatStart) / 1000;
      if (age < 1.5) {
        rockAngle = Math.sin(age * 9.0) * 0.11 * Math.sin(age / 1.5 * Math.PI);
      } else {
        motion.bellyPatStart = 0;
      }
    }

    const follow = state.follow ? 1 : 0;
    const headYaw = pointerSmooth.x * 0.105 * follow + Math.sin(seconds * 0.58) * 0.015;
    const headTilt = -pointerSmooth.y * 0.055 * follow + Math.sin(seconds * 0.71 + 1.2) * 0.012;
    const headBob = 0.010 * Math.sin(seconds * 1.35) + motion.excite * 0.016 * Math.sin(seconds * 7.4);
    const tailAngle = 0.075 * Math.sin(seconds * 1.55) + motion.excite * 0.20 * Math.sin(seconds * 8.2);
    const waveAngle = 0.24 + motion.wave * 0.92;
    const waveAngle2 = -(0.20 + motion.wave * 0.30);

    const eyeOpen = clamp(
      blinkOpen * (1 - motion.petPulse * 0.94) * (1 - motion.excite * 0.08) * exprState.eyeFactor + exprState.eyesWide,
      0.06, 1.35
    );
    const mouth = clamp(Math.max(motion.mouth, exprState.mouthOpen), 0, 1);
    const breath = 1 + 0.012 * Math.sin(seconds * 1.5);
    const spinC = Math.cos(spinAngle);
    const spinS = Math.sin(spinAngle);
    const rockC = Math.cos(rockAngle);
    const rockS = Math.sin(rockAngle);

    const gl = glState.gl;
    if (!gl) return;
    const u = glState.uniforms;
    gl.uniform2f(u.uRes, glState.width, glState.height);
    gl.uniform1f(u.uTime, seconds);
    gl.uniform2f(u.uPointer, pointerSmooth.x, pointerSmooth.y);
    gl.uniform2f(u.uOrbit, orbit.x, orbit.y);
    gl.uniform1f(u.uZoom, zoom);
    gl.uniform1f(u.uPet, motion.petPulse);
    gl.uniform1f(u.uExcite, motion.excite);
    gl.uniform1f(u.uWave, motion.wave);
    gl.uniform1f(u.uSpinC, spinC);
    gl.uniform1f(u.uSpinS, spinS);
    gl.uniform1f(u.uRockC, rockC);
    gl.uniform1f(u.uRockS, rockS);
    gl.uniform1f(u.uBounce, bounce);
    gl.uniform1f(u.uSquash, motion.squash);
    gl.uniform1f(u.uEyeOpen, eyeOpen);
    gl.uniform1f(u.uMouth, mouth);
    gl.uniform1f(u.uFollow, follow);
    gl.uniform3f(u.uFur, visual.current.fur[0], visual.current.fur[1], visual.current.fur[2]);
    gl.uniform3f(u.uBelly, visual.current.belly[0], visual.current.belly[1], visual.current.belly[2]);
    gl.uniform3f(u.uAccent, visual.current.accent[0], visual.current.accent[1], visual.current.accent[2]);
    gl.uniform1i(u.uPattern, visual.pattern);
    gl.uniform1f(u.uGirth, visual.current.girth);
    gl.uniform1f(u.uSnout, visual.current.snout);
    gl.uniform1f(u.uEye, visual.current.eye);
    gl.uniform1f(u.uWhisker, visual.current.whisker);
    gl.uniform1f(u.uTrunk, visual.current.trunk);
    gl.uniform1f(u.uHood, visual.current.hood);
    gl.uniform1f(u.uFaceDark, visual.current.faceDark);
    gl.uniform1f(u.uSmile, exprState.smile);
    gl.uniform1f(u.uBlushAmt, exprState.blush);
    gl.uniform1f(u.uBrowAngry, exprState.angry);
    gl.uniform1f(u.uBrowRaise, exprState.browRaise);
    gl.uniform1f(u.uWink, exprState.wink);
    gl.uniform1f(u.uBreath, breath);
    gl.uniform1f(u.uHeadYC, Math.cos(headYaw));
    gl.uniform1f(u.uHeadYS, Math.sin(headYaw));
    gl.uniform1f(u.uHeadZC, Math.cos(headTilt));
    gl.uniform1f(u.uHeadZS, Math.sin(headTilt));
    gl.uniform1f(u.uHeadBob, headBob);
    gl.uniform1f(u.uTailC, Math.cos(tailAngle));
    gl.uniform1f(u.uTailS, Math.sin(tailAngle));
    gl.uniform1f(u.uWaveC, Math.cos(waveAngle));
    gl.uniform1f(u.uWaveS, Math.sin(waveAngle));
    gl.uniform1f(u.uWaveC2, Math.cos(waveAngle2));
    gl.uniform1f(u.uWaveS2, Math.sin(waveAngle2));
  }

  function updateVisualTween(dt) {
    const ease = 1 - Math.exp(-dt * 5.2);
    const cur = visual.current;
    const target = visual.target;
    for (const key of ['fur', 'belly', 'accent']) {
      for (let i = 0; i < 3; i += 1) cur[key][i] = lerp(cur[key][i], target[key][i], ease);
    }
    for (const key of ['girth', 'snout', 'eye', 'whisker', 'trunk', 'hood', 'faceDark']) {
      cur[key] = lerp(cur[key], target[key], ease);
    }
  }

  function renderFrame(now) {
    if (!glState.started) return;
    const dt = Math.min(0.06, Math.max(0.001, (now - glState.lastTime) / 1000 || 0.016));
    glState.lastTime = now;

    if (!document.hidden) {
      updateVisualTween(dt);
      updateMotion(now, dt);
      const gl = glState.gl;
      if (gl) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      glState.frames += 1;
      glState.fpsClock += dt;
      if (glState.fpsClock > 2.8 && now - glState.lastQualityCheck > 6000) {
        const fps = glState.frames / glState.fpsClock;
        if (fps < 39 && glState.dpr > 0.82) {
          glState.dpr = Math.max(0.82, glState.dpr - 0.14);
          glState.maxDpr = Math.min(glState.maxDpr, glState.dpr);
          resizeGL();
        } else if (fps > 57 && glState.dpr < Math.min(window.devicePixelRatio || 1, 1.55) - 0.01) {
          glState.dpr = Math.min(Math.min(window.devicePixelRatio || 1, 1.6), glState.dpr + 0.08);
          resizeGL();
        }
        glState.frames = 0;
        glState.fpsClock = 0;
        glState.lastQualityCheck = now;
      }
    }
    glState.raf = requestAnimationFrame(renderFrame);
  }

  /* ---------------------------------------------------------
     13. Input
     --------------------------------------------------------- */
  function setupStageInteraction() {
    const stage = dom.stage;
    let pointerDown = false;
    let moved = false;
    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastY = 0;
    let activePointer = null;

    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      pointerDown = true;
      moved = false;
      activePointer = e.pointerId;
      startX = e.clientX;
      startY = e.clientY;
      lastX = e.clientX;
      lastY = e.clientY;
      dom.canvas.classList.add('dragging');
      if (e.pointerType !== 'touch' && stage.setPointerCapture) {
        try { stage.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
      }
      if (state.sound) audio.ensure();
    });

    stage.addEventListener('pointermove', (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const ny = clamp(-(((e.clientY - rect.top) / rect.height) * 2 - 1), -1, 1);
      pointerTarget.x = nx;
      pointerTarget.y = ny;

      if (!pointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 6) moved = true;
      if (moved && e.pointerType !== 'touch') {
        orbitTarget.x = clamp(orbitTarget.x + dx * 0.0055, -0.62, 0.34);
        orbitTarget.y = clamp(orbitTarget.y + dy * 0.0045, -0.10, 0.26);
      }
    });

    const endPointer = (e) => {
      if (!pointerDown) return;
      pointerDown = false;
      dom.canvas.classList.remove('dragging');
      if (activePointer !== null && stage.releasePointerCapture) {
        try { stage.releasePointerCapture(activePointer); } catch (err) { /* ignore */ }
      }
      activePointer = null;
      if (!moved) {
        petSeal();
      }
    };

    stage.addEventListener('pointerup', endPointer);
    stage.addEventListener('pointercancel', () => {
      pointerDown = false;
      dom.canvas.classList.remove('dragging');
      activePointer = null;
    });

    stage.addEventListener('pointerleave', (e) => {
      if (!pointerDown && e.pointerType === 'mouse') {
        pointerTarget.x = 0;
        pointerTarget.y = 0;
      }
    });

    stage.addEventListener('wheel', (e) => {
      e.preventDefault();
      zoomTarget = clamp(zoomTarget - e.deltaY * 0.0012, 0.82, 1.24);
    }, { passive: false });

    stage.addEventListener('dblclick', (e) => {
      if (e.target.closest('button')) return;
      orbitTarget.x = 0;
      orbitTarget.y = 0;
      zoomTarget = 1;
    });
  }

  /* ---------------------------------------------------------
     14. UI events
     --------------------------------------------------------- */
  function setupUI() {
    dom.speciesGrid.addEventListener('click', (e) => {
      const card = e.target.closest('[data-species]');
      if (!card) return;
      selectSpecies(card.getAttribute('data-species'));
    });

    dom.filterRow.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-filter]');
      if (!chip) return;
      filter = chip.getAttribute('data-filter');
      $$('.filter-chip', dom.filterRow).forEach((el) => {
        el.classList.toggle('active', el === chip);
      });
      audio.play('select');
      renderSpeciesGrid();
    });

    $$('.action-btn[data-action]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        if (action === 'pet') petSeal();
        if (action === 'feed') feedSeal();
        if (action === 'play') playSeal();
        if (action === 'dance') danceSeal();
        if (action === 'belly') bellyPatSeal();
        if (action === 'follow') toggleFollow();
      });
    });

    if (dom.exprRow) {
      dom.exprRow.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-expr]');
        if (!btn) return;
        setExpression(btn.getAttribute('data-expr'));
      });
    }

    if (dom.langSelect) {
      dom.langSelect.addEventListener('change', () => {
        setLanguage(dom.langSelect.value);
      });
    }

    dom.detailCard.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-detail-action]');
      if (!btn) return;
      const action = btn.getAttribute('data-detail-action');
      if (action === 'pet') petSeal();
      if (action === 'random') randomSpecies();
    });

    dom.soundBtn.addEventListener('click', toggleSound);

    dom.desktopBtn.addEventListener('click', enterDesktopMode);
    dom.exitDesktop.addEventListener('click', exitDesktopMode);

    dom.aboutBtn.addEventListener('click', openAbout);
    dom.dialogClose.addEventListener('click', closeAbout);
    dom.aboutDialog.addEventListener('click', (e) => {
      if (e.target === dom.aboutDialog) closeAbout();
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.matches('input, textarea, select, [contenteditable="true"]')) return;
      if (dom.aboutDialog.open && e.key !== 'Escape') return;
      if (e.key !== 'Escape' && e.target.closest('button, a, [role="button"]')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        petSeal();
      } else if (e.key === 'f' || e.key === 'F') {
        feedSeal();
      } else if (e.key === 'p' || e.key === 'P') {
        playSeal();
      } else if (e.key === 'd' || e.key === 'D') {
        danceSeal();
      } else if (e.key === 'b' || e.key === 'B') {
        bellyPatSeal();
      } else if (e.key === 'Escape') {
        if (dom.aboutDialog.open) closeAbout();
        else if (document.body.classList.contains('desktop-mode')) exitDesktopMode();
      }
    });

    window.addEventListener('resize', () => {
      resizeGL();
    });

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => resizeGL());
      ro.observe(dom.stage);
    }

    window.addEventListener('visibilitychange', () => {
      glState.lastTime = performance.now();
    });

    document.addEventListener('pointerdown', () => {
      if (state.sound) audio.ensure();
    }, { once: true });

    window.setInterval(() => {
      if (document.hidden) return;
      state.stats.mood = clamp(state.stats.mood - 1, 20, 100);
      state.stats.full = clamp(state.stats.full - 1, 15, 100);
      state.stats.energy = clamp(state.stats.energy - 0.5, 15, 100);
      updateVitals();
      saveState();
    }, 45000);
  }

  function closeAbout() {
    if (typeof dom.aboutDialog.close === 'function') {
      dom.aboutDialog.close();
    } else {
      dom.aboutDialog.removeAttribute('open');
    }
  }

  function openAbout() {
    audio.play('select');
    if (typeof dom.aboutDialog.showModal === 'function') {
      if (!dom.aboutDialog.open) dom.aboutDialog.showModal();
    } else {
      dom.aboutDialog.setAttribute('open', '');
    }
  }

  function enterDesktopMode() {
    document.body.classList.add('desktop-mode');
    dom.exitDesktop.hidden = false;
    audio.play('select');
    say(lines('desktop')[0], 4200);
    window.setTimeout(() => {
      resizeGL();
      if (dom.stage.requestFullscreen) {
        /* Do not force fullscreen; the in-page mode is intentionally non-intrusive. */
      }
    }, 80);
    showToast(t('toast.desktop'), 3000);
  }

  function exitDesktopMode() {
    document.body.classList.remove('desktop-mode');
    dom.exitDesktop.hidden = true;
    window.setTimeout(resizeGL, 80);
    audio.play('select');
  }

  /* ---------------------------------------------------------
     15. Boot
     --------------------------------------------------------- */
  function boot() {
    const sp = currentSpecies();
    applySpeciesVisual(sp, true);
    buildStageDecor();
    applyI18n();
    renderLangOptions();
    renderExpressions();
    syncExpressionUI();
    if (window.innerWidth <= 720 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      dom.stageHint.textContent = t('hint.mobile');
    } else {
      dom.stageHint.textContent = t('hint.desktop');
    }
    renderAll();
    setupUI();
    setupStageInteraction();
    initGL();

    window.setTimeout(() => {
      if (state.collected.length === SPECIES.length) {
        say(lines('all20')[0], 5000);
      } else {
        say(lines('hello')[0], 5000);
      }
    }, 1600);

    window.setTimeout(() => {
      if (!dom.speech.classList.contains('hidden')) dom.speech.classList.add('hidden');
    }, 7800);
  }

  boot();
})();



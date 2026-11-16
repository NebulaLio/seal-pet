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
      id: 'harbor-seal',
      zh: '港海豹',
      en: 'Harbor seal',
      scientific: 'Phoca vitulina',
      region: '北半球溫帶沿海',
      habitat: 'temperate',
      length: '1.4–1.9 m',
      weight: '60–170 kg',
      iucn: 'LC',
      blurb: '愛在港灣和河口曬太陽，臉上細細的斑點像撒了胡椒。',
      fact: '牠是分布最廣的海豹之一，卻很怕吵，常把頭探出水面張望。',
      pattern: 'fine-spots',
      bodyHex: '#9A968B',
      bellyHex: '#D3CFC3',
      accentHex: '#59544A',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'spotted-seal',
      zh: '斑海豹',
      en: 'Spotted seal',
      scientific: 'Phoca largha',
      region: '西北太平洋',
      habitat: 'arctic',
      length: '1.4–1.8 m',
      weight: '65–120 kg',
      iucn: 'LC',
      blurb: '圓臉上灑滿深色小斑點，是西太平洋浮冰上的小可愛。',
      fact: '牠們常在浮冰上集體休息，遇到危險就噗通一聲全體下水。',
      pattern: 'spots',
      bodyHex: '#A8A599',
      bellyHex: '#D9D6CB',
      accentHex: '#47443B',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'ringed-seal',
      zh: '環斑海豹',
      en: 'Ringed seal',
      scientific: 'Pusa hispida',
      region: '北極與北冰洋',
      habitat: 'arctic',
      length: '1.1–1.6 m',
      weight: '50–100 kg',
      iucn: 'LC',
      blurb: '身上一圈圈斑紋像小甜甜圈，是北極熊最愛追的鄰居。',
      fact: '牠會用前爪在雪堆挖出雪屋育幼，寶寶躲在裡面躲過北極熊。',
      pattern: 'rings',
      bodyHex: '#A4A8AA',
      bellyHex: '#D8DBDD',
      accentHex: '#3B4044',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'saimaa-ringed-seal',
      zh: '塞馬環斑海豹',
      en: 'Saimaa ringed seal',
      scientific: 'Pusa saimensis',
      region: '芬蘭塞馬湖',
      habitat: 'temperate',
      length: '1.3–1.45 m',
      weight: '50–90 kg',
      iucn: 'EN',
      blurb: '住在芬蘭塞馬湖的淡水海豹，是全世界最稀有的海豹之一。',
      fact: '二○二五年被正式承認為獨立物種，不再只是環斑海豹的亞種。',
      pattern: 'rings',
      bodyHex: '#6E7275',
      bellyHex: '#AAAEB0',
      accentHex: '#393D40',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'baikal-seal',
      zh: '貝加爾海豹',
      en: 'Baikal seal',
      scientific: 'Pusa sibirica',
      region: '俄羅斯貝加爾湖',
      habitat: 'temperate',
      length: '1.2–1.4 m',
      weight: '60–120 kg',
      iucn: 'LC',
      blurb: '圓滾滾的貝加爾海豹只住在貝加爾湖，是稀有的淡水海豹。',
      fact: '祖先可能在冰期沿葉尼塞河從北冰洋進入貝加爾湖，從此定居。',
      pattern: 'plain',
      bodyHex: '#6A6D6F',
      bellyHex: '#B4B7B9',
      accentHex: '#3D4043',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'caspian-seal',
      zh: '裏海海豹',
      en: 'Caspian seal',
      scientific: 'Pusa caspica',
      region: '裏海',
      habitat: 'temperate',
      length: '1.2–1.5 m',
      weight: '50–90 kg',
      iucn: 'EN',
      blurb: '只在裏海生活的迷你海豹，圓眼睛配小斑點，模樣討喜。',
      fact: '牠是唯一住在裏海的海豹，冬天在冰上聚集生產。',
      pattern: 'spots',
      bodyHex: '#9CA2A5',
      bellyHex: '#D0D5D7',
      accentHex: '#4C5255',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'ribbon-seal',
      zh: '帶紋海豹',
      en: 'Ribbon seal',
      scientific: 'Histriophoca fasciata',
      region: '北太平洋亞北極海域',
      habitat: 'arctic',
      length: '1.5–1.8 m',
      weight: '70–110 kg',
      iucn: 'LC',
      blurb: '身上繞著奶油色緞帶條紋，像穿了件精心包裝的禮物。',
      fact: '喉部有發聲氣囊，能在水下鳴唱，科學家靠錄音認識牠們。',
      pattern: 'ribbons',
      bodyHex: '#453D36',
      bellyHex: '#C8BEA9',
      accentHex: '#E9E0C9',
      bodyShape: 'slender',
      extinct: false
    },
    {
      id: 'harp-seal',
      zh: '豎琴海豹',
      en: 'Harp seal',
      scientific: 'Pagophilus groenlandicus',
      region: '北大西洋與北冰洋',
      habitat: 'arctic',
      length: '1.5–1.9 m',
      weight: '100–180 kg',
      iucn: 'NT',
      blurb: '背上的黑色斑紋像一把豎琴，白色小海豹是冰原最可愛的風景。',
      fact: '幼崽出生時披著雪白絨毛，約三到四週後才換成成體斑紋。',
      pattern: 'harp',
      bodyHex: '#B9BEC2',
      bellyHex: '#E5E8EA',
      accentHex: '#282D32',
      bodyShape: 'slender',
      extinct: false
    },
    {
      id: 'hooded-seal',
      zh: '冠海豹',
      en: 'Hooded seal',
      scientific: 'Cystophora cristata',
      region: '北大西洋與北極',
      habitat: 'arctic',
      length: '2.0–3.0 m',
      weight: '150–400 kg',
      iucn: 'EN',
      blurb: '公海豹鼻上頂著可充氣的黑色大氣球，像戴了頂神氣的帽子。',
      fact: '雄性鼻囊可充氣鼓起成黑色頭冠，用來吸引雌性、嚇退情敵。',
      pattern: 'mottled',
      bodyHex: '#A9B2B8',
      bellyHex: '#DCE1E4',
      accentHex: '#232A31',
      bodyShape: 'robust',
      extinct: false
    },
    {
      id: 'bearded-seal',
      zh: '髯海豹',
      en: 'Bearded seal',
      scientific: 'Erignathus barbatus',
      region: '北極與亞北極海域',
      habitat: 'arctic',
      length: '2.0–2.5 m',
      weight: '200–400 kg',
      iucn: 'NT',
      blurb: '嘴邊長滿濃密白鬍鬚，像位慈祥老爺爺，用鬍鬚在海底摸索美食。',
      fact: '牠的觸鬚極為靈敏，能感應泥沙裡藏著的獵物。',
      pattern: 'plain',
      bodyHex: '#8B8478',
      bellyHex: '#BDB6A8',
      accentHex: '#565044',
      bodyShape: 'robust',
      extinct: false
    },
    {
      id: 'grey-seal',
      zh: '灰海豹',
      en: 'Grey seal',
      scientific: 'Halichoerus grypus',
      region: '北大西洋溫帶海域',
      habitat: 'temperate',
      length: '1.8–2.6 m',
      weight: '150–350 kg',
      iucn: 'LC',
      blurb: '有張長長的羅馬鼻，公海豹體型比母海豹大上一圈。',
      fact: '牠的學名在希臘文裡是「鉤鼻海豬」的意思，說的就是那張長鼻子。',
      pattern: 'blotches',
      bodyHex: '#9BA1A4',
      bellyHex: '#CBCFD1',
      accentHex: '#454C52',
      bodyShape: 'long-snout',
      extinct: false
    },
    {
      id: 'mediterranean-monk-seal',
      zh: '地中海僧海豹',
      en: 'Mediterranean monk seal',
      scientific: 'Monachus monachus',
      region: '地中海與東大西洋',
      habitat: 'temperate',
      length: '2.0–2.5 m',
      weight: '200–300 kg',
      iucn: 'EN',
      blurb: '全身深褐、頭圓圓像小和尚，是地中海裡最稀有的海豹。',
      fact: '喜歡躲在海蝕洞裡休息育幼，是極度稀有的海豹。',
      pattern: 'plain',
      bodyHex: '#4A4238',
      bellyHex: '#6F6659',
      accentHex: '#2C2621',
      bodyShape: 'robust',
      extinct: false
    },
    {
      id: 'hawaiian-monk-seal',
      zh: '夏威夷僧海豹',
      en: 'Hawaiian monk seal',
      scientific: 'Neomonachus schauinslandi',
      region: '夏威夷群島',
      habitat: 'tropical',
      length: '2.1–2.4 m',
      weight: '150–270 kg',
      iucn: 'VU',
      blurb: '圓滾滾地在熱帶沙灘上打盹，是夏威夷群島的珍寶。',
      fact: '牠是現存唯一整年住在熱帶海域的僧海豹，數量約一千六百隻。',
      pattern: 'plain',
      bodyHex: '#8D8678',
      bellyHex: '#C3BCAD',
      accentHex: '#585146',
      bodyShape: 'compact',
      extinct: false
    },
    {
      id: 'caribbean-monk-seal',
      zh: '加勒比僧海豹',
      en: 'Caribbean monk seal',
      scientific: 'Neomonachus tropicalis',
      region: '加勒比海與墨西哥灣',
      habitat: 'tropical',
      length: '2.0–2.4 m',
      weight: '170–270 kg',
      iucn: 'EX',
      blurb: '曾在加勒比海悠游的僧海豹，最後一次現身是一九五二年。',
      fact: '如今只剩博物館標本，牠的消失提醒我們保育的重要。',
      pattern: 'plain',
      bodyHex: '#7A6E5D',
      bellyHex: '#AFA38E',
      accentHex: '#4C4336',
      bodyShape: 'compact',
      extinct: true
    },
    {
      id: 'northern-elephant-seal',
      zh: '北象海豹',
      en: 'Northern elephant seal',
      scientific: 'Mirounga angustirostris',
      region: '東北太平洋',
      habitat: 'temperate',
      length: '2.5–5.0 m',
      weight: '400–2300 kg',
      iucn: 'LC',
      blurb: '公海豹鼻子能鼓成象鼻，體重可達兩公噸，是海灘上的巨無霸。',
      fact: '公象海豹會抬頭吼叫、互相衝撞爭地盤，聲音低沉如引擎。',
      pattern: 'plain',
      bodyHex: '#7B6B59',
      bellyHex: '#A9977F',
      accentHex: '#4C4033',
      bodyShape: 'huge',
      extinct: false
    },
    {
      id: 'southern-elephant-seal',
      zh: '南象海豹',
      en: 'Southern elephant seal',
      scientific: 'Mirounga leonina',
      region: '亞南極與南極海域',
      habitat: 'antarctic',
      length: '2.5–5.8 m',
      weight: '400–3700 kg',
      iucn: 'LC',
      blurb: '地球最大的海豹，公海豹的象鼻與龐大身軀像一座會呼吸的小山。',
      fact: '能潛到一千五百公尺深，閉氣近兩小時，是潛水冠軍。',
      pattern: 'plain',
      bodyHex: '#6A5D4F',
      bellyHex: '#9B8C79',
      accentHex: '#42382E',
      bodyShape: 'huge',
      extinct: false
    },
    {
      id: 'leopard-seal',
      zh: '豹海豹',
      en: 'Leopard seal',
      scientific: 'Hydrurga leptonyx',
      region: '南極與亞南極海域',
      habitat: 'antarctic',
      length: '2.4–3.6 m',
      weight: '300–500 kg',
      iucn: 'LC',
      blurb: '披著豹紋斑點、拖著長長身子，是南極冰原上優雅又霸氣的獵手。',
      fact: '臼齒有三個尖，能濾食磷蝦，也能咬碎企鵝，食性十分多樣。',
      pattern: 'leopard',
      bodyHex: '#C7CCD1',
      bellyHex: '#E7EAEC',
      accentHex: '#363B41',
      bodyShape: 'slender',
      extinct: false
    },
    {
      id: 'weddell-seal',
      zh: '威德爾海豹',
      en: 'Weddell seal',
      scientific: 'Leptonychotes weddellii',
      region: '南極沿岸',
      habitat: 'antarctic',
      length: '2.5–3.5 m',
      weight: '400–600 kg',
      iucn: 'LC',
      blurb: '圓滾滾的威德爾海豹在南極冰下唱歌，歌聲可以傳得很遠。',
      fact: '牠用牙齒在冰上磨出呼吸孔，還會發出哨聲與顫音般的歌聲。',
      pattern: 'mottled',
      bodyHex: '#5F6764',
      bellyHex: '#B8BEBB',
      accentHex: '#878F8C',
      bodyShape: 'robust',
      extinct: false
    },
    {
      id: 'crabeater-seal',
      zh: '食蟹海豹',
      en: 'Crabeater seal',
      scientific: 'Lobodon carcinophaga',
      region: '南極浮冰區',
      habitat: 'antarctic',
      length: '2.2–2.6 m',
      weight: '200–300 kg',
      iucn: 'LC',
      blurb: '名字裡有蟹，其實最愛吃磷蝦，是南極數量最多的海豹。',
      fact: '後齒像梳子般交錯，能把一口海水濾成一頓磷蝦大餐。',
      pattern: 'scars',
      bodyHex: '#B7B1A4',
      bellyHex: '#E3DED3',
      accentHex: '#746C5E',
      bodyShape: 'slender',
      extinct: false
    },
    {
      id: 'ross-seal',
      zh: '羅斯海豹',
      en: 'Ross seal',
      scientific: 'Ommatophoca rossii',
      region: '南極厚冰區',
      habitat: 'antarctic',
      length: '1.7–2.1 m',
      weight: '130–200 kg',
      iucn: 'LC',
      blurb: '有一雙水汪汪大眼和能唱歌的喉嚨，是最神祕的南極海豹。',
      fact: '叫聲像鳥鳴或電子音，科學家靠聲音在冰原上尋找牠。',
      pattern: 'plain',
      bodyHex: '#5B5651',
      bellyHex: '#D9D4CA',
      accentHex: '#8C867D',
      bodyShape: 'big-eyes',
      extinct: false
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
    LC: { label: '無危', color: '#58a98f' },
    NT: { label: '近危', color: '#c79a35' },
    VU: { label: '易危', color: '#dd8a3c' },
    EN: { label: '瀕危', color: '#dd6553' },
    CR: { label: '極危', color: '#a93d4a' },
    EX: { label: '已滅絕', color: '#858b88' }
  };
  const ZONES = {
    arctic: '北極',
    antarctic: '南極',
    temperate: '溫帶',
    tropical: '熱帶'
  };

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
    return sp ? sp.zh : '';
  }

  /* ---------------------------------------------------------
     3. State
     --------------------------------------------------------- */
  const STORAGE_KEY = 'sealo.pet.v1';
  const DEFAULT_STATE = {
    speciesId: 'harbor-seal',
    sound: true,
    follow: true,
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
    blinkStart: 0,
    nextBlink: performance.now() + 4200,
    lastPet: 0,
    lastFeed: 0,
    lastPlay: 0,
    lastDance: 0,
    spinAngle: 0
  };

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
      return `<button class="species-card${active ? ' active' : ''}${sp.extinct ? ' is-extinct' : ''}"
        type="button" data-species="${sp.id}" title="${sp.zh} · ${sp.en}"
        aria-pressed="${active}">
        <span class="seal-mini">${miniSealMarkup(sp)}</span>
        <span class="card-text">
          <b>${sp.zh}${found ? ' <span class="found-tick" aria-label="已遇見">✓</span>' : ''}</b>
          <small>${sp.scientific}</small>
        </span>
        <span class="status-dot" style="--status:${st.color}" title="${sp.iucn} ${st.label}"></span>
      </button>`;
    }).join('');

    if (!items.length) {
      dom.speciesGrid.innerHTML = '<p class="empty-dex">這個棲地暫時沒有海豹，換個篩選看看吧。</p>';
    }
  }

  function renderDetail() {
    const sp = currentSpecies();
    const st = statusInfo(sp.iucn);
    const label = sp.extinct ? '紀念牠' : `摸摸 ${sp.zh}`;
    dom.detailCard.classList.toggle('is-extinct', Boolean(sp.extinct));
    dom.detailCard.innerHTML = `
      <div class="detail-top">
        <span class="detail-seal">${miniSealMarkup(sp)}</span>
        <div class="detail-titles">
          <h2>${sp.zh}<span class="iucn-pill" style="--status:${st.color}" title="IUCN：${sp.iucn} ${st.label}">${sp.iucn}</span></h2>
          <span class="latin">${sp.scientific}</span>
          <span class="en">${sp.en} · ${ZONES[sp.habitat] || ''}${sp.extinct ? ' · 已滅絕' : ''}</span>
        </div>
      </div>
      <p class="detail-blurb">${sp.blurb}</p>
      <div class="detail-stats">
        <div class="detail-stat"><span>分佈</span><b title="${sp.region}">${sp.region}</b></div>
        <div class="detail-stat"><span>體長</span><b>${sp.length}</b></div>
        <div class="detail-stat"><span>體重</span><b>${sp.weight}</b></div>
      </div>
      <p class="detail-fact"><b>SEAL FACT</b><br>${sp.fact}</p>
      <div class="detail-actions">
        <button class="detail-btn" type="button" data-detail-action="pet">${label}</button>
        <button class="detail-btn light" type="button" data-detail-action="random">隨機海豹</button>
        ${sp.extinct ? '<span class="extinct-note">已滅絕 · 只餘標本</span>' : ''}
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

  function updateNameplate() {
    const sp = currentSpecies();
    dom.petSpecies.textContent = sp.zh;
    dom.petName.textContent = sp.extinct ? '麻糬 · 懷念' : '麻糬';
    dom.zeroClipBadge.textContent = sp.extinct ? '記憶中的樣子' : '零穿模';
  }

  function updateProgress() {
    const found = state.collected.length;
    dom.foundCount.textContent = String(found);
    dom.foundCount.parentElement.title = found === SPECIES.length
      ? '全部 20 種都遇見了！'
      : `已遇見 ${found} / ${SPECIES.length} 種`;
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
    dom.soundBtn.setAttribute('aria-label', `切換音效（目前${state.sound ? '開啟' : '關閉'}）`);
    dom.soundLabel.textContent = state.sound ? '音效開' : '音效關';
    audio.enabled = state.sound;
  }

  function syncFollowUI() {
    dom.followBtn.classList.toggle('is-active', state.follow);
    dom.followBtn.setAttribute('aria-pressed', String(state.follow));
    dom.followBtn.setAttribute('aria-label', `跟隨手指（目前${state.follow ? '開啟' : '關閉'}）`);
    dom.followState.textContent = state.follow ? '已開啟' : '已關閉';
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

  const PET_LINES = [
    '咕嚕咕嚕～再多摸一下。',
    '舒服到眼睛都瞇起來了。',
    '今天的麻糬，是幸福口味。',
    '再摸下去會變成海豹麻糬喔。',
    '你的手好溫暖，像曬過太陽的冰。',
    '啵！收到一個摸摸補給。'
  ];
  const FEED_LINES = [
    '是小魚！啊——',
    '一口吞！飽足感 +100。',
    '這條魚有海的味道。',
    '謝謝招待，尾巴都開心了。',
    '再來一條也不是不行。'
  ];
  const PLAY_LINES = [
    '雪球！接住——',
    '嘿咻！這是我的滑冰時間。',
    '冰冰的，好好玩。',
    '再丟一顆，我還要！',
    '看我的海豹式翻滚。'
  ];
  const DANCE_LINES = [
    '轉～圈～圈～',
    '海豹圓舞曲，預備——起！',
    '一圈、兩圈，頭有點暈。',
    '掌聲在哪裡？'
  ];
  const SWITCH_LINES = [
    '嗨！我現在是{name}。',
    '換裝完成，{name}限定版麻糬。',
    '你看，我的{name}花紋好看嗎？',
    '從冰原來的{name}，向你報到。'
  ];

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
    if (!state.collected.includes(id)) {
      state.collected.push(id);
      showToast(`遇見新朋友：${sp.zh}！`, 2600);
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
      const line = pick(SWITCH_LINES).replace('{name}', sp.zh);
      say(line);
      if (state.collected.length === SPECIES.length) {
        window.setTimeout(() => showToast('全部 20 種海豹都遇見了！你得到一枚海豹博士徽章 🏅', 4200), 500);
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
    addStat('mood', 7, '心情');
    addStat('energy', 2, '活力', false);
    say(pick(PET_LINES));
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
    addStat('mood', 8, '心情');
    addStat('energy', 3, '活力', false);
    say(pick(DANCE_LINES));
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
    say(state.follow ? '我會跟著你的手指看喔。' : '好，我先專心當一顆海豹麻糬。');
  }

  function toggleSound() {
    state.sound = !state.sound;
    syncSoundUI();
    saveState();
    audio.setEnabled(state.sound);
    if (state.sound) {
      say('音效回來啦，啵！');
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
    addStat('full', 16, '飽足');
    addStat('mood', 3, '心情', false);
    say(pick(FEED_LINES));
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
    addStat('energy', 6, '活力');
    addStat('mood', 5, '心情', false);
    say(pick(PLAY_LINES));
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

      /* nose + optional elephant trunk + hood */
      vec3 noseP = hq - vec3(0.0, 0.724, 1.145);
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
      vec3 eyeRad = vec3(0.073 * uEye, 0.079 * uEye * max(0.06, uEyeOpen), 0.058 * uEye);
      vec3 eyeL = hq - vec3(-0.170 + eyeShift.x, 0.855 + eyeShift.y, 0.955);
      vec3 eyeR = hq - vec3(0.170 + eyeShift.x, 0.855 + eyeShift.y, 0.955);
      float dEye = min(sdEllipsoid(eyeL, eyeRad), sdEllipsoid(eyeR, eyeRad));
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
      base = mix(base, vec3(1.0, 0.59, 0.55), cheeks * 0.19);

      /* the smile / open mouth / little philtrum */
      float front = smoothstep(1.04, 1.14, hq.z);
      float smile = smoothstep(0.014, 0.0, abs(hq.y - (0.646 + 1.45 * hq.x * hq.x))) * smoothstep(0.100, 0.025, abs(hq.x));
      float open = (1.0 - smoothstep(0.55, 1.0, length((hq.xy - vec2(0.0, 0.642)) / vec2(0.060, 0.040)))) * smoothstep(0.12, 0.35, uMouth);
      float philtrum = smoothstep(0.005, 0.0, abs(hq.x)) * smoothstep(0.640, 0.655, hq.y) * (1.0 - smoothstep(0.680, 0.695, hq.y));
      float mouth = max(max(smile * 0.95, open), philtrum * 0.52) * front * smoothstep(0.775, 0.675, hq.y);
      base = mix(base, vec3(0.135, 0.055, 0.065), mouth * 0.95);

      float tongue = open * smoothstep(0.642, 0.610, hq.y) * 0.35;
      base = mix(base, vec3(0.88, 0.42, 0.43), tongue);

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
      float open = smoothstep(0.38, 0.62, uEyeOpen);
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
    dom.zeroClipBadge.textContent = '2D 模式';
    dom.loadingText.textContent = '3D 海豹睡著了，先請 2D 海豹出場。';
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
        'uFaceDark', 'uBreath', 'uHeadYC', 'uHeadYS', 'uHeadZC', 'uHeadZS',
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

    const follow = state.follow ? 1 : 0;
    const headYaw = pointerSmooth.x * 0.105 * follow + Math.sin(seconds * 0.58) * 0.015;
    const headTilt = -pointerSmooth.y * 0.055 * follow + Math.sin(seconds * 0.71 + 1.2) * 0.012;
    const headBob = 0.010 * Math.sin(seconds * 1.35) + motion.excite * 0.016 * Math.sin(seconds * 7.4);
    const tailAngle = 0.075 * Math.sin(seconds * 1.55) + motion.excite * 0.20 * Math.sin(seconds * 8.2);
    const waveAngle = 0.24 + motion.wave * 0.92;
    const waveAngle2 = -(0.20 + motion.wave * 0.30);

    const eyeOpen = clamp(blinkOpen * (1 - motion.petPulse * 0.94) * (1 - motion.excite * 0.08), 0.06, 1);
    const breath = 1 + 0.012 * Math.sin(seconds * 1.5);
    const spinC = Math.cos(spinAngle);
    const spinS = Math.sin(spinAngle);

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
    gl.uniform1f(u.uBounce, bounce);
    gl.uniform1f(u.uSquash, motion.squash);
    gl.uniform1f(u.uEyeOpen, eyeOpen);
    gl.uniform1f(u.uMouth, clamp(motion.mouth, 0, 1));
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
        if (action === 'follow') toggleFollow();
      });
    });

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
    say('桌寵模式啟動！我會在這裡陪你。', 4200);
    window.setTimeout(() => {
      resizeGL();
      if (dom.stage.requestFullscreen) {
        /* Do not force fullscreen; the in-page mode is intentionally non-intrusive. */
      }
    }, 80);
    showToast('按 Esc 或右上角按鈕離開桌寵模式', 3000);
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
    if (window.innerWidth <= 720 || (window.matchMedia && window.matchMedia('(pointer: coarse)').matches)) {
      dom.stageHint.textContent = '點一下摸摸 · 上下滑動看圖鑑';
    }
    renderAll();
    setupUI();
    setupStageInteraction();
    initGL();

    window.setTimeout(() => {
      if (state.collected.length === SPECIES.length) {
        say('今天有 20 種海豹來拜訪，冰塊快擠不下啦。', 5000);
      } else {
        say('嗨！我是麻糬。今天想被摸幾下？', 5000);
      }
    }, 1600);

    window.setTimeout(() => {
      if (!dom.speech.classList.contains('hidden')) dom.speech.classList.add('hidden');
    }, 7800);
  }

  boot();
})();



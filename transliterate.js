function hide() {
  document.getElementById("tooltip1").classList.remove("block");
  document.getElementById("tooltip2").classList.remove("block");
}
function show1() {
  document.getElementById("tooltip1").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}
function show2() {
  document.getElementById("tooltip2").classList.add("block");
  var self = this;
  setTimeout(function () {
    self.hide();
  }, 3000);
}

function swapTransliteration() {
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2devanagari") {
    localStorage.setItem("direction", "devanagari2latin");
    document.getElementById("textarea1").readOnly = true;
    document.getElementById('textarea2').removeAttribute('readonly');
    document.getElementById("textarea2").focus();
    document.getElementById("Devanagari").classList.add("currentTab");
    document.getElementById("Latin").classList.remove("currentTab");
  } else if (localStorage.getItem("direction") == "devanagari2latin") {
    localStorage.setItem("direction", "latin2devanagari");
    document.getElementById('textarea1').removeAttribute('readonly');
    document.getElementById("textarea2").readOnly = true;
    if (localStorage.getItem("encoding") == "Latin")
      document.getElementById("textarea1").focus();
    document.getElementById("Devanagari").classList.remove("currentTab");
    document.getElementById("Latin").classList.add("currentTab");
  }
}

function clearFooter() {
  document.getElementsByClassName("footerOfPage")[0].style = "display:none";
}

function copyContent1() {
  navigator.clipboard.writeText(document.getElementById("textarea1").value);
}

function copyContent2() {
  navigator.clipboard.writeText(document.getElementById("textarea2").value);
}

function transliterate() {
  if (document.getElementById("textarea1").value.indexOf("script>") > -1 || document.getElementById("textarea2").value.indexOf("script>") > -1) {
    document.getElementById("textarea1").value = "";
    document.getElementById("textarea2").value = "";
    document.getElementById("textarea1").innerHTML = "";
    document.getElementById("textarea2").innerHTML = "";
  }

  // DEFECT ḷ represents : ळ् (ISO 15919) and ऌ / ॢ (IAST)
  // DEFECT Brāhmi - ब्राह्मि

  /*  
    Transliteration for Sanskrit (ISO 15919 : IAST) : https://en.wikipedia.org/wiki/ISO_15919
    Alternative : https://en.wikipedia.org/wiki/Devanagari_transliteration
    Devanagari Unicode Block : https://www.unicode.org/charts/PDF/U0900.pdf
    Devanagari Extended Unicode Block : https://www.unicode.org/charts/PDF/UA8E0.pdf
    Devanagari Extended-A Unicode Block : https://www.unicode.org/charts/PDF/U11B00.pdf
    Vedic Extensions Unicode Block : https://www.unicode.org/charts/PDF/U1CD0.pdf  
    Devanagari : https://en.wikipedia.org/wiki/Devanagari
  */

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2devanagari") {
    const latinToDevanagari = { "0": "०", "1": "१", "2": "२", "3": "३", "4": "४", "5": "५", "6": "६", "7": "७", "8": "८", "9": "९", " ": "  ", ".": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "₹": "₹", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "a": "अ", "ā": "आ", "ê": "ॲ", "ô": "ऑ", "i": "इ", "ī": "ई", "u": "उ", "ū": "ऊ", "r̥": "ऋ", "r̥̄": "ॠ", "l̥": "ऌ", "l̥̄": "ॡ", "ê": "ऍ", "e": "ऎ", "ē": "ए", "ai": "ऐ", "o": "ऒ", "ō": "ओ", "au": "औ", "aṁ": "अं", "aḥ": "अः", "ka": "क", "kha": "ख", "ga": "ग", "gha": "ध", "ṅa": "ङ", "ca": "च", "cha": "छ", "ja": "ज", "jha": "झ", "ña": "ञ", "ṭa": "ट", "ṭha": "ठ", "ḍa": "ड", "ḍha": "ढ", "ṇa": "ण", "ta": "त", "tha": "थ", "da": "द", "dha": "ध", "na": "न", "pa": "प", "pha": "फ", "ba": "ब", "bha": "भ", "ma": "म", "ya": "य", "ra": "र", "la": "ल", "va": "व", "śa": "श", "ṣa": "ष", "sa": "स", "ha": "ह", "ḷa": "ळ", "qa": "क़", "k͟ha": "ख़", "ġa": "ग़", "za": "ज़", "ža": "झ़", "ṛh":"ड़", "ṛha": "ढ़", "t̤a": "त़", "s̱a": "थ़", "fa": "फ़", "s̤a": "स़", "h̤a": "ह़", "A": "अ", "Ā": "आ", "Ê": "ॲ", "Ô": "ऑ", "I": "इ", "Ī": "ई", "U": "उ", "Ū": "ऊ", "R̥": "ऋ", "Ṝ": "ॠ", "L̥": "ऌ", "L̥̄": "ॡ", "Ê": "ऍ", "E": "ऎ", "Ē": "ए", "Ai": "ऐ", "O": "ऒ", "Ō": "ओ", "Au": "औ", "Aṁ": "अं", "Aḥ": "अः", "Ka": "क", "Kha": "ख", "Ga": "ग", "Gha": "घ", "Ṅa": "ङ", "Ca": "च", "Cha": "छ", "Ja": "ज", "Jha": "झ", "Ña": "ञ", "Ṭa": "ट", "Ṭha": "ठ", "Ḍa": "ड", "Ḍha": "ढ", "Ṇa": "ण", "Ta": "त", "Tha": "थ", "Da": "द", "Dha": "ध", "Na": "न", "Pa": "प", "Pha": "फ", "Ba": "ब", "Bha": "भ", "Ma": "म", "Ya": "य", "Ra": "र", "La": "ल", "Va": "व", "Śa": "श", "Ṣa": "ष", "Sa": "स", "Ha": "ह", "Ḷa": "ळ", "Qa": "क़", "Ḵha": "ख़", "Ġa": "ग़", "Za": "ज़",  "Ža": "झ़", "Ṛh":"ड़", "Ṛha": "ढ़", "T̤a": "त़", "S̱a": "थ़", "fa": "फ़", "S̤a": "स़", "H̤a": "ह़", "ōm̐":"ॐ", "Ōm̐":"ॐ" };

    const diacritics = { "ā": "ा", "ê": "ॅ", "ô": "ॉ", "i": "ि", "ī": "ी", "u": "ु", "ū": "ू", "r̥": "ृ", "r̥̄": "ॄ", "l̥": "ॢ", "l̥̄": "ೣ", "e": "ॆ", "ē": "े", "ai": "ै", "o": "ॊ", "ō": "ो", "au": "ौ", "aṇ": "ं", "aṁ": "ं", "aḥ": "ः", "ʾ": "़", "m̐": "ँ", "Ā": "ा", "Ê": "ॅ", "Ô": "ॉ", "I": "ि", "Ī": "ी", "U": "ु", "Ū": "ू", "R̥": "ृ", "Ṝ": "ॄ", "L̥": "ॢ", "L̥̄": "ೣ", "E": "ॆ", "Ē": "े", "Ai": "ै", "O": "ॊ", "Ō": "ो", "Au": "ौ", "Aṇ": "ं", "Aṁ": "ं", "Aḥ": "ः", "M̐": "ँ", "'": "ऽ", "’":"ऽ", "˜": "ँ", "ã": "ँ", "ā̃": "ाँ", "ĩ": "िँ", "ī̃": "ीँ", "ũ": "ुँ", "ū̃": "ूँ", "r̥̃": "ृँ", "ṝ̃": "ॄँ", "ẽ": "ॆँ", "ē̃": "ेँ", "õ": "ॊँ", "ō̃": "ोँ" };

    const anuswaraEndings = ['ṁ', 'ṇ', 'ṅ', 'ñ', 'n', 'm'];
    const letterAfterAnuswara = ['k', 'g', 'c', 'j', 'ṭ', 'ḍ', 't', 'd', 'p', 'b', 'y', 'r', 'v', 'ś', 'ṣ', 's', 'h'];
    const longVyanjana = ['k', 'g', 'c', 'j', 'ṭ', 'ḍ', 't', 'd'];

    const anunasika = { "ã": "a", "ā̃": "ā", "ĩ": "i", "ī̃": "ī", "ũ": "u", "ū̃": "ū", "r̥̃": "r̥", "ṝ̃": "r̥̄", "ẽ": "e", "ē̃": "ē", "õ": "o", "ō̃": "ō" };

    let resultSa = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();

    // IAST - ISO:15919 (Sanskrit)
    textLa = textLa.replaceAll("ṃ","ṁ").replaceAll("ã","m̐").replaceAll("ṛ","r̥").replaceAll("ṝ","r̥̄").replaceAll("ḷ","l̥").replaceAll("ḹ","l̥̄").replaceAll("e","ē").replaceAll("o","ō");

    for (let u = 0; u < textLa.length; u++) {
      if (diacritics[textLa[u - 2] + textLa[u - 1] + textLa[u]]) { // Vowel 3-character
        if (diacritics[textLa[u - 2] + textLa[u - 1] + textLa[u]] && latinToDevanagari[textLa[u - 2] + textLa[u - 1] + textLa[u]] && (textLa[u - 3] == "" || !textLa[u - 3] || textLa[u - 3] == " " || textLa[u - 3].indexOf("\n") > -1)) { // Standalone 3-character Vowel
          resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u - 2] + textLa[u - 1] + textLa[u]];
        } else {
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u - 2] + textLa[u - 1] + textLa[u]];
        }
      } else if (!diacritics[textLa[u - 2]] && diacritics[textLa[u - 1] + textLa[u]]) { // Vowel 2-character
        if (diacritics[textLa[u - 1] + textLa[u]] && latinToDevanagari[textLa[u - 1] + textLa[u]] && (textLa[u - 2] == "" || !textLa[u - 2] || textLa[u - 2] == " " || textLa[u - 2].indexOf("\n") > -1)) {  // Standalone 2-character Vowel
          if (anuswaraEndings.indexOf(textLa[u + 1]) > -1 && (letterAfterAnuswara.indexOf(textLa[u + 2]) > -1 || textLa[u + 2] == " " || textLa[u + 2] == "")) {
            resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u - 1] + textLa[u]] + "ं"; // Anuswara - V²A  V²AC¹ V²AC²
            u = u + 1;
          } else {
            resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u - 1] + textLa[u]];
          }
        } else {
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u - 1] + textLa[u]];
        }
      } else if (!diacritics[textLa[u - 2]] && !diacritics[textLa[u - 1]] && diacritics[textLa[u]]) { // Vowel 1-character
        if (textLa[u] == "a" && textLa[u - 1] == " ") {
          resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u]];
        } else if (diacritics[textLa[u]] && (textLa[u - 1] == "" || !textLa[u - 1] || textLa[u - 1] == " " || textLa[u - 1].indexOf("\n") > -1)) { // Standalone 1-character Vowel
          if (anuswaraEndings.indexOf(textLa[u + 1]) > -1 && (letterAfterAnuswara.indexOf(textLa[u + 2]) > -1 || textLa[u + 2] == " " || textLa[u + 2] == "")) {
            resultSa = resultSa + latinToDevanagari[textLa[u]] + "ं"; // Anuswara - V¹A  V¹AC¹ V¹AC²
            u = u + 1;
          } else {
            resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u]];
          }
        } else {
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u]];
        }
      } else if (latinToDevanagari[textLa[u - 1] + textLa[u] + "a"] || (latinToDevanagari[textLa[u - 2] + textLa[u - 1] + "a"] && textLa[u] == "a")) { // Consonant 2-character
        if (diacritics[textLa[u] + textLa[u + 1] + textLa[u + 2]]) { // Consonant-Vowel 2-character 3-character
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u] + textLa[u + 1] + textLa[u + 2]];
        } else if (diacritics[textLa[u] + textLa[u + 1]]) { // Consonant-Vowel 2-character 2-character
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u] + textLa[u + 1]];
        } else if (latinToDevanagari[textLa[u - 2] + textLa[u - 1] + "a"] && textLa[u] == "a") { // Consonant-Vowel 2-character 1-character
          resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u - 2] + textLa[u - 1] + "a"];
        } else if (anuswaraEndings.indexOf(textLa[u + 1]) > -1) {
          resultSa = resultSa + "ं";  // Anuswara - C²A  CD²A  C²AC² C²AC¹ CD²AC² CD²AC¹
        } else {
          resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u - 1] + textLa[u] + "a"] + "्";
        }
      } else if (latinToDevanagari[textLa[u] + "a"] || (latinToDevanagari[textLa[u - 1] + "a"] && textLa[u] == "a")) { // Consonant 1-character
        if (diacritics[textLa[u] + textLa[u + 1] + textLa[u + 2]]) { // Consonant-Vowel 1-character 3-character
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u] + textLa[u + 1] + textLa[u + 2]];
        } else if (diacritics[textLa[u] + textLa[u + 1]]) { // Consonant-Vowel 1-character 2-character
          if ((textLa[u] + textLa[u + 1]) == "m̐") { // Anunasika
            resultSa = resultSa + diacritics["m̐"];
          } else if (diacritics[textLa[u - 1]] && textLa[u] == " ̃") { // vowel nasalisation
            resultSa = resultSa.slice(0, -1) + diacritics[textLa[u] + textLa[u + 1]];
          } else {
            resultSa = resultSa.slice(0, -1) + diacritics[textLa[u] + textLa[u + 1]];
          }
        } else if (latinToDevanagari[textLa[u - 1] + "a"] && textLa[u] == "a") { // Consonant-Vowel 1-character 1-character
          if (textLa[u - 1] == "q" || textLa[u - 1] == "k͟h" || textLa[u - 1] == "ġ" || textLa[u - 1] == "z" || textLa[u - 1] == "f" || textLa[u - 1] == "s̱" || textLa[u - 1] == "s̤" || textLa[u - 1] == "h̤" || textLa[u - 1] == "t̤" || textLa[u - 1] == "ž") { // Nuqta cases
            resultSa = resultSa.slice(0, -3) + latinToDevanagari[textLa[u - 1] + "a"];
          } else if (textLa[u-2] == "a" && textLa[u-1] == "ṇ" && textLa[u] == "a") { 
            resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u-1] + "a"];
          } else {
            resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u - 1] + "a"];
          }
        } else if ((latinToDevanagari[textLa[u - 2]] != undefined && diacritics[textLa[u - 1]] != undefined && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u + 1]) > -1 && diacritics[textLa[u + 2]] != undefined) || ((textLa[u - 1] == "a" || diacritics[textLa[u - 1]] != undefined) && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u + 1]) > -1)) {
          resultSa = resultSa + "ं"; // Anuswara - C¹A  CD¹A   C¹AC² CD¹AC² C¹AC² CD¹AC² 
        } else {
          resultSa = resultSa + latinToDevanagari[textLa[u] + "a"] + "्";
        }
      } else if (textLa[u].indexOf("\n") > -1) { // New Lines
        resultSa = resultSa + "\n";
      } else if (latinToDevanagari[textLa[u]] != undefined && latinToDevanagari[textLa[u]] != null && textLa[u] != "") { // Default Single Character
        if (diacritics[textLa[u]]) {
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u]];
        } else {
          resultSa = resultSa + latinToDevanagari[textLa[u]];
        }
      }
    }

    document.getElementById("textarea2").value = resultSa;
    document.getElementById("textarea2").innerHTML = resultSa;
  } else if (localStorage.getItem("direction") == "devanagari2latin") {
    const devanagariToLatin = { "0": "0", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "०": "0", "१": "1", "२": "2", "३": "3", "४": "4", "५": "5", "६": "6", "७": "7", "८": "8", "९": "9", " ": " ", "।": ".", "॥": ".", ",": ",", ";": ";", "?": "?", "!": "!", "\"": "\"", "'": "'", "(": "(", ")": ")", ":": ":", "+": "+", "=": "=", "/": "/", "-": "-", "<": "<", ">": ">", "*": "*", "|": "|", "\\": "\\", "₹": "₹", "{": "{", "}": "}", "[": "[", "]": "]", "_": "_", "%": "%", "@": "@", "ˆ": "ˆ", "`": "`", "´": "´", "˜": "˜", "·": "·", "˙": "˙", "¯": "¯", "¨": "¨", "˚": "˚", "˝": "˝", "ˇ": "ˇ", "¸": "¸", "˛": "˛", "˘": "˘", "’": "’", "अ": "a", "आ": "ā", "ॲ": "ê", "ऑ": "ô", "इ": "i", "ई": "ī", "उ": "u", "ऊ": "ū", "ऋ": "r̥", "ॠ": "r̥̄", "ऌ": "l̥", "ॡ": "l̥̄", "ऍ": "ê",  "ऎ": "e", "ए": "ē", "ऐ": "ai", "ऒ": "o", "ओ": "ō", "औ": "au", "अं": "aṁ", "अः": "aḥ", "ँ": "m̐", "क": "ka", "ख": "kha", "ग": "ga", "घ": "gha", "ङ": "ṅa", "च": "ca", "छ": "cha", "ज": "ja", "झ": "jha", "ञ": "ña", "ट": "ṭa", "ठ": "ṭha", "ड": "ḍa", "ढ": "ḍha", "ण": "ṇa", "त": "ta", "थ": "tha", "द": "da", "ध": "dha", "न": "na", "प": "pa", "फ": "pha", "ब": "ba", "भ": "bha", "म": "ma", "य": "ya", "र": "ra", "ल": "la", "व": "va", "श": "śa", "ष": "ṣa", "स": "sa", "ह": "ha", "ळ": "ḷa", "ॐ" : "ōm̐", "a": "a", "b": "b", "c": "c", "d": "d", "e": "e", "f": "f", "g": "g", "h": "h", "i": "i", "j": "j", "k": "k", "l": "l", "m": "m", "n": "n", "o": "o", "p": "p", "q": "q", "r": "r", "s": "s", "t": "t", "u": "u", "v": "v", "w": "w", "x": "x", "y": "y", "z": "z", "A": "A", "B": "B", "C": "C", "D": "D", "E": "E", "F": "F", "G": "G", "H": "H", "I": "I", "J": "J", "K": "K", "L": "L", "M": "M", "N": "N", "O": "O", "P": "P", "Q": "Q", "R": "R", "S": "S", "T": "T", "U": "U", "V": "V", "W": "W", "X": "X", "Y": "Y", "Z": "Z" };

    const swaras = ["अ", "आ", "ॲ", "ऑ", "इ", "ई", "उ", "ऊ", "ऋ", "ॠ", "ऌ", "ॡ", "ऍ", "ऎ", "ए", "ऐ", "ऒ", "ओ", "औ"];

    const diacritics = { "्": " ", "ा": "ā", "ॅ": "ê", "ॉ": "ô", "ि": "i", "ी": "ī", "ु": "u", "ू": "ū", "ृ": "r̥", "ॄ": "r̥̄", "ॢ": "l̥", "ೣ": "l̥̄", "ॆ": "e", "े": "ē", "ै": "ai", "ॊ": "o", "ो": "ō", "ौ": "au", "ं": "ṁ", "ः": "ḥ", "़": "ʾ", "ँ": "m̐", "ऽ": "'" };

    const gutturalLetter = ["क", "ख", "ग", "घ"];
    const palatalLetter = ["च", "छ", "ज", "झ"];
    const retroflexLetter = ["ट", "ठ", "ड", "ढ"];
    const dentalLetter = ["त", "थ", "द", "ध"];
    const labialApproximateLetter = ["प", "फ", "ब", "भ", "य", "र", "व", "श", "ष", "स", "ह"];

    const nonPronunced = ["्", "ा", "ॅ", "ॉ", "ि", "ी", "ु", "ू", "ृ", "ॄ", "ॢ", "ೣ", "ॆ", "े", "ै", "ॊ", "ो", "ौ", "़" , "ऽ"];

    const anunasika = { "a": "ã", "ā": "ā̃", "i": "ĩ", "ī": "ī̃", "u": "ũ", "ū": "ū̃", "r̥": "r̥̃", "r̥̄": "ṝ̃", "e": "ẽ", "ē": "ē̃", "o": "õ", "ō": "ō̃" };

    let resultLa = "";
    let textSa = document.getElementById("textarea2").value;
    for (let u = 0; u < textSa.length; u++) {
      if (textSa[u] && diacritics[textSa[u]] && nonPronunced.indexOf(textSa[u]) > -1 && textSa[u - 1] && swaras.indexOf(textSa[u - 1]) > -1) {
        let ulpaswara1 = ['ॠ', 'ॡ'];
        let ulpaswara2 = ['ऋ', 'ऌ', 'ऐ', 'औ'];
        if (ulpaswara1.indexOf(textSa[u - 1]) > -1)
          resultLa = resultLa.slice(0, -3);
        else if (ulpaswara2.indexOf(textSa[u - 1]) > -1)
          resultLa = resultLa.slice(0, -2);
        else
          resultLa = resultLa.slice(0, -1);
        continue;
      } else if (textSa[u] != " " && diacritics[textSa[u]] && textSa[u] == "ಁ") {
        let lastVowel = resultLa[resultLa.length - 1];
        if (anunasika[lastVowel])
          resultLa = resultLa.slice(0, -1) + anunasika[lastVowel];
        else
          resultLa = resultLa + "m̐";
      } else if (textSa[u] != " " && diacritics[textSa[u]] && textSa[u - 1] != "ಅ") {
        if (textSa[u] != " " && diacritics[textSa[u - 1]] && diacritics[textSa[u]]) {
          resultLa = resultLa + diacritics[textSa[u]];
        } else if (textSa[u] == "्") {
          resultLa = resultLa.slice(0, -1);
        } else {
          if (textSa[u] == "ं" || textSa[u] == "ः") { // Anusvara & Visarga
            if (textSa[u - 1] && swaras.indexOf(textSa[u - 1])) {
              resultLa = resultLa + diacritics[textSa[u]];
            } else {
              resultLa = resultLa.slice(0, -1) + 'a' + diacritics[textSa[u]];
            }
          } else {
            // Nukta signs in Devanagari
            if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "क़") {
              resultLa = resultLa.slice(0, -2) + "qa";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ख़") {
              resultLa = resultLa.slice(0, -4) + "k͟ha";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ग़") {
              resultLa = resultLa.slice(0, -2) + "qa";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ज़") {
              resultLa = resultLa.slice(0, -2) + "za";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "झ़") {
              resultLa = resultLa.slice(0, -3) + "ža";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ड़") {
              resultLa = resultLa.slice(0, -3) + "ṛa";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ढ़") {
              resultLa = resultLa.slice(0, -4) + "ṛha";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "त़") {
              resultLa = resultLa.slice(0, -3) + "t̤a";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "थ़") {
              resultLa = resultLa.slice(0, -3) + "s̱a";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "फ़") {
              resultLa = resultLa.slice(0, -3) + "fa";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "स़") {
              resultLa = resultLa.slice(0, -3) + "s̤a";
            } else if (textSa[u] == "़" && textSa[u - 1] && textSa[u - 1] == "ह़") {
              resultLa = resultLa.slice(0, -3) + "h̤a";
            } else {
              resultLa = resultLa.slice(0, -1) + diacritics[textSa[u]];
            }
          }
        }
      } else if (textSa[u - 1] == "अ" && diacritics[textSa[u]] && nonPronunced.indexOf(textSa[u]) == -1) {
        resultLa = resultLa.slice(0, -1) + devanagariToLatin[textSa[u - 1] + textSa[u]];
      } else if (textSa[u].indexOf("\n") > -1) {
        resultLa = resultLa + "\n";
      } else if (devanagariToLatin[textSa[u]] != undefined && devanagariToLatin[textSa[u]] != null && textSa[u] != "") {
        // Anusvara rule
        if (textSa[u - 1] && textSa[u - 1] == "ं" && gutturalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṅ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u - 1] && textSa[u - 1] == "ं" && palatalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ñ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u - 1] && textSa[u - 1] == "ं" && retroflexLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṇ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u - 1] && textSa[u - 1] == "ं" && dentalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "n" + devanagariToLatin[textSa[u]];
        } else if (textSa[u - 1] && textSa[u - 1] == "ं" && labialApproximateLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "m" + devanagariToLatin[textSa[u]];
        } else if (textSa[u - 1] && textSa[u - 1] == "ं" && gutturalLetter.indexOf(textSa[u]) == -1 && palatalLetter.indexOf(textSa[u]) == -1 && retroflexLetter.indexOf(textSa[u]) == -1 && dentalLetter.indexOf(textSa[u]) == -1 && labialApproximateLetter.indexOf(textSa[u]) == -1 && textSa[u] == " ") {
          resultLa = resultLa.slice(0, -1) + "ṁ" + devanagariToLatin[textSa[u]];
        } else {
          resultLa = resultLa + devanagariToLatin[textSa[u]];
        }
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
  }
}

function swap(json) {
  var ret = {};
  for (var key in json) {
    ret[json[key]] = key;
  }
  return ret;
}

function openTab(evt, localeName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(localeName).style.display = "block";
  evt.currentTarget.className += " active";
  localStorage.setItem("encoding", localeName);
  transliterate();
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
document.getElementById("textarea1").focus();
if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "devanagari2latin") {
  localStorage.setItem("direction", "latin2devanagari");
  localStorage.setItem("encoding", "Latin");
}

if (screen.width >= 300 && screen.width <= 500) {
  document.getElementById("Devanagari").classList.remove("devanagariTabText");
  document.getElementById("Devanagari").classList.add("devanagariTabSmallScreen");
  document.getElementById("Latin").classList.remove("tabcontent");
  document.getElementById("Latin").classList.add("tabcontentSmallScreen");
}

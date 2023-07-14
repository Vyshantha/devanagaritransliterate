function hide() {
  document.getElementById("tooltip1").classList.remove("block");
  document.getElementById("tooltip2").classList.remove("block");
}
function show1() {
  document.getElementById("tooltip1").classList.add("block");
  var self = this;
  setTimeout(function() {
    self.hide();
  },3000);
}
function show2() {
  document.getElementById("tooltip2").classList.add("block");
  var self = this;
  setTimeout(function() {
    self.hide();
  },3000);
}

function swapTransliteration() {
  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined ||  localStorage.getItem("direction") == "latin2devanagari") {
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

  /*  
    Transliteration for Sanskrit (ISO 15919 : IAST) : https://en.wikipedia.org/wiki/ISO_15919
    Devanagari Unicode Block : https://www.unicode.org/charts/PDF/U0900.pdf
    Devanagari Extended Unicode Block : https://www.unicode.org/charts/PDF/UA8E0.pdf
    Devanagari Extended-A Unicode Block : https://www.unicode.org/charts/PDF/U11B00.pdf
    Vedic Extensions Unicode Block : https://www.unicode.org/charts/PDF/U1CD0.pdf  
    Devanagari : https://en.wikipedia.org/wiki/Devanagari
  */

  if (localStorage.getItem("direction") == null || localStorage.getItem("direction") == undefined || localStorage.getItem("direction") == "latin2devanagari") {
    const latinToDevanagari = {"0":"೦","1":"೧","2":"೨","3":"೩","4":"೪","5":"೫","6":"೬","7":"೭","8":"೮","9":"೯"," ":"  ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","a":"ಅ","ā":"ಆ","i":"ಇ","ī":"ಈ","u":"ಉ","ū":"ಊ","r̥":"ಋ","r̥̄":"ೠ","l̥":"ಌ","l̥̄":"ೡ","e":"ಎ","ē":"ಏ","ai":"ಐ","o":"ಒ","ō":"ಓ","au":"ಔ","aṃ":"ಅಂ","aḥ":"ಅಃ","":"ೱ","nh":"\\u0CDD","ka":"ಕ","kha":"ಖ","ga":"ಗ","gha":"ಘ","ṅa":"ಙ","ca":"ಚ","cha":"ಛ","ja":"ಜ","jha":"ಝ","ña":"ಞ","ṭa":"ಟ","ṭha":"ಠ","ḍa":"ಡ","ḍha":"ಢ","ṇa":"ಣ","ta":"ತ","tha":"ಥ","da":"ದ","dha":"ಧ","na":"ನ","pa":"ಪ","pha":"ಫ","ba":"ಬ","bha":"ಭ","ma":"ಮ","ya":"ಯ","ra":"ರ","ṟa":"ಱ","la":"ಲ","va":"ವ","śa":"ಶ","ṣa":"ಷ","sa":"ಸ","ha":"ಹ","ḷa":"ಳ","ḻa":"ೞ","fa":"ಫ಼","za":"ಜ಼","A":"ಅ","Ā":"ಆ","I":"ಇ","Ī":"ಈ","U":"ಉ","Ū":"ಊ","R̥":"ಋ","Ṝ":"ೠ","L̥":"ಌ","L̥̄":"ೡ","E":"ಎ","Ē":"ಏ","Ai":"ಐ","O":"ಒ","Ō":"ಓ","Au":"ಔ","Aṃ":"ಅಂ","Aḥ":"ಅಃ","Nh":"\\u0CDD","Ka":"ಕ","Kha":"ಖ","Ga":"ಗ","Gha":"ಘ","Ṅa":"ಙ","Ca":"ಚ","Cha":"ಛ","Ja":"ಜ","Jha":"ಝ","Ña":"ಞ","Ṭa":"ಟ","Ṭha":"ಠ","Ḍa":"ಡ","Ḍha":"ಢ","Ṇa":"ಣ","Ta":"ತ","Tha":"ಥ","Da":"ದ","Dha":"ಧ","Na":"ನ","Pa":"ಪ","Pha":"ಫ","Ba":"ಬ","Bha":"ಭ","Ma":"ಮ","Ya":"ಯ","Ra":"ರ","Ṟa":"ಱ","La":"ಲ","Va":"ವ","Śa":"ಶ","Ṣa":"ಷ","Sa":"ಸ","Ha":"ಹ","Ḷa":"ಳ","Ḻa":"ೞ","Fa":"ಫ಼","Za":"ಜ಼"};

    const diacritics = {"ā":"ಾ","i":"ಿ","ī":"ೀ","u":"ು","ū":"ೂ","r̥":"ೃ","r̥̄":"ೄ","l̥":"ೢ","l̥̄":"ೣ","e":"ೆ","ē":"ೇ","ai":"ೈ","o":"ೊ","ō":"ೋ","au":"ೌ","ṇ":"ಂ","ṃ":"ಂ","ḥ":"ಃ","ʾ":"಼","m̐":"ಀ","Ā":"ಾ","I":"ಿ","Ī":"ೀ","U":"ು","Ū":"ೂ","R̥":"ೃ","Ṝ":"ೄ","L̥":"ೢ","L̥̄":"ೣ","E":"ೆ","Ē":"ೇ","Ai":"ೈ","O":"ೊ","Ō":"ೋ","Au":"ೌ","Aṇ":"ಂ","Aṃ":"ಂ","Aḥ":"ಃ","M̐":"ಀ","'":"ಽ","˜":"ಁ","ã":"ಁ","ā̃":"ಾಁ","ĩ":"ಿಁ","ī̃":"ೀಁ","ũ":"ುಁ","ū̃":"ೂಁ","r̥̃":"ೃಁ","ṝ̃":"ೄಁ","ẽ":"ೆಁ","ē̃":"ೇಁ","õ":"ೊಁ","ō̃":"ೋಁ"};
    
    const anuswaraEndings = ['ṃ','ṇ','ṅ','ñ','n','m'];
    const letterAfterAnuswara = ['k','g','c','j','ṭ','ḍ','t','d','p','b','y','r','v','ś','ṣ','s','h']; 
    const longVyanjana = ['k','g','c','j','ṭ','ḍ','t','d'];

    const anunasika = {"ã":"a","ā̃":"ā","ĩ":"i","ī̃":"ī","ũ":"u","ū̃":"ū","r̥̃":"r̥","ṝ̃":"r̥̄","ẽ":"e","ē̃":"ē","õ":"o","ō̃":"ō"};

    let resultSa = "";
    let textLa = document.getElementById("textarea1").value.toLowerCase();
    for (let u = 0; u < textLa.length; u++ ) {
      if (textLa[u] != " " && textLa[u-1] != " " && (textLa[u-1] + textLa[u]).toLowerCase() == "m̐") {
        resultSa = resultSa.slice(0,-2) + diacritics[textLa[u-1] + textLa[u]];
      } else if (textLa[u] != " " && textLa[u-1] != " " && anunasika[textLa[u-1] + textLa[u]]) {
        resultSa = resultSa.slice(0,-1) + diacritics[textLa[u-1] + textLa[u]];
      } else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && latinToDevanagari[textLa[u-1] + textLa[u] + "a"]) {
        resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u-1] + textLa[u] + "a"] + "್";
      } else if (latinToDevanagari[textLa[u-1]] && anuswaraEndings.indexOf(textLa[u]) > -1 && letterAfterAnuswara.indexOf(textLa[u+1]) > -1) {
        if (latinToDevanagari[textLa[u-2] + textLa[u-1]] && latinToDevanagari[textLa[u-3] + textLa[u-1]] && textLa[u-2] == "h" && longVyanjana.indexOf(textLa[u-3]) == -1) {
          resultSa = resultSa + latinToDevanagari[textLa[u-3] + textLa[u-1]] + "ಂ";
        } else if (latinToDevanagari[textLa[u-2] + textLa[u-1]] && !latinToDevanagari[textLa[u-3] + textLa[u-1]] && textLa[u-2] != "f") {
          resultSa = resultSa.slice(0,-1) + latinToDevanagari[textLa[u-2] + textLa[u-1]] + "ಂ";
        } else if (anuswaraEndings.indexOf(textLa[u]) > -1) {
          resultSa = resultSa + "ಂ";
        }
      } else if (textLa[u] != " " && latinToDevanagari[textLa[u] + "a"] && !diacritics[textLa[u]]) {
        resultSa = resultSa + latinToDevanagari[textLa[u] + "a"] + "್";
      } else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && diacritics[textLa[u]] && !latinToDevanagari[textLa[u-1] + textLa[u]] && textLa[u-1].indexOf("\n") == -1) {
        if (textLa[u-1] && latinToDevanagari[textLa[u-1]]) {
          resultSa = resultSa + diacritics[textLa[u]];
        } else {
          resultSa = resultSa.slice(0, -1) + diacritics[textLa[u]];
        }
      } else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && textLa[u-2] && textLa[u-2] != " " && latinToDevanagari[textLa[u-2] + textLa[u-1] + textLa[u]]) {
        if (textLa[u-1] == "h") // Aspirated Vyanjana
          resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u-2] + textLa[u-1] + textLa[u]];
        else
          resultSa = resultSa.slice(0, -4) + latinToDevanagari[textLa[u-2] + textLa[u-1] + textLa[u]];
      } else if (textLa[u] != " " && textLa[u-1] && textLa[u-1] != " " && latinToDevanagari[textLa[u-1] + textLa[u]]) {
        if (textLa[u-1] && latinToDevanagari[textLa[u-1] + textLa[u]]) {
          if (textLa[u-1] == "z" || textLa[u-1] == "f") {// Nukta special case
            resultSa = resultSa.slice(0, -3) + latinToDevanagari[textLa[u-1] + textLa[u]];
          } else if (!latinToDevanagari[textLa[u-2] + textLa[u-1]]) {
            resultSa = resultSa.slice(0, -2) + latinToDevanagari[textLa[u-1] + textLa[u]];
          } else {
            resultSa = resultSa.slice(0, -1) + latinToDevanagari[textLa[u-2] + textLa[u-1]] + diacritics[textLa[u]];
          }
        } else if (textLa[u-2] && textLa[u-1] && latinToDevanagari[textLa[u-2] + textLa[u-1] + textLa[u]]) {
          resultSa = resultSa.slice(0, -3) + latinToDevanagari[textLa[u-2] + textLa[u-1] + textLa[u]];
        }
      } else if (textLa[u-1] == " " && !latinToDevanagari[textLa[u]] && diacritics[textLa[u]]) {
        resultSa = resultSa + diacritics[textLa[u]];
      } else if (textLa[u].indexOf("\n") > -1) {
        resultSa = resultSa + "\n";
      } else if (latinToDevanagari[textLa[u]] != undefined && latinToDevanagari[textLa[u]] != null && textLa[u] != "") {
        resultSa = resultSa + latinToDevanagari[textLa[u]];
      }
    }

    document.getElementById("textarea2").value = resultSa;
    document.getElementById("textarea2").innerHTML = resultSa;

  } else if (localStorage.getItem("direction") == "devanagari2latin") {
    const devanagariToLatin = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9"," ":" ",".":".",",":",",";":";","?":"?","!":"!","\"":"\"","'":"'","(":"(",")":")",":":":","+":"+","=":"=","/":"/","-":"-","<":"<",">":">","*":"*","|":"|","\\":"\\","₹":"₹","{":"{","}":"}","[":"[","]":"]","_":"_","%":"%","@":"@","ˆ":"ˆ","`":"`","´":"´","˜":"˜","·":"·","˙":"˙","¯":"¯","¨":"¨","˚":"˚","˝":"˝","ˇ":"ˇ","¸":"¸","˛":"˛","˘":"˘","’":"’","ಅ":"a","ಆ":"ā","ಇ":"i","ಈ":"ī","ಉ":"u","ಊ":"ū","ಋ":"r̥","ೠ":"r̥̄","ಌ":"l̥","ೡ":"l̥̄","ಎ":"e","ಏ":"ē","ಐ":"ai","ಒ":"o","ಓ":"ō","ಔ":"au","ಅಂ":"aṃ","ಅಃ":"aḥ","ೱ":" ","ೲ":" ","ಀ":"m̐","\\u0CDD":"nh","಄":" ","ಕ":"ka","ಖ":"kha","ಗ":"ga","ಘ":"gha","ಙ":"ṅa","ಚ":"ca","ಛ":"cha","ಜ":"ja","ಝ":"jha","ಞ":"ña","ಟ":"ṭa","ಠ":"ṭha","ಡ":"ḍa","ಢ":"ḍha","ಣ":"ṇa","ತ":"ta","ಥ":"tha","ದ":"da","ಧ":"dha","ನ":"na","ಪ":"pa","ಫ":"pha","ಬ":"ba","ಭ":"bha","ಮ":"ma","ಯ":"ya","ರ":"ra","ಱ":"ṟa","ಲ":"la","ವ":"va","ಶ":"śa","ಷ":"ṣa","ಸ":"sa","ಹ":"ha","ಳ":"ḷa","ೞ":"ḻa","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z"};

    const swaras = ['ಅ','ಆ','ಇ','ಈ','ಊ','ಉ','ಋ','ೠ','ಌ','ೡ','ಎ','ಏ','ಐ','ಒ','ಓ','ಔ'];

    const diacritics = {"್":" ","ಾ":"ā","ಿ":"i","ೀ":"ī","ು":"u","ೂ":"ū","ೃ":"r̥","ೄ":"r̥̄","ೢ":"l̥","ೣ":"l̥̄","ೆ":"e","ೇ":"ē","ೈ":"ai","ೊ":"o","ೋ":"ō","ೌ":"au","ಂ":"ṃ","ಃ":"ḥ","಼":"ʾ","ಁ":"˜","\\u0CF3":"m̐","ಽ":"'"}; 

    const gutturalLetter = ['ಕ','ಖ','ಗ','ಘ'];
    const palatalLetter = ['ಚ','ಛ','ಜ','ಝ'];
    const retroflexLetter = ['ಟ','ಠ','ಡ','ಢ'];
    const dentalLetter = ['ತ','ಥ','ದ','ಧ'];
    const labialApproximateLetter = ['ಪ','ಫ','ಬ','ಭ','ಯ','ರ','ವ','ಶ','ಷ','ಸ','ಹ'];

    const nonPronunced = ["್","ಾ","ಿ","ೀ","ು","ೂ","ೃ","ೄ","ೢ","ೣ","ೆ","ೇ","ೈ","ೊ","ೋ","ೌ","಼","ಽ"];

    const anunasika = {"a":"ã","ā":"ā̃","i":"ĩ","ī":"ī̃","u":"ũ","ū":"ū̃","r̥":"r̥̃","r̥̄":"ṝ̃","e":"ẽ","ē":"ē̃","o":"õ","ō":"ō̃"};

    let resultLa = "";
    let textSa = document.getElementById("textarea2").value;
    for (let u = 0; u < textSa.length; u++ ) {
      if (textSa[u] && diacritics[textSa[u]] && nonPronunced.indexOf(textSa[u]) > -1 && textSa[u-1] && swaras.indexOf(textSa[u-1]) > -1) {
        let ulpaswara1 = ['ೠ', 'ೡ'];
        let ulpaswara2 = ['ಋ', 'ಌ', 'ಐ', 'ಔ'];
        if (ulpaswara1.indexOf(textSa[u-1]) > -1)
          resultLa = resultLa.slice(0, -3);
        else if (ulpaswara2.indexOf(textSa[u-1]) > -1)
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
      } else if (textSa[u] != " " && diacritics[textSa[u]] && textSa[u-1] != "ಅ") {
        if (textSa[u] != " " && diacritics[textSa[u-1]] && diacritics[textSa[u]]) {
          resultLa = resultLa + diacritics[textSa[u]];
        } else if (textSa[u] == "್") {
          resultLa = resultLa.slice(0, -1);
        } else {
          if (textSa[u] == "ಂ" || textSa[u] == "ಃ") { // Anusvara & Visarga
            if (textSa[u-1] && swaras.indexOf(textSa[u-1])) {
              resultLa = resultLa + diacritics[textSa[u]];
            } else {
              resultLa = resultLa.slice(0, -1) + 'a' + diacritics[textSa[u]];
            }
          } else {
            // Nukta signs in Devanagari क़ = 'qa', ख़ = 'k͟ha', ग़ = 'ġa', ज़ = 'za', झ़ = 'ža', त़ = 't̤a', थ़ = 's̱a', फ़ = 'fa',  स़ = 's̤a', ह़ = 'h̤', 
            if (textSa[u] == "಼" && textSa[u-1] && textSa[u-1] == "ಜ") {
              resultLa = resultLa.slice(0, -2) + "za";
            } else if (textSa[u] == "಼" && textSa[u-1] && textSa[u-1] == "ಫ") {
              resultLa = resultLa.slice(0, -3) + "fa";
            } else {
              resultLa = resultLa.slice(0, -1) + diacritics[textSa[u]];
            }
          }
        }
      } else if (textSa[u-1] == "ಅ" && diacritics[textSa[u]] && nonPronunced.indexOf(textSa[u]) == -1) {
        resultLa = resultLa.slice(0, -1) +  devanagariToLatin[textSa[u-1] + textSa[u]];
      } else if (textSa[u].indexOf("\n") > -1) {
        resultLa = resultLa + "\n";
      } else if (devanagariToLatin[textSa[u]] != undefined && devanagariToLatin[textSa[u]] != null && textSa[u] != "") {
        // Anusvara rule
        if (textSa[u-1] && textSa[u-1] == "ಂ" && gutturalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṅ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u-1] && textSa[u-1] == "ಂ" && palatalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ñ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u-1] && textSa[u-1] == "ಂ" && retroflexLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "ṇ" + devanagariToLatin[textSa[u]];
        } else if (textSa[u-1] && textSa[u-1] == "ಂ" && dentalLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "n" + devanagariToLatin[textSa[u]];
        } else if (textSa[u-1] && textSa[u-1] == "ಂ" && labialApproximateLetter.indexOf(textSa[u]) > -1) {
          resultLa = resultLa.slice(0, -1) + "m" + devanagariToLatin[textSa[u]];
        } else if (textSa[u-1] && textSa[u-1] == "ಂ" && gutturalLetter.indexOf(textSa[u]) == -1 && palatalLetter.indexOf(textSa[u]) == -1 && retroflexLetter.indexOf(textSa[u]) == -1 && dentalLetter.indexOf(textSa[u]) == -1 && labialApproximateLetter.indexOf(textSa[u]) == -1 && textSa[u] == " ") {
          resultLa = resultLa.slice(0, -1) + "ṃ" + devanagariToLatin[textSa[u]];
        } else  {
          resultLa = resultLa + devanagariToLatin[textSa[u]];
        }
      }
    }
    document.getElementById("textarea1").value = resultLa;
    document.getElementById("textarea1").innerHTML = resultLa;
  }        
}

function swap(json){
  var ret = {};
  for(var key in json){
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
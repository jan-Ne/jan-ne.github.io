function transliterate(){
	var input = document.getElementById("name").value;
	document.getElementById("nimi").innerHTML = tpize(input);
}
function tpize(n){
			//Boundary marking
		n = "#" + n + "#";
			//Diacritic separation
		n = n.normalize("NFD")
			//Vowels
		n = n.replace(/(y|ɪ|ʏ|ɨ)/g, "i").replace(/(ɯ|ʊ|ʉ)/g, "u").replace(/(ø|ɘ|ɛ|œ|ɜ)/g, "e").replace(/(ɤ|ɵ|ɔ|ʌ|ɞ|ɒ)/g, "o").replace(/(æ|ɶ|ɐ|ɑ)/g, "a").replace(/ɚ/g, "əw").replace(/ɝ/g, "ew")
			//Deletion
			.replace(/(\/|\\|\u005B|\u005D|[\u0300-\u0302]|[\u0304-\u030C]|[\u030E-\u0328]|[\u032A-\u036f])/g, "")
			.replace(/(ħ|ʕ|h|ɦ|ʔ|ʰ|ʲ(?!#)|ʷ|ˠ|ˤ|ᵝ|ᶣ|¹|²|³|⁴|⁵|⁶|⁷|⁸|⁹|ː|ʼ)/g, "")
			//Consonants (and final ʃ -> si, c => ki, and Xʲ -> Xi)
			.replace(/ɱ/g, "m").replace(/(ɳ|ɲ|ŋ|ɴ|m(?=(\.|ˈ|'|#|\s))|\u0303)/g, "n").replace(/(?<=[^i])(ʃ|ʒ|ɕ|ʑ)(?=#)/g,".si").replace(/(c|ɟ)(?=#)/g,".ki").replace(/([^aeiou])ʲ(?=#)/g,".$1i")
			.replace(/(z|ʃ|ʒ|ɕ|ʑ|ʂ|ʐ|θ|ɬ|ɮ|ts|dz|tʃ|dʒ|ʈʂ|ɖʐ|tɕ|dʑ|tɬ|dɮ|ɧ)/g,"s")
			.replace(/(b|f|ʙ|ɸ|β|ʘ|ɓ)/g, "p").replace(/d|ð|ǀ|ǃ|ɗ|ᶑ/g,"t").replace(/(g|ɡ|c|ɟ|q|ɢ|x|ɣ|χ|ʁ|ʀ|ʡ|ʜ|ʢ|ɠ|ʛ)/g,"k")
			.replace(/(v|ⱱ|ɹ|ʋ|ɰ|ʍ|\u02DE)/g,"w").replace(/(r|ɾ|ɽ|ɺ|ɫ|ɭ|ʎ|ʟ)/g,"l").replace(/(ç|ʝ|ɥ|ʄ)/g,"j")
			//Syllabic consonant vowel insertion
			.replace(/([^aeioun])\u0329/g, "$1ə").replace(/n\u0329/g, "ən").replace(/([^aeioun])\u030D/g, "$1ə").replace(/n\u030D/g, "ən").replace(/(?<=(#|\s))n(?=[^aeiou])/g, "ən")
			//Glides and Diphthongs
				//Rewriting vowel+glide as diphthong
				.replace(/([aeiou])j(?=[^aeiou])/g, "$1i").replace(/([aeiou])w(?=[^aeiou])/g, "$1u")
				//Preserving glides and diphthongs together (as in [pa.ɾa.ɣwai] -> Palakawi)
				.replace(/([^aeiou#\s\.ˈ'ˌ])w([aeiou])([aei])/g, "$1$2w$3").replace(/([^aeiou#\s\.ˈ'ˌ])j([aeiou])([aeou])/g, "$1$2j$3")
				//Expanding noninitial syllables that have glides
				.replace(/(?<!(#|\s))([^aeiou#\s\.ˈ'ˌ])w(?=[aeiou])/g, "$2u.w").replace(/(?<!(#|\s))([^aeiou#\s\.ˈ'ˌ])j(?=[aeiou])/g, "$2i.j")
			//Schwa
				//Word Final ə/ɚ -> a
				.replace(/əw(?=#)/g, "a").replace(/ə(?=#)/g, "a")
				//replace with previous vowel or otherwise next vowel
				.replace(/([aeiou])([^aeiou]*)\.([^aeiou]*)ə/g,"$1$2.$3$1")
				.replace(/ə([^aeiou]*)(\.(([^aeiou]*)ə([^aeiou]*))*)\.([^aeiou]*)([aeiou])/g,"$7$1$4$7$5.$6$7")
				//word initial unstressed [ə] deleted
				.replace(/(?<=#)(?!<(ˈ|'|ˌ))ə(?=[#\s\.ˈ'ˌ])/g, "")
				.replace(/ə/g, "a")
			//Remove stress markings
			.replace(/(\.ˈ|\.'|ˈ|'|ˌ)/g, ".")
			//Order Changes
				//m.n -> .m and C.n -> n.C (as in "Lubnan" to "Lunpan")
				.replace(/m\.n(?=[aeiou]n)/g, ".m").replace(/([^aeioun])\.n(?=[aeiou]n)/g, "n.$1")
				//C.nV --> C.Vn (as in "Bosna" to "Posan")
				.replace(/(?<=[^aeioun]\.)(n)([aeiou])(?!\.?n)/g, "$2$1")
				//VC.V -> V.CV
				.replace(/([^aeiou])\.([aeiou])/g, ".$1$2")
				//V(C).VC --> V(C).CV (preserving final consonant when there is an empty onset)
				.replace(/(?<=[aeioun]\.)([aeiou])([^aeioun#\.\s])/g, "$2$1")
			//Syllable Structure Maintenance
				//Consonant cluster reduction (dominant plosive kept)
				.replace(/s(?=[ptkl])/g,"").replace(/(?<=[ptk])(w|l|j)/g,"")
				.replace(/(?<=[mnptkswlj])[mnptkswlj]/g, "")
				//wo, wu, ji
				.replace(/wo/g,"o").replace(/wu/g,"u").replace(/ji/g,"i")
				//ti, n.m, n.n
				.replace(/ti/g,"si").replace(/n\.m/g,".m").replace(/n\.n/g,".n")
				//Glides between double vowels across syllable boundaries
				.replace(/(?<=[aou]\.)a/g,"wa").replace(/(?<=[ie]\.)a/g,"ja").replace(/(?<=[ou]\.)e/g,"we").replace(/(?<=[aei]\.)e/g,"je").replace(/(?<=[aeiou]\.)i/g,"wi").replace(/(?<=[aeiou]\.)o/g,"jo").replace(/(?<=[aeiou]\.)u/g,"ju")
				//Double vowel deletion
				.replace(/(?<=[aeiou])[aeiou]/g, "")
				//Final consonant deletion
				.replace(/[^aeioun]*(?=[^aeiou]*(\.|#|\s))/g, "")
			//Removal of dividing marks
			.replace(/(#|\.)/g,"")
			//Capitalization
			.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
		return n;
	}

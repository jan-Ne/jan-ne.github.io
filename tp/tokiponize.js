/* Copyright 2025 jan Ne (jan-ne.github.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const IPA = {
	NASALIZED: "\u0303",		// ◌̃ 
    SYLLABIC: "\u0329",			// ◌̩ 
	SYLLABIC_ALT: "\u030D",		// ◌̍ 
	NONSYLLABIC: "\u032f",		// ◌̯
	RHOTIC: "\u02DE",			// ◌˞
	
	TONE_NUMS: "\u00B2\u00B3\u00B9\u2070\u2074-\u2079",
	VOWELS: "aeiouyæøœɐɑɒɔɘəɚɛɜɝɞɤɨɪɯɵɶʉʊʌʏ",
	//All IPA characters used
	FULL: "\u0061-\u007A\u00B2\u00B3\u00B9\u00E6\u00E7\u00F0\u00F8\u0127\u014B\u0153\u01C0-\u01C3\u0250-\u0268\u026A-\u0276\u0278-\u027B\u027D\u027E\u0280-\u0284\u0288-\u0292\u0294\u0295\u0298\u0299\u029B-\u029D\u029F\u02A1\u02A2\u02B0-\u036F\u03B2\u03B8\u03C7\u1D91\u2070\u2074-\u2079\u2C71"
}

const BLOCK = {
	SPACING_MODIFIER: "\u02B0-\u02C7\u02C9-\u02CB\u02CD-\u02FF",	//unicode block excluding palatalized and rhotic modifiers
	COMBINING_DIACRITICAL: "\u0300-\u0302\u0304-\u030C\u030E-\u0328\u032A-\u032E\u0330-\u036F"	//unicode block excluding nasalized, nonsyllabic, and syllabic diacritics
}

const rules = [
	{
		category: "Warnings",
		regex: [
			{ name: "Unexpected unicode characters removed", pattern: `[^${IPA.FULL}'.#\\s]`, replacement: "", type: "warning" },
			{ name: "No vowels or marked syllabics detected", pattern: `^[^${IPA.VOWELS}${IPA.SYLLABIC}${IPA.SYLLABIC_ALT}]*$`, flag: "", type: "warning" },
			{ name: "No syllable boundaries detected", pattern: `^(?=[^.]*$)(?=.*[${IPA.VOWELS}][^${IPA.VOWELS}${IPA.NONSYLLABIC}]+[${IPA.VOWELS}]).*$`, flag: "", type: "warning" },
			{ name: "Orphaned non-syllabic consonant", pattern: `(?<=[.#\\s])(?![^\\s.#]*[${IPA.VOWELS}\u0329\u030D])([^${IPA.VOWELS}\u0329\u030D\\s.#]+)`, type: "warning" }
		]
	},
	{
		category: "Deletions",
		regex: [
			{ name: "Remove IPA diacritics and modifiers", pattern: `[${BLOCK.SPACING_MODIFIER}${BLOCK.COMBINING_DIACRITICAL}${IPA.TONE_NUMS}]`, replacement: "" },
			{ name: "Laryngeals", pattern: "[ʡʔħʕhɦʜʢ]", replacement: "" }
		]
	},
	{
		category: "Feature-dependent changes",
		regex: [
			{ name: "Insert [i] after final palatals", pattern: `\\.?([^${IPA.VOWELS}]ʲ|[ʃʒʂʐɕʑcɟǂ])(?=[#\\s])`, replacement: ".$1i" },
			{ name: "Remove palatalized modifier", pattern: "ʲ", replacement: "" },
			{ name: "Reduce clusters before fortition", pattern: "(?<=[pbɓʘtʈɖǀǃɗᶑkgɡcɟqɢʡɠʛǂmɱnɳɲŋɴ])[fʙɸβðxɣχʁʀʜʢ](?![.#\\s])", replacement: "" }
		]
	},
	{
		category: "Vowels",
		regex: [
			{ name: "High front vowels", pattern: "[yɨɪʏ]", replacement: "i" },
			{ name: "High back vowels", pattern: "[ʉɯʊ]", replacement: "u" },
			{ name: "Mid front vowels", pattern: "[øɘɛœɜ]", replacement: "e" },
			{ name: "Mid back vowels", pattern: "[ɵɤɔɞʌɒ]", replacement: "o" },
			{ name: "Low vowels", pattern: "[æɶɐɑ]", replacement: "a" },
			{ name: "ɝ", pattern: "ɝ", replacement: "ew" },
			{ name: "ɚ", pattern: "ɚ", replacement: "əw" }
		]
	},
	{
		category: "Consonants",
		regex: [
			{ name: "Labial nasals", pattern: "ɱ", replacement: "m" },
			{ name: "Non-labial nasals", pattern: "[ɳɲŋɴ]", replacement: "n" },
			{ name: "Nasalized vowels", pattern: `${IPA.NASALIZED}`, replacement: "n" },
			{ name: "Coda nasals", pattern: "m(?=[\\.ˈ'#\\s])", replacement: "n" },
			{ name: "Labials", pattern: "[bfʙɸβʘɓ]", replacement: "p" },
			{ name: "Coronal stridents", pattern: "(ts|dz|tʃ|dʒ|ʈʂ|ɖʐ|tɕ|dʑ|tɬ|dɮ)|[zʃʒɕʑʂʐθɬɮɧ]", replacement: "s" },
			{ name: "Coronal non-stridents", pattern: "[dðʈɖǀǃɗᶑ]", replacement: "t" },
			{ name: "Dorsals", pattern: "[gɡcɟqɢxɣχʁʀʡʜʢɠʛǂ]", replacement: "k" },
			{ name: "Liquids", pattern: "[rɾɽɺɫɭʎʟǁ]", replacement: "l" },
			{ name: "Palatal approximants and fricatives", pattern: "[çʝɥʄ]", replacement: "j" },
			{ name: "Non-palatal approximants", pattern: `[vⱱɹɻʋɰʍ${IPA.RHOTIC}]`, replacement: "w" }
		]
	},
	{
		category: "Syllabic Consonants",
		regex: [
			{ name: "Reduce geminate syllabic consonants", pattern: `([^aeiou])\\1(?=${IPA.SYLLABIC})`, replacement: "$1" },
			{ name: "Insert schwa before syllabic nasal", pattern: `[mn]${IPA.SYLLABIC}`, replacement: "ən" },
			{ name: "Initial syllabic consonant", pattern: `(?<=[#\\s])([^aeiou])${IPA.SYLLABIC}`, replacement: "$1ə" },
			{ name: "Initial syllabic consonant", pattern: `(?<=[#\\s])([^aeiou])${IPA.SYLLABIC_ALT}`, replacement: "$1ə" },
			{ name: "Syllabic consonant", pattern: `([^aeiou])${IPA.SYLLABIC}`, replacement: "ə$1" },
			{ name: "Syllabic consonant", pattern: `([^aeiou])${IPA.SYLLABIC_ALT}`, replacement: "ə$1" }
		]
	},
	{
		category: "Schwa",
		regex: [
			{ name: "Final rhotic schwa", pattern: "əw(?=[#\\s])", replacement: "a" },
			{ name: "Final schwa", pattern: "ə(?=[#\\s])", replacement: "a" },
			{ name: "Delete word-initial unstressed schwa", pattern: "(?<=[#\\s])(?<!['ˈˌ])ə\\.", replacement: "" },
			{ name: "Assimilate schwas to preceding vowel", pattern: "([aeiou])([^\\s]*)\\.([^aeiou]*)ə", replacement: "$1$2.$3$1" },
			{ name: "Assimilate leading schwas to next vowel", pattern: "ə(?=[^aeiouə]*(?:\\.[^aeiouə]*ə)*\\.[^aeiou]*([aeiou]))", replacement: "$1" },
			{ name: "Assimilate schwa in diphthong", pattern: `(?<=[^aeiou#.\\s])([aeiou])${IPA.NONSYLLABIC}?ə|ə([aeiou])${IPA.NONSYLLABIC}?`, replacement: "$1$2" },
			{ name: "Misc schwa", pattern: "ə", replacement: "a" }
		]
	},
	{
		category: "Metathesis",
		regex: [
			{ name: "Metathesis of coda consonant and onset nasal", pattern: `([^aeioun])\\.n(?=[aeiou]+([jw${IPA.NONSYLLABIC}])?n)`, replacement: "n.$1" },
			{ name: "Shift nasal to coda to avoid cluster", pattern: `(?<=[^aeioun]\\.)(n)([aeiou]+${IPA.NONSYLLABIC}?)(?!\\.?[nm])`, replacement: "$2$1" }
		]
	},
	{
		category: "Glides and Diphthongs",
		regex: [
			{ name: "Reduce weak high front vowel in diphthong", pattern: `(?<=[aeiou])i${IPA.NONSYLLABIC}?|i${IPA.NONSYLLABIC}?(?=[aeiou])`, replacement: "j" },
			{ name: "Reduce weak high back vowel in diphthong", pattern: `(?<=[aeiou])u${IPA.NONSYLLABIC}?|u${IPA.NONSYLLABIC}?(?=[aeiou])`, replacement: "w" },
			{ name: "Expand non-initial syllable with [j] using dipthong with [w]", pattern: "(?<![#\\s])([^aeiou#\\s\\.ˈ'ˌ])j([aeiou])w(?=[.#//s])", replacement: "$1$2ju" },
			{ name: "Expand non-initial syllable with [w] using diphthong with [j]", pattern: "(?<![#\\s])([^aeiou#\\s\\.ˈ'ˌ])w([aeiou])j(?=[.#//s])", replacement: "$1$2wi" },
			{ name: "Expand non-initial syllable with [j] using dipthong", pattern: "(?<![#\\s])([^aeiou#\\s\\.ˈ'ˌ])j([aeiou])([aeo])", replacement: "$1$2j$3" },
			{ name: "Expand non-initial syllable with [w] using diphthong", pattern: "(?<![#\\s])([^aeiou#\\s\\.ˈ'ˌ])w([aeiou])([ae])", replacement: "$1$2w$3" },
			{ name: "Expand non-initial syllable with [w]", pattern: "(?<![#\\s][ˈ'ˌ]?)(?<![^aeiou#\\s\\.ˈ'ˌ])([^aeiou#\\s\\.ˈ'ˌ]+)w(?=[aeiou])", replacement: "$1u.w" },
			{ name: "Expand non-initial syllable with [j]", pattern: "(?<![#\\s][ˈ'ˌ]?)(?<![^aeiou#\\s\\.ˈ'ˌ])([^aeiou#\\s\\.ˈ'ˌ]+)j(?=[aeiou])", replacement: "$1i.j" },
			{ name: "Non-syllabic low vowels", pattern: `[a]${IPA.NONSYLLABIC}`, replacement: ""},
			{ name: "Non-syllabic front vowels", pattern: `(?<=[aeiou])[ie](${IPA.NONSYLLABIC})|[ie](${IPA.NONSYLLABIC})(?=[aeiou])`, replacement: "j"},
			{ name: "Non-syllabic back vowels", pattern: `(?<=[aeiou])[ou](${IPA.NONSYLLABIC})|[ou](${IPA.NONSYLLABIC})(?=[aeiou])`, replacement: "w"},
			{ name: "Diphthong reduction", pattern: "(?<=[aeiou])[aeiou]", replacement: "" }
		]
	},
	{
		category: "Vowel and Stress Markings",
		regex: [
			{ name: "Remove stress markings", pattern: "['ˈˌ]", replacement: "" },
			{ name: "Remove non-syllabic vowel markings", pattern: `${IPA.NONSYLLABIC}`, replacement: "" }
		]
	},
	{
		category: "Consonant Clusters",
		regex: [
			{ name: "Preserve nasal in previous empty coda", pattern: "\\.n(?=[^aeioumn])", replacement: "n." },
			{ name: "Remove glide in cluster", pattern: "(?<=[ptknmsl])(w|l|j)+", replacement: "" },
			{ name: "Preserve last consonant in cluster", pattern: "([mnptkswlj])(?=[mnptkswlj])", replacement: "" }
		]
	},
	{
		category: "Codas",
		regex: [
			{ name: "Preserve coda consonant in following empty onset", pattern: "([^aeiou])(n*)\\.([aeiou])", replacement: "$2.$1$3" },
			{ name: "Move coda to empty onset", pattern: "(?<=[aeioun]\\.)([aeiou])([^aeioun#\\.\\s])(?=[.#\\s])", replacement: "$2$1" },
			{ name: "Remove coda consonants", pattern: "[^aeioun#.\\s]+(?=[^aeiou]*[\\.#\\s])", replacement: "" }
		]
	},
	{
		category: "Illegal Sequences",
		regex: [
			{ name: "Resolve illegal sequence [ti] to [si]", pattern: "ti", replacement: "si" },
			{ name: "Reduce illegal sequence [wo]", pattern: "wo", replacement: "o" },
			{ name: "Reduce illegal sequence [wu]", pattern: "wu", replacement: "u" },
			{ name: "Reduce illegal sequence [ji]", pattern: "ji", replacement: "i" },
			{ name: "Remove coda in illegal sequence [n.m]", pattern: "n\\.m", replacement: ".m" },
			{ name: "Remove coda in illegal sequence [n.n]", pattern: "n\\.n", replacement: ".n" }
		]
	},
	{
		category: "Vowel Hiatus",
		regex: [
			{ name: "Insert [w] before [a] after non-front vowel", pattern: "(?<=[aou]\\.)a", replacement: "wa" },
			{ name: "Insert [j] before [a] after front vowel", pattern: "(?<=[ie]\\.)a", replacement: "ja" },
			{ name: "Insert [w] before [e] after back vowel", pattern: "(?<=[ou]\\.)e", replacement: "we" },
			{ name: "Insert [j] before [e] after non-back vowel", pattern: "(?<=[aei]\\.)e", replacement: "je" },
			{ name: "Resolve hiatus with [w] before [i]", pattern: "(?<=[aeiou]\\.)i", replacement: "wi" },
			{ name: "Resolve hiatus with [j] before [o]", pattern: "(?<=[aeiou]\\.)o", replacement: "jo" },
			{ name: "Resolve hiatus with [j] before [u]", pattern: "(?<=[aeiou]\\.)u", replacement: "ju" }
		]
	}
]

function tokiponize(n){
	const history = [];
	
	//Clean whitespace
	n = n.replace(/\s/g, " ").trim();
	//Boundary marking
	n = "#" + n + "#";
	//Remove IPA brackets
	n = n.replace(/[\/\[\]]/g, "");
	//Diacritic separation
	n = n.normalize("NFD");
	//Fix duplicate stress markings
	n = n.replace(/(['ˈˌ])\1+/g, "$1");
	//Fix stress markings without boundary
	n = n.replace(/(?<![.#\s])(['ˈˌ])/g, ".$1");

	//Rules loop
	rules.forEach((step) => {

		const category = {
            category: step.category,
            rules: []
        };
		
		step.regex.forEach((rule) => {
			//Get matches of rule
			const matches = [...n.matchAll(new RegExp(rule.pattern, "g"))]
				.map(match => match[0].replace(/#/g, "")); // Get full match without boundary mark
			
			//Execute replacement if it exists
			if (rule.replacement !== undefined) {
				n = n.replace(new RegExp(rule.pattern, rule.flag ?? "g"), rule.replacement);
			}

			//Add to rule log if executed
			if (matches.length > 0){
				category.rules.push({
					name: rule.name,
					matches: matches,
					...(rule.replacement !== undefined && { result: n.replace(/#/g, "") }), // Add results without boundary marks if rule has replacement
					...(rule.type !== undefined && { type: rule.type }), // Add rule type if it exists
				});
			};
		});

		//Log category
		if (category.rules.length > 0) {
            history.push(category);
        }
	});

	//Removal of dividing marks
	n = n.replace(/[#\.]/g,"")
	//Capitalization
	.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

	const result = new String(n);
	result.history = history;

	return result;
}
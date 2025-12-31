function transliterator(){
	const input = document.getElementById("name").value;
	document.getElementById("nimi").innerHTML = tokiponize(input);
	document.getElementById("poki-lawa").innerHTML = `
		<h2>Rules Applied</h2>
		<table class="linja-poki">
			${tokiponize(input).history.map(entry => 
				`<tr>
				<th colspan="3" scope="colgroup" style="scroll-snap-align:start; background-color: ${entry.category === 'Warnings' ? 'var(--warning-color)' : 'var(--bg-color)'}">
					${entry.category}
				</th>
				</tr>
				
				${entry.rules.map(rule => `
				<tr>
					<th rowspan="2" scope="row" ${rule.result === undefined ? 'colspan="2"' : ''}>
					${rule.name}
					</th>
					<th>Match</th>
					${rule.result !== undefined ? `<th>Result</th>` : ''}
				</tr>
				<tr>
					<td><code>${rule.matches.join(', ')}</code></td>
					${rule.result !== undefined ? `<td class="linja-poki" lang="und-Latn-fonipa">${rule.result}</td>` : ''}
				</tr>`).join('')}
			`).join('')}
		</table>`
	}

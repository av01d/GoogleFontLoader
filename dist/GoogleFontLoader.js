/**
 * GoogleFontLoader - A super simple Google Font Loader.
 *
 * Made by Arjan Haverkamp, https://www.webgear.nl
 * Copyright 2020-2024 Arjan Haverkamp
 * MIT Licensed
 * @version 1.0 - 2024-08-15
 * @url https://github.com/av01d/GoogleFontLoader
 */
const GoogleFontLoader = (() => {
	
	/**
	 * Load one or multiple Google Fonts
	 * Returns a promise.
	 *
	 * @param {Array} fonts Fonts to load, f.e: ['Anton:400','Pacifico','Londrina:900i']
	 * @return {Promise} A promise which is resolved once all fonts are ready to use
	 */
	const load = fonts => {
		const urlArgs = []
		const families = {}
		const fontsToLoad = []

		for (let font of new Set(fonts)) {// De-dupe
			let [fontFamily, fontVariant] = font.split(':', 2)
			fontVariant = fontVariant || '400'
		 
			if (!(fontFamily in families)) {
				families[fontFamily] = {normal:new Set(), italic:new Set()}
		 	}
		 
			let weight = 400
			if (/(\d+)/.test(fontVariant)) {// Font weight: 100..900
				weight = +RegExp.$1
			}

			if (/i$/.test(fontVariant)) {// Italic
				families[fontFamily].italic.add(weight)
			}
			else {
				families[fontFamily].normal.add(weight)
			}
		}
		
		for (let fam in families) {
			const props = families[fam]
		
			let arg = encodeURIComponent(fam)
			if (props.normal.size == 1 && props.italic.size == 0 && props.normal.has(400)) {
				urlArgs.push('family=' + arg)
				fontsToLoad.push(`400 1em '${fam}'`)
				continue
			}
		
			arg += (props.italic.size > 0) ? ':ital,wght@' : ':wght@'
		
			const wargs = []
			for (let weight of props.normal) {
				wargs.push(props.italic.size > 0 ? '0,' + weight : weight)
				fontsToLoad.push(`${weight} 1em '${fam}'`)
			}
		
			for (let weight of props.italic) {
		 		wargs.push('1,' + weight)
				fontsToLoad.push(`italic ${weight} 1em '${fam}'`)
			}
			 	
			urlArgs.push('family=' + arg + wargs.join(';'))
		}
	
		const googleFontUrl = 'https://fonts.googleapis.com/css2?' + urlArgs.join('&') + '&display=swap'
		//console.log('Font Url', googleFontUrl)
		
		return new Promise(resolve => {
			const linkEl = document.createElement('link')
			linkEl.rel = 'stylesheet'
			linkEl.href = googleFontUrl

			linkEl.addEventListener('load', () => {
				const promises = []
				fontsToLoad.map(f => { promises.push(document.fonts.load(f)) })
				Promise.all(promises).then(resolve)
			})

			document.head.appendChild(linkEl)
		})
	}	
	
	return { load }
})()

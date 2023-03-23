// Import optionsStorage from './options-storage.js';

console.log('💈 Content script loaded for', chrome.runtime.getManifest().name);

// Document.body.style.backgroundColor = "orange";

// console.log('doc', document.getElementById('editorcontainer'))
// console.log('iframe', document.querySelector('iframe'))

// const test = document.querySelector('div')
// console.log('test', test)

chrome.storage.sync.get('doSpellcheck').then(result => {
	console.log('Value currently is', result.doSpellcheck);
	if (result.doSpellcheck) {
		setTimeout(spellcheck, 3000);
	}
});

function spellcheck(enable = true) {
	const outerFrame = document.querySelector('#editorcontainer').firstChild;
	console.log('outerFrame', outerFrame);
	const innerFrame = outerFrame.contentWindow.document.querySelector('iframe');
	console.log('innerFrame', innerFrame);

	const innerDoc = innerFrame.contentWindow.document.querySelector('#innerdocbody');
	console.log('innerDoc', innerDoc);

	const spellcheck = {
		enable() {
			console.log('enable spellcheck');
			innerDoc.setAttribute('spellcheck', 'true');
		},
		disable() {
			console.log('disable spellcheck');
			innerDoc.setAttribute('spellcheck', 'false');
		},
	};
	if (enable) {
		spellcheck.enable();
	} else {
		spellcheck.disable();
	}
}

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
	if (data) {
		// Do something amazing
	}

	sendResponse({
		received: true,
	});
});

// Chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
// 	console.log('message', request, sender)
// 	if (request === 'spellcheck_enable') {
// 		spellcheck(true)
// 	}
// 	else if (request === 'spellcheck_disable') {
// 		spellcheck(false)
// 	}
// });

/*
async function init() {
	const options = await optionsStorage.getAll();
	const color = 'rgb(' + options.colorRed + ', ' + options.colorGreen + ',' + options.colorBlue + ')';
	const text = options.text;
	const notice = document.createElement('div');
	notice.innerHTML = text;
	document.body.prepend(notice);
	notice.id = 'text-notice';
	notice.style.border = '2px solid ' + color;
	notice.style.color = color;

	function setUp() {
		const test = document.querySelector('div')
		console.log('test', test)

		const outerFrame = document.querySelector('iframe[name="ace_outer"]')
		console.log('outerFrame', outerFrame)
		const innerFrame = outerFrame.contentWindow.document.querySelector('iframe')
		console.log('innerFrame', innerFrame)
		const innerDoc = document.querySelector('#innerdocbody')

		console.log('innerDoc', innerDoc)

		const spellcheck = {
			enable: () => {
				console.log('enable spellcheck')
				innerDoc.setAttribute('spellcheck', 'true')
			},
			disable: () => {
				console.log('disable spellcheck')
				innerDoc.setAttribute('spellcheck', 'false')
			},
		}
		spellcheck.enable()
	}

	setUp()

}
*/

// init();

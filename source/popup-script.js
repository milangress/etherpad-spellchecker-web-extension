
console.log('test popup');

// Const enable = true

const input = document.querySelector('#spell');

let active = false;

chrome.storage.local.get('doSpellcheck').then(result => {
	console.log('Value currently is', result.doSpellcheck);
	active = result.doSpellcheck;
	clickButton();
});

chrome.storage.local.get(null, items => {
	console.log(items);
});

if (input) {
	input.addEventListener('mousedown', clickButton, false);
}

function setButton() {
	console.log('button?', active);
	if (active) {
		input.innerHTML = '💀💀💀';
		input.classList.remove('active');
	} else {
		input.innerHTML = '🌱 yaaas';
		input.classList.add('active');
	}
}

function clickButton() {
	console.log('active?', active);
	if (active) {
		chrome.storage.local.set({doSpellcheck: true}).then(() => {
			console.log('Value is set to ' + true);
		});
		sendMessage(true);
		setButton();
	} else {
		chrome.storage.local.set({doSpellcheck: false}).then(() => {
			console.log('Value is set to ' + false);
		});
		sendMessage(false);
		setButton();
	}

	active = !active;
}

function sendMessage(enable = true) {
	chrome.tabs.query({
		active: true,
		currentWindow: true,
	}, tabs => {
		chrome.scripting.executeScript({
			target: {
				tabId: tabs[0].id,
			},
			function: spellcheck,
			args: [enable],
		});
	});
}

const spellcheck = async (enable = true) => {
	console.log('set Spellcheck:', enable);
	const outerFrame = document.querySelector('#editorcontainer').firstChild;
	// Console.log('outerFrame', outerFrame);
	const innerFrame = outerFrame.contentWindow.document.querySelector('iframe');
	// Console.log('innerFrame', innerFrame);

	const innerDoc = innerFrame.contentWindow.document.querySelector('#innerdocbody');
	// Console.log('innerDoc', innerDoc);

	const spellcheck = {
		enable() {
			// Console.log('enable spellcheck');
			innerDoc.setAttribute('spellcheck', 'true');
			innerDoc.focus();
			innerDoc.blur();
			for (const element of innerDoc.children) {
				console.log(element.id);
				element.setAttribute('spellcheck', 'true');
				element.focus();
				element.blur();
			}
		},
		disable() {
			// Console.log('disable spellcheck');
			innerDoc.setAttribute('spellcheck', 'false');
			innerDoc.focus();
			innerDoc.blur();
			for (const element of innerDoc.children) {
				console.log(element.id);
				element.setAttribute('spellcheck', 'false');
				element.focus();
				element.blur();
			}
		},
	};
	if (enable) {
		spellcheck.enable();
	} else {
		spellcheck.disable();
	}

	// Chrome.runtime.sendMessage({
	// 	count: 12,
	// 	data: []
	// }, function(response) {
	// 	console.log(response.received);
	// });
};


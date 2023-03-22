
console.log('test popup')

//const enable = true

var input = document.querySelector('#spell');

chrome.storage.sync.get("doSpellcheck").then((result) => {
	console.log("Value currently is ", result.doSpellcheck);
	input.checked = result.doSpellcheck
	if(result.doSpellcheck) {
		sendMessage(true)
	}
});

chrome.storage.sync.get(null, function callback(items) { console.log(items) });


if (input) {
	input.addEventListener('change', doalert, false);
}
function doalert(id){
	if(this.checked) {
		chrome.storage.sync.set({ doSpellcheck: true }).then(() => {
			console.log("Value is set to " + true);
		});
		sendMessage(true)
	}else{
		chrome.storage.sync.set({ doSpellcheck: false }).then(() => {
			console.log("Value is set to " + false);
		});
		sendMessage(false)
	}
}

function sendMessage(enable = true) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.scripting.executeScript({
			target: {
				tabId: tabs[0].id
			},
			function: spellcheck,
			args: [enable]
		});
	});
}


const spellcheck = async (enable = true) => {

	const outerFrame = document.querySelector('#editorcontainer').firstChild
	console.log('outerFrame', outerFrame)
	const innerFrame = outerFrame.contentWindow.document.querySelector('iframe')
	console.log('innerFrame', innerFrame)

	const innerDoc = innerFrame.contentWindow.document.querySelector('#innerdocbody')
	console.log('innerDoc', innerDoc)


	const spellcheck = {
		enable: () => {
			console.log('enable spellcheck')
			innerDoc.setAttribute('spellcheck', 'true')
			innerDoc.focus()
			innerDoc.blur()
			for (const el of innerDoc.children) {
				console.log(el.id)
				el.setAttribute('spellcheck', 'true')
				el.focus()
				el.blur()
			}
		},
		disable: () => {
			console.log('disable spellcheck')
			innerDoc.setAttribute('spellcheck', 'false')
			innerDoc.focus()
			innerDoc.blur()
			for (const el of innerDoc.children) {
				console.log(el.id)
				el.setAttribute('spellcheck', 'false')
				el.focus()
				el.blur()
			}
		},
	}
	if(enable) {
		spellcheck.enable()
	} else {
		spellcheck.disable()
	}

	// chrome.runtime.sendMessage({
	// 	count: 12,
	// 	data: []
	// }, function(response) {
	// 	console.log(response.received);
	// });

}


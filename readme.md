# 🌱 Ether-Spell 🌱

> activate spellchecking in Etherpad (browser extension)

![Sample extension options output](media/bg.png)



> **Warning**
>
> Turning Spellchecking on can deteriorate your performance (especially on older computers and with more active participants.)

As a very dyslexic person that is highly dependent on spellcheckers, and considers them as assistive devices. I'm increasingly frustrated that ether-pad does not provide a spellcheck solution. This plugin is still a work in progress, so if you find an ether-pad installation that does not function with this plugin, please reach out to me.



## Getting started

### 🛠 Build locally

1. Checkout the copied repository to your local machine eg. with `git clone https://github.com/milangress/etherpad-spellchecker-web-extension`
1. Run `npm install` to install all required dependencies
1. Run `npm run build`

The build step will create the `distribution` folder, this folder will contain the generated extension.

### 🏃 Run the extension

Using [web-ext](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) is recommended for automatic reloading and running in a dedicated browser instance. Alternatively you can load the extension manually (see below).

1. Run `npm run watch` to watch for file changes and build continuously
1. Run `npm install --global web-ext` (only only for the first time)
1. In another terminal, run `web-ext run -t chromium`
1. Check that the extension is loaded by opening the extension options ([in Firefox](media/extension_options_firefox.png) or [in Chrome](media/extension_options_chrome.png)).

#### Manually

You can also [load the extension manually in Chrome](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#google-chrome-opera-vivaldi) or [Firefox](https://www.smashingmagazine.com/2017/04/browser-extension-edge-chrome-firefox-opera-brave-vivaldi/#mozilla-firefox).

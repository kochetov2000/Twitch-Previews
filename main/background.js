(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-134155755-2', 'auto');

ga('set', 'checkProtocolTask', null);
ga('send', 'pageview', 'main');

var HEART_BEAT_INTERVAL_MS = 325000;
var lastHeartBeat = new Date().getTime() - HEART_BEAT_INTERVAL_MS;

/*chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "update")
    {
        chrome.tabs.create({url:"updatePopup.html"});
        try {
            ga('send', 'event', 'updatePopup_show-v1.2.5', 'updatePopup_show-v1.2.5', "updatePopup_show-v1.2.5");
        } catch (e) {

        }

    }
});*/

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    switch(msg.action) {
        case "bg_update_imagePreviewMode":
            ga('send', 'event', 'preview_mode', 'change', msg.detail ? "image":"video");
            break;
        case "bg_update_previewSize":
            ga('send', 'event', 'preview_size', 'change', msg.detail);
            break;
        case "bg_popup_opened":
            ga('send', 'event', 'popup_opened', 'popup.html');
            break;
        case "appStart":
            ga('send', 'event', 'appStart', 'content.js', msg.detail);
            break;
        case "heartbeat":
            if (new Date().getTime() - lastHeartBeat >= HEART_BEAT_INTERVAL_MS - 500) {
                ga('send', 'event', 'heartbeat', 'heartbeat');
                lastHeartBeat = new Date().getTime();
            }
            break;
        default:

    }
    sendResponse({ result: "any response from background" });
    return true;
});
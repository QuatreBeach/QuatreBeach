(function (d, s, id) {
    const el = d.getElementsByTagName(s)[0];
    if (d.getElementById(id) || el.parentNode == null) {
        return;
    }
    var js = d.createElement(s);
    js.id = id;
    js.async = true;
    js.src = 'https://sdk.zenchef.com/v1/sdk.min.js';
    el.parentNode.insertBefore(js, el);
})(document, 'script', 'zenchef-sdk')
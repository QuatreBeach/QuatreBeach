// if (window.history.replaceState) {
// 	var currentPath = window.location.pathname;
// 	var currentHash = window.location.hash;
// 	if (currentPath.endsWith('/')) {
// 		currentPath = currentPath.slice(0, -1); // Verwijder de laatste slash
// 	}
// 	var newUrl = currentPath.replace('.html', '') + currentHash;
// 	window.history.replaceState(null, null, newUrl);
//   }

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:5019130,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
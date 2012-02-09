1. Insta gallery is a SPWA(single page web application) created using OOJS, backbone.JS and the Instagram API  

2. It has bookmarkable url's and deep-linking curtesy of backbone routers.

3. the app is very fast as: views are cached as JS objects, there are not calls to the servers once the initial page is downloaded

3. This app is an example of a thin server(the instagram app is a web service providing JSON rather than rendered HTML) and a fat client the users browsers does the display logic work. This makes the app very response, gets rid of user flow interuption via page reloading, cuts down on latency associated with round trips to server to request html.    
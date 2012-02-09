1. Insta gallery is a SPWA(single page web application) created using OOJS, backbone.JS and the Instagram API  

2. It has bookmarkable url's and deep-linking courtesy of backbone routers.

3. the app is very fast because: views are cached as JS objects, there are no calls to the servers once the initial page is downloaded

3. This app is an example of a thin server(the instagram API is a web service providing JSON when needed - rather than rendered HTML and images etc) and a fat client; the users browsers does the display logic work and event handling. This makes the app very responsive, gets rid of user flow interuption via page reloading in the traditional server/client model, and cuts down on the latency associated with round trips to server to request html.  
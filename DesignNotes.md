## My Notes

* I considered using a Factory pattern to generate the individual rows that are rendered inside a <FlatList>. But really, the code is much more unstandable WITHOUT doing that. Right now, my code is basic but understandable. What would it look like if I create some method called "createListItem(label, styles, callback)" inside a file called ListRowFactory.js? It's more convoluted that way, and only serves to (try to) show that I'm some sort of manly-man programmer"

* Styles: I will beat the styles into submission, and have styles that are shared between similar component types. (Update: styles had been successfully beaten into submission, with the file master.js containing several reusuable styles).

* I'll make some effort to be cross-platform, but I don't own a mac to develop on.

* I try to order my imports like this:
** React
** React-Native
** Third-party React Libraries
** Third-party libraries (lodash, moment)
** Custom components
** Custom styles

* After weeks of trying (not counting my day job and sleep), I managed to figure out Redux and Thunk. This will be important when I implement the Settings and the settings affect the rest of the app.


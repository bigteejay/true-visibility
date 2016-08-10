true-visibility 0.2.0
=====================

Checks if a DOM element is able to be visible.  This means that it
could be viewable (but it's parent is scrolled such that you can't
currently see it.)  Essentially, with scrolling accounted for, could
the element be entirely viewed within its parent.


Installation
------------

```
    bower install git+https://github.com/bigteejay/true-visibility --save
```

Development
------------

```
    git clone https://github.com/bigteejay/true-visibility
    cd true-visibility
    git config user.name {username}
    git config user.email {email}
    npm install
    gulp [default]
```

Usage
-----

isVisible accepts elements and selector strings.

true-visibility is UMD compatible. Depending on your environment, you can use true-visibility as follows.

```js
    requirejs( [ 'true-visibility' ], function( isVisible )
    {
        isVisible( 'body' ) // true
    } );
```

or

```js
    let isVisible = require( 'true-visibility' );
    isVisible( 'body' ); // true
```

or

```js
    var bodyElement = document.getElementById( 'body' );
    isVisible( bodyElement ); // true
```



Need to report something? [twjohnso@hotmail.com](twjohnso@hotmail.com)


Changes
-------

+ 0.2.1
    + External sourcemaps

+ 0.2.0
    + Forked from [https://github.com/mousemke/true-visibility](https://github.com/mousemke/true-visibility)
    + Significant rewrite to visibility detection method 
    + Added bower (considering registering this package)
    + Build system revised to require running jshint first (successfully)
    + Now generates/includes sourcemap
    + Updated dist
    + Updated readme

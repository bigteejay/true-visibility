// Configure JSHint
//  Predefined globals, false = read only
/* globals getComputedStyle:false */



/**
 * ## isVisible
 *
 * @author Jason Farrell (http://useallfive.com/)
 * @author Mouse Braun (mouse@knoblau.ch)
 * @author bigteejay (twjohnso@hotmail.com)
 *
 * Checks if a DOM element is truly visible.
 */
( function( root, factory )
{
    if ( typeof define === 'function' && define.amd )
    {
        define( 'true-visibility', [], factory );
    }
    else if ( typeof module === 'object' && module.exports )
    {
        module.exports = factory();
    }
    else
    {
        root.isVisible = factory();
    }
}
( this, function()
{
    var isVisible = function( _el )
    {
        'use strict';
        
        var VISIBLE_PADDING = 2;

        /*
         * allows selector strings
         */
        if ( typeof _el === 'string' )
        {
            _el = document.querySelector( _el );
        }

        /**
         * ## inDocument
         *
         * checks if an element is in the document
         *
         * @param {DOMElement} element element to check
         *
         * @return {Boolean} in document or not
         */
        var _inDocument = function( element )
        {
            /*jshint -W084 */
            while ( element = element.parentNode )
            /*jshint +W084 */
            {
                if ( element === document )
                {
                    return true;
                }
            }
            return false;
        };

        /**
         * ## _isVisible
         *
         * Checks if a DOM element is visible. Takes into
         * consideration its parents and overflow.
         *
         * @param {DOMElement} el the DOM element to check if is visible
         *
         * @return _Boolean_ [description]
         */
        var _isVisible = function( el )
        {
            var style = getComputedStyle( el );

            if ( style.opacity === '0' || style.display === 'none' ||
                style.visibility === 'hidden' )
            {
                return false;
            }

            var p = el.parentNode;

            if ( p )
            {
                if ( p === document )
                {
                    return true;
                }

                var pStyle      = getComputedStyle( p );
                var pOverflow   = pStyle.overflow;
                
                var cRect       = el.getBoundingClientRect();
                var pRect       = p.getBoundingClientRect();

                /**
                 * check if the target element is to the right, left, under, or
                 * above it's parent
                 */
                if ( pOverflow === 'hidden' || pOverflow === 'scroll' )
                {
                    var inScrollableBounds = (
                        cRect.top + VISIBLE_PADDING >= pRect.top &&
                        cRect.right - VISIBLE_PADDING <= pRect.right + p.scrollLeft &&
                        cRect.bottom - VISIBLE_PADDING <= pRect.bottom + p.scrollTop &&
                        cRect.left + VISIBLE_PADDING >= pRect.left
                    );
                    
                    //-- Our target element is out of bounds
                    if ( !inScrollableBounds ) {
                        return false;
                    }
                }

                return _isVisible( p );
            }

            return true;
        };

        /*
         * only check once.  it's parents aren't going to be any more or less in
         * the document
         */
        if ( !_el || !_inDocument( _el ) )
        {
            return false;
        }

        return _isVisible( _el );
    };

    return isVisible;
} ) );

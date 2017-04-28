/*
 *  Container for constants used in API libraries
 */
var redirect = window.location.origin + window.location.pathname;

module.exports = {
    ONE_WEEK: 1000 * 60 * 60 * 24 * 7,
    POPUP_OPTIONS: 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=700,height=500,left=0,top=0',
    IG_OAUTH: 'https://instagram.com/oauth/authorize/?client_id=b65667258de24751b48afb4c83c2f936&redirect_uri='+ redirect +'&response_type=token',
    IG_FEED: 'https://api.instagram.com/v1/users/self/media/recent/?callback=_instaFeed&access_token=',
    IG_COOKIE: 'ig_token',
    PIN_APP: '4890827866886913386',
    PIN_BOARD_FIELDS: 'id,name,image[large]',
    PIN_PIN_FIELDS: 'id,image',
    PIN_SCOPE: 'read_public, write_public'
};

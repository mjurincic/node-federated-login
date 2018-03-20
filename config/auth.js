// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    'facebookAuth': {
        'clientID': '2068817263375347', // your App ID
        'clientSecret': '79b453a83d64c475a2d40608cb1a2451', // your App Secret
        'callbackURL': 'https://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields': ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
    'twitterAuth': {
        'consumerKey': 'WrfF1A5Vr2h1p3A2n8qcmZdTC',
        'consumerSecret': 'DZWlO1u1Phjwj4rJu4ewja70NBxCzHgeCD6b2JfkIvjLzIjK6e',
        'callbackURL': 'https://localhost:8080/auth/twitter/callback'
    },
    'googleAuth': {
        'clientID': '313803789173-ahgvd3ihtm5fjkkujtda2ceuaf5la6jk.apps.googleusercontent.com',
        'clientSecret': 'jZSiV-DgycSM80fVM3WC0EFR',
        'callbackURL': 'https://localhost:8080/auth/google/callback'
    }
};

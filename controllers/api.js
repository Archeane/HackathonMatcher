/*
const { promisify } = require('util');
const request = require('request');
const cheerio = require('cheerio');
const graph = require('fbgraph');
const { LastFmNode } = require('lastfm');
const tumblr = require('tumblr.js');
const GitHub = require('@octokit/rest');
const Twit = require('twit');
const stripe = require('stripe')(process.env.STRIPE_SKEY);
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const Linkedin = require('node-linkedin')(process.env.LINKEDIN_ID, process.env.LINKEDIN_SECRET, process.env.LINKEDIN_CALLBACK_URL);
const clockwork = require('clockwork')({ key: process.env.CLOCKWORK_KEY });
const paypal = require('paypal-rest-sdk');
const lob = require('lob')(process.env.LOB_KEY);
const ig = require('instagram-node').instagram();
const { Venues, Users } = require('node-foursquare')({
  secrets: {
    clientId: process.env.FOURSQUARE_ID,
    clientSecret: process.env.FOURSQUARE_SECRET,
    redirectUrl: process.env.FOURSQUARE_REDIRECT_URL
  },
  foursquare: {
    mode: 'foursquare',
    version: 20140806,
  }
});

exports.getApi = (req, res) => {
  res.render('api/index', {
    title: 'API Examples'
  });
};

exports.getFoursquare = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'foursquare');
  try {
    const getTrendingAsync = promisify(Venues.getTrending);
    const getVenueAsync = promisify(Venues.getVenue);
    const getCheckinsAsync = promisify(Users.getCheckins);
    const trendingVenues = await getTrendingAsync('40.7222756', '-74.0022724', { limit: 50 }, token.accessToken);
    const venueDetail = await getVenueAsync('49da74aef964a5208b5e1fe3', token.accessToken);
    const userCheckins = await getCheckinsAsync('self', null, token.accessToken);
    return res.render('api/foursquare', {
      title: 'Foursquare API',
      trendingVenues,
      venueDetail,
      userCheckins
    });
  } catch (err) {
    return next(err);
  }
};


exports.getTumblr = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'tumblr');
  const client = tumblr.createClient({
    consumer_key: process.env.TUMBLR_KEY,
    consumer_secret: process.env.TUMBLR_SECRET,
    token: token.accessToken,
    token_secret: token.tokenSecret
  });
  client.blogPosts('mmosdotcom.tumblr.com', { type: 'photo' }, (err, data) => {
    if (err) { return next(err); }
    res.render('api/tumblr', {
      title: 'Tumblr API',
      blog: data.blog,
      photoset: data.posts[0].photos
    });
  });
};


exports.getFacebook = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'facebook');
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err, profile) => {
    if (err) { return next(err); }
    res.render('api/facebook', {
      title: 'Facebook API',
      profile
    });
  });
};


exports.getScraping = (req, res, next) => {
  request.get('https://news.ycombinator.com/', (err, request, body) => {
    if (err) { return next(err); }
    const $ = cheerio.load(body);
    const links = [];
    $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
      links.push($(element));
    });
    res.render('api/scraping', {
      title: 'Web Scraping',
      links
    });
  });
};


exports.getGithub = async (req, res, next) => {
  const github = new GitHub();
  try {
    const { data: repo } = await github.repos.get({ owner: 'sahat', repo: 'hackathon-starter' });
    res.render('api/github', {
      title: 'GitHub API',
      repo
    });
  } catch (error) {
    next(error);
  }
};


exports.getAviary = (req, res) => {
  res.render('api/aviary', {
    title: 'Aviary API'
  });
};


exports.getNewYorkTimes = (req, res, next) => {
  const query = {
    'list-name': 'young-adult',
    'api-key': process.env.NYT_KEY
  };
  request.get({ url: 'http://api.nytimes.com/svc/books/v2/lists', qs: query }, (err, request, body) => {
    if (err) { return next(err); }
    if (request.statusCode === 403) {
      return next(new Error('Invalid New York Times API Key'));
    }
    const books = JSON.parse(body).results;
    res.render('api/nyt', {
      title: 'New York Times API',
      books
    });
  });
};


exports.getLastfm = async (req, res, next) => {
  const lastfm = new LastFmNode({
    api_key: process.env.LASTFM_KEY,
    secret: process.env.LASTFM_SECRET
  });
  const getArtistInfo = () =>
    new Promise((resolve, reject) => {
      lastfm.request('artist.getInfo', {
        artist: 'Roniit',
        handlers: {
          success: resolve,
          error: reject
        }
      });
    });
  const getArtistTopTracks = () =>
    new Promise((resolve, reject) => {
      lastfm.request('artist.getTopTracks', {
        artist: 'Roniit',
        handlers: {
          success: ({ toptracks }) => {
            resolve(toptracks.track.slice(0, 10));
          },
          error: reject
        }
      });
    });
  const getArtistTopAlbums = () =>
    new Promise((resolve, reject) => {
      lastfm.request('artist.getTopAlbums', {
        artist: 'Roniit',
        handlers: {
          success: ({ topalbums }) => {
            resolve(topalbums.album.slice(0, 3));
          },
          error: reject
        }
      });
    });
  try {
    const { artist: artistInfo } = await getArtistInfo();
    const topTracks = await getArtistTopTracks();
    const topAlbums = await getArtistTopAlbums();
    const artist = {
      name: artistInfo.name,
      image: artistInfo.image ? artistInfo.image.slice(-1)[0]['#text'] : null,
      tags: artistInfo.tags ? artistInfo.tags.tag : [],
      bio: artistInfo.bio ? artistInfo.bio.summary : '',
      stats: artistInfo.stats,
      similar: artistInfo.similar ? artistInfo.similar.artist : [],
      topTracks,
      topAlbums
    };
    res.render('api/lastfm', {
      title: 'Last.fm API',
      artist
    });
  } catch (err) {
    next(err);
  }
};


exports.getTwitter = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'twitter');
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  try {
    const { data: { statuses: tweets } } = await T.get('search/tweets', {
      q: 'nodejs since:2013-01-01',
      geocode: '40.71448,-74.00598,5mi',
      count: 10
    });
    res.render('api/twitter', {
      title: 'Twitter API',
      tweets
    });
  } catch (error) {
    next(error);
  }
};


exports.postTwitter = (req, res, next) => {
  req.assert('tweet', 'Tweet cannot be empty').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/api/twitter');
  }

  const token = req.user.tokens.find(token => token.kind === 'twitter');
  const T = new Twit({
    consumer_key: process.env.TWITTER_KEY,
    consumer_secret: process.env.TWITTER_SECRET,
    access_token: token.accessToken,
    access_token_secret: token.tokenSecret
  });
  T.post('statuses/update', { status: req.body.tweet }, (err) => {
    if (err) { return next(err); }
    req.flash('success', { msg: 'Your tweet has been posted.' });
    res.redirect('/api/twitter');
  });
};


exports.getSteam = async (req, res, next) => {
  const steamId = req.user.steam;
  const params = { l: 'english', steamid: steamId, key: process.env.STEAM_KEY };
  const getAsync = promisify(request.get);

  // get the list of the recently played games, pick the most recent one and get its achievements
  const getPlayerAchievements = () =>
    getAsync({ url: 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/', qs: params, json: true })
      .then(({ request, body }) => {
        if (request.statusCode === 401) {
          throw new Error('Invalid Steam API Key');
        }
        if (body.response.total_count > 0) {
          params.appid = body.response.games[0].appid;
          return getAsync({ url: 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/', qs: params, json: true })
            .then(({ request, body }) => {
              if (request.statusCode === 401) {
                throw new Error('Invalid Steam API Key');
              }
              return body;
            });
        }
      });
  const getPlayerSummaries = () => {
    params.steamids = steamId;
    return getAsync({ url: 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', qs: params, json: true })
      .then(({ request, body }) => {
        if (request.statusCode === 401) {
          throw Error('Missing or Invalid Steam API Key');
        }
        return body;
      });
  };
  const getOwnedGames = () => {
    params.include_appinfo = 1;
    params.include_played_free_games = 1;
    return getAsync({ url: 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/', qs: params, json: true })
      .then(({ request, body }) => {
        if (request.statusCode === 401) {
          throw new Error('Missing or Invalid Steam API Key');
        }
        return body;
      });
  };
  try {
    const playerAchievements = await getPlayerAchievements();
    const playerSummaries = await getPlayerSummaries();
    const ownedGames = await getOwnedGames();
    res.render('api/steam', {
      title: 'Steam Web API',
      ownedGames: ownedGames.response,
      playerAchievemments: playerAchievements ? playerAchievements.playerstats : null,
      playerSummary: playerSummaries.response.players[0]
    });
  } catch (err) {
    next(err);
  }
};


exports.getStripe = (req, res) => {
  res.render('api/stripe', {
    title: 'Stripe API',
    publishableKey: process.env.STRIPE_PKEY
  });
};


exports.postStripe = (req, res) => {
  const { stripeToken, stripeEmail } = req.body;
  stripe.charges.create({
    amount: 395,
    currency: 'usd',
    source: stripeToken,
    description: stripeEmail
  }, (err) => {
    if (err && err.type === 'StripeCardError') {
      req.flash('errors', { msg: 'Your card has been declined.' });
      return res.redirect('/api/stripe');
    }
    req.flash('success', { msg: 'Your card has been successfully charged.' });
    res.redirect('/api/stripe');
  });
};


exports.getTwilio = (req, res) => {
  res.render('api/twilio', {
    title: 'Twilio API'
  });
};


exports.postTwilio = (req, res, next) => {
  req.assert('number', 'Phone number is required.').notEmpty();
  req.assert('message', 'Message cannot be blank.').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/api/twilio');
  }

  const message = {
    to: req.body.number,
    from: '+13472235148',
    body: req.body.message
  };
  twilio.messages.create(message).then((sentMessage) => {
    req.flash('success', { msg: `Text send to ${sentMessage.to}` });
    res.redirect('/api/twilio');
  }).catch(next);
};

exports.getClockwork = (req, res) => {
  res.render('api/clockwork', {
    title: 'Clockwork SMS API'
  });
};

exports.postClockwork = (req, res, next) => {
  const message = {
    To: req.body.telephone,
    From: 'Hackathon',
    Content: 'Hello from the Hackathon Starter'
  };
  clockwork.sendSms(message, (err, responseData) => {
    if (err) { return next(err.errDesc); }
    req.flash('success', { msg: `Text sent to ${responseData.responses[0].to}` });
    res.redirect('/api/clockwork');
  });
};


exports.getLinkedin = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'linkedin');
  const linkedin = Linkedin.init(token.accessToken);
  linkedin.people.me((err, $in) => {
    if (err) { return next(err); }
    res.render('api/linkedin', {
      title: 'LinkedIn API',
      profile: $in
    });
  });
};


exports.getInstagram = async (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'instagram');
  ig.use({ client_id: process.env.INSTAGRAM_ID, client_secret: process.env.INSTAGRAM_SECRET });
  ig.use({ access_token: token.accessToken });
  try {
    const userSearchAsync = promisify(ig.user_search);
    const userAsync = promisify(ig.user);
    const userSelfMediaRecentAsync = promisify(ig.user_self_media_recent);
    const searchByUsername = await userSearchAsync('richellemead');
    const searchByUserId = await userAsync('175948269');
    const myRecentMedia = await userSelfMediaRecentAsync();
    res.render('api/instagram', {
      title: 'Instagram API',
      usernames: searchByUsername,
      userById: searchByUserId,
      myRecentMedia
    });
  } catch (error) {
    next(error);
  }
};


exports.getPayPal = (req, res, next) => {
  paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_ID,
    client_secret: process.env.PAYPAL_SECRET
  });

  const paymentDetails = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: process.env.PAYPAL_RETURN_URL,
      cancel_url: process.env.PAYPAL_CANCEL_URL
    },
    transactions: [{
      description: 'Hackathon Starter',
      amount: {
        currency: 'USD',
        total: '1.99'
      }
    }]
  };

  paypal.payment.create(paymentDetails, (err, payment) => {
    if (err) { return next(err); }
    const { links, id } = payment;
    req.session.paymentId = id;
    for (let i = 0; i < links.length; i++) {
      if (links[i].rel === 'approval_url') {
        res.render('api/paypal', {
          approvalUrl: links[i].href
        });
      }
    }
  });
};


exports.getPayPalSuccess = (req, res) => {
  const { paymentId } = req.session;
  const paymentDetails = { payer_id: req.query.PayerID };
  paypal.payment.execute(paymentId, paymentDetails, (err) => {
    res.render('api/paypal', {
      result: true,
      success: !err
    });
  });
};


exports.getPayPalCancel = (req, res) => {
  req.session.paymentId = null;
  res.render('api/paypal', {
    result: true,
    canceled: true
  });
};


exports.getLob = (req, res, next) => {
  lob.routes.list({ zip_codes: ['10007'] }, (err, routes) => {
    if (err) { return next(err); }
    res.render('api/lob', {
      title: 'Lob API',
      routes: routes.data[0].routes
    });
  });
};

const fs = require('fs');
const AWS = require('aws-sdk');

const BUCKET_NAME = 'hackermatcher';
const IAM_USER_KEY = 'AKIAJTVQG35QJUSGGKKA';
const IAM_USER_SECRET = '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';

const s3 = new AWS.S3({
    accessKeyId: 'AKIAJTVQG35QJUSGGKKA',
    secretAccessKey: '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'
});


exports.getFileUpload = (req, res) => {
 res.render('api/upload', {
      title: 'File Upload'});
 
 var getParams = {
    Bucket: BUCKET_NAME, // your bucket name,
    Key: 'contacts' // path to the object you're looking for
  } 

  s3.getObject(getParams, function(err, data) {
      // Handle any error and exit
      if (err)
          return err;

    // No error happened
    // Convert Body from a Buffer to a String

    let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
    
    var data = Buffer.from(String.fromCharCode.apply(null, new Uint16Array(objectData)), "base64")
    console.log(data);
    res.send(data);
  });
};


exports.postFileUpload = (req, res) => {
  var file = req.file;
  var fileName = file.path;
  console.log(file);
  console.log(file.path);
  console.log(file.filename);
  fs.readFile(fileName, (err, data) => {
     if (err) throw err;
     const params = {
         Bucket: BUCKET_NAME, // pass your bucket name
         Key: file.filename, // file will be saved as testBucket/contacts.csv
         Body: JSON.stringify(data, null, 2)
     };
     s3.upload(params, function(s3Err, data) {
         if (s3Err) throw s3Err
         console.log(`File uploaded successfully at ${data.Location}`)
     });
  });
  
};


exports.getPinterest = (req, res, next) => {
  const token = req.user.tokens.find(token => token.kind === 'pinterest');
  request.get({ url: 'https://api.pinterest.com/v1/me/boards/', qs: { access_token: token.accessToken }, json: true }, (err, request, body) => {
    if (err) { return next(err); }
    res.render('api/pinterest', {
      title: 'Pinterest API',
      boards: body.data
    });
  });
};


exports.postPinterest = (req, res, next) => {
  req.assert('board', 'Board is required.').notEmpty();
  req.assert('note', 'Note cannot be blank.').notEmpty();
  req.assert('image_url', 'Image URL cannot be blank.').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/api/pinterest');
  }

  const token = req.user.tokens.find(token => token.kind === 'pinterest');
  const formData = {
    board: req.body.board,
    note: req.body.note,
    link: req.body.link,
    image_url: req.body.image_url
  };

  request.post('https://api.pinterest.com/v1/pins/', { qs: { access_token: token.accessToken }, form: formData }, (err, request, body) => {
    if (err) { return next(err); }
    if (request.statusCode !== 201) {
      req.flash('errors', { msg: JSON.parse(body).message });
      return res.redirect('/api/pinterest');
    }
    req.flash('success', { msg: 'Pin created' });
    res.redirect('/api/pinterest');
  });
};

exports.getGoogleMaps = (req, res) => {
  res.render('api/google-maps', {
    title: 'Google Maps API',
    google_map_api_key: process.env.GOOGLE_MAP_API_KEY
  });
};
*/
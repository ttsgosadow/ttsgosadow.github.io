function getURLParameter() 
{
  var URIcomp = decodeURIComponent((new RegExp('[?|&]' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || false;
  if( URIcomp )
    return URIcomp.match( /(\d+[cmrt]|bj|rj|GG16|GG17|GG18|B1)/g )
  else
    return Array(0)
}

function newGame( gameType ) 
{
  var deck = newDeck()
  shuffle(deck)
  var deploymentCard = topCard(deck)
  var strategyCard = topCard(deck)
  deck = newDeck()
  shuffle(deck)
  
  if( gameType == 'B1' || gameType == 'GG17' )
  {
    var schemeCard1 = topCard(deck)
    while (schemeCard1["card"] == "bj" || schemeCard1["card"] == "rj")
        schemeCard1 = topCard(deck)
    var schemeCard2 = topCard(deck)
    while (schemeCard2["card"] == "bj" || schemeCard2["card"] == "rj")
        schemeCard2 = topCard(deck)
    var goToURL = "?" + gameType + deploymentCard["card"] + strategyCard["card"] + schemeCard1["card"] + schemeCard2["card"]
  }
  else if( gameType == 'GG18' )
  {
    var schemeCards = []
    while ( schemeCards.length < 4)
    {
      var schemeCard = topCard(deck)
      if( schemeCard["card"] != "bj" && schemeCard["card"] != "rj" )
        schemeCards [schemeCard["value"]] = schemeCard
    }
    
    schemeCard1 = schemeCards.shift()
    schemeCard2 = schemeCards.shift()
    var schemeCard3 = schemeCards.shift()
    var schemeCard4 = schemeCards.shift()
      
    goToURL = "?" + gameType + deploymentCard["card"] + strategyCard["card"] + schemeCard1["card"] + schemeCard2["card"] + schemeCard3["card"] + schemeCard4["card"]
    }
    window.location.href = goToURL
}

function newDeck() 
{
  return ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "11c", "12c", "13c",
    "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m", "11m", "12m", "13m",
    "1r", "2r", "3r", "4r", "5r", "6r", "7r", "8r", "9r", "10r", "11r", "12r", "13r",
    "1t", "2t", "3t", "4t", "5t", "6t", "7t", "8t", "9t", "10t", "11t", "12t", "13t",
    "bj", "rj"]
}

function topCard(array) 
{
  var card = array.shift()
  if (card == "bj" || card == "rj") {
      var joker = {
          card: card,
          suit: card,
          value: card
      }
      return joker
  } else {
      var val = card.slice(0, card.length - 1)
      var suit = card.charAt(card.length - 1)
      return {
          card: card,
          suit: suit,
          value: val
      }
  }
}

function shuffle(array) 
{
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) 
    {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function cardToChar( card )
{
    var cardChars = []
    cardChars['a'] = "1c"
    cardChars['b'] = "2c"
    cardChars['c'] = "3c"
    cardChars['d'] = "4c"
    cardChars['e'] = "5c"
    cardChars['f'] = "6c"
    cardChars['g'] = "7c"
    cardChars['h'] = "8c"
    cardChars['i'] = "9c"
    cardChars['j'] = "10c"
    cardChars['k'] = "11c"
    cardChars['l'] = "12c"
    cardChars['m'] = "13c"
    cardChars['n'] = "1m"
    cardChars['o'] = "2m"
    cardChars['p'] = "3m"
    cardChars['q'] = "4m"
    cardChars['r'] = "5m"
    cardChars['s'] = "6m"
    cardChars['t'] = "7m"
    cardChars['u'] = "8m"
    cardChars['v'] = "9m"
    cardChars['w'] = "10m"
    cardChars['x'] = "11m"
    cardChars['y'] = "12m"
    cardChars['z'] = "13m"
    cardChars['A'] = "1r"
    cardChars['B'] = "2r"
    cardChars['C'] = "3r"
    cardChars['D'] = "4r"
    cardChars['E'] = "5r"
    cardChars['F'] = "6r"
    cardChars['G'] = "7r"
    cardChars['H'] = "8r"
    cardChars['I'] = "9r"
    cardChars['J'] = "10r"
    cardChars['K'] = "11r"
    cardChars['L'] = "12r"
    cardChars['M'] = "13r"
    cardChars['N'] = "1t"
    cardChars['O'] = "2t"
    cardChars['P'] = "3t"
    cardChars['Q'] = "4t"
    cardChars['R'] = "5t"
    cardChars['S'] = "6t"
    cardChars['T'] = "7t"
    cardChars['U'] = "8t"
    cardChars['V'] = "9t"
    cardChars['W'] = "10t"
    cardChars['X'] = "11t"
    cardChars['Y'] = "12t"
    cardChars['Z'] = "13t"
    cardChars['-'] = "bj"
    cardChars['+'] = "rj"
    
    return cardChars[ card ]
}

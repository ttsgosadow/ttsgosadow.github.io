function getURLParameter() 
{
  var URIcomp = decodeURIComponent((new RegExp('[?|&]' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || false;
  if( URIcomp )
    return URIcomp.match( /GG16=|GG17=|GG18=|B1=|[a-z]|[A-Z]|[-\+]/g )
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
    
    var goToURL = "?" + gameType + "=" + getCardChar( deploymentCard ) + getCardChar( strategyCard ) + getCardChar( schemeCard1 ) + getCardChar( schemeCard2 )
  }
  else
  { 
    if( gameType == 'GG18' )
    {
      var schemeCards = []
      var schemeValues = []
      while ( schemeCards.length < 4 )
      {
        var schemeCard = topCard(deck)
        if( schemeCard["card"] != "bj" && schemeCard["card"] != "rj" &&  schemeValues.indexOf( schemeCard["value"] ) == -1   )
        {
          schemeCards.push( schemeCard )
          schemeValues.push( schemeCard[ "value" ] )
        }
      }

      var deploymentChar = getCardChar( deploymentCard )
      var strategyChar = getCardChar( strategyCard )

      var schemeChar1 = getCardChar( schemeCards.shift() )
      var schemeChar2 = getCardChar( schemeCards.shift() )
      var schemeChar3 = getCardChar( schemeCards.shift() )
      var schemeChar4 = getCardChar( schemeCards.shift() )

      goToURL = "?" + gameType + "=" + deploymentChar + strategyChar + schemeChar1 + schemeChar2 + schemeChar3 + schemeChar4
      }
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

function getCardChar( card )
{
    var charCard = getCharCards()
    return charCard[ card["card"] ]
}

function getCharCard( char )
{
    var cardChar = getCardChars()
    return cardChar[ char ]
}

function getCharCards()
{
  var charCards = []
        charCards['1c'] = "a"
    charCards['2c'] = "b"
    charCards['3c'] = "c"
    charCards['4c'] = "d"
    charCards['5c'] = "e"
    charCards['6c'] = "f"
    charCards['7c'] = "g"
    charCards['8c'] = "h"
    charCards['9c'] = "i"
    charCards['10c'] = "j"
    charCards['11c'] = "k"
    charCards['12c'] = "l"
    charCards['13c'] = "m"
    charCards['1m'] = "n"
    charCards['2m'] = "o"
    charCards['3m'] = "p"
    charCards['4m'] = "q"
    charCards['5m'] = "r"
    charCards['6m'] = "s"
    charCards['7m'] = "t"
    charCards['8m'] = "u"
    charCards['9m'] = "v"
    charCards['10m'] = "w"
    charCards['11m'] = "x"
    charCards['12m'] = "y"
    charCards['13m'] = "z"
    charCards['1r'] = "A"
    charCards['2r'] = "B"
    charCards['3r'] = "C"
    charCards['4r'] = "D"
    charCards['5r'] = "E"
    charCards['6r'] = "F"
    charCards['7r'] = "G"
    charCards['8r'] = "H"
    charCards['9r'] = "I"
    charCards['10r'] = "J"
    charCards['11r'] = "K"
    charCards['12r'] = "L"
    charCards['13r'] = "M"
    charCards['1t'] = "N"
    charCards['2t'] = "O"
    charCards['3t'] = "P"
    charCards['4t'] = "Q"
    charCards['5t'] = "R"
    charCards['6t'] = "S"
    charCards['7t'] = "T"
    charCards['8t'] = "U"
    charCards['9t'] = "V"
    charCards['10t'] = "W"
    charCards['11t'] = "X"
    charCards['12t'] = "Y"
    charCards['13t'] = "Z"
    charCards['bj'] = "-"
    charCards['rj'] = "+"
  
    return charCards
}

function getCardChars()
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
  
    return cardChars
}

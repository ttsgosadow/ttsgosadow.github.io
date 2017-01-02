function togglediv(id) 
{
    var div = document.getElementById(id);
    if (document.getElementById(id + '-cb').checked)
        div.style.display = "block";
    else
        div.style.display = "none";
}

function toggleAll(bool) 
{
  if (bool)
      var toggleTo = "block"
  else
      var toggleTo = "none"
      document.getElementById("deployment-text-cb").checked = bool
  document.getElementById("strategy-text-cb").checked = bool
  document.getElementById("scheme1-text-cb").checked = bool
  document.getElementById("scheme2-text-cb").checked = bool
  document.getElementById("scheme3-text-cb").checked = bool
  document.getElementById("scheme4-text-cb").checked = bool
  document.getElementById("scheme5-text-cb").checked = bool
  document.getElementById("deployment-text").style.display = toggleTo
  document.getElementById("strategy-text").style.display = toggleTo
  document.getElementById("scheme1-text").style.display = toggleTo
  document.getElementById("scheme2-text").style.display = toggleTo
  document.getElementById("scheme3-text").style.display = toggleTo
  document.getElementById("scheme4-text").style.display = toggleTo
  document.getElementById("scheme5-text").style.display = toggleTo
}

function getURLParameter() 
{
  var URIcomp = decodeURIComponent((new RegExp('[?|&]' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || false;
  if( URIcomp )
    return URIcomp.match( /(\d+[cmrt]|bj|rj|GG16|GG17|B1)/g )
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
  var schemeCard1 = topCard(deck)
  while (schemeCard1["card"] == "bj" || schemeCard1["card"] == "rj")
      schemeCard1 = topCard(deck)
  var schemeCard2 = topCard(deck)
  while (schemeCard2["card"] == "bj" || schemeCard2["card"] == "rj")
      schemeCard2 = topCard(deck)
  window.location.href = "?" + gameType + deploymentCard["card"] + strategyCard["card"] + schemeCard1["card"] + schemeCard2["card"]
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
  var currentIndex = array.length,
      temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
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

function generateGame( targetField ) 
{
  var URIparam = getURLParameter()
  var failedGame = false
  var gameType = 'none'
  if( URIparam.length == 5 )
  {
    var gameType = URIparam[0]
    var deploymentCard = cardFromText(URIparam[1])
    var strategyCard = cardFromText(URIparam[2])
    var schemeCard1 = cardFromText(URIparam[3]) 
    var schemeCard2 = cardFromText(URIparam[4])
  }
  else
    failedGame = true
    
  if( gameType == 'GG16' || gameType == 'GG17' || gameType == 'B1' )
  {
    var deployment = getDeployment(deploymentCard["value"], gameType)
    var strategy = getStrategy(strategyCard["suit"], gameType)
    var schemes = getSchemes(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"], gameType)

    if( gameType == 'B1' )
      var gameType = 'Book 1'
      
    var gameLink = "?" + URIparam[0] + URIparam[1] + URIparam[2] + URIparam[3] + URIparam[4]
    document.getElementById( 'visible-input' ).innerHTML = 'https://ttsgosadow.github.io/GameGen/' + gameLink

    //hier ui maken 
    var checkedState = ""
    var generatedGame = '<div class="alert alert-success" role="alert"><strong>Success!</strong> The fickle winds of fate yielded these flips for deployment, strategy and schemes.</div>' + 
        '<p>Use this ' +
        '<button type="button" class="btn btn-default" data-toggle="modal" data-target="#myModal">Perma-link <span class="glyphicon glyphicon-new-window"></span></button> ' +
        'to share the game setup.</p>' +
        '<div class="panel panel-default">' +
        '<div class="panel-heading"><h3 class="panel-title">'+
        '<strong>' + gameType + ' game: ' + cardImage(deploymentCard) + ' ' + cardImage(strategyCard) + ' ' + cardImage(schemeCard1) + ' ' + cardImage(schemeCard2) + '</strong>' +
        '<span class="pull-right"><a href="#" onClick="toggleAll(true);return false;">Show</a>/<a href="#" onClick="toggleAll(false);return false;">hide</a> all</span>'  +
        '</h3></div><div class="panel-body">' + 
        '<p><strong>Deployment:</strong> ' + deployment[0] + ' (' + cardImage(deploymentCard) + ')<span class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="deployment-text-cb" '+checkedState+' onclick="togglediv(\'deployment-text\')"><label for="deployment-text-cb" class="css-label"><span class="glyphicon glyphicon-triangle-top"></span><span class="glyphicon glyphicon-triangle-bottom"></span></label></span><div class="well well-sm small" id="deployment-text">' + deployment[1] + '</div></p>' +
        '<p><strong>Strategy:</strong> ' + strategy[0] + ' (' + cardImage(strategyCard) + ')<span class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="strategy-text-cb" '+checkedState+' onclick="togglediv(\'strategy-text\')"><label for="strategy-text-cb" class="css-label"><span class="glyphicon glyphicon-triangle-top"></span><span class="glyphicon glyphicon-triangle-bottom"></span></label></span><div class="well well-sm small" id="strategy-text">' + strategy[1] + '</div></p>' +
        '<p><strong>Schemes:</strong> (' + cardImage(schemeCard1) + ',' + cardImage(schemeCard2) + ')<ul class="list-group">' +
        '<li class="list-group-item">' + schemes[0][1] + ' (' + suitImage(schemes[0][0]) + ')<div class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="scheme1-text-cb" '+checkedState+' onclick="togglediv(\'scheme1-text\')"><label for="scheme1-text-cb" class="css-label"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span></label></div><div class="well well-sm small" id="scheme1-text">' + schemes[0][2] + '</div></li>' +
        '<li class="list-group-item">' + schemes[1][1] + ' (' + suitImage(schemes[1][0]) + ')<div class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="scheme2-text-cb" '+checkedState+' onclick="togglediv(\'scheme2-text\')"><label for="scheme2-text-cb" class="css-label"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span></label></div><div class="well well-sm small" id="scheme2-text">' + schemes[1][2] + '</div></li>' +
        '<li class="list-group-item">' + schemes[2][1] + ' (' + suitImage(schemes[2][0]) + ')<div class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="scheme3-text-cb" '+checkedState+' onclick="togglediv(\'scheme3-text\')"><label for="scheme3-text-cb" class="css-label"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span></label></div><div class="well well-sm small" id="scheme3-text">' + schemes[2][2] + '</div></li>' +
        '<li class="list-group-item">' + schemes[3][1] + ' (' + suitImage(schemes[3][0]) + ')<div class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="scheme4-text-cb" '+checkedState+' onclick="togglediv(\'scheme4-text\')"><label for="scheme4-text-cb" class="css-label"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span></label></div><div class="well well-sm small" id="scheme4-text">' + schemes[3][2] + '</div></li>' +
        '<li class="list-group-item">' + schemes[4][1] + ' (' + suitImage(schemes[4][0]) + ')<div class="cb-span pull-right"><input type="checkbox" class="css-checkbox" id="scheme5-text-cb" '+checkedState+' onclick="togglediv(\'scheme5-text\')"><label for="scheme5-text-cb" class="css-label"><span class="glyphicon glyphicon-chevron-up"></span><span class="glyphicon glyphicon-chevron-down"></span></label></div><div class="well well-sm small" id="scheme5-text">' + schemes[4][2] + '</div></li>' +
        '</ul></p>' +
        '</div></div>'
  }
  else
      failedGame = true

  if ( failedGame )
  {
    var generatedGame = '<p>Use this to generate a game, and share it with your opponent. It\'s very useful for setting up a game in advance, to keep al the game time for playing instead of also preparing the scenario, crews, etc.' +
        '<div class="alert alert-warning" role="alert"><strong>Generate game</strong> Press the button above to generate a game!</div></p>'
  }

  document.getElementById( targetField ).innerHTML = generatedGame

  if( !failedGame )  
    toggleAll( false )
}

function cardImage(p1) 
{
  if (p1["suit"] == "c" || p1["suit"] == "m" || p1["suit"] == "r" || p1["suit"] == "t")
      return p1["value"] + suitImage(p1["suit"])
  else if (p1["card"] == "bj")
      return "BJ"
  else if (p1["card"] == "rj")
      return "RJ"
  else
      return p1["card"]
}

function suitImage(p1) 
{
  var suitURLs = {
      c: "images/c.png",
      m: "images/m.png",
      r: "images/r.png",
      t: "images/t.png"
  }
  var altText = {
      c: "Crows",
      m: "Masks",
      r: "Rams",
      t: "Tomes"
  }
  if (p1 == "c" || p1 == "m" || p1 == "r" || p1 == "t")
      return "<img src=\"" + suitURLs[p1] + "\" alt=\"(" + altText[p1] + ")\" title=\"" + altText[p1] + "\" />"
  else
      return p1
}

function cardFromText(card) 
{
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

function getDeployment( value, gameType ) {
  var deployment = {
    bj: ["Close", "A player will deploy within 12\" of a chosen Table Edge, with the opponent deploying within 12\" of the opposite Table Edge."],
    rj: ["Close", "A player will deploy within 12\" of a chosen Table Edge, with the opponent deploying within 12\" of the opposite Table Edge."],
    1: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    2: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    3: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    4: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    5: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    6: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    7: ["Standard", "A player will deploy within 6\" of a chosen Table Edge, with the opponent deploying within 6\" of the opposite Table Edge."],
    8: ["Corner", "A player will deploy within 12\" of a chosen Table Corner, with the opponent deploying within 12\" of the opposite Table Corner"],
    9: ["Corner", "A player will deploy within 12\" of a chosen Table Corner, with the opponent deploying within 12\" of the opposite Table Corner"],
    10: ["Corner", "A player will deploy within 12\" of a chosen Table Corner, with the opponent deploying within 12\" of the opposite Table Corner"],
    11: ["Flank", "The table is divided into four 18\" x 18\" Quarters. A player will deploy within 9\" of the table edges within one table Quarter, with the opponent deploying within 9\" of the table edges within the opposite table Quarter."],
    12: ["Flank", "The table is divided into four 18\" x 18\" Quarters. A player will deploy within 9\" of the table edges within one table Quarter, with the opponent deploying within 9\" of the table edges within the opposite table Quarter."],
    13: ["Flank", "The table is divided into four 18\" x 18\" Quarters. A player will deploy within 9\" of the table edges within one table Quarter, with the opponent deploying within 9\" of the table edges within the opposite table Quarter."]
  }
  return deployment[value]
}

function getStrategy( suit, gameType ) 
{
  if( gameType == 'B1' )
  {
    var strategy = {
      bj: ["Stake a Claim", "<em>Special Rules</em><br />A model may take a (2) Interact Action to discard all Claim Markers within 6\" of itself, and then place a Claim Marker in base contact with itself.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if there are more Claim Markers on the Enemy Half of the table than its own."],
      rj: ["Stake a Claim", "<em>Special Rules</em><br />A model may take a (2) Interact Action to discard all Claim Markers within 6\" of itself, and then place a Claim Marker in base contact with itself.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if there are more Claim Markers on the Enemy Half of the table than its own."],
      c: ["Reckoning", "<em>Victory Points</em><br />At the end of every Turn, after the first, a Crew earns 1 VP if it killed or sacrificed two or more enemy models during that Turn.<br /><br />At the end of every Turn after the first, if a player has no models in play (buried models are not considered \"in play\") then her opponent earns 1 VP. A player may not earn more than 1 VP from this Strategy per Turn."],
      m: ["Reconnoiter", "<em>Setup</em><br />Divide the table into four 18\" x 18\" table Quarters.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it controls two or more table Quarters.<br /><br />To control a table quarter, the Crew must have the most non-Peon models within the table Quarter. These models cannot be within 6\" of the Center of the table, or partially within another table Quarter."],
      r: ["Turf War", "<em>Setup</em><br />Place a single Turf Marker at the Center of the table.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has two or more non-Peon models within 6\" of the Turf Marker."],
      t: ["Squatter's Rights", "<em>Setup</em><br />Place five 30mm Squat Markers along the Centerline. One is placed at the Center of the table. Then, two more are placed on the Centerline 6\" away from the Center of the table (one on each side). Lastly, two more are placed on the Centerline 6\" away from table's edge (one on each side).<br /><br /><em>Special Rules</em><br />Squat Markers begin the game claimed by neither Crew.<br />A model may take a (1) Interact Action to claim any Squat marker that is in base contact with the model.<br />A Squat marker is only ever claimed by the last Crew to interact with it, all previous claims are removed.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has claim to at least two Squat Markers."]
    }
  }

  if( gameType == 'GG16' || gameType == 'GG17' )
  {
    var strategy = {
      bj: ["Collect the Bounty", "<em>Special</em><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
      rj: ["Collect the Bounty", "<em>Special</em><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
      c: ["Guard the Stash", "<em>Set Up</em><br />Place two 50mm Stash Markers (Ht5, blocking, impassable, hard cover) on the Centerline each 5\" on either side of the Center of the board (10\" apart from each other).<br /><br /><em>Victory Points</em><br />At the end of each turn after the first, a Crew earns 1 VP if it has at least one non-Peon model within 2\" of each Stash Marker."],
      m: ["Interference", "<em>Set Up</em><br />Divide the table into four 18\" by 18\" table Quarters.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it controls two or more table Quarters. To control a table Quarter, the Crew must have the most unengaged non-Peon models within the table Quarter. These models cannot be within 6\" of the Center of the table, or partially within another table Quarter."],
      r: ["Extraction", "<em>Set up</em><br />Place an Informant Marker at the Center of the table.<br /><br /><em>Special Rules</em><br />At the end of every Turn after the first, after scoring VP, the player with the most non-Peon models within 6\" of the Informant Marker may place the Marker up to 3\" from its current location, not into terrain or base contact with a model.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has two or more non-Peon models within 6\" of the Informant Marker."],
      t: ["Headhunter", "<em>Special Rules</em><br />Whenever a model kills or sacrifices a non-Peon model which it considers an enemy, the model which made the kill must place a 30mm Head Marker within 3\" and LoS of the killed or sacrificed model before removing it from play. This Marker may not be placed in base contact with any model; if there is nowhere it can legally be placed, then skip placing a Marker. Any model in base contact with a Head Marker may make a (1) Interact Action with it to remove it from play.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, a Crew earns 1 VP if it removed at least one Head Marker from play that turn."]
    }
  }

  if( gameType == 'GG17' )
  {
    var strategy = {
      bj: ["Collect the Bounty", "<em>Special</em><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
      rj: ["Collect the Bounty", "<em>Special</em><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
      c: ["Guard the Stash", "<em>Set Up</em><br />Place two 50mm Stash Markers (Ht5, blocking, impassable, hard cover) on the Centerline each 5\" on either side of the Center of the board (10\" apart from each other).<br /><br /><em>Victory Points</em><br />At the end of each turn after the first, a Crew earns 1 VP if it has at least one non-Peon model within 2\" of each Stash Marker."],
      m: ["Interference", "<em>Set Up</em><br />Divide the table into four 18\" by 18\" table Quarters.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it controls two or more table Quarters. To control a table Quarter, the Crew must have the most unengaged non-Peon models within the table Quarter. These models cannot be within 6\" of the Center of the table, or partially within another table Quarter."],
      r: ["Extraction", "<em>Set up</em><br />Place an Informant Marker at the Center of the table.<br /><br /><em>Special Rules</em><br />At the end of every Turn after the first, after scoring VP, the player with the most non-Peon models within 6\" of the Informant Marker may place the Marker up to 3\" from its current location, not into terrain or base contact with a model.<br /><br /><em>Victory Points</em><br />At the end of each Turn after the first, a Crew earns 1 VP if it has two or more non-Peon models within 6\" of the Informant Marker."],
      t: ["Headhunter", "<em>Special Rules</em><br />Whenever a model kills or sacrifices a non-Peon model which it considers an enemy, the model which made the kill must place a 30mm Head Marker within 3\" and LoS of the killed or sacrificed model before removing it from play. This Marker may not be placed in base contact with any model; if there is nowhere it can legally be placed, then skip placing a Marker. Any model in base contact with a Head Marker may make a (1) Interact Action with it to remove it from play.<br /><br /><em>Victory Points</em><br />At the end of every Turn after the first, a Crew earns 1 VP if it removed at least one Head Marker from play that turn."]
    }
  }

  return strategy[suit]
}

function getSchemes(s1, v1, s2, v2, gameType) 
{
  if( gameType == 'B1' )
  {
    var schemes = {
      always: ["always", "A Line in the Sand", ""],
      doubles: ["doubles", "Distract", ""],
      c: ["c", "Assassinate", ""],
      m: ["m", "Breakthrough", ""],
      r: ["r", "Bodyguard", ""],
      t: ["t", "Protect Territory", ""],
      1: [1, "Cursed Object", ""],
      2: [2, "Outflank", ""],
      3: [3, "Plant Evidence", ""],
      4: [4, "Entourage", ""],
      5: [5, "Vendetta", ""],
      6: [6, "Plant Explosive", ""],
      7: [7, "Make Them Suffer", ""],
      8: [8, "Delivier a Message", ""],
      9: [9, "Take Prisoner", ""],
      10: [10, "Spring the Trap", ""],
      11: [11, "Murder Protege", ""],
      12: [12, "Frame for Murder", ""],
      13: [13, "Power Ritual", ""]
    }
  }
  
  if( gameType == 'GG16' )
  {
    var schemes = {
      always: ["always", "Convict Labor", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, if this Crew has at least three Scheme Markers within 2\" of the Centerline of the board which do not have an enemy model or another friendly Scheme Marker within 2\" of them, this Crew scores 1 VP.<br />These Scheme Markers may still be used to score VP from other Schemes during Turns in which they were not used to score VP for Convict Labor (but they may not be used to Score VP from both Convict Labor and a different Scheme during a single Turn)."],
      doubles: ["doubles", "Take Prisoner", "This Scheme may not start revealed.<br />When you choose this Scheme, note down an enemy model. At the end of the game, if this Crew has at least one non-Peon model engaged with the noted enemy model, this Crew earns 2 VP.<br />If this Crew has at least one non-Peon model engaged with the noted enemy model and there are no other enemy models within 3\" of the noted model, this Crew earns 1 additional VP."],
      c: ["c", "Hunting Party", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, score 1 VP if at least one enemy Minion or Peon model was killed by one of this Crew's Enforcer or Henchmen models.<br />At the end of every Turn after the first, if the enemy Crew has no Minion or Peon models in play, score 1 VP. No more than 1 VP per Turn may be scored from this Scheme."],
      m: ["m", "Exhaust Their Forces", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non-Peon enemy model within 1\" with an Interact Action. If the target has already Activated this Turn, the Interact Action is a <br />(2) Action, if it has not Activated, it is a (1) Action. Give the target of the Interact Action the following Condition for the rest of the game:<br />Exhausted: This model gains the following Action: \"(1) Shake It Off: Remove the Exhausted Condition from this model. This Action may not be taken while this model is engaged.\" No other Action or Ability can remove this Condition.<br />The first time an enemy model gains the Exhausted Condition, reveal this Scheme. At the end of every Turn after the first, this Crew may end the Exhausted Condition on one enemy model in play to gain 1 VP."],
      r: ["r", "Show of Force", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, count the number of face-up Upgrades with a printed cost greater than 0 attached to each non-Master model within 6\" of the center of the board for each Crew. Upgrades which began the game attached to a Master do not count toward this total.<br />If this Crew has at least one qualifying Upgrade and has a number of qualifying Upgrades equal to or exceeding the opposing Crew's number of qualifying Upgrades, this crew scores 1VP."],
      t: ["t", "Leave Your Mark", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew may remove one of its Scheme Markers which is on the opponent's half of the board, not within 6\" of the of the Centerline, and not within 4\" of a non-Peon enemy model to score 1 VP."],
      1: [1, "Covert Breakthrough", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 1 VP for each of its Scheme Markers within 6\" of the enemy Deployment Zone."],
      2: [2, "Undercover Entourage", "This Scheme may not start revealed.<br />When you choose this Scheme, note down one of this Crew's Master or Henchman models. At the end of the game, if the chosen model is in the opponent's half of the table, this Crew earns 1 VP.<br />If the chosen model is in the enemy Deployment Zone at the end of the game, this Crew earns 1 additional VP.<br />If the chosen model is in the opponent's half of the table at the end of the game and has half or more of its Wounds remaining, this Crew earns 1 additional VP."],
      3: [3, "Neutralize the Leader", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />The first time the enemy Leader is reduced below half of their starting Wounds, gain 1 VP.<br />The first time the enemy Leader leaves play, score 2 VP."],
      4: [4, "Catch and Release", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non-Peon enemy model within 1\" with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />Tagged: This model gains the following Action: \"(2) Rip It Out: Remove this Condition from this model. This Action may not be taken while this model is engaged.\" No other Action or Ability can remove this Condition.<br />The first time an enemy model gains the Tagged Condition, reveal this Scheme. At the end of every Turn, this Crew earns 1 VP if at least two enemy models in play have the Tagged Condition."],
      5: [5, "Frame for Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note one of this Crew's non-Peon models as the \"sucker.\" If the chosen \"sucker\" model is killed or sacrificed by an enemy model, score 1 VP.<br />If the enemy model was a Master or Henchman, score 1 additional VP.<br />If this Scheme was accomplished on or before Turn 3, score 1 additional VP."],
      6: [6, "Detonate the Charges", "This Scheme may not start revealed.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme and earn 1 VP for each enemy model that is within 3\" of at least one of this Crew's Scheme Markers. <br />Then, remove all of this Crew's Scheme Markers which are within 3\" of an enemy model.<br />If only one Scheme Marker is removed in this way, this Crew can only score a maximum of 2 VP from this Scheme."],
      7: [7, "Set Up", "This Scheme may not start revealed.<br />When you choose this Scheme, note down an enemy Master, Henchman, or Enforcer model.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme to score a number of VP equal to the number of this Crew's Scheme Markers within 4\" of the noted model.<br />Then remove all of this Crew's Scheme Markers within 4\" of the noted model."],
      8: [8, "Search the Ruins", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 2 VP if it has 3 or more Scheme Markers within 6\" of the Center of the board.<br />If at least two of those Scheme Markers are on the opponent's half of the table, earn 1 additional VP.<br />Scheme Markers which are within 2\" of one or more other friendly Scheme Markers do not count towards this Scheme."],
      9: [9, "Mark for Death", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non-Peon enemy model they are engaged with with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />\"Marked: This condition may not be removed or ended.\"<br />Reveal this Scheme once an enemy model gains the Marked condition. When an enemy model with the Marked Condition is reduced to 0 Wounds or leaves play, gain 1 VP."],
      10: [10, "Public Demonstration", "This Scheme may not start revealed.<br />When you choose this Scheme, secretly note down up to three Minion models in this Crew with a combined Soulstone Cost of at least 15.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme to score 1 VP for each of the noted models within 4\" and LoS of an enemy Master, Henchman, or Enforcer."],
      11: [11, "Inspection", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew scores 1 VP if it has at least one non-Peon model within 4\" of where each end of the Centerline of the board meets the board edge (or corner)."],
      12: [12, "A Quick Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note down the enemy model with the highest Soulstone Cost. If multiple models are tied for the highest Soulstone Cost, then choose one of those models and note it down.<br />This Crew earns 2 VP if the noted enemy model is killed or sacrificed before the end of the game.<br />If the noted enemy model is killed or sacrificed on or before Turn 3, earn 1 additional VP."],
      13: [13, "Occupy Their Turf", "This Scheme may not start revealed.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme to score a number of VP equal to the number of this Crew's Minion models on the enemy half of the board which are not within 10\" of the Centerline."]
    }
  }
  
  if( gameType == 'GG17' )
  {
    var schemes = {
      always: ["always", "Claim Jump", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, if this Crew has at least two Scheme Markers within 2\" of the Centerline of the board, not within 2\" of an enemy model, and not within 4\" of another friendly Scheme Marker, this Crew scores 1 VP and removes all friendly Scheme Markers within 2\" of the Centerline."],
      doubles: ["doubles", "Eliminate the Leadership", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br/>The first time the enemy Leader is reduced below half of their starting Wounds, score 1 VP.<br />The first time the enemy Leader is reduced to 0 Wounds, Killed, or Sacrificed score 1 VP.<br />If there is no enemy Leader in play at the end of the game, score 1 VP."],
      c: ["c", "Dig Their Graves", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />Once per turn, after this Crew kills or sacrifices an enemy non-Peon model that is within 4\" of one or more Scheme Markers friendly to this Crew, score 1 VP, then your opponent may remove one Scheme Marker friendly to your Crew within 4\" of the killed (or sacrificed) model.<br />If this Scheme and another of your Schemes would score any VP off the same model being killed or sacrificed, you must choose only one of your Schemes to score from."],
      m: ["m", "Accusation!", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non- Peon enemy model within 1” that has not yet Activated this Turn with a (1) Interact Action to give the target the following Condition for the rest of the game:<br/>Accused: This model gains the following Action: \"(1) Hold It!: Remove the Accused Condition from this model. This Action may not be taken while this model is engaged.\" No other Action or Ability can remove this Condition.<br />The first time an enemy model gains the Accused Condition, reveal this Scheme. At the end of every Turn after the first, this Crew may end the Accused Condition on one enemy model in play to gain 1 VP."],
      r: ["r", "Frame for Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note one of this Crew's non-Peon models as the \"sucker.\" If the chosen \"sucker\" model is killed or sacrificed by an enemy model, score 1 VP.<br />If the enemy model was a Master or Henchman, score 1 additional VP.<br />If this Scheme was accomplished on or before Turn 3, score 1 additional VP."],
      t: ["t", "Leave Your Mark", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew may remove one of its Scheme Markers which is on the opponent's half of the board, not within 6\" of the of the Centerline, and not within 4\" of a non-Peon enemy model to score 1 VP."],
      1: [1, "Covert Breakthrough", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 1 VP for each of its Scheme Markers within 6\" of the enemy Deployment Zone."],
      2: [2, "Undercover Entourage", "This Scheme may not start revealed.<br />When you choose this Scheme, note down one of this Crew's Master or Henchman models. At the end of the game, if the chosen model is in the opponent's half of the table, this Crew earns 1 VP.<br />If the chosen model is in the enemy Deployment Zone at the end of the game, this Crew earns 1 additional VP.<br />If the chosen model is in the opponent's half of the table at the end of the game and has half or more of its Wounds remaining, this Crew earns 1 additional VP."],
      3: [3, "Show of Force", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, count the number of face-up Upgrades with a printed cost greater than 0 attached to each non-Master model within 6\" of the center of the board for each Crew. Upgrades which began the game attached to a Master do not count toward this total.<br />If this Crew has at least one qualifying Upgrade and has a number of qualifying Upgrades equal to or exceeding the opposing Crew’s number of qualifying Upgrades, this crew scores 1VP."],
      4: [4, "Hunting Party", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, score 1 VP if at least one enemy Minion or Peon model was killed by one of this Crew's Enforcer or Henchmen models.<br />At the end of every Turn after the first, if the enemy Crew has no Minion or Peon models in play, score 1 VP. No more than 1 VP per Turn may be scored from this Scheme."],
      5: [5, "Hidden Trap", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 1 VP for each enemy non-Peon model within 3\" of one or morevfriendly Scheme Markers. Then, remove all of this Crew’s Scheme Markers which are within 3\" of an enemy model."],
      6: [6, "Recover Evidence", "This Scheme may not start revealed.<br />You may reveal this Scheme at the beginning of any Turn. After revealing this Scheme, the opponent chooses five of their models in play (or all of their models in play if they have less then five remaining).<br />You may place an enemy Evidence Marker in base contact with chosen models.<br />Models in this Crew can use a (1) Interact Action to remove an enemy Evidence Marker in base contact with itself. If they do, this Crew scores 1 VP."],
      7: [7, "Set Up", "This Scheme may not start revealed.<br />When you choose this Scheme, note down an enemy Master, Henchman, or Enforcer model.<br />Once per game, at the end of any Turn, this Crew may reveal this Scheme to score a number of VP equal to the number of this Crew's Scheme Markers within 4\" of the noted model.<br />Then remove all of this Crew's Scheme Markers within 4\" of the noted model."],
      8: [8, "Search the Ruins", "This Scheme may not start revealed.<br />At the end of the game, this Crew earns 2 VP if it has 3 or more Scheme Markers within 6\" of the Center of the board.<br />If at least two of those Scheme Markers are on the opponent's half of the table, earn 1 additional VP.<br />Scheme Markers which are within 2\" of one or more other friendly Scheme Markers do not count towards this Scheme."],
      9: [9, "Mark for Death", "This Scheme may not start revealed.<br />All non-Peon models in this Crew may target a non-Peon enemy model they are engaged with with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />\"Marked: This condition may not be removed or ended.\"<br />Reveal this Scheme once an enemy model gains the Marked condition. When an enemy model with the Marked Condition is reduced to 0 Wounds or leaves play, gain 1 VP."],
      10: [10, "Tail 'em", "This Scheme may not start revealed.<br />All Minion models in this Crew may target an enemy Master or Henchman model within 6\" and LoS with a (1) Interact Action to give the target the following Condition for the rest of the game:<br />Spotted: This Condition is removed if this model is outside of Line of Sight of all enemy models at the endof its Activation. No Action or Ability can remove thisCondition.<br />The first time an enemy model gains the Spotted Condition, reveal this Scheme. At the end of every Turn after the first, this Crew may end the Spotted Condition on one enemy model in play to gain 1 VP."],
      11: [11, "Inspection", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />At the end of every Turn after the first, this Crew scores 1 VP if it has at least one non-Peon model within 4\" of where each end of the Centerline of the board meets the board edge (or corner)."],
      12: [12, "A Quick Murder", "This Scheme may not start revealed. Reveal this Scheme once this Crew has scored any VP from it.<br />When you choose this Scheme, note down the enemy model with the highest Soulstone Cost. If multiple models are tied for the highest Soulstone Cost, then choose one of those models and note it down.<br />This Crew earns 2 VP if the noted enemy model is killed or sacrificed before the end of the game.<br />If the noted enemy model is killed or sacrificed on or before Turn 3, earn 1 additional VP."],
      13: [13, "Last Stand", "This Scheme may not start revealed. Reveal this Scheme at the end of any turn.<br />At the end of every Turn after the Turn this Scheme has been revealed, if this Crew has at least three Enforcer and/or Henchman (any combination of at least three) models in play completely outside their deployment zone and this Crew has fewer models on the table than the enemy Crew, score 1 VP."]
    }
  }
  
  var pool = []
  var p0 = "always"
  if (s1 == s2) {
      s2 = "doubles"
      var vs = [v1, v2].sort(function(a, b) {
          return a - b
      })
      pool = [s2, s1].concat(vs)
  }
  if (v1 == v2) {
      v2 = "doubles"
      var vs = [s1, s2].sort()
      pool = vs.concat([v1])
      pool.unshift(v2)
  } else {
      var vs1 = [s1, s2].sort()
      var vs2 = [v1, v2].sort(function(a, b) {
          return a - b
      })
      pool = vs1.concat(vs2)
  }
  pool.unshift(p0)
  
  return [schemes[pool[1]], schemes[pool[2]], schemes[pool[3]], schemes[pool[4]], schemes[pool[0]]]
}

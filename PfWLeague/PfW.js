function getPlayers()
{
   var players = [
   [ "Gjalt", ['bj',1] , [3,2] , [7,3] , [11,1] , ['m',2] ],
   [ "Tim", ['rj',3] , [4,4], [8,5] , [12,1] , ['c',2] ],
   [ "Robin", [1,3] , [5,1] , [9,2] , [13,3] , ['t',1] ],
   [ "Sander", [2,2] , [6,3] , [10,1] , ['r',2] ]
  ]
   
  return players
}

function getRanking()
{
 var players = getPlayers()
 var playerRankings = new Array()
 for( i = 0; i < players.length; i++ )
   {
      var playerValue = 0
      for( n= 1; n < players[i].length; n++ )
      {
         playerValue += players[i][n][1]
      }
      playerRankings.push( [ players[i][0], playerValue, n-1 ] )
   }
   playerRankings.sort(function(a, b) { 
    return a[1] > b[1] ? 1 : -1;
   });
   playerRankings.reverse()
   
   var playerRankingText = '<h3>Leaderboard</h3><ol>'
   for( i = 0; i < playerRankings.length; i++ )
   {
    playerRankingText += '<li>' + playerRankings[i][0] + ' - ' + playerRankings[i][1] + ' pts (' + playerRankings[i][2] + ' Assets)</li>'  
   }
   playerRankingText += '</ol>'
   
   document.getElementById( 'ranking' ).innerHTML = playerRankingText
}

function generateLeague()
{
  document.getElementById( 'event' ).innerHTML = eventCard( 'dragon' )
   
  getRanking()
 
  document.getElementById( 'playerSelector1' ).innerHTML = playerSelector( 'playerSelector1' )
  document.getElementById( 'playerSelector2' ).innerHTML = playerSelector( 'playerSelector2' )
 
  assetList()
}

function generateAllAssets( pt1, pt2, pt3 )
{
   ePt1 = assetCard( '1' )
   ePt1 += assetCard( '2' )
   ePt1 += assetCard( '3' )
   ePt1 += assetCard( '4' )
   ePt1 += assetCard( '5' )
   ePt1 += assetCard( '6' )
   ePt1 += assetCard( '7' )
   
   ePt2 = assetCard( '8' )
   ePt2 += assetCard( '9' )
   ePt2 += assetCard( '10' )
   ePt2 += assetCard( '11' )
   ePt2 += assetCard( '12' )
   ePt2 += assetCard( '13' )
   
   ePt3 = assetCard( 'c' )
   ePt3 += assetCard( 'm' )
   ePt3 += assetCard( 'r' )
   ePt3 += assetCard( 't' )
   ePt3 += assetCard( 'rj' )
   ePt3 += assetCard( 'bj' )
   
   document.getElementById( pt1 ).innerHTML = ePt1
   document.getElementById( pt2 ).innerHTML = ePt2
   document.getElementById( pt3 ).innerHTML = ePt3
}

function playerSelector( selectorID )
{
   var players = getPlayers()
   var selector = '<select class="form-control '+ selectorID +'" id="' + selectorID + '" onChange="playerSelectorChanged(this)">'
   selector += '<option value="">-- select player --</option>'
   
   for( i = 0; i < players.length; i++ )
   {
      selector += '<option value="' + i + '">'+players[i][0]+'</option>'
   }
   selector += '</select>'
   
   return selector
}

function playerSelectorChanged( selectorID )
{
   if( selectorID.value == "" )
   {
      playerAssetsText = ""
   }
   else
   {
      var players = getPlayers()
      var selectedPlayer = players[ selectorID.value ]

      playerAssetsText = "<h3>Assets controlled by " + selectedPlayer[0] + "</h3>"

      for( i= 1; i < selectedPlayer.length; i++ )
      {
         playerAssetsText += assetCard( selectedPlayer[i][0], selectedPlayer[i][1] ) + "<br />"
      }

      var selectorText = selectorID.id + 'Text'
    }
   
   document.getElementById( selectorText ).innerHTML = playerAssetsText
}

function assetList()
{
 
}

function assetCard( asset, assetValue )
{
  var assets = getAssets()
  if( assetValue == undefined )
  {
     assetValue = 0
  }
  
  var aCard = '<table class="table table-bordered"><tr><th class="warning"><h4>' + assets[ asset ][0] + ' <small class="text-right">(flip: ' + assets[ asset ][1] + ')</small></h4></th></tr>' +
  '<tr><td>' + assets[ asset ][2] + '</td></tr>' +
      '<tr class="text-right"><td class="active">Value: ' + assetValue + '</td></tr></table>'
  
  return aCard
}

function eventCard( eventID )
{
  var events = getEvents()
  
  var eCard = '<h1>Current League Event</h1><table class="table table-bordered"><tr><th class="danger"><h4>' + events[ eventID ][ 0 ] + '</h4></th></tr>' +
  '<tr><td><small>' + events[ eventID ][ 2 ] + '</small><br /><br />' + events[ eventID ][ 3 ] + '</td></tr></table>'
  
  return eCard
}

function getEvents()
{
var events = {
  event: ["Name", "Week", "Flavour", "Text", "Image"],
  dragon: ["Dragon Burning!", 1, "A Dragon swoops across Malifaux, burning everything in its path! You have to save everything there is to be saved!", "All models begin the game with the Burning +1 Condition. During the first turn of the game, each model has Nimble (+1 AP for movement).<br />Each player chooses 2 Assets of his opponent. Winning or drawing the game you gain control of both those Assets.", '<img src="" />'],
  zombie: ["Zombiefaux!", 2, '"Bet you never seen a zombie robot… yet" - Unknown', "During the game, for each crew, the first Living non-Peon model that dies will stay alive with half Wd (rounded down) remaining. This model loses all Conditions and the Living characteristic, gains the Undead characteristic and is permanently Slowed.<br />At the end of the game, before scoring, each player may switch one choosen scheme for another scheme in the pool.", '<img src="" />'],
  moral: ["The Moral of the Story is", 3, '"Whisky is the Devil, disguised as a good bottle" – Father Kroen', "Play the game as a 45ss Encounter. All upgrades are free.<br />Any scheme marker that does not have a friendly model within 4\" is immediately discarded.", '<img src="" />'],
  magick: ["Rush of Magick", 4, "Since the orphanage has burned down the Magick has been so strong on the wind, that you can taste it. The taste of death...", "During this game both players have a base maximum hand size of 8.<br />Avatars are legal for this game, and can be proxied with any model on a 50mm base.", '<img src="" />'],
  feast: ["Feast or Famine?", 5, "An all consuming hunger grasps us all. But how bad is that when there is so much to sate yourself with?", "Every model gains the following action during this game:<br /><b>(0) If it ain't movin'...:</b> discard a corpse marker, scrap marker or enemy scheme marker in base contact to make a 1/2/3 healing flip.<br />Treat the Black Joker as the Red Joker when it's flipped from the Fate Deck.", '<img src="" />'],
  imbalance: ["An Evil Imbalance", 6, "\"Nothing is fair in love and war\" - Unknown", "If you have fewer cards in your hand than your opponent, you gain +flip on all opposing Duels.<br />After killing an enemy model draw a card.", '<img src="" />'],
  spy: ["Spy in Our Midst", 7, "Lets just hope he's not spying for your enemy as well!", "Whenever a model performs an Attack Action targetting a model of lower station count the model of lower station as having Terrifying (All) 10. If this causes a model to have double Terrifying the model may choose which Terrifying to use.<br />Whenever a model succesfully drops a friendly scheme marker, place an enemy base marker exactly on top of it.", '<img src="" />'],   lands: ["Ever Changing Lands", 8, "Mapping the area has proved useless, as the city as well as the lands seem to be ever changing.", "The Strategy may also be scored on the first turn of the game. This may cause you to score up to 5 points for the Strategy, with a maximum of 11 Victory Points for the game.<br />Treat all Severe terrain as Hazardous terrain as well.", '<img src="" />']
}

function getAssets()
{
var assets = {
  asset: ["Name", "Flip", "Text", "Value", "Image"],
  bj: ["Shady Alley", "Black Joker", "Your opponent may not use abilities on Assets.<br />If you lose the game, your opponent receives this Asset in addition to any other Assets he receives.", 1, '<img src="" />'],
  rj: ["Burglars Bar", "Red Joker", "Use at the start of the game, before selecting Crews.<br />You and your opponent flip a card. If you flip higher then your opponent, you steal one Soulstone from him.", 1, '<img src="" />'],
  1: ["Bridge", "1", "Use when hiring your crew; you may hire one additional model with the Mercenary characteristic. For up to one model with the Mercenary characteristic, you don’t have to pay the extra Soulstone for hiring that Mercenary.", 1, '<img src="" />'],
  2: ["Underground Passage", "2", "Use after flipping for initiative, but before determining the player who won the flip. You may choose to cheat or reflip your initiative flip.", 1, '<img src="" />'],
  3: ["Library", "3", "Use at the beginning of a turn after drawing cards. Draw three cards. Then discard down to your maximum hand size.", 1, '<img src="" />'],
  4: ["Bakery", "4", "Use during an activation of one of your models. The activated model now has the following Tactical Action for the duration of it’s activation:<br /><b>(1) “This one’s without Mold!”:</b> target model within 2\" makes a 1/2/3 healing flip.", 1, '<img src="" />'],
  5: ["Armoury", "5", "Use when a model suffers damage.<br />Make a 1/2/3 prevention flip for the model.", 1, '<img src="" />'],
  6: ["Study", "6", "Use when a model is making a Simple Duel, before any cards are flipped. Add double +flip to the Duel.", 1, '<img src="" />'],
  7: ["Boxing School", "7", "Use when a model is making a Ml close Attack Action or a Df flip, before any cards are flipped. Add double +flip to the Duel.", 1, '<img src="" />'],
  8: ["\"Pharmacy\"", "8", "Use when activating a friendly model, before taking any actions. For the duration of the turn, this model is immune to Wp duels.", 1, '<img src="" />'],
  9: ["Gym", "9", "Use before a damage flip is flipped as results of an Attack Action. The Damage Flip has -flip and may not be cheated.", 1, '<img src="" />'],
  10: ["Magician's tent", "10", "Use when activating a friendly model, before taking any actions. This model can Use Soulstones this activation, but can only use up to two Soulstones in total.", 1, '<img src="" />'],
  11: ["Asylum", "11", "Use when activating a model, before taking any actions. Draw two cards, then discard a card.", 1, '<img src="" />'],
  12: ["Judas Tree", "12", "Use at the start of a turn. Choose an enemy scheme marker. Place a friendly scheme marker in base contact with it, then remove that enemy scheme marker.", 1, '<img src="" />'],
  13: ["Church", "13", "Use when activating a model, before it has taken any actions. Remove all conditions from this model, then the model heals 1 Dg and receives Slow.", 1, '<img src="" />'],
  c: ["Graveyard", "Crow", "Use at the start of any duel before any player flips a card.<br />Add <img src=\"c.png\" alt=\"(crow)\" /> to your duel total.", 1, '<img src="" />'],
  m: ["Haunted House", "Mask", "Use at the start of any duel before any player flips a card.<br />Add <img src=\"m.png\" alt=\"(mask)\" /> to your duel total.", 1, '<img src="" />'],
  r: ["Guard House", "Ram", "Use at the start of any duel before any player flips a card.<br />Add <img src=\"r.png\" alt=\"(ram)\" /> to your duel total.", 1, '<img src="" />'],
  t: ["Workshop", "Tome", "Use at the start of any duel before any player flips a card.<br />Add <img src=\"t.png\" alt=\"(tome)\" /> to your duel total.", 1, '<img src="" />'],
}
return assets
}

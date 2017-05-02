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

function generateLeague()
{
  document.getElementById( 'event' ).innerHTML = eventCard( 'dragon' )
 
  document.getElementById( 'playerSelector1' ).innerHTML = playerSelector( 'playerSelector1' )
  document.getElementById( 'playerSelector2' ).innerHTML = playerSelector( 'playerSelector2' )
 
  assetList()
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
  
  var aCard = '<table class="table table-bordered"><tr><th class="warning"><h4>' + assets[ asset ][0] + ' <small class="text-right">(flip: ' + assets[ asset ][1] + ')</small></h4></th></tr>' +
  '<tr><td>' + assets[ asset ][2] + '</td></tr>' +
      '<tr class="text-right"><td class="active">Value: ' + assetValue + '</td></tr></table>'
  
  return aCard
}

function eventCard( eventID )
{
  var events = getEvents()
  
  var eCard = '<table class="table table-bordered"><tr><th class="danger"><h4>' + events[ eventID ][ 0 ] + '</h4></th></tr>' +
  '<tr><td><small>' + events[ eventID ][ 2 ] + '</small><br /><br />' + events[ eventID ][ 3 ] + '</td></tr></table>'
  
  return eCard
}

function getEvents()
{
var events = {
  event: ["Name", "Week", "Flavour", "Text", "Image"],
  dragon: ["Dragon Burning!", 1, "A Dragon swoops across Malifaux, burning everything in its path! You have to save everything there is to be saved!", "All models begin the game with the Burning +1 Condition. During the first turn of the game, each model has Nimble (+1 AP for movement).<br />Each player chooses 2 Assets of his opponent. Winning or drawing the game you gain control of both those Assets.", '<img src="" />'],
  zombie: ["Zombiefaux!", 2, '"Bet you never seen a zombie robot… yet" - Unknown', "During the game, for each crew, the first Living non-Peon model that dies will stay alive with half Wd (rounded down) remaining. This model loses all Conditions and the Living characteristic, gains the Undead characteristic and is permanently Slowed.<br />Each player selects up to three schemes, but may only score for two of these schemes.", '<img src="" />'],
  moral: ["The Moral of the Story is", 3, '"Whisky is the Devil, disguised as a good bottle" – Father Kroen', "Play the game as a Story Encounter, using the Deployment and Strategy table as described in the Rulebook.<br />Crews start with a maximum Cache of zero, and can spend the Soulstone Cache of the Crew Leader to hire models. At the end of every game turn, each crew receives +1 Soulstone.", '<img src="" />']
}
return events
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
  6: ["Study", "6", "Use when a model is making a Simple Duel, before any cards are flipped. Add ++flip to the Duel.", 1, '<img src="" />'],
  7: ["Boxing School", "7", "Use when a model is making a Ml close Attack Action, before any cards are flipped. Add double +flip to the Duel.", 1, '<img src="" />'],
  8: ["Dojo", "8", "Use when a model is defending against an Attack Action. Add double +flip to the Defense Flip for the Duel.", 1, '<img src="" />'],
  9: ["Gym", "9", "Use before a damage flip is flipped as results of an Attack Action. The Damage Flip has -flip and may not be cheated.", 1, '<img src="" />'],
  10: ["Magician's tent", "10", "Use when activating a friendly model, before taking any actions. This model can Use Soulstones this activation, but can only use up to two Soulstones in total.", 1, '<img src="" />'],
  11: ["Asylum", "11", "Use when activating a model, before taking any actions. Draw two cards, then discard a card.", 1, '<img src="" />'],
  12: ["Hospital", "12", "Use when a model suffers Damage. Reduce the Damage by three, to a minimum of one.", 1, '<img src="" />'],
  13: ["Church", "13", "Use when activating a model, before it has taken any actions. Remove all conditions from this model, then the model heals 1 Dg and receives Slow.", 1, '<img src="" />'],
  c: ["Graveyard", "Crow", "Use at the start of any duel before any player flips a card.<br />Add (crow) to your duel total.", 1, '<img src="" />'],
  m: ["Haunted House", "Mask", "Use at the start of any duel before any player flips a card.<br />Add (mask) to your duel total.", 1, '<img src="" />'],
  r: ["Guard House", "Ram", "Use at the start of any duel before any player flips a card.<br />Add (ram) to your duel total.", 1, '<img src="" />'],
  t: ["Workshop", "Tome", "Use at the start of any duel before any player flips a card.<br />Add (tome) to your duel total.", 1, '<img src="" />'],
}
return assets
}

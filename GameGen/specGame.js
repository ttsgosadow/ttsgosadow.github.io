function specGame( gameType )
{
  var specifyGame = 'Incompatible Game type - please try again.'
  if( gameType == 'GG18' )
  {
    var specifyGame = '<p>You have specified a GG18 game.</p>'
    
    specifyGame += ddlbDeployment( gameType )
    specifyGame += "<br />"
    specifyGame += ddlbStrategy( gameType )
    specifyGame += "<br />"
    specifyGame += ddlbSchemes( gameType )
    specifyGame += "<br />"
    specifyGame += buttonGO( 4 )
  }
  
  document.getElementById( 'generated-game' ).innerHTML = specifyGame
}

function ddlbDeployment( gameType )
{
  var depl ='<select id="specDeployment" name="specDeployment">'
  var deck = newDeck()
  var charCards = getCharCards()
  var curDepl = []
  var n = 0
  while( n < deck.length )
  {
    curDepl = getDeployment( deck[n], gameType )
    depl += '<option value="'+charCards[deck[n]]+'">'+curDepl[0]+'</option>'
    n++
  }
  
  depl += '</select>'
  return depl
}

function ddlbStrategy( gameType )
{
  
}

function ddlbSchemes( gameType )
{
  
}

function buttonGO( numSchemes)
{
  
}

function startSpecGame()
{
}

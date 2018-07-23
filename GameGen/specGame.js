function specGame( gameType )
{
  var specifyGame = 'Incompatible Game type - please try again.'
  if( gameType == 'GG18' )
  {
    var specifyGame = '<p>You have specified a GG18 game.</p>'
    
    specifyGame += ddlbDeployment( gameType )
    specifyGame += "<br />"
    specifyGame += ddlbstrategy( gameType )
    specifyGame += "<br />"
    specifyGame += ddlbSchemes( gameType )
    specifyGame += "<br />"
    specifyGame =+ buttonGO( 4 )
  }
  
  document.getElementById( targetField ).innerHTML = specifyGame
}

function ddlbDeployment( gameType )
{
  var depl ='<select id="specDeployment" name="specDeployment">'
  var deck = newDeck()
  var charCards = getCharCards()
  var n = 0
  while( n < deck.length )
  {
    var depl += '<option value="'+charCards[deck[n]]+'">deck[n]</option>'
    n++
  }
  
  var depl += '</select>'
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

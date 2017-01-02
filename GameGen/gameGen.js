function togglediv(id) {
                var div = document.getElementById(id);
                if (document.getElementById(id + '-cb').checked)
                    div.style.display = "block";
                else
                    div.style.display = "none";
            }
            function toggleAll(bool) {
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
            function getURLParameter() {
              var URIcomp = decodeURIComponent((new RegExp('[?|&]' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || false;
              if( URIcomp )
                return URIcomp.match( /(\d+[cmrt]|bj|rj|GG16|GG17|B1)/g )
              else
                return Array(0)
            }
            function newGame( gameType ) {
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
            function newDeck() {
                return ["1c", "2c", "3c", "4c", "5c", "6c", "7c", "8c", "9c", "10c", "11c", "12c", "13c",
                "1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m", "10m", "11m", "12m", "13m",
                "1r", "2r", "3r", "4r", "5r", "6r", "7r", "8r", "9r", "10r", "11r", "12r", "13r",
                "1t", "2t", "3t", "4t", "5t", "6t", "7t", "8t", "9t", "10t", "11t", "12t", "13t",
                "bj", "rj"]
            }
            function topCard(array) {
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
            function shuffle(array) {
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
            function generateGame( targetField ) {
              var URIparam = getURLParameter()
              var failedGame = false
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
                
                if ( failedGame )
                {
                  var generatedGame = '<p>Use this to generate a game, and share it with your opponent. It\'s very useful for setting up a game in advance, to keep al the game time for playing instead of also preparing the scenario, crews, etc.' +
                      '<div class="alert alert-warning" role="alert"><strong>Generate game</strong> Press the button above to generate a game!</div></p>'
                  }
              else
              {
                var deployment = getDeployment(deploymentCard["value"], gameType)
                var strategy = getStrategyGG16(strategyCard["suit"], gameType)
                
                if( gameType == 'GG16' )
                {
                  var schemes = getSchemesGG16(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
                  var gameType = 'GG16'
                }
                else if (gameType == 'GG17' )
                {
                  var schemes = getSchemesGG17(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
                  var gameType = 'GG17'
                }
                else if( gameType == 'B1' )
                {
                  var schemes = getSchemesBook1(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
                  var gameType = 'Book 1'
                }
                else
                    failedGame = true
                
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
              document.getElementById( targetField ).innerHTML = generatedGame
              
              if( !failedGame )  
                toggleAll( false )
            }
            function cardImage(p1) {
                if (p1["suit"] == "c" || p1["suit"] == "m" || p1["suit"] == "r" || p1["suit"] == "t")
                    return p1["value"] + suitImage(p1["suit"])
                else if (p1["card"] == "bj")
                    return "BJ"
                else if (p1["card"] == "rj")
                    return "RJ"
                else
                    return p1["card"]
            }
            function suitImage(p1) {
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
            function cardFromText(card) {
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

            function getStrategy( suit, gameType ) {
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
              
              if( gameType == 'GG16' )
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

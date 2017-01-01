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
                return URIcomp.match( /(\d+[cmrt]|bj|rj|GG16|GG17)/g )
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
                if( gameType == 'GG16' )
                {
                  var deployment = getDeployment(deploymentCard["value"])
                var strategy = getStrategyGG16(strategyCard["suit"])
                var schemes = getSchemesGG16(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
                }
                else if (gameType == 'GG17' )
                {
                  var deployment = getDeployment(deploymentCard["value"])
                  var strategy = getStrategyGG17(strategyCard["suit"])
                  var schemes = getSchemesGG17(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
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
                    '<strong>Game: ' + cardImage(deploymentCard) + ' ' + cardImage(strategyCard) + ' ' + cardImage(schemeCard1) + ' ' + cardImage(schemeCard2) + '</strong>' +
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
            function getDeployment(value) {
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

           

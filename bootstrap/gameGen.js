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
  
                return URIcomp.match( /(\d+[cmrt]|bj|rj)/g );    
            }
            function newGame() {
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
                window.location.href = "?" + deploymentCard["card"] + strategyCard["card"] + schemeCard1["card"] + schemeCard2["card"]
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
              var deploymentCard = cardFromText(URIparam[0])
                var strategyCard = cardFromText(URIparam[1])
                var schemeCard1 = cardFromText(URIparam[2]) 
                var schemeCard2 = cardFromText(URIparam[3])
                if (!deploymentCard || !strategyCard || !schemeCard1 || !schemeCard2)
                {
                  var generatedGame = '<div class="alert alert-warning" role="alert"><strong>Generate game</strong> Press the button above to generate a game!</div>'
                  }
              else
              {
                var deployment = getDeployment(deploymentCard["value"])
                var strategy = getStrategy(strategyCard["suit"])
                var schemes = getSchemes(schemeCard1["suit"], schemeCard1["value"], schemeCard2["suit"], schemeCard2["value"])
                var gameLink = "?" + URIparam[0] + URIparam[1] + URIparam[2] + URIparam[3]
                //hier ui maken 
                var checkedState = ""
                var generatedGame = '<div class="alert alert-success" role="alert"><strong>Succes!</strong> The fickle winds of fate yielded these flips for deployment, strategy and schemes.</div>' + 
                    '<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+
                    '<strong>Game: ' + cardImage(deploymentCard) + ' ' + cardImage(strategyCard) + ' ' + cardImage(schemeCard1) + ' ' + cardImage(schemeCard2) + '</strong>' +
                    ' <span class="pull-right">Use this <a href="' + gameLink + '">perma-link</a> to the game </span>' +
                    '</h3></div><div class="panel-body">' + 
                    '<span class="pull-right"><a href="#" onClick="toggleAll(true);return false;">Show</a>/<a href="#" onClick="toggleAll(false);return false;">hide</a> all</span>' +
                    '<p><strong>Deployment:</strong> ' + deployment[0] + ' (' + cardImage(deploymentCard) + ')<input type="checkbox" class="pull-right" id="deployment-text-cb" '+checkedState+' onclick="togglediv(\'deployment-text\')"><div class="deployment-text" id="deployment-text">' + deployment[1] + '</div></p>' +
                    '<p><strong>Strategy:</strong> ' + strategy[0] + ' (' + cardImage(strategyCard) + ')<input type="checkbox" class="pull-right" id="strategy-text-cb" '+checkedState+' onclick="togglediv(\'strategy-text\')"><div class="strategy-text" id="strategy-text">' + strategy[1] + '</div></p>' +
                    '<p><strong>Schemes:</strong> (' + cardImage(schemeCard1) + ',' + cardImage(schemeCard2) + ')<ul>' +
                    '<li>' + schemes[0][1] + ' (' + suitImage(schemes[0][0]) + ')<input type="checkbox" class="pull-right" id="scheme1-text-cb" '+checkedState+' onclick="togglediv(\'scheme1-text\')"><div class="scheme-text" id="scheme1-text">' + schemes[0][2] + '</div></li>' +
                    '<li>' + schemes[1][1] + ' (' + suitImage(schemes[1][0]) + ')<input type="checkbox" class="pull-right" id="scheme2-text-cb" '+checkedState+' onclick="togglediv(\'scheme2-text\')"><div class="scheme-text" id="scheme2-text">' + schemes[1][2] + '</div></li>' +
                    '<li>' + schemes[2][1] + ' (' + suitImage(schemes[2][0]) + ')<input type="checkbox" class="pull-right" id="scheme3-text-cb" '+checkedState+' onclick="togglediv(\'scheme3-text\')"><div class="scheme-text" id="scheme3-text">' + schemes[2][2] + '</div></li>' +
                    '<li>' + schemes[3][1] + ' (' + suitImage(schemes[3][0]) + ')<input type="checkbox" class="pull-right" id="scheme4-text-cb" '+checkedState+' onclick="togglediv(\'scheme4-text\')"><div class="scheme-text" id="scheme4-text">' + schemes[3][2] + '</div></li>' +
                    '<li>' + schemes[4][1] + ' (' + suitImage(schemes[4][0]) + ')<input type="checkbox" class="pull-right" id="scheme5-text-cb" '+checkedState+' onclick="togglediv(\'scheme5-text\')"><div class="scheme-text" id="scheme5-text">' + schemes[4][2] + '</div></li>' +
                    '</ul></p>' +
                    '</div></div>'
                }
                document.getElementById( targetField ).innerHTML = generatedGame
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
            function getStrategy(suit) {
                var strategy = {
                    bj: ["Collect the Bounty", "<u>Special</u><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><u>Victory Points</u><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
                    rj: ["Collect the Bounty", "<u>Special</u><br />Whenever a model is reduced to 0 Wounds by a non-Peon model, the Crew which reduced it to 0 Wounds gains a number of Bounty Points depending on the type of model which was reduced to 0 Wounds, so long as the Crew considered the model an enemy. Models are worth the following number of Bounty Points:<br />Peons: 0<br />Minions: 1<br />Enforcers: 2<br />Henchmen: 3<br />Masters: 4<br />At the end of each Turn, after calculating VP, reset each player to 0 Bounty Points.<br /><br /><u>Victory Points</u><br />At the end of every Turn after the first, the player with the most Bounty Points scores 1 VP. Either player may also score 1 VP if the opposing player has no models left in play. No more than 1 VP may be scored from this strategy per Turn. If both players still have models in play and they are tied for Bounty Points, neither will score any VP."],
                    c: ["Guard the Stash", "<u>Set Up</u><br />Place two 50mm Stash Markers (Ht5, blocking, impassable, hard cover) on the Centerline each 5\" on either side of the Center of the board (10\" apart from each other).<br /><br /><u>Victory Points</u><br />At the end of each turn after the first, a Crew earns 1 VP if it has at least one non-Peon model within 2\" of each Stash Marker."],
                    m: ["Interference", "<u>Set Up</u><br />Divide the table into four 18\" by 18\" table Quarters.<br /><br /><u>Victory Points</u><br />At the end of each Turn after the first, a Crew earns 1 VP if it controls two or more table Quarters. To control a table Quarter, the Crew must have the most unengaged non-Peon models within the table Quarter. These models cannot be within 6\" of the Center of the table, or partially within another table Quarter."],
                    r: ["Extraction", "<u>Set up</u><br />Place an Informant Marker at the Center of the table.<br /><br /><u>Special Rules</u><br />At the end of every Turn after the first, after scoring VP, the player with the most non-Peon models within 6\" of the Informant Marker may place the Marker up to 3\" from its current location, not into terrain or base contact with a model.<br /><br /><u>Victory Points</u><br />At the end of each Turn after the first, a Crew earns 1 VP if it has two or more non-Peon models within 6\" of the Informant Marker."],
                    t: ["Headhunter", "<u>Special Rules</u><br />Whenever a model kills or sacrifices a non-Peon model which it considers an enemy, the model which made the kill must place a 30mm Head Marker within 3\" and LoS of the killed or sacrificed model before removing it from play. This Marker may not be placed in base contact with any model; if there is nowhere it can legally be placed, then skip placing a Marker. Any model in base contact with a Head Marker may make a (1) Interact Action with it to remove it from play.<br /><br /><u>Victory Points</u><br />At the end of every Turn after the first, a Crew earns 1 VP if it removed at least one Head Marker from play that turn."]
                }
                return strategy[suit]
            }
            function getSchemes(s1, v1, s2, v2) {
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

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
